import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images from './Images.ts';

const PhotoGallery = () => {
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: 'min(32vw, 190px)',
    height: 'min(32vw, 190px)',
  };

  return (
    <Gallery
      options={{
        zoom: false,
        counter: true,
        arrowKeys: false,
        loop: true,
        close: true,
        preload: [1, 1],
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, min(32vw, 190px))',
          gridGap: 'min(8px, 1vw)',
          pointerEvents: 'auto',
        }}
      >
        {images.map((image, index) => {
          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.thumbnail}
              width={image.width}
              height={image.height}
            >
              {({ ref, open }) => (
                <img
                  loading="lazy"
                  style={smallItemStyles}
                  alt={image.alt}
                  src={image.thumbnail}
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;
