import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';
import images from './Images.ts';

const PhotoGallery = () => {
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'cover',
    width: '100%',
    aspectRatio: '3/4',
    pointerEvents: 'auto',
  };

  return (
    <Gallery
      options={{
        zoom: false,
        counter: false,
        arrowKeys: true,
        loop: true,
        clickToCloseNonZoomable: true,
        bgClickAction: 'close',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 32.7%)',
          gridGap: '1%',
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
                  style={smallItemStyles}
                  alt={image.alt}
                  src={image.source}
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
