import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';
import { getDataApiResultSelector } from 'components/admin/node/selectors/data-api-results';
import { getLoadingStatus } from 'utils/selectors';
import { createSelector } from 'reselect';
import isEqual from 'lodash.isequal';
import apiUrls from 'api-endpoints';
import actions from 'actions/node/saga-creators';

const fetchData = (Component) => {
  const keyState = 'duplicate_credit_syllabuses_in_current_program';

  class WrappedComponent extends React.Component {
    componentWillMount() {
      this.fetchDuplicatedCreditSyllabusInProgram(this.props);
    }

    componentDidUpdate(prevProps) {
      const { fullNode: prevFullNode } = prevProps;
      const { fullNode } = this.props;
      if (!isEqual(prevFullNode, fullNode)) {
        this.fetchDuplicatedCreditSyllabusInProgram(this.props);
      }
    }

    fetchDuplicatedCreditSyllabusInProgram = (props) => {
      const { dispatch, fullNode } = props;
      if (
        fullNode &&
        fullNode.ntype === 'path' &&
        fullNode.type === 'program' &&
        fullNode.iid
      ) {
        const config = {
          url: apiUrls.get_duplicated_credit_syllabus_in_program,
          keyState,
        };

        const params = {
          iid: fullNode.iid,
        };

        dispatch(actions.getDataRequest(config, params));
      }
    };

    render() {
      const {
        duplicatedCreditSyllabuses,
        originalProps,
        loadingStatus,
      } = this.props;
      return (
        <Component
          {...originalProps}
          loadingStatus={loadingStatus}
          duplicatedCreditSyllabuses={duplicatedCreditSyllabuses}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func,
    node: PropTypes.shape(),
    originalProps: PropTypes.shape(),
  };

  WrappedComponent.defaultProps = {
    className: '',
    dispatch: null,
    node: null,
    originalProps: null,
  };

  const mapStateToProps = (state, props) => {
    const { node } = props;
    const fullNode = getNodeSelector(state)(node && node.iid, null, -1);
    return {
      loadingStatus: getLoadingStatus(state)(keyState),
      duplicatedCreditSyllabuses: getDataApiResultSelector(state)(keyState),
      fullNode,
      originalProps: props,
    };
  };

  return connect(mapStateToProps)(WrappedComponent);
};

export default fetchData;
