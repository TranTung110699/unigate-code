import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import FileManagerPopupButton from 'components/common/file-manager/FileManagerPopupButton';
import { openMediaManagerDialog } from 'components/media/actions';
import InputFileWithPreview from './WithPreview';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import './stylesheet.scss';
import get from 'lodash.get';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 25/04/2017
 * */
class InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  componentWillMount() {
    const { input } = this.props;
    const value =
      (input && input.value) || this.props.value || this.props.defaultValue;
    this.setValue(value);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const input = get(this.props, 'input', {});
    const prevInput = get(prevProps, 'input', {});

    if (input.value && prevInput.value !== input.value) {
      this.setValue(input.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.input &&
      this.props.input.value &&
      (!nextProps.input || !nextProps.input.value)
    ) {
      this.setValue(null);
    } else if (nextProps.input && nextProps.input.value && !this.state.value) {
      this.setValue(nextProps.input.value);
    }
  }

  setValue = (fileUrl) => {
    const { dispatch, onChange, input } = this.props;
    this.setState({ value: fileUrl });

    if (input) {
      input.onChange(fileUrl);
    }
    if (onChange) {
      onChange(fileUrl);
    }

    dispatch(openMediaManagerDialog(false));
  };

  textFieldStyle = {
    paddingRight: 60,
  };

  render() {
    let {
      className,
      hintText,
      style,
      preview,
      fileType,
      renderAfter,
    } = this.props;
    className = className || '';
    className = `${className} ui-upload-media`;

    const elStyle = { cursor: 'pointer' };

    const newHintText = preview ? t1('edit_url') : hintText || t1('file_url');

    const floatingLabelText =
      this.props.floatingLabelText || hintText || t1('edit_url_manually');

    const textField = (
      <TextField
        value={this.state.value}
        onChange={(event, newValue) => {
          const value = event.target.value;
          this.setValue(value);
        }}
        style={this.textFieldStyle}
        hintText={newHintText}
        floatingLabelText={floatingLabelText}
        fullWidth
      />
    );

    // display the field with a file previewer
    if (preview) {
      return (
        <div style={elStyle}>
          <span>{hintText}</span>
          <InputFileWithPreview
            value={this.state.value}
            onSelect={this.setValue}
            {...this.props}
            textField={textField}
          />
        </div>
      );
    }

    // normal
    return (
      <div className={className} style={style}>
        {this.state.value && (
          <a href={this.state.value} download>
            <Icon
              style={this.props.iconStyle}
              icon="fileDownload"
              className="icon-download"
            />
          </a>
        )}

        <FileManagerPopupButton
          onSelect={this.setValue}
          Component={(props) => (
            <Icon
              {...props}
              style={this.props.iconStyle}
              icon="fileUpload"
              className="icon-upload"
            />
          )}
          {...this.props}
        />
        {textField}
        {renderAfter && typeof renderAfter === 'function' && renderAfter()}
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  target: state.mm.target,
});

export default connect(mapStateToProp)(InputFile);
