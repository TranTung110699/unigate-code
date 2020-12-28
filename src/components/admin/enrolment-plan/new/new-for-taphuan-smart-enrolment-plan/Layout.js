import React from 'react';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/enrolment-plan/schema/form';
import lodashGet from 'lodash.get';
import routes from 'routes';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import withUserOrganizations from 'common/hoc/withUserOrganizations';

const getLinkToEditPage = (post) =>
  routes.url('node_edit', {
    iid: lodashGet(post, 'result.iid'),
    ntype: 'enrolment_plan',
    step: 'dashboard',
  });

const Form = ({ dialogKey, redirectToEditPage, searchFormId, orgIids }) => {
  return (
    <NodeNew
      ntype={'enrolment_plan'}
      schema={schema}
      mode={'new'}
      step={'taphuan_smart_enrolment_plan'}
      closeModal
      hideSubmitButton={redirectToEditPage}
      showAddNewAndEditButton={redirectToEditPage}
      getEditItemUrl={redirectToEditPage ? getLinkToEditPage : undefined}
      dialogKey={dialogKey}
      formid={'new_taphuan_smart_enrolment_plan'}
      searchFormId={searchFormId}
      alternativeApi={epApiUrls.new_taphuan_smart_enrolment_plan}
      hiddenFields={{
        organizations: orgIids,
      }}
    />
  );
};

export default withUserOrganizations(Form);
