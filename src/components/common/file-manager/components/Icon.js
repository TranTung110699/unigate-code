import React from 'react';
import PropTypes from 'prop-types';
import MimeTypeIcon from './MimeTypeIcon';
import IconCommon from 'components/common/Icon';

class Icon extends React.PureComponent {
  render() {
    const { className, item } = this.props;
    const componentClassName = `${className || ''}`;

    if (item && item.type === 'directory') {
      return <IconCommon icon="ti-folder" className={componentClassName} />;
    }
    if (item && item.mime_type === 'application/pdf') {
      return <IconCommon icon="file-pdf" className={componentClassName} />;
    }
    return (
      <MimeTypeIcon
        mimeType={item && item.mime_type}
        className={componentClassName}
      />
    );
  }
}

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
