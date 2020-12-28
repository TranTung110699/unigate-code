/**
 * Created by DVN on 8/23/2017.
 */
import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { DefinedUrlParams } from 'routes/links/common';
import { connect } from 'react-redux';
import Results from './Results';
import topMenuSchema from '../menu/MainstageTopMenu';
import apiUrls from '../endpoints';
import schema from './schema';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(item, props) {
    if (!item) {
      return null;
    }

    return <Results item={item} {...props} />;
  }

  render() {
    const { iid } = this.props;
    const hiddenFields = {
      package_iid: iid,
    };
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <SearchWrapper
          formid="package_detail"
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={hiddenFields}
          alternativeApi={apiUrls.package_detail}
          schema={schema}
          showSearchButton={false}
          showResult
          autoSearchWhenStart
          autoSearchWhenValuesChange
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const iid =
    props &&
    props.match &&
    props.match.params &&
    props.match.params[DefinedUrlParams.IID];
  return {
    iid,
  };
};

export default connect(mapStateToProps)(Layout);
