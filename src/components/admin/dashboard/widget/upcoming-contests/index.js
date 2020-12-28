import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import contestApiUrls from 'components/admin/contest/endpoints';
import PropTypes from 'prop-types';
import Result from './result';

class UpcomingContests extends React.Component {
  static propTypes = {
    expand: PropTypes.bool,
    formid: PropTypes.string,
    orgIids: PropTypes.number,
  };

  static defaultProps = {
    expand: false,
    formid: null,
    orgIids: null,
  };

  /**
   * render results
   * @param items
   * @returns {*}
   */
  renderResultComponent = (items) => (
    <Result items={items} expand={this.props.expand} />
  );

  render() {
    const { expand, formid, orgIids } = this.props;
    const hiddenFields = {
      category_iids: orgIids,
      items_per_page: expand ? 10 : 2,
    };
    return (
      <SearchWrapper
        formid={formid}
        renderResultsComponent={this.renderResultComponent}
        showSearchButton={false}
        hiddenFields={hiddenFields}
        ntype="report"
        alternativeApi={contestApiUrls.get_upcoming_contests}
      />
    );
  }
}

export default UpcomingContests;
