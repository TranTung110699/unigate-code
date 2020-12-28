import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Audio from 'components/common/media-player/audio';
import CheckBox from 'material-ui/Checkbox';
import TextField from 'schema-form/elements/ant-input';
import lodashGet from 'lodash.get';
import {
  pushToSet,
  remove,
  removeByCondition,
  shuffleArray,
  updateMultipleElement,
} from 'common/utils/Array';

import './stylesheet.scss';
import DisplayHtml from 'components/common/html';
import isEqual from 'lodash.isequal';
import * as PropTypes from 'prop-types';

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

const cssClass = 'mc-text-question';

const OpenEndedAnswer = ({ title, index, onChange, value }) => {
  const handleContentChange = React.useCallback(
    (content) => {
      if (typeof onChange === 'function') {
        onChange({ content }, index);
      }
    },
    [onChange, index],
  );

  return (
    <div>
      <div>{title}</div>
      <TextField
        fullWidth
        multiLine
        onChange={handleContentChange}
        value={lodashGet(value, 'content')}
      />
    </div>
  );
};

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

  shuffleAnswers = () => {
    const { data, options } = this.props;
    this.setState({
      optionsRender: shuffleArray(options || data),
    });
  };

  setIndexes = () => {
    const { value, data, options } = this.props;
    const { optionsRender } = this.state;
    const indexesSelected = lodashGet(value, 'selectedIndexes', []);
    let index;
    if (indexesSelected) {
      if (Array.isArray(indexesSelected) && indexesSelected.length > 0) {
        index = indexesSelected[0];
      } else {
        index = indexesSelected;
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

  handleChange = ({
    selectedIndexes: newSelectedIndexes,
    openEndedAnswers: newOpenEndedAnswers,
  }) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange({
        selectedIndexes: newSelectedIndexes,
        openEndedAnswers: newOpenEndedAnswers,
      });
    }
  };

  handleRadioSelect = (event, index) => {
    const { options, data } = this.props || {};
    const { optionsRender } = this.state;
    const itemIndex = (options || data).findIndex(
      (item) => item.text === lodashGet(optionsRender, `${index}.text`),
    );
    this.handleChange({ selectedIndexes: [itemIndex] });
  };

  handleCheckboxesSelect = (indexes) => {
    const { openEndedAnswers } = this.props.value || {};
    this.handleChange({
      selectedIndexes: indexes,
      openEndedAnswers,
    });
  };

  handleOpenEndedAnswerChange = ({ content }, answerIndex) => {
    const { selectedIndexes } = this.state;
    const { openEndedAnswers } = this.props.value || {};

    if (content) {
      this.handleChange({
        selectedIndexes: pushToSet(selectedIndexes, answerIndex),
        openEndedAnswers: updateMultipleElement(
          openEndedAnswers,
          this.getCallBackToFindOpenEndedAnswerOfIndex(answerIndex),
          (ans) => ({
            answer_index: answerIndex,
            content,
          }),
          true,
        ),
      });
    } else {
      this.handleChange({
        selectedIndexes: remove(selectedIndexes, answerIndex),
        openEndedAnswers: removeByCondition(
          openEndedAnswers,
          this.getCallBackToFindOpenEndedAnswerOfIndex(answerIndex),
        ),
      });
    }
  };

  getCallBackToFindOpenEndedAnswerOfIndex = (answerIndex) => (ans) =>
    lodashGet(ans, 'answer_index') == answerIndex;

  render() {
    let {
      meta,
      vertical,
      data,
      valueKey,
      id,
      getHighlightsClass,
      getValueOfItem,
      disabled,
      value,
      multiple,
      withAudio,
      options,
      hintText,
    } = this.props;
    const { openEndedAnswers } = value || {};

    const directionClass = vertical ? 'direction-column' : 'direction-row';
    options = options || data;
    const { optionsRender, selectedIndexes } = this.state;

    return (
      <div className={cssClass}>
        {hintText}
        {meta && meta.touched && meta.error && (
          <div style={styles.error}>{meta.error}</div>
        )}
        {multiple && (
          <div className={`display-panel ${directionClass}`}>
            {options &&
              options.map((item, index) => {
                const key = index;
                const title = lodashGet(item, 'text');
                const description = lodashGet(item, 'description');

                const isOpenEndedAnswer = lodashGet(
                  item,
                  'is_open_ended_answer',
                );

                if (isOpenEndedAnswer) {
                  return (
                    <OpenEndedAnswer
                      title={title}
                      index={index}
                      onChange={this.handleOpenEndedAnswerChange}
                      value={(openEndedAnswers || []).find(
                        this.getCallBackToFindOpenEndedAnswerOfIndex(index),
                      )}
                    />
                  );
                }

                return (
                  <React.Fragment>
                    <CheckBox
                      key={key}
                      checked={
                        selectedIndexes &&
                        Array.isArray(selectedIndexes) &&
                        selectedIndexes.includes(index)
                      }
                      iconStyle={styles.icon}
                      style={styles.checkBox}
                      onCheck={(event, isChecked) => {
                        let newIndexes = [];
                        if (isChecked) {
                          newIndexes = (selectedIndexes &&
                            Array.isArray(selectedIndexes) &&
                            selectedIndexes.concat([index])) || [index];
                        } else {
                          newIndexes = selectedIndexes.filter(
                            (v) => v !== index,
                          );
                        }

                        this.handleCheckboxesSelect(newIndexes);
                      }}
                      disabled={disabled}
                      className={getHighlightsClass(
                        getValueOfItem(item, index, valueKey),
                      )}
                      value={index}
                      label={[
                        title,
                        withAudio && (
                          <Audio
                            controllable
                            playerId={`${id}-audio-${index}`}
                            style={{
                              zIndex: 2,
                              position: 'relative',
                            }}
                            src={item.audio}
                          />
                        ),
                      ]}
                    />
                    {description ? (
                      <DisplayHtml
                        content={description}
                        style={{
                          border: 'solid 1px',
                          padding: '15px 40px',
                          margin: '0 0 30px 0',
                        }}
                      />
                    ) : null}
                  </React.Fragment>
                );
              })}
          </div>
        )}
        {!multiple &&
          (() => {
            const valueSelected =
              selectedIndexes &&
              Array.isArray(selectedIndexes) &&
              selectedIndexes[0];

            return (
              <RadioButtonGroup
                name={id}
                className={`display-panel ${directionClass}`}
                onChange={this.handleRadioSelect}
                valueSelected={valueSelected}
              >
                {optionsRender &&
                  optionsRender.map((item, index) => {
                    const itemIndex = (options || data).findIndex(
                      (item) =>
                        item.text === lodashGet(optionsRender, `${index}.text`),
                    );

                    return (
                      <RadioButton
                        iconStyle={styles.icon}
                        disabled={disabled}
                        key={index}
                        className={`${cssClass}__radio-answer ${
                          valueSelected === index
                            ? `${cssClass}__radio-answer--selected`
                            : ''
                        } ${getHighlightsClass(
                          getValueOfItem(item, itemIndex, valueKey),
                        )}`}
                        value={index}
                        label={[
                          lodashGet(item, 'text'),
                          withAudio && (
                            <Audio
                              controllable
                              playerId={`${id}-audio-${itemIndex}`}
                              style={{
                                zIndex: 2,
                                position: 'relative',
                              }}
                              src={item.audio}
                            />
                          ),
                        ]}
                        style={styles.radioButton}
                      />
                    );
                  })}
              </RadioButtonGroup>
            );
          })()}
      </div>
    );
  }
}

SelectText.propTypes = {
  meta: PropTypes.any,
  vertical: PropTypes.any,
  data: PropTypes.any,
  valueKey: PropTypes.any,
  id: PropTypes.any,
  getHighlightsClass: PropTypes.any,
  getValueOfItem: PropTypes.any,
  disabled: PropTypes.any,
  value: PropTypes.shape({}),
  multiple: PropTypes.any,
  withAudio: PropTypes.any,
  onChange: PropTypes.any,
  options: PropTypes.any,
  hintText: PropTypes.any,
};

SelectText.defaultProps = { value: {} };

export default SelectText;
