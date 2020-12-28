import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import userGroupSchema from 'components/admin/group/schema/form';
import routes from 'routes';
import lodashGet from 'lodash.get';
import { editUrl } from '../routes';

class Form extends Component {
  getLinkToEditPage = (post) => {
    return editUrl(lodashGet(post, 'result.iid'));
  };

  render() {
    const { redirectToEditPage } = this.props;
    const formid = this.props.formid || 'new_user_group';
    const searchFormId = this.props.searchFormId || 'user_in_group_search';

    return (
      <NodeNew
        {...this.props}
        ntype={'group'}
        schema={userGroupSchema(this.props.hiddenFields)}
        closeModal
        formid={formid}
        searchFormId={searchFormId}
        hideSubmitButton={redirectToEditPage}
        showAddNewAndEditButton={redirectToEditPage}
        getEditItemUrl={redirectToEditPage ? this.getLinkToEditPage : undefined}
      />
    );
  }
}

export default connect()(Form);
