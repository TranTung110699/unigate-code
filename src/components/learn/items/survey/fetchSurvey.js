import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getNodeSelector,
  isNodeDataEnough as isNodeDataEnoughFunc,
} from 'components/admin/node/utils';
import actions from 'actions/node/creators';

const fetchSurvey = (Component) => {
  class WrappedComponent extends React.Component {
    componentWillMount() {
      this.fetchNodeWithCustomProps(this.props, false);
    }

    loading = false;

    fetchNodeWithCustomProps = (props, checkIfDataEnough) => {
      const { isNodeDataEnough, dispatch, surveyIid } = props;
      if ((!checkIfDataEnough || !isNodeDataEnough) && !this.loading) {
        this.loading = true;
        dispatch(
          actions.fetchNode({
            iid: surveyIid,
            ntype: 'survey',
            executeOnSuccess: () => {
              this.loading = false;
            },
          }),
        );
      }
    };

    render() {
      const { isNodeDataEnough, originalProps } = this.props;
      if (!isNodeDataEnough) {
        return null;
      }
      return <Component {...originalProps} />;
    }
  }

  WrappedComponent.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func,
    isNodeDataEnough: PropTypes.bool,
    originalProps: PropTypes.shape(),
  };

  WrappedComponent.defaultProps = {
    className: '',
    dispatch: null,
    isNodeDataEnough: false,
    originalProps: null,
  };

  const mapStateToProps = (state, props) => {
    const { surveyIid } = props;
    const fullNode = getNodeSelector(state)(surveyIid, null, -1);
    const isNodeDataEnough = isNodeDataEnoughFunc(null, fullNode, -1);

    return {
      surveyIid,
      fullNode,
      isNodeDataEnough,
      originalProps: props,
    };
  };

  return connect(mapStateToProps)(WrappedComponent);
};

export default fetchSurvey;
