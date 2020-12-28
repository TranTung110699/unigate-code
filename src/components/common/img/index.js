import React from 'react';

/**
 * the default html img tag with some extra props
 *
 * @param src
 * @param alt
 * @param altSrc the alternative src to fallback to if fail to load
 *
 * @return {*}
 * @constructor
 */
const Img = ({ className, src, alt, altSrc }) => {
  const [usedSrc, setUsedSrc] = React.useState();

  React.useEffect(
    () => {
      setUsedSrc(src);
    },
    [src],
  );

  const handleImgError = React.useCallback(
    () => {
      setUsedSrc(altSrc);
    },
    [altSrc],
  );

  return (
    <img
      className={className}
      src={usedSrc}
      alt={alt}
      onError={handleImgError}
    />
  );
};

export default Img;
