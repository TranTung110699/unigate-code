import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import RaisedButton from 'components/common/mui/RaisedButton';

import Results from './Results';
import FormFilters from './FormFilters';
import TreeResults from './TreeResults';
import topMenuSchema from '../menu/MainstageTopMenu';
import { menuItems as leftMenuSchema } from '../../menu/sub-left-menu-configs';

class AssetLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'grid',
    };
    this.renderResultComponent = this.renderResultComponent.bind(this);
    this.handleTreeViewOnclick = this.handleTreeViewOnclick.bind(this);
    this.handleGridViewOnclick = this.handleGridViewOnclick.bind(this);
  }

  getPid = () => {
    const { parent } = this.props;
    return (parent && parent.id) || '0';
  };

  handleTreeViewOnclick = () => {
    this.setState({ view: 'tree' });
  };

  handleGridViewOnclick = () => {
    this.setState({ view: 'grid' });
  };

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  renderTreeResultComponent = (items, props, resultId) => (
    <TreeResults
      items={items}
      {...props}
      resultId={resultId}
      pid={this.getPid()}
    />
  );

  getContentDisplay = (view) => {
    const formid = 'asset_category_search';
    const hiddenFields = {
      view,
    };

    if (view === 'tree') {
      Object.assign(hiddenFields, {
        pid: this.getPid(),
        depth: -1,
      });

      return (
        <div>
          <SubTopMenuContext schema={topMenuSchema()} />
          <SubLeftMenuContext schema={leftMenuSchema()} />
          <SearchWrapper
            formid={`${formid}`}
            hiddenFields={hiddenFields}
            renderResultsComponent={this.renderTreeResultComponent}
            searchResultKey={`${formid}_tree`}
            autoSearchWhenStart
          >
            <FormFilters />
          </SearchWrapper>
        </div>
      );
    }

    return (
      <div mod="assetCategory">
        <SubTopMenuContext schema={topMenuSchema()} />
        <SubLeftMenuContext schema={leftMenuSchema()} />
        <SearchWrapper
          formid={`${formid}`}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          autoSearchWhenStart
        >
          <FormFilters />
        </SearchWrapper>
      </div>
    );
  };

  render() {
    const view = this.state.view;
    const contentDisplay = this.getContentDisplay(view);
    const style = {
      margin: 10,
    };

    return (
      <div>
        {/*
        <RaisedButton
          floatRight="true"
          name="grid"
          primary
          float="right"
          style={style}
          label="grid"
          onClick={() => this.handleGridViewOnclick()}
        />
        <RaisedButton
          name="tree"
          label="tree"
          style={style}
          primary
          onClick={() => this.handleTreeViewOnclick()}
        />
           */}
        {contentDisplay}
      </div>
    );
  }
}

export default AssetLayout;
