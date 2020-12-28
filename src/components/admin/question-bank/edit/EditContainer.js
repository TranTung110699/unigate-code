/* eslint-disable react/prop-types,no-undef,react/sort-comp,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { getParams } from 'common';
import ApiUrls from '../endpoints';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import NodeNew from 'components/admin/node/new';

import schema from '../schema/form';
import QuestionBankContainer from './bank/QuestionBankContainer';
import Dashboard from './dashboard';

import { menuItems } from './sub-left-menu-configs';

class QuestionBankEditContainer extends Component {
  getContentByAction = (props) => {
    const { node, action, subAction, categoryMappingWithTheSkills } = props;
    if (!node || !node.iid) {
      return <Loading />;
    }

    let contentDisplay = '';
    switch (action) {
      case 'information': {
        contentDisplay = (
          <div>
            <div className="row">
              <div className="col-md-6">
                <NodeNew
                  alternativeApi={ApiUrls.update}
                  schema={schema}
                  step="info"
                  mode="edit"
                  hiddenFields={{
                    iid: node.iid,
                  }}
                  node={node}
                  formid={`edit_question_bank_${node.iid}`}
                />
              </div>
            </div>
          </div>
        );
        break;
      }
      case 'bank-add':
      case 'bank-import':
      case 'bank': {
        contentDisplay = (
          <QuestionBankContainer
            node={node}
            action={action}
            subAction={subAction}
            categoryMappingWithTheSkills={categoryMappingWithTheSkills}
          />
        );
        break;
      }
      default: {
        contentDisplay = (
          <Dashboard
            node={node}
            categoryMappingWithTheSkills={categoryMappingWithTheSkills}
          />
        );
        break;
      }
    }

    return contentDisplay;
  };

  render() {
    const { node } = this.props;

    return [
      <SubLeftMenuContext node={node} schema={menuItems(node)} />,
      <SubTopMenuContext lastBreadcrumbName={node.name} isSmallSize />,
      this.getContentByAction(this.props),
    ];
  }
}

const mapStateToProps = (state, props) => {
  const params = getParams(props);
  const iid = params.iid;
  const nodes = props.nodes || {};
  const categoryMappingWithTheSkills = get(
    state,
    'domainInfo.conf.category_mapping_with_the_skills_of_questions_in_the_exam_template',
  );

  return {
    nodes,
    iid,
    node: nodes[iid] || {},
    categoryMappingWithTheSkills,
  };
};

export default withNodeEditContainer(
  connect(mapStateToProps)(QuestionBankEditContainer),
);
