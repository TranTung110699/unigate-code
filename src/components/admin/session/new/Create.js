import React from 'react';
import get from 'lodash.get';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints/index';
import Loading from 'components/common/loading/index';
import NodeNew from 'components/admin/node/new/index';
import sessionSchema from '../schema/form';

const Form = (props) => {
  const { hiddenFields, searchFormId, node } = props;
  const syllabus = get(props, 'syllabus') || node;

  if (
    !get(hiddenFields, 'session_ids') &&
    (!syllabus || syllabus.ntype !== 'syllabus')
  ) {
    return <Loading />;
  }

  return (
    <NodeNew
      ntype="session"
      schema={sessionSchema}
      step={'create'}
      formid="session-manage"
      closeModal
      alternativeApi={apiUrls.post_new_node('session')}
      hiddenFields={hiddenFields}
      searchFormId={searchFormId}
      syllabusObject={syllabus}
      dialogKey="session-manage"
    />
  );
};

export default fetchData((props) => ({
  baseUrl: apiUrls.get_snippet,
  fetchCondition: (() => {
    if (get(props, 'hiddenFields.session_ids')) {
      return false;
    }
    const node = get(props, 'node');
    return node && node.ntype !== 'syllabus';
  })(),
  params: (() => {
    const iid = get(props, 'node.credit_syllabus') || get(props, 'node.iid');
    return {
      ntype: 'syllabus',
      iid,
      depth: 0,
    };
  })(),
  propKey: 'syllabus',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(Form);
