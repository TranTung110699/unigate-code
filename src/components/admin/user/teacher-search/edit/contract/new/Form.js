import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUrl } from 'routes/links/common';
import { t2 } from 'translate';
import contract from 'components/admin/user/teacher-search/edit/contract/schema/form';

class Form extends Component {
  requestSuccessful = () => {
    const { teacher, history } = this.props;
    history.push(
      getUrl(`teacher/${teacher && teacher.iid}/teaching-information`),
    );
  };

  render() {
    const {
      mode,
      step,
      node,
      teacher,
      isSimpleContract,
      searchFormId,
      requestSuccessful,
    } = this.props;
    const title = this.props.title || t2('new_contract');
    const formid = this.props.formid || 'new_contract';
    const finalMode = mode || 'new';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'contract'}
          schema={contract}
          mode={finalMode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId={searchFormId}
          hiddenFields={{
            employee_iid: (teacher && teacher.iid) || null,
            external: (teacher && teacher.external) || null,
            is_simple_contract: isSimpleContract,
          }}
          requestSuccessful={
            requestSuccessful ||
            (finalMode === 'new' ? this.requestSuccessful : null)
          }
        />
      </div>
    );
  }
}

export default withRouter(connect()(Form));
