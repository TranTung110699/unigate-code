import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LayoutHelper from 'layouts/LayoutHelper';
import Path from 'components/front-end/path/index';
import { Redirect } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import { ntype } from 'configs/constants';
import navWrapper from './common/navWrapper';
import ExamShiftNoSelectPaper from './common/exam-shift-no-select-paper';
import ExamPath from './exam-path';
import NavBar from './common/navBar';
import './stylesheet.scss';

class Test extends React.Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  cssClass = 'etec-test';

  getContent = ({ className, type, iid }) => {
    switch (type) {
      case 'exam_path': {
        return <ExamPath iid={iid} className={className} />;
      }
      case 'path': {
        return <Path piid={iid} />;
      }
      case 'exam_shift': {
        return <ExamShiftNoSelectPaper iid={iid} />;
      }
      default: {
        return null;
      }
    }
  };

  redirectToPathChild = () => {
    const { type, iid, examPath } = this.props;
    if (!type || !iid) {
      let conditionForChild = () => true;
      switch (type) {
        case 'exam_path': {
          conditionForChild = (child) => child.ntype === ntype.PATH;
          break;
        }
        case 'exam_shift': {
          conditionForChild = (child) =>
            child.ntype === ntype.COURSE && child.exam_type === 'EXAM_SHIFT';
          break;
        }
        default: {
          break;
        }
      }

      const firstChildOfExamPath =
        examPath &&
        Array.isArray(examPath.children) &&
        examPath.children.find((child) => !!child && conditionForChild(child));

      if (firstChildOfExamPath) {
        switch (firstChildOfExamPath.ntype) {
          case ntype.PATH: {
            return (
              <Redirect
                to={getFrontendUrl('tests', {
                  type: 'exam_path',
                  iid: firstChildOfExamPath.iid,
                })}
              />
            );
          }
          case ntype.COURSE: {
            if (firstChildOfExamPath.exam_type === 'EXAM_SHIFT') {
              return (
                <Redirect
                  to={getFrontendUrl('tests', {
                    type: 'exam_shift',
                    iid: firstChildOfExamPath.iid,
                  })}
                />
              );
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    }
    return null;
  };

  render() {
    const { className, type, iid, examPath, learnPath } = this.props;
    const Content = this.getContent;

    const redirectComponent = this.redirectToPathChild();
    if (redirectComponent) {
      return redirectComponent;
    }

    return (
      <div className={`${className || ''} container ${this.cssClass}`}>
        <NavBar
          examPath={examPath}
          learnPath={learnPath}
          className={`${this.cssClass}__header`}
          type={type}
          iid={iid}
        />
        <Content
          className={`${this.cssClass}__content`}
          type={type}
          iid={iid}
        />
      </div>
    );
  }
}

Test.propTypes = {
  className: PropTypes.string,
  examPath: PropTypes.shape(),
  iid: PropTypes.string,
  learnPath: PropTypes.shape(),
  type: PropTypes.string,
};

Test.defaultProps = {
  className: '',
  examPath: null,
  iid: null,
  learnPath: null,
  type: null,
};

const mapStateToProps = (state, props) => {
  const { match } = props;
  const { params } = match || {};
  const { type, iid } = params || {};

  return {
    type,
    iid,
  };
};

export default connect(mapStateToProps)(navWrapper(Test));
