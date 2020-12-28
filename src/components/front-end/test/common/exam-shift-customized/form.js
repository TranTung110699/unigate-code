import React from 'react';
import { connect } from 'react-redux';
import { FieldArray, getFormValues, reduxForm } from 'redux-form';
import { Element } from 'schema-form/elements';
import { generateSelectOptionsInRange } from 'common/utils/form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import SubmitButton from '../submit-button';

const getTextOfPart = (part) => t1('part_%s', [part + 1]);

const configsOfParts = [
  {
    maxNumberOfQuestions: 10,
    selectable: true,
  },
  {
    maxNumberOfQuestions: 30,
    selectable: true,
  },
  {
    maxNumberOfQuestions: 30,
  },
  {
    maxNumberOfQuestions: 30,
  },
  {
    maxNumberOfQuestions: 40,
    selectable: true,
  },
  {
    maxNumberOfQuestions: 12,
    selectable: true,
  },
  {
    maxNumberOfQuestions: 48,
  },
];

const FinalValue = ({ fields, className }) => {
  const cssClass = 'etec-exam-shift-customized-form-result';

  return (
    <table className={`${className || ''} ${cssClass}`}>
      <thead>
        <tr>
          <th>{t1('part')}</th>
          <th>{t1('number_of_questions')}</th>
          <th>{t1('action')}</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((item, index) => {
          const value = fields.get(index);
          return (
            <tr>
              <td>{getTextOfPart(value.part)}</td>
              <td>{value.number_of_questions}</td>
              <td>
                <Icon
                  className={`${cssClass}__remove`}
                  icon="delete"
                  onClick={(event) => {
                    event.preventDefault();
                    fields.remove(index);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

class Form extends React.Component {
  cssClass = 'etec-exam-shift-customized-form';

  handlePartChange = (event, value) => {
    const { change } = this.props;

    const config = configsOfParts[value];

    change(
      'number_of_questions',
      (config && (config.selectable ? 1 : config.maxNumberOfQuestions)) || '',
    );
  };

  handleAddButtonClick = (event) => {
    event.preventDefault();
    const { formValues, array, change } = this.props;
    const { part, number_of_questions } = formValues || {};
    change('part', '');
    change('number_of_questions', '');
    array.push('result', {
      part,
      number_of_questions,
    });
  };

  render() {
    const { formValues, className } = this.props;

    const partOptions = [
      {
        value: '',
        primaryText: t1('select_part'),
      },
    ]
      .concat(
        [...Array(configsOfParts.length).keys()].map((key) => ({
          value: key,
          primaryText: getTextOfPart(key),
        })),
      )
      .filter(
        (option) =>
          !(
            formValues &&
            formValues.result &&
            formValues.result.find((item) => item.part === option.value)
          ),
      );

    let numberOfQuestionsOptions = [
      {
        value: '',
        primaryText: t1('select_number_of_questions'),
      },
    ];

    const config = formValues && configsOfParts[formValues.part];

    if (config) {
      if (config.selectable) {
        const getNext = (currentValue, index) =>
          index === 0 ? currentValue + 4 : currentValue + 5;

        numberOfQuestionsOptions = [
          {
            value: '',
            primaryText: t1('select_number_of_questions'),
          },
        ].concat(
          generateSelectOptionsInRange(1, config.maxNumberOfQuestions, getNext),
        );
      } else {
        numberOfQuestionsOptions = [
          {
            value: config.maxNumberOfQuestions,
            primaryText: config.maxNumberOfQuestions,
          },
        ];
      }
    }

    return (
      <form className={`${className || ''} ${this.cssClass}`}>
        <div className={`${this.cssClass}__select`}>
          <Element
            schema={{
              type: 'select',
              className: `${this.cssClass}__field ${this.cssClass}__part`,
              name: 'part',
              options: partOptions,
              onChange: this.handlePartChange,
              underlineStyle: { display: 'none' },
              style: { border: '1px solid #95989a' },
              labelStyle: { paddingLeft: 20 },
            }}
          />
          <Element
            schema={{
              type: 'select',
              className: `${this.cssClass}__field ${
                this.cssClass
              }__number-of-questions`,
              name: 'number_of_questions',
              options: numberOfQuestionsOptions,
              underlineStyle: { display: 'none' },
              style: { border: '1px solid #95989a' },
              labelStyle: { paddingLeft: 20 },
            }}
          />
          <SubmitButton
            disabled={
              !formValues ||
              typeof formValues.part === 'undefined' ||
              typeof formValues.number_of_questions === 'undefined'
            }
            className={`${this.cssClass}__field ${this.cssClass}__add-button`}
            onClick={this.handleAddButtonClick}
          >
            {t1('add_to_your_test')}
          </SubmitButton>
        </div>
        <div className={`${this.cssClass}__result-section`}>
          <FieldArray
            name="result"
            className={`${this.cssClass}__result`}
            component={FinalValue}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  formValues: getFormValues(props.form)(state),
});

export default connect(mapStateToProps)(reduxForm({})(Form));
