import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints/index';
import PropTypes from 'prop-types';
import Result from './result';

class Index extends React.Component {
  static propTypes = {
    expand: PropTypes.bool,
    formid: PropTypes.string.isRequired,
    orgIids: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    expand: false,
    orgIids: [],
  };

  renderResultComponent = (items) => (
    <Result items={items} expand={this.props.expand} />
  );

  render() {
    const { expand, formid, orgIids } = this.props;
    const hiddenFields = { category_iids: orgIids };

    return (
      <SearchWrapper
        formid={formid}
        renderResultsComponent={this.renderResultComponent}
        showSearchButton={false}
        hiddenFields={hiddenFields}
        ntype="report"
        alternativeApi={apiUrls.learning_materials}
        hidePagination={!expand}
      />
    );
  }
}

export default Index;
