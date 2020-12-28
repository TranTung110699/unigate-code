/**
 * Created by hungvo on 21/12/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NodeNew from 'components/admin/node/new/index';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { getThemeConfig } from 'utils/selectors';
import path from 'components/admin/path/schema/form';

class Layout extends Component {
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
  // TODO: render
  renderResultComponent = (items, props) => <div>TODO: Auto assign</div>;

  render() {
    return (
      <div>
        <NodeNew
          resetForm={false}
          ntype="path"
          schema={path}
          step="assign_users"
          formid="search_assign_users"
          hideSubmitButton
          onChange={(value, event, form) => {
            this.handleOnChangeFormNew(value);
          }}
        />
        <SearchWrapper
          formid="teaching_plan_overview"
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={this.state.paramsSearch}
          showResult
          showSearchButton
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProps)(Layout);
