import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from 'api-endpoints/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSelector } from 'reselect';
import Result from './result';

class FluctuatingGroups extends React.Component {
  static propTypes = {
    expand: PropTypes.bool,
    formid: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func,
    history: PropTypes.shape(),
    orgIids: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    expand: false,
    history: {},
    handleCloseModal: null,
    orgIids: [],
  };

  handleGoToDetail = (item) => {
    const { history, handleCloseModal } = this.props;
    if (handleCloseModal) {
      handleCloseModal();
    }
    history.push(`/admin/group/${item.iid}/info`);
  };

  renderResultComponent = (items) => (
    <Result items={items} onGoToDetail={this.handleGoToDetail} />
  );

  render() {
    const { expand, optionFilter, formid, orgIids } = this.props;
    let hiddenFields = {
      category_iids: orgIids,
      items_per_page: expand ? 10 : 2,
    };
    if (optionFilter) {
      const { params } = optionFilter;
      hiddenFields = { ...hiddenFields, ...params };
    }

    return (
      <SearchWrapper
        formid={formid}
        renderResultsComponent={this.renderResultComponent}
        showSearchButton={false}
        hiddenFields={hiddenFields}
        ntype="report"
        alternativeApi={apiUrls.get_fluctuating_groups}
        hidePagination={!expand}
      />
    );
  }
}

const mapStateToProps = createSelector(
  (state, props) => state.widget.form[props.formid],
  (optionFilter) => ({
    optionFilter,
  }),
);

export default withRouter(connect(mapStateToProps)(FluctuatingGroups));
