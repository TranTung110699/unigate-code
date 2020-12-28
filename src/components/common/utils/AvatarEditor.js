/**
 * Created by vohung on 12/05/2017.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Request from 'common/network/http/Request';
import RaisedButton from 'components/common/mui/RaisedButton';
import XSlider from 'schema-form/elements/slider/XSlider';
import { convertFromBase64ToFile } from 'common/utils/File';
import { t1 } from 'translate';
import './AvatarEditor.scss';
import apiUrls from 'api-endpoints';
import ReactAvatarEditor from 'react-avatar-editor';
import NewButton from 'components/common/primary-button';
import AntButton from 'antd/lib/button';

class AvatarEditor extends Component {
  inputStyle = { display: 'none' };
  spanStyle = { margin: 50 };
  textFieldStyle = { marginLeft: 15, marginRight: 15, maxWidth: 200 };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 500,
      height: 500,
      image: '',
    };
  }

  componentWillMount = () => {
    this.setState({
      image: this.props.image,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { image } = this.props;
    if (
      typeof nextProps !== 'undefined' &&
      typeof nextProps.image !== 'undefined' &&
      nextProps.image !== image
    ) {
      this.setState({
        image: nextProps.image,
      });
    }
  }

  handleSaveCompleteTheEdit = () => {
    if (this.state.preview) {
      const { options, params } = this.props;
      const d = new Date();
      const n = d.getTime();
      const fileName = options.fileName || n;
      const canvasData = this.editor
        .getImageScaledToCanvas()
        .toDataURL('image/png');
      const file = convertFromBase64ToFile(canvasData, `${fileName}.png`);
      const baseUrl = options.baseUrl || apiUrls.upload_avatar;
      Request.post(baseUrl, { ...params, files: [file] })
        .then((resp) => {
          if (
            resp.success &&
            resp.result &&
            resp.result.attachments &&
            resp.result.attachments.length
          ) {
            this.setState({
              edit: false,
              image: resp.result.attachments[0].link,
            });
            this.props.editorSuccess(resp.result.attachments[0]);
          } else {
            this.setState({
              image: this.props.image,
              edit: false,
            });
          }
        })
        .catch((err) => {
          this.setState({
            image: this.props.image,
            edit: false,
          });
        });
    }
  };

  handlePreviewImage = () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    const rect = this.editor.getCroppingRect();

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      },
    });
  };

  setWidthHeightBoxEditor = (image) => {
    let width = image.width;
    let height = image.height;
    height = width <= 500 ? height : Math.round((500 * height) / width);
    width = width <= 500 ? width : 500;
    this.setState({
      width,
      height,
    });
  };

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => {
        this.setWidthHeightBoxEditor(image);
      };
      image.src = reader.result;
      this.setState({
        image: image.src,
        edit: true,
      });
    };

    reader.readAsDataURL(file);
  }

  handleSliderZoom = (event, value) => {
    const scale = parseFloat(value);
    this.setState({ scale });
    this.handlePreviewImage();
  };

  handleRotateLeft = (e) => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate - 90,
    });
  };

  handleRotateRight = (e) => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate + 90,
    });
  };

  handleBorderRadius = (event, value) => {
    const borderRadius = parseInt(value, 10);
    this.setState({ borderRadius });
    this.handlePreviewImage();
  };

  handleXPosition = (e) => {
    const x = parseFloat(e.target.value);
    this.setState({ position: { ...this.state.position, x } });
    this.handlePreviewImage();
  };

  handleYPosition = (e) => {
    const y = parseFloat(e.target.value);
    this.setState({ position: { ...this.state.position, y } });
    this.handlePreviewImage();
  };

  handleWidth = (e) => {
    const width = parseInt(e.target.value, 10);
    this.setState({ width });
    this.handlePreviewImage();
  };

  handleHeight = (e) => {
    const height = parseInt(e.target.value, 10);
    this.setState({ height });
    this.handlePreviewImage();
  };

  logCallback(e) {
    if (e === 'onLoadSuccess') {
      this.handlePreviewImage();
    }
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  };

  handlePositionChange = (position) => {
    this.setState({ position });
    this.handlePreviewImage();
  };

  openFileDialog = () => {
    const fileInputDom = ReactDOM.findDOMNode(this.refs.fileinput);
    if (fileInputDom) fileInputDom.click();
  };

  renderInputFile = () => {
    return this.props.userAvatar ? (
      <>
        <RaisedButton
          label={this.state.edit ? t1('upload') : t1('update')}
          labelPosition="after"
          className={`update-avatar-btn mui-button ${
            !this.state.edit ? 'mui-button--primary' : ''
          } `}
          primary={!this.state.edit}
          icon={this.state.edit ? 'upload' : 'picture'}
          onClick={() => this.openFileDialog()}
        />
        <input
          type="file"
          ref="fileinput"
          style={this.inputStyle}
          accept="image/*"
          onChange={(e) => this.handleImageChange(e)}
        />
      </>
    ) : (
      <>
        <NewButton
          label={this.state.edit ? t1('upload') : t1('update')}
          labelPosition="after"
          className={`update-avatar-btn mui-button ${
            !this.state.edit ? 'mui-button--primary' : ''
          }`}
          primary={!this.state.edit}
          icon={this.state.edit ? 'upload' : 'picture'}
          onClick={() => this.openFileDialog()}
        />
        <input
          type="file"
          ref="fileinput"
          style={this.inputStyle}
          accept="image/*"
          onChange={(e) => this.handleImageChange(e)}
        />
      </>
    );
  };

  render() {
    const { image, edit } = this.state;
    const { readOnly } = this.props;
    let showImage = image;
    if (!/^((http|https|ftp):\/\/)/.test(showImage)) {
      showImage = window.APP_STATIC_CDN + showImage;
    }

    if (!edit) {
      return (
        <div ref="componentPanel">
          <div className="row displayed-avatar-wrapper m-b-10">
            <div className="col-md-12">
              {image ? (
                <img src={showImage} alt="" />
              ) : (
                t1('there_are_no_avatar_yet')
              )}
            </div>
          </div>
          {!readOnly && (
            <span style={this.spanStyle}>{this.renderInputFile()}</span>
          )}
        </div>
      );
    }
    return (
      <div className="row edit-avatar-wrapper">
        <div
          className="avatar-editor-box"
          style={{ float: 'left', width: this.state.width + 60 }}
        >
          <div className="avatar-editor-action">
            <TextField
              name="width"
              type="number"
              fullWidth
              floatingLabelText={t1('avatar_width')}
              hintText={t1('avatar_width')}
              onChange={this.handleWidth}
              value={this.state.width}
              style={this.textFieldStyle}
              step={10}
            />
            <TextField
              name="height"
              type="number"
              floatingLabelText={t1('avatar_height')}
              hintText={t1('avatar_height')}
              fullWidth
              onChange={this.handleHeight}
              value={this.state.height}
              style={this.textFieldStyle}
              step={10}
            />
            <XSlider
              label={t1('zoom')}
              min={1}
              max={3}
              step={0.1}
              value={this.state.scale}
              onChange={this.handleSliderZoom}
            />
            <XSlider
              label={t1('border_radius')}
              min={0}
              max={
                this.state.width > this.state.height
                  ? this.state.height / 2
                  : this.state.width / 2
              }
              onChange={this.handleBorderRadius}
            />
          </div>
        </div>
        <div
          className="text-center avatar-editor-box"
          style={{ width: this.state.width + 60 }}
        >
          <div className="text-center">
            <ReactAvatarEditor
              ref={this.setEditorRef}
              scale={parseFloat(this.state.scale)}
              width={this.state.width}
              height={this.state.height}
              position={this.state.position}
              onPositionChange={this.handlePositionChange}
              rotate={parseFloat(this.state.rotate)}
              borderRadius={this.state.borderRadius}
              onSave={this.handlePreviewImage}
              onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
              onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
              onImageReady={this.logCallback.bind(this, 'onImageReady')}
              onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
              onDropFile={this.logCallback.bind(this, 'onDropFile')}
              image={image}
            />
          </div>
          <AntButton.Group className="text-center">
            <RaisedButton
              title={t1('rotate_left')}
              icon="undo"
              onClick={this.handleRotateLeft}
            />
            <RaisedButton
              title={t1('rotate_right')}
              icon="redo"
              onClick={this.handleRotateRight}
            />
            {this.renderInputFile()}
            <RaisedButton
              label={t1('save')}
              icon="save"
              onClick={() => this.handleSaveCompleteTheEdit()}
            />
          </AntButton.Group>
        </div>
      </div>
    );
  }
}

AvatarEditor.propTypes = {
  editorSuccess: PropTypes.func.isRequired,
  image: PropTypes.string,
};

AvatarEditor.defaultProps = {
  params: null,
  image: '',
  editorSuccess: () => {},
};

export default AvatarEditor;
