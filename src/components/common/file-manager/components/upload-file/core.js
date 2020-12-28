import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'components/common/mui/FlatButton';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
`;

const CustomFlatButton = styled(FlatButton)`
  min-width: 0 !important;
`;

class UploadButton extends React.PureComponent {
  render() {
    const { className, onChange, value, multiple, ...rest } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const Component = this.props.Component || CustomFlatButton;
    let accept = this.props.fileTypes || '';

    if (Array.isArray(accept)) {
      accept = accept.join();
    }

    return (
      <Component containerElement="label" {...rest}>
        <HiddenInput
          type="file"
          accept={accept}
          className={componentClassName}
          value={value}
          multiple={multiple}
          onChange={onChange}
        />
      </Component>
    );
  }
}

UploadButton.propTypes = {
  className: PropTypes.string,
};

UploadButton.defaultProps = {
  className: '',
};

export default UploadButton;
