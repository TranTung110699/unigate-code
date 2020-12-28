import React from 'react';
import NodeNew from 'components/admin/node/new';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import Loading from 'components/common/loading';
import { creditPlanSchema } from '../../schema/form';

const getTreeDataToRenderElementTreeWiew = (node, valuesFilter) => {
  const result = [];
  if (!node || !Array.isArray(node.children)) {
    return result;
  }
  node.children.forEach((chil) => {
    const newNode = {
      ...chil,
      value: chil.iid,
      key: chil.iid,
      title: (
        <div>
          {chil.name}{' '}
          <span className="text-muted">
            (#
            {chil.code})
          </span>
        </div>
      ),
    };
    if (Array.isArray(chil.children) && chil.children.length) {
      const children = getTreeDataToRenderElementTreeWiew(chil, valuesFilter);
      if (children.length) {
        newNode.children = children;
        result.push(newNode);
      }
    } else if (
      chil.ntype === 'syllabus' &&
      !valuesFilter.includes(parseInt(chil.iid))
    ) {
      result.push(newNode);
    }
  });
  return result;
};

const NewForm = ({
  searchFormId,
  planIid,
  programs,
  creditSyllbusCreated,
  loadingStatus,
}) => {
  if (typeof programs === 'undefined' || loadingStatus === 'loading') {
    return <Loading />;
  } else if (
    !programs ||
    !Array.isArray(programs.children) ||
    !programs.children.length
  ) {
    return <h3>{t1('the_program_has_no_content')}</h3>;
  }

  const treeData = getTreeDataToRenderElementTreeWiew(
    programs,
    creditSyllbusCreated,
  );

  if (!Array.isArray(treeData) || !treeData.length) {
    return <h3>{t1('all_credit_syllabus_are_planned')}</h3>;
  }

  const hiddenFields = {
    plan: planIid,
  };
  return (
    <NodeNew
      resetForm
      ntype={'plan'}
      schema={creditPlanSchema(treeData)}
      mode="new"
      step="credit_plan"
      formid="new_credit_plan"
      hiddenFields={hiddenFields}
      searchFormId={searchFormId}
    />
  );
};

export default fetchData((props) => {
  const { planIid } = props;
  return {
    baseUrl: apiUrls.get_program_tree_by_plan,
    params: {
      iid: planIid,
    },
    propKey: 'programs',
    fetchCondition: props.planIid,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  };
})(NewForm);
