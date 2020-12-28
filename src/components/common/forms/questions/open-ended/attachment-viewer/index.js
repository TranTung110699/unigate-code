import React from 'react';
import PdfViewer from './PdfViewer';
import VideoPlayer from 'components/common/media-player/video';
import { ListAttachmentsToDownloadAsTable } from 'components/common/attachment/DownloadAttachments';
import { t1 } from 'translate';

const isPicture = (fileExt) => ['png', 'jpg', 'jpeg', 'gif'].includes(fileExt);
const isPdf = (fileExt) => ['pdf'].includes(fileExt);
const isVideo = (ext) => ['mp4', 'avi', 'mkv'].includes(ext);

class AttachmentViewer extends React.Component {
  displayFile = (attachments, showHeader = true) => {
    let listFileCanDisplay = [];
    let listFile = [];

    if (attachments && attachments.length) {
      attachments.map((file) => {
        const ext = file.ext.toLowerCase();
        if (isPicture(ext) || isPdf(ext) || isVideo(ext)) {
          listFileCanDisplay.push(file);
        } else {
          listFile.push(file);
        }
      });
    }

    return (
      <React.Fragment>
        {listFileCanDisplay && listFileCanDisplay.length
          ? listFileCanDisplay.map((file) => {
              const ext = file.ext.toLowerCase();
              if (isPicture(ext)) {
                return (
                  <img
                    src={file.link}
                    style={{ width: '100%', height: 'auto' }}
                  />
                );
              } else if (isPdf(ext)) {
                return <PdfViewer link={file.link} />;
              } else if (isVideo(ext)) {
                return (
                  <VideoPlayer
                    controls
                    url={file.link}
                    autoPlay="true"
                    width="100%"
                  />
                );
              }
            })
          : null}
        {listFile && listFile.length
          ? [
              <h4 className="m-b-0 m-t-10">{t1('list_of_files_submitted')}</h4>,
              <ListAttachmentsToDownloadAsTable attachments={listFile} />,
            ]
          : null}
      </React.Fragment>
    );
  };

  render() {
    const { attachments } = this.props;
    const styles = { border: '1px solid #eee' };

    return <div style={styles}>{this.displayFile(attachments)}</div>;
  }
}

export default AttachmentViewer;
