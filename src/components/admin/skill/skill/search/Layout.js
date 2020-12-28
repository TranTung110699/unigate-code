import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
// import searchSchema from './schema-form';
import searchSchema from './advance';
//TODO schema: status

import Results from './Results';
import NewSkillButton, { showNewSkill } from '../new/NewSkillButton';
import { t1 } from 'translate';

class Layout extends Component {
  topMenuButtons = () => {
    const { type } = this.props;

    return [
      //<Link to={routes.url('skill')}>{t1('skills')}</Link>,
      //<Link to={routes.url('passdef')}>{t1('skill_passing_definitions')}</Link>,
      <NewSkillButton type={type} />,
    ];
  };

  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  componentDidMount() {
    const { action, dispatch, history, type } = this.props;
    if (action === 'new') {
      showNewSkill({ dispatch, history, type });
    }
  }

  render() {
    const formid = 'skill_search';
    const { type } = this.props;
    const hiddenFields = {
      ntype: 'skill',
      type,
    };

    if (type === 'rubric') hiddenFields.sub_type = 'original'; // only search for the original rubric

    return (
      <div>
        <SubTopMenuContext
          buttons={this.topMenuButtons()}
          lastBreadcrumbName={t1('skills')}
          description={t1(
            "skill_reflects_a_person's_ability_to_perform_a_specific_task.__in_this_system,_skill_is_used_to_classify_credits,_manage_a_position's_competency_framework_and_provide_basic_adaptive_learning_ability.",
          )}
        />
        <SearchWrapper
          formid={formid}
          hiddenFields={hiddenFields}
          schema={searchSchema}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { location } = props;
  const { pathname } = location;
  const tmp = pathname.split('/');
  const type = tmp.length >= 3 && tmp[2] === 'rubric' ? 'rubric' : 'skill';
  return {
    type,
    action: props.match && props.match.params && props.match.params.action,
  };
};

export default connect(mapStateToProps)(Layout);
