/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import contestSchema from 'components/admin/contest/contest/schema/form';
import lodashGet from 'lodash.get';
import { editUrl } from '../../routes';

class ContestNewForm extends Component {
  getLinkToEditPage = (post) => {
    return editUrl(lodashGet(post, 'result.iid'));
  };

  render() {
    const { mode, step, node, redirectToEditPage } = this.props;
    const formid = this.props.formid || 'new_contest';

    return (
      <div>
        <NodeNew
          ntype={'contest'}
          schema={contestSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="contest_search"
          hideSubmitButton={redirectToEditPage}
          showAddNewAndEditButton={redirectToEditPage}
          getEditItemUrl={
            redirectToEditPage ? this.getLinkToEditPage : undefined
          }
        />
      </div>
    );
  }
}

export default ContestNewForm;
