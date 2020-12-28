/**
 * Created by hungvo on 29/06/17.
 */
import React from 'react';
import Icon from 'components/common/Icon';

const simpleLink = (attachment, icon) => (
  <a href={attachment.link} target="_blank">
    <span style={{ fontSize: '60%' }}>
      <Icon icon={icon} />
    </span>{' '}
    {attachment.name}
  </a>
);

class AttachmentPreview extends React.Component {
  render() {
    const { attachment } = this.props;
    let content = '';

    if (['png', 'jpg', 'gif', 'jpeg'].indexOf(attachment.ext) !== -1) {
      content = simpleLink(attachment, 'image');
      /*
      content = (
        <Link to={attachment.link} target="_blank" >
          <img src={attachment.link} width="auto" height="auto" style={{ maxHeight: 200, maxWidth: 320 }} />
        </Link>
      );
      */
    } else if (['mp4'].indexOf(attachment.ext) !== -1) {
      content = (
        <video width="320" height="auto" controls src={attachment.link} />
      );
    } else if (['mp3', 'wav', 'aif', 'mid'].indexOf(attachment.ext) !== -1) {
      content = (
        <audio controls preload>
          <source src={attachment.link} />
        </audio>
      );
    } else {
      content = simpleLink(attachment);
    }
    return <div>{content}</div>;
  }
}

export default AttachmentPreview;
