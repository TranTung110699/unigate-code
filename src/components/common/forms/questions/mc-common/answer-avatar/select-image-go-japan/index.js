import PropTypes from 'prop-types';
import React from 'react';
import Audio from 'components/common/media-player/audio';
import CheckBox from 'material-ui/Checkbox';
import lodashGet from 'lodash.get';

import './stylesheet.scss';
import { shuffleArray } from 'common/utils/Array';
import isEqual from 'lodash.isequal';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  checkBox: {
    marginBottom: 16,
  },
  icon: {
    fill: '#427bc9',
  },
  error: { color: 'red' },
};

const cssClass = 'go-japan-avatar-question';

class SelectText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsRender: [],
      selectedIndexes: [],
    };
  }

  componentWillMount() {
    this.shuffleAnswers();
  }

  componentDidMount() {
    this.setIndexes();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { value, id } = this.props;
    if (prevProps.id !== id) {
      this.shuffleAnswers();
    }

    if (!isEqual(prevProps.value, value)) {
      this.setIndexes();
    }
  }

  setIndexes = () => {
    const { value, data, options } = this.props;
    const { optionsRender } = this.state;
    let index;
    if (value) {
      if (Array.isArray(value) && value.length > 0) {
        index = value[0];
      } else {
        index = value;
      }
    }
    const itemIndex = optionsRender.findIndex(
      (item) => item.text === lodashGet(options || data, `${index}.text`),
    );

    if (itemIndex >= 0) {
      this.setState({
        selectedIndexes: [itemIndex],
      });
    }
  };

  shuffleAnswers = () => {
    const { data, options } = this.props;
    this.setState({
      optionsRender: shuffleArray(options || data),
    });
  };

  handleChange = (indexes) => {
    const { options, data, onChange } = this.props || {};
    const { optionsRender } = this.state;
    const itemIndex = (options || data).findIndex(
      (item) => item.text === lodashGet(optionsRender, `${indexes[0]}.text`),
    );
    if (typeof onChange === 'function') {
      onChange([itemIndex]);
    }
  };

  handleCheckboxesSelect = (indexes) => {
    this.handleChange(indexes);
  };

  render() {
    const {
      meta,
      valueKey,
      id,
      getHighlightsClass,
      getValueOfItem,
      disabled,
      withAudio,
      hintText,
      options,
      data,
    } = this.props;
    const { optionsRender, selectedIndexes } = this.state;

    return (
      <div className={cssClass}>
        {hintText}
        {meta && meta.touched && meta.error && (
          <div style={styles.error}>{meta.error}</div>
        )}
        {
          <div className={`${cssClass}__answers`}>
            {optionsRender &&
              optionsRender.map((item, index) => {
                const key = index;
                const title = lodashGet(item, 'text');

                const isChecked =
                  selectedIndexes &&
                  Array.isArray(selectedIndexes) &&
                  selectedIndexes.includes(index);

                const onCheck = () => {
                  if (disabled) {
                    return;
                  }

                  let newIndexes = [];
                  if (!isChecked) {
                    newIndexes = [index];
                  } else {
                    newIndexes = selectedIndexes.filter((v) => v !== index);
                  }

                  this.handleCheckboxesSelect(newIndexes);
                };
                const itemIndex = (options || data).findIndex(
                  (item) =>
                    item.text === lodashGet(optionsRender, `${index}.text`),
                );
                return (
                  <div className={`${cssClass}__answer`}>
                    <img
                      src={lodashGet(item, 'avatar')}
                      className={`${cssClass}__answer-image ${getHighlightsClass(
                        getValueOfItem(item, itemIndex, valueKey),
                      )} ${
                        isChecked ? `${cssClass}__answer-image--selected` : ''
                      }`}
                      onClick={onCheck}
                    />
                    <div className={`${cssClass}__answer-checkbox-wrapper`}>
                      <CheckBox
                        checkedIcon={<span />}
                        uncheckedIcon={<span />}
                        key={key}
                        checked={isChecked}
                        iconStyle={styles.icon}
                        style={styles.checkBox}
                        onCheck={onCheck}
                        disabled={disabled}
                        className={`${cssClass}__answer-checkbox ${
                          isChecked
                            ? `${cssClass}__answer-checkbox--selected`
                            : ''
                        } ${getHighlightsClass(
                          getValueOfItem(item, itemIndex, valueKey),
                        )}`}
                        value={index}
                        label={[
                          <div
                            className={`${cssClass}__answer-text ${
                              isChecked
                                ? `${cssClass}__answer-text--selected`
                                : ''
                            } ${getHighlightsClass(
                              getValueOfItem(item, itemIndex, valueKey),
                            )}`}
                          >
                            {title}
                          </div>,
                          withAudio && (
                            <Audio
                              controllable
                              playerId={`${id}-audio-${itemIndex}`}
                              style={{ zIndex: 2, position: 'relative' }}
                              src={item.audio}
                            />
                          ),
                        ]}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        }
      </div>
    );
  }
}

export default SelectText;

SelectText.propTypes = {
  data: PropTypes.any,
  disabled: PropTypes.any,
  getHighlightsClass: PropTypes.any,
  getValueOfItem: PropTypes.any,
  hintText: PropTypes.any,
  id: PropTypes.any,
  meta: PropTypes.any,
  options: PropTypes.any,
  value: PropTypes.array,
  valueKey: PropTypes.any,
  withAudio: PropTypes.any,
};

SelectText.defaultProps = {
  value: [],
};
