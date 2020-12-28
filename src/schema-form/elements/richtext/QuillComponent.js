import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/react-quill.min';
import { ImageResize } from './lib/ImageResize.js';
import CustomToolbar from './CustomToolbar';
import './stylesheet.scss';
import Help from '../Help';

Quill.register('modules/imageResize', ImageResize);

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'direction',
  'color',
  'background',
  'font',
  'align',
  'clean',
];

export default class QuillComponent extends React.Component {
  spanStyle = { color: 'rgba(0, 0, 0, 0.8)' };

  constructor(props) {
    super(props);
    this.randomId = `richtext-toolbar-${Math.floor(Math.random() * 1000000)}`;
    this.state = {
      value: '',
    };

    this.modules = {
      toolbar: {
        container: `#${this.randomId}`,
        handlers: {
          imageV1: this.handleImageV1,
          image: () => {},
        },
      },
      history: {
        delay: 10000,
        maxStack: 50,
        userOnly: false,
      },
      imageResize: {
        displaySize: true,
      },
    };
  }

  handleImageV1 = () => {
    const quill = this.quill;
    this.props.openMediaManagerDialog();
    this.props.pushQuillJSAction(quill);
  };

  onChange = (content, delta, source, editor) => {
    if (this.props.onChange) {
      const value = content === '<p><br></p>' ? '' : content;
      this.props.onChange(value);
    } else {
      this.setState({
        value: content,
      });
    }
  };

  handleImageSelect = (url) => {
    const quill = this.quill.editor;
    const range = quill.selection;
    const value = url;
    quill.insertEmbed(range.index, 'image', value, 'user');
  };

  render() {
    const { value, floatingLabelText, guide, meta } = this.props;
    let selectorId = this.props.selectorId ? this.props.selectorId : 'quill';
    let className = this.props.className ? this.props.className : '';
    className += selectorId;
    selectorId = `.${selectorId}`;

    return (
      <div>
        <span style={this.spanStyle}>
          {floatingLabelText} <Help guide={guide} />
        </span>
        {meta && meta.touched && meta.error && (
          <div className="form-validate-error">{meta.error}</div>
        )}
        <CustomToolbar
          id={this.randomId}
          onImageSelect={this.handleImageSelect}
        />
        <ReactQuill
          ref={(el) => {
            this.quill = el;
          }}
          value={typeof value !== 'undefined' ? value : this.state.value}
          theme="snow"
          modules={this.modules}
          formats={formats}
          onChange={this.onChange}
          bounds={selectorId}
          className={className}
          readOnly={this.props.readOnly}
        />
      </div>
    );
  }
}
