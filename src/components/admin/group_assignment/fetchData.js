import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNodeSelector, isNodeDataEnough } from 'components/admin/node/utils';
import apiUrls from 'api-endpoints';
import actions from 'actions/node/creators';

const fetchData = (Component) => {
  class WrappedComponent extends React.Component {
    componentWillMount() {
      this.fetchSyllabusWithCustomProps(this.props, false);
    }

    componentWillReceiveProps(nextProps) {
      this.fetchSyllabusWithCustomProps(nextProps, true);
    }

    loading = false;

    fetchSyllabusWithCustomProps = (props, checkIfDataEnough) => {
      const { isSyllabusDataEnough, dispatch, node } = props;
      if ((!checkIfDataEnough || !isSyllabusDataEnough) && !this.loading) {
        this.loading = true;
        dispatch(
          actions.fetchNode({
            apiUrl: apiUrls.get_syllabus_with_assignment_of_course,
            iid: node.iid,
            executeOnSuccess: () => {
              this.loading = false;
            },
          }),
        );
      }
    };

    fetchSyllabus = () => {
      this.fetchSyllabusWithCustomProps(this.props);
    };

    render() {
      const { fullSyllabus, originalProps } = this.props;
      if (!fullSyllabus) {
        return null;
      }
      return (
        <Component
          {...originalProps}
          fetchSyllabus={this.fetchSyllabus}
          syllabus={fullSyllabus}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func,
    isSyllabusDataEnough: PropTypes.bool,
    node: PropTypes.shape(),
    originalProps: PropTypes.shape(),
    fullSyllabus: PropTypes.shape(),
  };

  WrappedComponent.defaultProps = {
    className: '',
    dispatch: null,
    isSyllabusDataEnough: false,
    node: null,
    originalProps: null,
    fullSyllabus: null,
  };

  const mapStateToProps = (state, props) => {
    const { node } = props;
    const syllabusIid = node && (node.syllabus || node.siid);
    const fullSyllabus = getNodeSelector(state)(syllabusIid, null, -1);
    const isSyllabusDataEnough = isNodeDataEnough(null, fullSyllabus, 1);

    return {
      syllabusIid,
      fullSyllabus,
      isSyllabusDataEnough,
      originalProps: props,
    };
  };

  return connect(mapStateToProps)(WrappedComponent);
};

export default fetchData;
