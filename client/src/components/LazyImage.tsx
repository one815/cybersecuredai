import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallback?: React.ReactNode;
  placeholder?: string;
  width?: number;
  height?: number;
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  style,
  loading = 'lazy',
  onLoad,
  onError,
  fallback,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OTk5OSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  width,
  height
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(loading === 'eager' ? src : placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    
    if (loading === 'lazy' && imgRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              if (observer) {
                observer.disconnect();
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(imgRef.current);
    } else if (loading === 'eager') {
      setImageSrc(src);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, loading]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  if (imageError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        transition: 'opacity 0.3s ease',
        opacity: imageLoaded && imageSrc !== placeholder ? 1 : 0.7
      }}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      loading={loading}
      data-testid="lazy-image"
    />
  );
}

// Corrected approach using import.meta.glob for proper lazy loading
const imageLoaders: Record<string, () => Promise<string>> = import.meta.glob('/attached_assets/**/*.{jpg,jpeg,png}', { 
  eager: false,
  query: '?url',
  import: 'default'
});

// Function to normalize @assets paths to actual file paths
function normalizePath(imagePath: string): string {
  return imagePath.replace(/^@assets\//, '/attached_assets/');
}

// Hook for dynamic image imports using proper Vite approach
export function useImageImport(imagePath: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Normalize @assets path to actual file path
        const key = normalizePath(imagePath);
        
        // Find the corresponding loader function
        const loader = imageLoaders[key];
        
        if (!loader) {
          throw new Error(`Image not found: ${key}`);
        }
        
        // Load the image URL
        const url = await loader();
        
        if (isMounted) {
          setImageUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load image'));
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [imagePath]);

  return { imageUrl, isLoading, error };
}

// Component that combines both lazy loading and dynamic imports
interface DynamicLazyImageProps extends Omit<LazyImageProps, 'src'> {
  imagePath: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export function DynamicLazyImage({ 
  imagePath, 
  alt, 
  className,
  style,
  loading = 'lazy',
  loadingComponent,
  errorComponent,
  width,
  height,
  ...props 
}: DynamicLazyImageProps) {
  const { imageUrl, isLoading, error } = useImageImport(imagePath);

  if (isLoading && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  if (error && errorComponent) {
    return <>{errorComponent}</>;
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <LazyImage
      src={imageUrl}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      width={width}
      height={height}
      {...props}
    />
  );
}