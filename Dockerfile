# Multi-stage build to reduce final image size
# Stage 1: Build stage with all dependencies
FROM node:18-alpine AS builder

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

# Install ALL dependencies for building (including devDependencies)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage with minimal dependencies
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

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

# Install ONLY production dependencies
RUN npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/cache/apk/* ~/.npm

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

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "dist/index.js"]