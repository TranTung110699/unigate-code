import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import Schema from '../schema/form';
import { connect } from 'react-redux';
import { t1 } from 'translate';

class Form extends Component {
  render() {
    const {
      mode,
      step,
      node,
      searchFormId,
      formid,
      // title, ntype, classification, maxNumberOfTimesToRepeatSubject
    } = this.props;
    const hiddenFields = {};
    return (
      <div>
        <NodeNew
          title={t1('wallet-type')}
          ntype="wallet-type"
          mode={mode}
          step={step}
          node={node}
          schema={Schema}
          closeModal
          formid={formid}
          hiddenFields={hiddenFields}
          searchFormId={searchFormId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Form);
