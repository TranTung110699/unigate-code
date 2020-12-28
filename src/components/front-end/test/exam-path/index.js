import React from 'react';
import PropTypes from 'prop-types';
import DisplayHtml from 'components/common/html';
import Icon from 'components/common/Icon';
import { ntype } from 'configs/constants';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import ExamShift from '../common/exam-shift';
import ExamShiftCustomized from '../common/exam-shift-customized';
import fetchData from './fetchData';
import './stylesheet.scss';

const routeToGeneratedExamShift = (rootUrl) => `${rootUrl}/exam_shift/:iid`;
const routeToCustomizedExamShift = (rootUrl) =>
  `${rootUrl}/exam_shift/customized/:iid`;

const getLinkToExamShift = (rootUrl, item) => {
  if (item && item.iid && item.ntype === ntype.COURSE) {
    if (item.exam_type === 'EXAM_SHIFT') {
      return `${rootUrl}/exam_shift/${item.iid}`;
    }
    return `${rootUrl}/exam_shift/customized/${item.iid}`;
  }
  return '';
};

const ExamShiftWrappedWithRouter = ({ className, match, component }) => {
  const { params } = match || {};
  const { iid } = params || {};
  const Component = component || (() => null);
  return <Component className={className} iid={iid} />;
};

const NestedRoutes = ({ className, rootUrl, defaultRender }) => (
  <Switch>
    <Route
      exact
      path={routeToGeneratedExamShift(rootUrl)}
      render={(props) => (
        <ExamShiftWrappedWithRouter
          {...props}
          className={className}
          component={ExamShift}
        />
      )}
      className={className}
    />
    <Route
      exact
      path={routeToCustomizedExamShift(rootUrl)}
      render={(props) => (
        <ExamShiftWrappedWithRouter
          {...props}
          className={className}
          component={ExamShiftCustomized}
        />
      )}
      className={className}
    />
    <Route render={defaultRender} />
  </Switch>
);

class ExamPath extends React.Component {
  displayHtmlStyle = { paddingTop: 10 };
  cssClass = 'etec-exam-path';

  render() {
    const { path, className, match } = this.props;
    if (!path) {
      return null;
    }

    const examShifts = path && path.children;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <div className={`${this.cssClass}__title-section`}>
          <h1 className={`${this.cssClass}__title`}>{path.name}</h1>
          <p>{path.title}</p>
          <hr className={`${this.cssClass}__title-separator`} />
          <Icon
            icon="star"
            className={`${this.cssClass}__title-separator-icon`}
          />
        </div>
        <div className={`${this.cssClass}__action-section`}>
          {Array.isArray(examShifts) &&
            examShifts.map(
              (examShift) =>
                examShift.iid && (
                  <NavLink
                    key={examShift.iid}
                    className={`${this.cssClass}__action`}
                    activeClassName={`${this.cssClass}__action--active`}
                    to={getLinkToExamShift(match.url, examShift)}
                  >
                    {examShift.name}
                  </NavLink>
                ),
            )}
        </div>
        <div className={`${this.cssClass}__content-section`}>
          <NestedRoutes
            rootUrl={match.url}
            className={`${this.cssClass}__content`}
            defaultRender={() => {
              const exam = examShifts && examShifts[0];
              if (exam && exam.iid) {
                return <ExamShift examShift={exam} iid={exam.iid} />;
              }
              return (
                <div className={`${this.cssClass}__content`}>
                  <DisplayHtml
                    content={path.description}
                    style={this.displayHtmlStyle}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }
}

ExamPath.propTypes = {
  className: PropTypes.string,
  iid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.shape(),
  match: PropTypes.shape(),
  path: PropTypes.shape(),
  type: PropTypes.string,
};

ExamPath.defaultProps = {
  className: '',
  iid: null,
  location: null,
  match: null,
  path: null,
  type: null,
};

export default withRouter(fetchData(ExamPath));
