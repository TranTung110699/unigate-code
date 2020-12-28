import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { confSelector } from 'common/selectors';
import { getDefaultVideoProviderGivenConf } from 'common/conf';

const withDefaultVideoProviderConfig = ({ propKey = 'defaultVideoProvider' }) =>
  connect(
    createSelector(
      confSelector,
      (conf) => ({
        [propKey]: getDefaultVideoProviderGivenConf(conf),
      }),
    ),
  );

export default withDefaultVideoProviderConfig;
