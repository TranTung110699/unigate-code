import React, { Component } from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import { change, getFormValues, isSubmitting, reset } from 'redux-form';
import { t1 } from 'translate';
import { createSelector } from 'reselect';

import Pagination from 'components/common/pagination';
import sagaActions from 'actions/node/saga-creators';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { diffObjects } from 'common/utils/object';
import Results from 'components/common/search-wrap/Results';
import Form from 'schema-form/Form';
import Loading from 'components/common/loading';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import actions from 'actions/creators';

import {
  hasAnySearchResultSelector,
  searchResultIdSelector,
  searchResultObjectsSelector,
  searchResultsSelector,
  searchResultTotalSelector,
  searchValuesSelector,
} from 'components/common/search-wrap/common';

class SearchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      itemsPerPage: 10,
    };
  }

  componentDidMount() {
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
    if (this.props.autoSearchWhenStart) {
      this.search();
    } else if (
      typeof this.props.autoSearchWhenStart === 'undefined' &&
      this.props.autoSearchWhenStartConfig
    )
      this.search();

    Object.keys(hiddenFields || {}).forEach((key) => {
      dispatch(change(formid, key, hiddenFields[key]));
    });
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
    const {
      valuesToSubmit,
      fieldsToPersistValueLocalstorage,
      formid,
      dispatch,
    } = this.props;
    if (
      Array.isArray(fieldsToPersistValueLocalstorage) &&
      fieldsToPersistValueLocalstorage.length
    ) {
      const values = {};
      fieldsToPersistValueLocalstorage.forEach((field) => {
        if (typeof valuesToSubmit[field] !== 'undefined') {
          values[field] = valuesToSubmit[field];
        }
      });

      if (Object.keys(values).length) {
        dispatch(actions.changeValueOfFieldsHaveToPersist({ formid, values }));
      }
    }

    this.search();
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit();
    }
  };

  handlePageChange = (pageNumber, itemsPerPage) => {
    this.search({ pageNumber, itemsPerPage });
    this.setState({ pageNumber, itemsPerPage });
  };

  search = (data = {}) => {
    const props = data.props || this.props;
    const extraParams = data.extraParams || {};
    const pageNumber = data.pageNumber || this.state.pageNumber;
    const itemsPerPage = data.itemsPerPage || this.state.itemsPerPage;
    const { method } = this.props;

    const {
      valuesToSubmit,
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

    const localValues = {
      ...(valuesToSubmit || {}),
      ...(extraParams || {}),
      submit: 1,
    };

    if (pageNumber) {
      localValues.page = pageNumber;
    }

    if (lodashGet(hiddenFields, 'items_per_page') || itemsPerPage) {
      localValues.items_per_page =
        lodashGet(hiddenFields, 'items_per_page') || itemsPerPage;
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
        { onSuccess, onFail, method },
      ),
    );

    // sync localValues to redux form (hiddenFields, sort data, ...)
    const { deleted, added, updated } = diffObjects(formValues, {
      ...(formValues || {}),
      ...(hiddenFields || {}),
      ...(extraParams || {}),
    });
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
    const { autoSearchWhenValuesChange, onChange } = this.props;

    if (autoSearchWhenValuesChange) {
      this.search();
    }
    if (typeof onChange === 'function') {
      onChange(values);
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
      showSearchButton,
      searchButtonText,
      hidePagination,
      paginationProps,
      validate,
      destroyOnUnmount,
      initialValues,
      schema,
      params,
      classFormFilter,
      renderLoadingComponent,
      isFormSubmitting,
      hasAnySearchResult,
      paginationPosition,
      isFeatureEnabled,
      noNeedBackground,
    } = this.props;

    let { ntype } = this.props;
    ntype = ntype || (hiddenFields && hiddenFields.ntype);

    // console.log({schema});
    let style = {
      // background: 'white',
      marginBottom: '10px',
    };
    if (!noNeedBackground) {
      style = {
        ...style,
        background: 'white',
      };
    }
    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      style = {
        ...style,
        borderRadius: 5,
      };
    }

    const submitLabels = {
      submitting: '.....',
      default: t1('search'),
    };

    const searchForm = (
      <Form
        formid={formid}
        form={formid}
        hiddenFields={hiddenFields}
        params={params}
        schema={schema}
        {...this.props}
        classWapperSearchButton={this.props.classWapperSearchButton}
        showSearchButton={showSearchButton}
        searchButtonText={searchButtonText}
        onSubmit={this.handleSubmit}
        validate={validate}
        destroyOnUnmount={destroyOnUnmount}
        onChange={this.handleChange}
        initialValues={initialValues}
        submitLabels={submitLabels}
        isSearch="1"
      />
    );
    const pagination =
      items && total > 0 && !hidePagination ? (
        <Pagination
          total={total}
          onPageChange={this.handlePageChange}
          {...paginationProps}
        />
      ) : null;

    const neverSubmitted = !hasAnySearchResult && !isFormSubmitting;

    const loading =
      typeof renderLoadingComponent === 'function' ? (
        renderLoadingComponent()
      ) : (
        <Loading circularLoadingIcon />
      );

    return (
      <div>
        <div className={classFormFilter} style={style}>
          {searchForm}
        </div>
        {paginationPosition === 'before' && pagination ? (
          <div>{pagination}</div>
        ) : null}
        {neverSubmitted ? null : (
          <div>
            {isFormSubmitting && loading}
            <Results
              {...this.props}
              onSortDataChange={this.handleSortDataChange}
              ntype={ntype}
              onSubmit={this.search}
              noResultTextMultiLine={
                showSearchButton || (schema && schema.isAdvanceSearch)
              }
            />
          </div>
        )}
        {paginationPosition !== 'before' && pagination ? (
          <div>{pagination}</div>
        ) : null}
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
  formValues: PropTypes.shape(),
  formid: PropTypes.string.isRequired,
  fromParamsToSortData: PropTypes.func,
  fromSortDataToParams: PropTypes.func,
  hasAnySearchResult: PropTypes.bool,
  hiddenFields: PropTypes.shape(),
  hidePagination: PropTypes.bool,
  initialValues: PropTypes.shape(),
  isFormSubmitting: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  noResultText: PropTypes.string,
  objects: PropTypes.shape(),
  onSubmit: PropTypes.shape(),
  paginationProps: PropTypes.shape(),
  prepareDataBeforeSearch: PropTypes.func,
  renderLoadingComponent: PropTypes.func,
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
  fieldsToPersistValueLocalstorage: PropTypes.arrayOf(PropTypes.any),
  paginationPosition: PropTypes.string, // could be either 'before' or 'after'. If 'before', it will be displayed before the Results table
};

SearchWrapper.defaultProps = {
  alternativeApi: null,
  // autoSearchWhenStart: true,
  autoSearchWhenValuesChange: false,
  children: null,
  destroyOnUnmount: false,
  formValues: null,
  hasAnySearchResult: false,
  hiddenFields: {},
  hidePagination: false,
  initialValues: null,
  isFormSubmitting: false,
  noResultText: '',
  objects: {},
  onSubmit: null,
  paginationProps: {},
  prepareDataBeforeSearch: null,
  renderLoadingComponent: null,
  renderNoResultComponent: null,
  resultId: '',
  searchButtonText: '',
  searchResultKey: '',
  searchValues: null,
  showQueryField: false,
  showResult: false,
  statuses: {},
  validate: null,
  fieldsToPersistValueLocalstorage: ['include_sub_organizations'],
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

const searchResultKeySelector = (state, props) =>
  props.searchResultKey || props.formid;

/**
 *
 * @param formValues
 * @param defaultValues ** Những giá trị mặc định luôn được gửi đi kể cả không được đĩnh nghĩa trường đó **
 * @returns {*} Những giá trị đươc gửi đi. Giá trị của form được ghi đè lên giá trị mặc định.
 */
const getValuesToSubmit = (formValues, defaultValues) => {
  if (!formValues || !defaultValues) {
    return formValues || defaultValues || {};
  }

  const values = { ...formValues };
  Object.keys(defaultValues).forEach((key) => {
    if (Array.isArray(formValues[key]) && !formValues[key].length) {
      values[key] = defaultValues[key];
    } else if (
      typeof formValues[key] === 'undefined' ||
      formValues[key] === null
    ) {
      values[key] = defaultValues[key];
    } else if (
      typeof formValues[key] === 'object' &&
      !Array.isArray(formValues[key]) &&
      typeof defaultValues[key] === 'object' &&
      !Array.isArray(defaultValues[key])
    ) {
      values[key] = getValuesToSubmit(formValues[key], defaultValues[key]);
    }
  });

  return values;
};

const getValues = (state, props = {}) => {
  const { formid } = props;
  return getFormValues(formid)(state);
};

const mapStateToProps = createSelector(
  getValues,
  (state, props) => lodashGet(state, 'domainInfo.conf.auto_search_when_start'),
  (state, props) => isSubmitting(props.formid)(state),
  searchResultKeySelector,
  (state, props) =>
    searchResultsSelector(state)(searchResultKeySelector(state, props)),
  (state, props) =>
    searchValuesSelector(state)(searchResultKeySelector(state, props)),
  (state, props) =>
    searchResultObjectsSelector(state)(searchResultKeySelector(state, props)),
  (state, props) =>
    searchResultIdSelector(state)(searchResultKeySelector(state, props)),
  (state, props) =>
    searchResultTotalSelector(state)(searchResultKeySelector(state, props)),
  (state, props) =>
    hasAnySearchResultSelector(state)(searchResultKeySelector(state, props)),
  (state, props) => props.hiddenFields,
  (state, props) => props.defaultValues,
  (
    formValues,
    autoSearchWhenStartConfig,
    isFormSubmitting,
    localSearchResultKey,
    items,
    searchValues,
    objects,
    resultId,
    total,
    hasAnySearchResult,
    hiddenFields,
    defaultValues,
  ) => {
    let valuesToSubmit = getValuesToSubmit(formValues, defaultValues);
    valuesToSubmit = { ...valuesToSubmit, ...(hiddenFields || {}) };

    return {
      hasAnySearchResult,
      autoSearchWhenStartConfig,
      formValues,
      isFormSubmitting,
      items,
      localSearchResultKey,
      objects,
      searchValues,
      resultId,
      total,
      valuesToSubmit,
    };
  },
);

export default connect(mapStateToProps)(withFeatureFlags()(SearchWrapper));
