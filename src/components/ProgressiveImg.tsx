import { useState, useEffect } from 'react';

const ProgressiveImg = ({ placeholderSrc, src, ...props }: any) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      console.log('----onload');
    };
  }, [src]);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? 'loading' : 'loaded';

  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ''}
      className={`image ${customClass}`}
    />
  );
};
export default ProgressiveImg;
