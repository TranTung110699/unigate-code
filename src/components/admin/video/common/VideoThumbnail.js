import React from 'react';
import withDefaultVideoProviderConfig from 'components/admin/video/common/withDefaultVideoProviderConfig';
import getActualVideoToPlay from 'components/admin/video/common/getActualVideoToPlay';
import { getYoutubeVideoThumbnailUsingAPI } from 'schema-form/elements/social-video-input/VideoInfo';
import Img from 'components/common/img';
import lodashGet from 'lodash.get';

let VideoThumbnail = ({ className, alt, video, defaultVideoProvider }) => {
  const cssClass = 'elearning-video-thumbnail';

  const [thumbnailUrl, setThumbnailUrl] = React.useState();

  const videoToPlayInfo = getActualVideoToPlay({ video, defaultVideoProvider });
  const { youtubeId, vimeoId, url, selectedProvider } = videoToPlayInfo || {};

  React.useEffect(
    () => {
      if (selectedProvider === 'youtube') {
        // we try to get the smallest image possible except the default because it is too small
        const imageQualityOrderToTry = [
          'medium',
          'high',
          'standard',
          'maxres',
          'default',
        ];

        getYoutubeVideoThumbnailUsingAPI([youtubeId], (thumbnails) => {
          const imageQualityToGet = imageQualityOrderToTry.find((quality) =>
            lodashGet(thumbnails, [youtubeId, quality, 'url']),
          );
          setThumbnailUrl(
            lodashGet(thumbnails, [youtubeId, imageQualityToGet, 'url']),
          );
        });
      }
    },
    [selectedProvider, youtubeId],
  );

  if (!videoToPlayInfo) {
    return null;
  }

  return (
    <Img className={`${className} ${cssClass}`} src={thumbnailUrl} alt={alt} />
  );
};

export default withDefaultVideoProviderConfig({})(VideoThumbnail);
