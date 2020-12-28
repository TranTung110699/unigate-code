/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import routes from 'routes';
import NodeNew from 'components/admin/node/new';
import { t1 } from 'translate';
import path from 'components/admin/path/schema/form';
import { withRouter } from 'react-router';
import withSchoolConfig from 'common/hoc/withSchoolConfigs';

class NewPathForm extends Component {
  onHandleNewSuccess = (data) => {
    if (!data || !data.result) return;
    const { type, history, isSIS } = this.props;
    const mod = type || 'path';
    if (mod === 'classgroup' && isSIS) {
      history.push(`/admin/classgroup/${data.result.iid}/children`);
    } else {
      const url = routes.url('node_edit', { ...data.result, ntype: 'path' });
      history.push(url);
    }
  };

  render() {
    const { mode, node, type, requestSuccessful, dialogKey } = this.props;
    const title = this.props.title || t1('new_path');
    const formid = this.props.formid || 'new_path';
    const finalType = type || (node && node.type) || 'path';
    let hiddenFields = this.props.hiddenFields || { type: finalType };

    return (
      <NodeNew
        title={title}
        ntype={'path'}
        schema={path}
        mode={mode}
        step={finalType === 'path' ? '' : finalType}
        node={node}
        formid={formid}
        hiddenFields={hiddenFields}
        requestSuccessful={requestSuccessful || this.onHandleNewSuccess}
        dialogKey={dialogKey}
        closeModal={!!dialogKey}
      />
    );
  }
}

export default withRouter(withSchoolConfig(NewPathForm));
