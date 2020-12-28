import React from 'react';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/enrolment-plan/schema/form';
import lodashGet from 'lodash.get';
import routes from 'routes';

const getLinkToEditPage = (post) =>
  routes.url('node_edit', {
    iid: lodashGet(post, 'result.iid'),
    ntype: 'enrolment_plan',
    step: 'dashboard',
  });

const Form = ({ dialogKey, redirectToEditPage, searchFormId }) => {
  return (
    <NodeNew
      ntype={'enrolment_plan'}
      schema={schema}
      mode={'new'}
      step={'from_template'}
      closeModal
      hideSubmitButton={redirectToEditPage}
      showAddNewAndEditButton={redirectToEditPage}
      getEditItemUrl={redirectToEditPage ? getLinkToEditPage : undefined}
      dialogKey={dialogKey}
      formid={'new_enrolment_plan_from_template'}
      searchFormId={searchFormId}
    />
  );
};

export default Form;
