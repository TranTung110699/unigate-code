import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import SearchWrapperV2 from 'components/common/search-wrap-v2/SearchWrapper';
import ProgramResults from './Results';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import ButtonNew from '../../path/new/ButtonNew';

import schema from './schema';
import schemaNew from './schema-advance';
import { t1 } from 'translate';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

const searchFormId = 'program_search';

class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const type = this.props.type || 'path';

    return (
      <ProgramResults
        items={items}
        {...this.props}
        ntype="path"
        formid={searchFormId}
      />
    );
  }

  getTopMenuButtons = () => {
    return [<ButtonNew label={t1('new_program')} type="program" />];
  };

  render() {
    const { hiddenFields, isFeatureEnabled } = this.props;
    let newHiddenFields = hiddenFields ? { ...hiddenFields } : {};

    const type = this.props.type || 'path';
    newHiddenFields.type = newHiddenFields.type || type;

    return (
      <div>
        <SubTopMenuContext
          buttons={this.getTopMenuButtons()}
          lastBreadcrumbName={t1('program')}
          description={t1(
            'program_is_a_structured_list_of_credits,_combined_to_help_student_learn_and_be_able_to_perform_at_a_new_level.',
          )}
        />
        <SearchWrapperV2
          {...this.props}
          formid={searchFormId}
          hiddenFields={newHiddenFields}
          renderResultsComponent={
            this.props.renderResultsComponent || this.renderResultComponent
          }
          onResultChange={this.props.onResultChange}
          schema={
            isFeatureEnabled(features.NEW_UI_JULY_2019) ? schemaNew : schema
          }
          showSearchButton={!isFeatureEnabled(features.NEW_UI_JULY_2019)}
        />
      </div>
    );
  }
}

export default connect()(withFeatureFlags()(Layout));
