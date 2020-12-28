import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ntype } from 'configs/constants';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';

const slugOpenPaths = 'open_paths';
const slugExamPaths = 'exam_paths';

const navWrapper = (Component) => {
  class Wrapped extends React.Component {
    componentWillMount() {
      this.onFetchPaths(slugOpenPaths);
      this.onFetchPaths(slugExamPaths);
    }

    onFetchPaths = (slug) => {
      const { dispatch } = this.props;
      const params = {
        slug,
        ntype: ntype.PATH,
        depth: -1,
        editing_syllabus: 1,
      };
      const url = apiUrls.fetch_node;
      dispatch(sagaActions.getDataRequest({ url, keyState: slug }, params));
    };

    render() {
      const { learnPath, examPath } = this.props;
      return (
        <Component {...this.props} examPath={examPath} learnPath={learnPath} />
      );
    }
  }

  Wrapped.propTypes = {
    examPath: null,
    learnPath: PropTypes.shape(),
  };

  Wrapped.defaultProps = {
    examPath: null,
    learnPath: null,
  };

  const mapStateToProps = (state) => {
    const examPath = state.dataApiResults[slugExamPaths];
    const learnPath = state.dataApiResults[slugOpenPaths];

    return {
      examPath,
      learnPath,
    };
  };

  return connect(mapStateToProps)(Wrapped);
};

export default navWrapper;
