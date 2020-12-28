import React from 'react';
import FileManagerPopupButton from 'components/common/file-manager/FileManagerPopupButton';
import FilePreviewer from './Previewer';
import Icon from 'components/common/Icon';
import { t1 } from '../../../translate';

class InputFileWithPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPath: false,
    };
  }

  render() {
    return (
      <div>
        <FileManagerPopupButton
          onSelect={this.props.onSelect}
          Component={(props) => (
            <FilePreviewer
              value={this.props.value}
              fileType={this.props.fileType}
              defaultImageStyle={this.props.defaultImageStyle}
              imageStyle={this.props.imageStyle}
              {...props}
            />
          )}
          {...this.props}
        />
        {this.props.value && (
          <span
            className="text-muted"
            onClick={() => {
              this.props.onSelect('');
            }}
            title={t1('click_to_remove')}
          >
            {' '}
            <Icon icon="remove" />{' '}
          </span>
        )}

        <span>
          <span
            className="text-muted"
            onClick={() => {
              this.setState({ showPath: !this.state.showPath });
            }}
            title={t1('edit_url_in_a_form_field')}
          >
            <Icon icon="link" />
          </span>{' '}
          {this.state.showPath && this.props.textField}
        </span>
      </div>
    );
  }
}

export default InputFileWithPreview;
