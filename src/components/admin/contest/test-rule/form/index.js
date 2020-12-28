/**
 * Created by quandv on 18/07/17.
 */
import React from 'react';
// import Form from './form';
import { t1 } from 'translate';
import { getFormValues, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getNodeSelector } from '../../../node/utils';
import { connect } from 'react-redux';
import { getThemeConfig } from '../../../../../utils/selectors';
import Form from 'schema-form/Form';
import schema from './schema';

class RuleSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit = (values) => {
    const { editSuccess } = this.props;

    if (editSuccess) {
      editSuccess(values);
      return;
    }
  };

  render() {
    const { iid } = this.props;
    const formid = `rule-testing-${iid}`;

    const submitLabels = {
      new: t1('update_rules'),
    };

    return (
      <Form
        {...this.props}
        schema={schema}
        mode="new"
        onSubmit={this.handleFormSubmit}
        formid={formid}
        submitLabels={submitLabels}
      />
    );

    /*
    return (
      <Form
        form={formid}
        onSubmit={this.handleFormSubmit}
        iid={iid}
      />
    );
    */
  }
}

const mapStateToProps = (state, props) => {
  const { form, iid } = props;
  const node = getNodeSelector(state)(iid, null, 1) || {};
  const formValues = getFormValues(form)(state);

  return {
    defaultValue: node.options || {},
    initialValues: node.options,
    formValues,
    node,
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(RuleSetting);

// export default RuleSetting;
