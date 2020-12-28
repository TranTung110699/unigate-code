import React from 'react';
import Tag from 'antd/lib/tag';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import { t1 } from 'translate';
import './stylesheet.scss';
import Tooltip from 'antd/lib/tooltip';
import { elementDisplayModes } from 'schema-form/constants';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';

const InputTagInRecapMode = ({ value, label }) => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return <DefaultFormElementRecap label={label} content={value.join(', ')} />;
};

class InputTagInDefaultMode extends React.Component {
  state = {
    showNewTag: false,
    newTag: '',
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  saveInputRef = (input) => (this.input = input);

  showInput = () => {
    this.setState(
      {
        showNewTag: true,
      },
      () => this.input.focus(),
    );
  };

  handleInputChange = (event) => {
    this.setState({
      newTag: event.target.value,
    });
  };

  handleInputConfirm = (event) => {
    event.preventDefault();
    let { value } = this.props;
    const { newTag } = this.state;
    if (newTag && value.indexOf(newTag) === -1) {
      value = [...value, newTag];
    }
    this.handleChange(value);
    this.setState({
      newTag: '',
    });
  };

  removeTag = (removedTag) => {
    const { value } = this.props;
    let newValue;
    newValue = value.filter((tag) => tag !== removedTag);
    this.handleChange(newValue);
  };

  render() {
    const { showNewTag, newTag } = this.state;
    const {
      value: tags,
      label,
      classWrapper,
      readOnly,
      errorText,
    } = this.props;

    return (
      <div className={`${classWrapper} input-tag-wrapper`}>
        <span className="tag-label">{label}</span>
        <div className="tag-container">
          {tags &&
            tags.map((tag) => {
              const isLongTag = tag.length > 30;
              const tagElement = (
                <Tag
                  key={tag}
                  closable={true}
                  onClose={() => this.removeTag(tag)}
                  className="tag-item"
                >
                  {isLongTag ? `${tag.slice(0, 30)}...` : tag}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElement}
                </Tooltip>
              ) : (
                tagElement
              );
            })}
          {showNewTag ? (
            <Tooltip
              trigger={['focus']}
              title={t1('enter_to_create_a_new_tag')}
              placement="bottomLeft"
            >
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={newTag}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            </Tooltip>
          ) : (
            <Tag
              onClick={this.showInput}
              className={`new-tag ${readOnly ? 'new-tag-disable' : ''}`}
            >
              <Icon type="plus" /> {t1('new_tag')}
            </Tag>
          )}
        </div>
        {errorText && <span className="tag-error">{errorText}</span>}
      </div>
    );
  }
}

class InputTag extends React.Component {
  componentDidMount() {
    const { defaultValue } = this.props;
    this.handleChange(defaultValue);
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const {
      value,
      errorText,
      readOnly,
      classWrapper,
      floatingLabelText,
      elementDisplayMode,
    } = this.props;

    switch (elementDisplayMode) {
      case elementDisplayModes.RECAP: {
        return <InputTagInRecapMode value={value} label={floatingLabelText} />;
      }
      default: {
        return (
          <InputTagInDefaultMode
            onChange={this.handleChange}
            value={value}
            label={floatingLabelText}
            classWrapper={classWrapper}
            readOnly={readOnly}
            errorText={errorText}
          />
        );
      }
    }
  }
}

export default makeReduxFormCompatible({})(InputTag);
