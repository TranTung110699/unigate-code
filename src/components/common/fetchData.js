import React from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import { loadingStatuses } from 'configs/constants';
import CircularProgress from 'material-ui/CircularProgress';
import isEqual from 'lodash.isequal';
import usePrevious from './hook/usePrevious';

/**
 *
 * @param config
 *
 *    can be an object with keys:
 *      baseUrl: url to fetch,
 *      params: params to send to server,
 *      keyState: key to save value to redux store,
 *      propKey: name of prop used to pass api results to component,
 *      fetchCondition: function accept props => whether or not we should fetch data,
 *      refetchCondition: function accept props and previous props => whether or not we should refetch data,
 *
 *    or it can be a function that accept props and return the config config
 */
const fetchDataHOC = (config) => (Component) => {
  const getConfigKey = (props, key, defaultValue) => {
    if (typeof config === 'function') {
      const result = config(props)[key];
      if (typeof result !== 'undefined') {
        return result;
      }
    }

    if (typeof props[key] !== 'undefined') {
      return props[key];
    }

    if (typeof config[key] !== 'undefined') {
      return config[key];
    }

    return defaultValue;
  };

  const getApiParams = (props) => {
    return getConfigKey(props, 'params');
  };

  const getApiUrl = (props) => {
    return getConfigKey(props, 'baseUrl');
  };

  const getApiKeyState = (props) => {
    return getConfigKey(props, 'keyState');
  };

  const getApiHttpMethod = (props) => {
    return getConfigKey(props, 'method', 'get');
  };

  const checkShouldRenderLoading = (props) => {
    return getConfigKey(props, 'shouldRenderLoading', false);
  };

  const getRenderLoadingComponentFunction = (props) => {
    return getConfigKey(props, 'renderLoadingComponent');
  };

  const getPropKeyToStoreFetchResult = (props) => {
    return getConfigKey(props, 'propKey');
  };

  const getPropKeyToStoreExtraData = (props) => {
    return getConfigKey(props, 'propExtraDataKey');
  };

  const getPropKeyToStoreLoadingStatus = (props) => {
    return getConfigKey(props, 'loadingStatusPropKey', 'loadingStatus');
  };
  const getPropKeyToStoreFetchingStatus = (props) => {
    return getConfigKey(props, 'fetchStatusPropKey', 'isFetching');
  };

  const getPropKeyToStoreFetchFunction = (props) => {
    return getConfigKey(props, 'fetchFunctionPropKey', 'handleRefetch');
  };

  const getFormatDataResultFunction = (props) => {
    return getConfigKey(props, 'formatDataResult');
  };

  const getCheckFetchConditionFunction = (props) => {
    return getConfigKey(props, 'fetchCondition', true);
  };

  const getCheckRefetchConditionFunction = (props) => (prevProps) => {
    // if you want to control when to refetch
    const funcFromConfig = getConfigKey(props, 'refetchCondition');
    if (typeof funcFromConfig === 'function') {
      return funcFromConfig(prevProps);
    }

    // auto fetch if params changed
    const params = getApiParams(props);
    const prevParams = getApiParams(prevProps);
    return !isEqual(params, prevParams);
  };

  const Wrapped = ({ originalProps, data: dataFromProps, dispatch }) => {
    const prevOriginalProps = usePrevious(originalProps);

    const [
      { data: dataInState, extraData: extraDataInState },
      setDataInState,
    ] = React.useState({});

    const data =
      typeof dataInState !== 'undefined' ? dataInState : dataFromProps;

    const [loadingStatus, setLoadingStatus] = React.useState();
    const [isFetching, setIsFetching] = React.useState(true);

    const isFetchedRef = React.useRef(false);
    const setIsFetched = (v) => {
      isFetchedRef.current = v;
    };
    const checkIsFetched = () => isFetchedRef.current;

    const executeOnFetchDataSuccess = (newData, newExtraData) => {
      setDataInState({ data: newData, extraData: newExtraData });
    };

    const onLoadingStatusChange = (newLoadingStatus) =>
      setLoadingStatus(newLoadingStatus);

    const fetchData = (newParams = null) => {
      const keyState = getApiKeyState(originalProps);
      const apiUrl = getApiUrl(originalProps);
      const httpMethod = getApiHttpMethod(originalProps);

      dispatch(
        sagaActions.getDataRequest(
          {
            url: apiUrl,
            keyState: keyState,
            post: httpMethod === 'post',
            executeOnSuccess: keyState ? null : executeOnFetchDataSuccess,
            onLoadingStatusChange,
          },
          newParams || getApiParams(originalProps),
        ),
      );

      setIsFetched(true);
    };

    React.useEffect(() => {
      if (
        (!checkIsFetched() && getCheckFetchConditionFunction(originalProps)) ||
        (checkIsFetched() &&
          getCheckRefetchConditionFunction(originalProps)(prevOriginalProps))
      ) {
        fetchData();
      }
    });

    const newProps = (() => {
      const formatDataResult = getFormatDataResultFunction(originalProps);
      const result = {};

      // props about loadingStatus
      result[getPropKeyToStoreLoadingStatus(originalProps)] = loadingStatus;
      result[getPropKeyToStoreFetchingStatus(originalProps)] =
        loadingStatus !== loadingStatuses.FINISHED && typeof data !== undefined;

      if (getPropKeyToStoreExtraData(originalProps)) {
        result[getPropKeyToStoreExtraData(originalProps)] = extraDataInState;
      }

      if (getPropKeyToStoreFetchFunction(originalProps)) {
        result[getPropKeyToStoreFetchFunction(originalProps)] = fetchData;
      }

      // props about data returned from api
      if (typeof formatDataResult !== 'function') {
        result[getPropKeyToStoreFetchResult(originalProps)] = data;
        return result;
      }

      return Object.assign(result, formatDataResult(data, originalProps));
    })();

    const loading = (() => {
      const renderLoadingComponentFunc = getRenderLoadingComponentFunction(
        originalProps,
      );
      if (typeof renderLoadingComponentFunc === 'function') {
        return renderLoadingComponentFunc();
      }

      return <CircularProgress style={{ height: 90 }} />;
    })();

    const shouldRenderLoading = checkShouldRenderLoading(originalProps);

    if (
      checkIsFetched() &&
      loadingStatus !== loadingStatuses.FINISHED &&
      shouldRenderLoading
    ) {
      return loading;
    }

    return <Component {...Object.assign({}, originalProps, newProps)} />;
  };

  Wrapped.propTypes = {};

  Wrapped.defaultProps = {};

  const mapStateToProps = (state, props) => ({
    data: state.dataApiResults[getApiKeyState(props)],
    originalProps: props,
  });

  return connect(mapStateToProps)(Wrapped);
};

export default fetchDataHOC;
