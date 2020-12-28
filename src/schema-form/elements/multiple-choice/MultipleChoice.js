import React from 'react';
import { connect } from 'react-redux';
import { change, getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import Addable from 'schema-form/elements/addable/Addable';
import Question from './Question';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { remove } from 'common/utils/Array';

const nameOfIsAnswerField = 'is_answer';
const nameOfIsOpenEndedAnswerField = 'is_open_ended_answer';
const nameOfDescriptionField = 'description';

class MultipleChoice extends React.Component {
  componentDidUpdate(prevProps) {
    const { dispatch, values, form, name } = this.props;
    if (prevProps.isMultiSelectable !== this.props.isMultiSelectable) {
      let answer = null;
      values.forEach((value, index) => {
        if (value[nameOfIsAnswerField] && answer === null) {
          answer = index;
        }
        if (index !== answer) {
          dispatch(change(form, `${name}[${index}].${nameOfIsAnswerField}`, 0));
        }
      });
    }

    if (lodashGet(prevProps.values, 'length') !== lodashGet(values, 'length')) {
      values.forEach((value, index) => {
        if (
          index !== values.length - 1 &&
          lodashGet(value, nameOfIsOpenEndedAnswerField)
        ) {
          dispatch(
            change(
              form,
              `${name}[${index}].${nameOfIsOpenEndedAnswerField}`,
              0,
            ),
          );
        }
      });
    }
  }

  render() {
    const {
      name,
      form,
      dispatch,
      displayFields,
      isMultiSelectable,
    } = this.props;
    return (
      <Addable
        {...this.props}
        addButtonLabel={t1('add_option')}
        renderElementToAdd={({ index, total, defaultValue }) => {
          let questionComponentDisplayFields = displayFields;
          if (index !== total - 1) {
            questionComponentDisplayFields = remove(
              questionComponentDisplayFields,
              nameOfIsOpenEndedAnswerField,
            );
          }

          return (
            <Question
              displayFields={questionComponentDisplayFields}
              defaultValue={defaultValue}
              nameOfIsAnswerField={nameOfIsAnswerField}
              nameOfIsOpenEndedAnswerField={nameOfIsOpenEndedAnswerField}
              nameOfDescriptionField={nameOfDescriptionField}
              handleOnSelectAsAnswer={() => {
                if (isMultiSelectable) return;
                for (let i = 0; i < total; i += 1) {
                  if (index !== i) {
                    dispatch(
                      change(form, `${name}[${i}].${nameOfIsAnswerField}`, 0),
                    );
                  }
                }
              }}
            />
          );
        }}
      />
    );
  }
}

MultipleChoice.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  isMultiSelectable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape()),
};

MultipleChoice.defaultProps = {
  isMultiSelectable: false,
  values: [],
};

const mapStateToProps = (state, props) => {
  const { form, name } = props;
  const formValues = getFormValues(form)(state);
  const values = (formValues && formValues[name]) || [];

  return {
    values,
  };
};

export default connect(mapStateToProps)(MultipleChoice);
