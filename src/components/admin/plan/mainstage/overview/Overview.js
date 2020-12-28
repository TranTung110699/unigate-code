/**
 * Created by hungvo on 21/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new/index';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import TeachingPlanResult from './Results';
import planSchema from '../../schema/form';

class PlanEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramsSearch: {},
    };
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  handleOnChangeFormNew = (value) => {
    this.setState({
      paramsSearch: value,
    });
  };

  renderResultComponent = (items, props, objects, searchValues) => (
    <TeachingPlanResult items={items} searchValues={searchValues} />
  );

  render() {
    return (
      <div>
        <h3>{t1('select_filters')}</h3>
        <SearchWrapper
          formid="teaching_plan_overview"
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={this.state.paramsSearch}
          showQueryField={false}
          classWapperSearchButton="text-center"
          autoSearchWhenStart={false}
          showResult
          showSearchButton
        >
          <NodeNew
            resetForm={false}
            ntype={'plan'}
            schema={planSchema}
            step="search"
            formid="plan_search_overview"
            hideSubmitButton
            onChange={(value, event, form) => {
              this.handleOnChangeFormNew(value);
            }}
          />
        </SearchWrapper>
      </div>
    );
  }
}

PlanEditor.propTypes = {
  formid: PropTypes.string,
};
// Specifies the default values for props:
PlanEditor.defaultProps = {
  formid: 'new_plan',
};

export default PlanEditor;
