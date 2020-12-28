import React from 'react';
import { downloadFileFromUrl } from 'common/utils/File';

const DownloadLinkWrapper = ({ link, fileName, renderComponent }) => {
  const handleClick = React.useCallback(
    (event) => {
      downloadFileFromUrl({
        downloadUrl: link,
        fileName: fileName,
      });
      event.preventDefault();
      event.stopPropagation();
    },
    [link, fileName],
  );

  return renderComponent({ href: link, onClick: handleClick });
};

export default DownloadLinkWrapper;
