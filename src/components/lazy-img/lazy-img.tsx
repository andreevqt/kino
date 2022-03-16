import React, { useEffect, useRef } from 'react';
import LazyLoad from 'vanilla-lazyload';

if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  });
}

type TLazyImgProps = {
  alt: string;
  src: string;
  srcset?: string;
  sizes?: string;
  width?: string;
  height?: string;
  className?: string;
  onLoad?: () => void;
  placeholder?: {
    width: number;
    height: number;
  };
  style?: any;
};

const LazyImg: React.FC<TLazyImgProps> = ({
  alt,
  src,
  srcset,
  sizes,
  width,
  height,
  className = "",
  placeholder = { width: 185, height: 274 },
  onLoad = () => null,
  style = {},
}) => {
  const el = useRef<HTMLImageElement>(null);

  useEffect(() => {
    document.lazyLoadInstance.update();

    if (el.current) {
      el.current.addEventListener('load', onLoad);
    }

    return () => {
      if (el.current) {
        el.current.removeEventListener('load', onLoad);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      document.lazyLoadInstance.update();
    }
  });

  const svgPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${placeholder.width}' height='${placeholder.height}' fill='%231f2125'%3E%3Crect x='0' y='0' width='100%25' height='100%25'/%3E%3C/svg%3E`;

  return (
    <img
      ref={el}
      alt={alt}
      src={svgPlaceholder}
      data-src={src}
      data-srcset={srcset}
      data-sizes={sizes}
      width={width}
      height={height}
      className={`lazy ${className}`}
      style={style}
    />
  );
};

export default LazyImg;
