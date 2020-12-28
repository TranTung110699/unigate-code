import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confSelector } from 'common/selectors';
import { t1 } from 'translate';
import financeTemplate from 'components/admin/financial/mainstage/finance-templates/schema/form';

class Form extends Component {
  render() {
    const {
      mode,
      step,
      node,
      searchFormId,
      title,
      formid,
      ntype,
      classification,
      maxNumberOfTimesToRepeatSubject,
      maxNumberOfExamResit,
    } = this.props;
    const hiddenFields = { classification: classification || 'fee' };
    return (
      <div>
        <NodeNew
          title={title || t1('new_finance_template')}
          ntype={ntype || 'finance_template'}
          schema={financeTemplate}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          hiddenFields={hiddenFields}
          searchFormId={searchFormId}
          params={{
            maxNumberOfTimesToRepeatSubject,
            maxNumberOfExamResit,
          }}
        />
      </div>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string,
  formid: PropTypes.string,
  node: PropTypes.shape(),
  searchFormId: PropTypes.string,
  mode: PropTypes.string,
  ntype: PropTypes.string,
  classification: PropTypes.string,
  step: PropTypes.string,
};

Form.defaultProps = {
  title: '',
  formid: 'finance-template',
  node: {},
  searchFormId: 'finance-template-search',
  mode: 'new',
  ntype: '',
  step: '',
  classification: null,
};

const mapStateToProps = (state) => {
  const conf = confSelector(state);
  const maxNumberOfTimesToRepeatSubject =
    conf.max_number_of_times_to_repeat_subject;
  const maxNumberOfExamResit = conf.max_number_of_exam_resits;
  return {
    maxNumberOfTimesToRepeatSubject: maxNumberOfTimesToRepeatSubject || 1,
    maxNumberOfExamResit,
  };
};

export default connect(mapStateToProps)(Form);
