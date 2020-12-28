import React, { Component } from 'react';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import RaisedButton from 'components/common/mui/RaisedButton';

import TreeResults from './TreeResults';
import Results from './Results';
import FormFilters from './FormFilters';
import topMenuSchema from '../menu/MainstageTopMenu';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
    this.state = {
      view: 'grid',
    };
    this.handleTreeViewOnclick = this.handleTreeViewOnclick.bind(this);
    this.handleGridViewOnclick = this.handleGridViewOnclick.bind(this);
  }

  getPid = () => {
    const { parent } = this.props;
    return (parent && parent.id) || '0';
  };

  handleTreeViewOnclick = () => {
    const view = {
      view: 'tree',
    };
    this.setState(view);
  };

  handleGridViewOnclick = () => {
    const view = {
      view: 'grid',
    };
    this.setState(view);
  };

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  renderTreeResultComponent = (
    items,
    props,
    objects,
    searchValues,
    resultId,
  ) => (
    <TreeResults
      items={items}
      {...props}
      resultId={resultId}
      pid={this.getPid()}
    />
  );

  getContentDisplay = (view) => {
    const formid = 'blog_search';
    let hiddenFields = {
      type: 'blog',
      view,
    };
    if (view === 'tree') {
      hiddenFields = Object.assign({}, hiddenFields, {
        pid: this.getPid(),
        depth: -1,
      });
      return (
        <div>
          <SubTopMenuContext schema={topMenuSchema()} />
          <SearchWrapper
            formid={`${formid}`}
            hiddenFields={hiddenFields}
            renderResultsComponent={this.renderTreeResultComponent}
            searchResultKey={`${formid}_tree`}
          />
        </div>
      );
    }
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid={`${formid}`}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
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

export default Layout;
