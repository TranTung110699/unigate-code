import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import InputFile from 'schema-form/elements/redux-form-fields/InputFile';
import { convertBooleanValueToInt } from 'common/normalizers';
import { Element } from 'schema-form/elements';
import RTE from 'schema-form/elements/richtext';

const divStyle = { marginTop: 28 };
const textFieldStyle = { textIndent: 15 };

const Question = ({
  handleOnSelectAsAnswer,
  nameOfIsAnswerField,
  nameOfIsOpenEndedAnswerField,
  nameOfDescriptionField,
  defaultValue = {},
  displayFields,
}) => {
  const hasField = (name) => {
    return !displayFields || displayFields.includes(name);
  };

  const hasIsAnswerField = hasField('is_answer');
  const hasValueField = hasField('value');
  const hasTextField = hasField('text');
  const hasAvatarField = hasField('avatar');
  const hasAudioField = hasField('audio');
  const hasIsOpenEndedAnswerField = hasField('is_open_ended_answer');
  const hasShortTextField = hasField('short_text');
  const hasDescriptionField = hasField('description');

  const [isAnswerColSize, valueColSize, avatarColSize, audioColSize] = [
    hasIsAnswerField ? 1 : 0,
    hasValueField ? 2 : 0,
    hasAvatarField ? 4 : 0,
    hasAudioField ? 2 : 0,
  ];

  const textColSize =
    12 - (isAnswerColSize + valueColSize + avatarColSize + audioColSize);

  return (
    <div>
      <div className="row" style={{ marginLeft: -10, marginRight: -10 }}>
        {hasIsAnswerField && (
          <div
            className={`col-md-${isAnswerColSize} col-lg-${isAnswerColSize} col-xs-${isAnswerColSize} col-sm-${isAnswerColSize} text-center`}
            style={divStyle}
          >
            <Checkbox
              name={nameOfIsAnswerField}
              onClick={() => handleOnSelectAsAnswer()}
              iconStyle={{ width: 'unset' }}
              style={{ minWidth: 24 }}
              normalize={convertBooleanValueToInt}
            />
          </div>
        )}
        {hasValueField && (
          <div
            className={`col-md-${valueColSize} col-lg-${valueColSize} col-xs-${valueColSize} col-sm-${valueColSize}`}
          >
            <TextField
              fullWidth
              style={textFieldStyle}
              hintText={`__${t1('value')}__`}
              floatingLabelText={t1('value')}
              type="number"
              name="value"
            />
          </div>
        )}
        {hasTextField && (
          <div
            className={`col-md-${textColSize} col-lg-${textColSize} col-xs-${textColSize} col-sm-${textColSize}`}
          >
            <TextField
              fullWidth
              style={textFieldStyle}
              hintText={`__${t1('template')}__`}
              floatingLabelText={t1('text')}
              name="text"
            />
          </div>
        )}
        {hasAvatarField && (
          <div
            className={`col-md-${avatarColSize} col-lg-${avatarColSize} col-xs-${avatarColSize} col-sm-${avatarColSize}`}
          >
            <InputFile
              defaultValue={defaultValue.avatar}
              name="avatar"
              hintText={t1('image')}
              accept="image/*"
              fileType="image"
              preview="1"
              defaultImageStyle="20px"
              imageStyle="100px"
            />
          </div>
        )}
        {hasAudioField && (
          <div
            className={`col-md-${audioColSize} col-lg-${audioColSize} col-xs-${audioColSize} col-sm-${audioColSize}`}
          >
            <InputFile
              defaultValue={defaultValue.audio}
              name="audio"
              hintText={t1('audio_file')}
              accept="audio/*"
              fileType="audio"
              preview="1"
              defaultImageStyle="20px"
              imageStyle="100px"
            />
          </div>
        )}
      </div>
      <div className="row">
        {hasShortTextField && (
          <div className={`col-md-12 col-lg-12 col-xs-12 col-sm-12`}>
            <TextField
              fullWidth
              style={textFieldStyle}
              defaultValue={defaultValue.short_text}
              name={'short_text'}
              floatingLabelText={t1('short_text_(for_report)')}
            />
          </div>
        )}
      </div>
      <div className="row">
        {hasDescriptionField && (
          <div className={`col-md-12 col-lg-12 col-xs-12 col-sm-12`}>
            <Element
              schema={{
                type: RTE,
                defaultValue: defaultValue[nameOfDescriptionField],
                name: nameOfDescriptionField,
                label: t1('description'),
              }}
            />
          </div>
        )}
      </div>
      <div className="row">
        {hasIsOpenEndedAnswerField && (
          <div className={`col-md-12 col-lg-12 col-xs-12 col-sm-12`}>
            <Checkbox
              defaultValue={defaultValue[nameOfIsOpenEndedAnswerField]}
              name={nameOfIsOpenEndedAnswerField}
              label={t1('is_open_ended_answer')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Question.propTypes = {
  handleOnSelectAsAnswer: PropTypes.func.isRequired,
  nameOfIsAnswerField: PropTypes.string,
};

Question.defaultProps = {
  nameOfIsAnswerField: 'is_answer',
};

export default Question;
