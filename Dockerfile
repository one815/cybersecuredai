# Multi-stage build to reduce final image size
# Stage 1: Build stage with all dependencies
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

# Copy package files
COPY package.json package-lock.json ./

# Set environment variables to skip heavy downloads
ENV PUPPETEER_SKIP_DOWNLOAD=1
ENV CHROMIUM_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# Install ALL dependencies for building (including devDependencies)
# Use --legacy-peer-deps to avoid npm ERESOLVE failures for conflicting peer deps during CI/docker build
RUN npm ci --legacy-peer-deps --include=dev

# Copy source code
COPY . .

# Ensure attached_assets are explicitly present in the build context for Vite
# (some .dockerignore rules can unintentionally exclude top-level files).
COPY attached_assets ./attached_assets

# Build the application
RUN npm run build

# Stage 2: Production stage with minimal dependencies
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Set environment variables to skip heavy downloads and optimize for production
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=1
ENV CHROMIUM_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# Install only production runtime dependencies for native modules
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    giflib \
    pixman \
    pangomm \
    libjpeg-turbo \
    freetype

# Copy package files
COPY package.json package-lock.json ./

# Copy node_modules from the builder stage to avoid rebuilding native modules
# (native modules like canvas are already built in the builder stage with
# the required build deps installed)
COPY --from=builder /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy essential runtime files
COPY --from=builder /app/shared ./shared

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership to non-root user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 5000

# Health check using existing compliance health endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/compliance/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "dist/index.js"]