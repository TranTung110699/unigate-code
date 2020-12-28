import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, getFormValues, reset } from 'redux-form';
import SearchForm from 'components/common/search-wrap/SearchForm';
import Pagination from 'components/common/pagination';
import sagaActions from 'actions/node/saga-creators';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { diffObjects } from 'common/utils/object';
import Results from './Results';

class SearchWrapper extends Component {
  componentDidMount() {
    const { formid, dispatch, resetForm } = this.props;
    if (resetForm) {
      dispatch(reset(formid));
    }
    setTimeout(() => {
      this.initSearch(this.props);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { hiddenFields, formid, dispatch } = this.props;
    const nextHiddenFields = nextProps.hiddenFields;
    if (nextProps && nextProps.formid !== formid) {
      this.initSearch(nextProps);
      return;
    }
    if (hiddenFields && nextHiddenFields && nextHiddenFields !== hiddenFields) {
      Object.keys(nextHiddenFields).forEach((key) => {
        if (!isEqual(nextHiddenFields[key], hiddenFields[key])) {
          dispatch(change(formid, key, nextHiddenFields[key]));
        }
      });
      Object.keys(hiddenFields).forEach((key) => {
        if (hiddenFields[key] && !nextHiddenFields[key]) {
          dispatch(change(formid, key, null));
          nextHiddenFields[key] = null;
        }
      });
    }
  }

  initSearch = (props) => {
    const { dispatch, formid, hiddenFields } = props;
    Object.keys(hiddenFields || {}).forEach((key) => {
      dispatch(change(formid, key, hiddenFields[key]));
    });
    if (this.props.autoSearchWhenStart) {
      this.search({ props });
    }
  };

  componentDidUpdate(prevProps) {
    const {
      hiddenFields,
      autoSearchWhenValuesChange,
      autoSearchWhenHiddenFieldsChange,
    } = this.props;
    if (prevProps.formValues !== this.props.formValues) {
      const hiddenFieldsChanged =
        hiddenFields &&
        Object.keys(hiddenFields).reduce((result, key) => {
          if (
            prevProps.formValues &&
            this.props.formValues &&
            !isEqual(this.props.formValues[key], prevProps.formValues[key])
          ) {
            return true;
          }
          return result;
        }, false);
      if (
        hiddenFieldsChanged &&
        (autoSearchWhenValuesChange || autoSearchWhenHiddenFieldsChange)
      ) {
        this.search();
      }
    }
  }

  componentWillUnmount() {
    const { dispatch, localSearchResultKey } = this.props;
    // dispatch(actions.cleanSearchResults(localSearchResultKey));
  }

  handleSubmit = () => {
    this.search();
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit();
    }
  };

  handlePageChange = (pageNumber, itemsPerPage) => {
    const { dispatch, formid } = this.props;
    this.search({ pageNumber, itemsPerPage });

    // save items_per_page and page to store for next search
    dispatch(change(formid, 'items_per_page', itemsPerPage));
    dispatch(change(formid, 'page', pageNumber));
  };

  search = (data = {}) => {
    const props = data.props || this.props;
    const extraParams = data.extraParams || {};
    const { pageNumber, itemsPerPage } = data;

    const {
      formid,
      dispatch,
      hiddenFields,
      formValues,
      localSearchResultKey,
      prepareDataBeforeSearch,
      alternativeApi,
      onFail,
      onSuccess,
    } = props;

    let localValues = {
      ...(formValues || {}),
      ...(hiddenFields || {}),
      ...(extraParams || {}),
      submit: 1,
    };

    if (pageNumber) {
      localValues = { ...localValues, page: pageNumber };
    }

    if (itemsPerPage) {
      localValues = { ...localValues, items_per_page: itemsPerPage };
    }

    let localValuesSendToServer = localValues;
    if (prepareDataBeforeSearch) {
      localValuesSendToServer = prepareDataBeforeSearch(
        localValuesSendToServer,
      );
    }

    dispatch(
      sagaActions.fetchNodesRequest(
        localValuesSendToServer,
        formid,
        localSearchResultKey,
        alternativeApi,
        { onSuccess, onFail },
      ),
    );

    // sync localValues to redux form (hiddenFields, sort data, ...)
    const { deleted, added, updated } = diffObjects(formValues, localValues);
    Object.keys(added).forEach((key) => {
      dispatch(change(formid, key, added[key]));
    });
    Object.keys(deleted).forEach((key) => {
      dispatch(change(formid, key, null));
    });
    Object.keys(updated).forEach((key) => {
      dispatch(change(formid, key, updated[key]));
    });
  };

  handleChange = (values) => {
    const { autoSearchWhenValuesChange } = this.props;
    if (autoSearchWhenValuesChange) {
      this.search();
    }
  };

  handleSortDataChange = (sortData) => {
    const { fromSortDataToParams } = this.props;
    let extraParams = sortData;
    if (typeof fromSortDataToParams === 'function') {
      extraParams = fromSortDataToParams(sortData);
    }
    this.search({
      extraParams,
    });
  };

  render() {
    const {
      formid,
      items,
      total,
      hiddenFields,
      children,
      showQueryField,
      showSearchButton,
      searchButtonText,
      hidePagination,
      paginationProps,
      validate,
      destroyOnUnmount,
      initialValues,
    } = this.props;

    let { ntype } = this.props;
    ntype = ntype || (hiddenFields && hiddenFields.ntype);
    let localStatuses = {};
    if (this.props.statuses) {
      localStatuses = this.props.statuses;
    }

    const searchForm = (
      <SearchForm
        formid={formid}
        form={formid}
        hiddenFields={hiddenFields}
        formFilter={children}
        statuses={localStatuses}
        classWapperSearchButton={this.props.classWapperSearchButton}
        showQueryField={showQueryField}
        showSearchButton={showSearchButton}
        searchButtonText={searchButtonText}
        onSubmit={this.handleSubmit}
        validate={validate}
        destroyOnUnmount={destroyOnUnmount}
        onChange={this.handleChange}
        initialValues={initialValues}
      />
    );

    const results = (
      <Results
        {...this.props}
        onPageChange={this.handlePageChange}
        onSortDataChange={this.handleSortDataChange}
        ntype={ntype}
        onSubmit={() => {
          this.search();
        }}
      />
    );

    const pagination = (
      <div>
        {items && total > 0 && !hidePagination && (
          <Pagination
            total={total}
            onPageChange={this.handlePageChange}
            {...paginationProps}
          />
        )}
      </div>
    );

    if (this.props.layout === 'TwoTen') {
      return (
        <div className="row">
          <div className="col-md-2">{searchForm}</div>
          <div className="col-md-10">
            {results}
            <div>{pagination}</div>
          </div>
        </div>
      );
    }

    // default layout
    return (
      <div>
        {searchForm}
        {results}
        {pagination}
      </div>
    );
  }
}

SearchWrapper.propTypes = {
  alternativeApi: PropTypes.string,
  autoSearchWhenStart: PropTypes.bool,
  autoSearchWhenValuesChange: PropTypes.bool,
  destroyOnUnmount: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  hasAnySearchResult: PropTypes.bool,
  formid: PropTypes.string.isRequired,
  formValues: PropTypes.shape(),
  hiddenFields: PropTypes.shape(),
  hidePagination: PropTypes.bool,
  initialValues: PropTypes.shape(),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  noResultText: PropTypes.string,
  objects: PropTypes.shape(),
  onSubmit: PropTypes.shape(),
  paginationProps: PropTypes.shape(),
  prepareDataBeforeSearch: PropTypes.func,
  renderNoResultComponent: PropTypes.func,
  renderResultsComponent: PropTypes.func.isRequired,
  resultId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchButtonText: PropTypes.string,
  searchResultKey: PropTypes.string,
  searchValues: PropTypes.shape(),
  showQueryField: PropTypes.bool,
  showResult: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  total: PropTypes.number.isRequired,
  validate: PropTypes.func,
  fromSortDataToParams: PropTypes.func,
  fromParamsToSortData: PropTypes.func,
};

SearchWrapper.defaultProps = {
  alternativeApi: null,
  autoSearchWhenStart: true,
  autoSearchWhenValuesChange: false,
  children: null,
  destroyOnUnmount: false,
  hasAnySearchResult: false,
  formValues: null,
  hiddenFields: {},
  hidePagination: false,
  initialValues: null,
  noResultText: '',
  objects: {},
  onSubmit: null,
  paginationProps: {},
  prepareDataBeforeSearch: null,
  renderNoResultComponent: null,
  resultId: '',
  searchButtonText: '',
  searchResultKey: '',
  searchValues: null,
  showQueryField: false,
  showResult: false,
  showSearchButton: false,
  statuses: {},
  validate: null,
  fromSortDataToParams: (sortData) => {
    const sortKey = sortData && Object.keys(sortData)[0];
    const sortValue = sortKey && sortData[sortKey];
    return {
      order_by: sortKey,
      order_value: sortValue,
    };
  },
  fromParamsToSortData: (params) => {
    const sortKey = params && params.order_by;
    const sortValue = params && params.order_value;
    return {
      [sortKey]: sortValue,
    };
  },
};

function mapStateToProps(state, props) {
  let results = [];
  const key = props.searchResultKey || props.formid;
  const resultFromStore = state.searchResults[key];

  if (resultFromStore && resultFromStore.result) {
    results = resultFromStore.result;
  }

  let total = 0;
  if (
    resultFromStore &&
    resultFromStore.objects &&
    (resultFromStore.objects.total || resultFromStore.objects.count)
  ) {
    total = resultFromStore.objects.total || resultFromStore.objects.count;
  }

  if (total === 0 && resultFromStore && resultFromStore.total > 0) {
    total = resultFromStore.total;
  }

  const objects = resultFromStore && resultFromStore.objects;
  const searchValues = resultFromStore && resultFromStore.searchValues;
  const resultId = resultFromStore && resultFromStore.resultId;

  return {
    hasAnySearchResult: typeof resultFromStore !== 'undefined',
    formValues: getFormValues(props.formid)(state),
    items: results,
    localSearchResultKey: key,
    objects,
    searchValues,
    resultId,
    total,
  };
}

export default connect(mapStateToProps)(SearchWrapper);
