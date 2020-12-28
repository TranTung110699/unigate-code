import React, { Component } from 'react';
import { Field, getFormValues, reduxForm } from 'redux-form'; // ES6
// import { Field } from 'redux-form';
import { required } from 'common/validators';
import { createSelector } from 'reselect';
import { Element } from 'schema-form/elements/';
import FieldSet from 'schema-form/field-set/';
import { connect } from 'react-redux';

class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0, // render count
    };
    console.log('xxx');
  }

  componentWillReceiveProps(nextProps) {
    console.log('ccc');
    console.log({ count: this.state.count });
    this.setState({ count: this.state.count + 1 });
  }

  // hackish: somehow the form keeps re-rendering....
  // maybe we have to implement this
  shouldComponentUpdate(nextProps) {
    // TODO: Fix this 15 count. check for formValues & syncErrors & formSchemaConfigs & errorMessage
    // if diff -> change

    if (this.state.count > 100) {
      // console.log('component should not update');
      return false;
    }
    return true;
  }

  render() {
    console.log('...');
    console.log(this.props.schema);
    const schema = () => {
      return {
        type: 'text',
        hintText: 'enter_name_of_syllabus',
        floatingLabelText: 'name_of_syllabus',
        defaultValue: '',
        errorText: '',
        fullWidth: true,
        validate: [required('name_cannot_be_empty')],
      };
    };

    const groups = [
      {
        id: 'foo',
        schema: {
          name: schema(),
        },
      },
    ];

    // const groups = [{
    //   id: 'foo',
    //   schema: {
    //     name: this.props.schema,
    //   }
    // }];

    const { handleSubmit, pristine, reset, submitting } = this.props;

    const groupsElement = [];
    groups.forEach((group) => {
      groupsElement[group.id] = <FieldSet {...group} key={group.id} />;
    });

    return (
      <form onSubmit={handleSubmit}>
        {groupsElement.foo}

        <div>
          <label>First Name</label>
          <div>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>

        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const formSchemaConfigsSelector = (state, props) =>
  state.formSchemaConfigs[props.formid] || null;
const formSelector = (state, props) => state.form[props.formid] || null;
const formValuesSelector = (state, props) => getFormValues(props.formid)(state);

const schemaFormSelector = () =>
  createSelector(
    formSelector,
    formSchemaConfigsSelector,
    formValuesSelector,
    (form, formSchemaConfigs, formValues) => {
      // const formSchemaConfigs = formSchemaConfigs[formid];

      const submitting = form && form.submitting;
      const syncErrors = form && form.syncErrors;
      const errorMessage = form && form.error;
      // const formValues = getFormValues(formid)(state) || {};

      return {
        // form: props.formid,
        // formValues,
        // theForm: form[formid], // just so it will receive new props if any thing changes
        formSchemaConfigs,
        // submitting,
        // syncErrors,
        // errorMessage,
      };
    },
  );

// TODO: improve by getting the results from selectors
const mapStateToProps = () => {
  // (state, props) {
  const getState = schemaFormSelector();
  return (state, props) => {
    console.log('mapStateToProps. props=', props);
    return getState(state, props);
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'syllabus_new', // a unique identifier for this form
  })(SimpleForm),
);
