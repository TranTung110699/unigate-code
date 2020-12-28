import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { t1, t3 } from 'translate';
import { courseCompletedModes, courseModes } from 'configs/constants';
import Certificate from './images/certificate.png';
import lodashGet from 'lodash.get';
import Deadline from 'components/front-end/common/Deadline';
import { getOverviewCourseLink } from '../utils';
import ScoreAndPassing from '../score-and-passing-overview';
import { downloadCertificate } from 'components/front-end/course/utils';
import CourseInviteStatus from './InviteStatus';
import withUserInfo from 'common/hoc/withUserInfo';
import './stylesheet.scss';

class CourseItemInGridFooter extends Component {
  render() {
    const { mode, item, progress, viewUserIid, rootPathIid } = this.props;
    let courseActionElement = '';
    if (
      mode == courseModes.MODE_DELETED ||
      mode == courseModes.MODE_REJECTED ||
      mode == courseModes.MODE_ASSIGNED
    ) {
      courseActionElement = <CourseInviteStatus mode={mode} item={item} />;
    } else {
      switch (mode) {
        case courseModes.MODE_COMPLETED:
          courseActionElement = (
            <div className="completed-action">
              <p className={`pull-left passed-text`}>{t3('passed')}</p>
              <Link
                to={getOverviewCourseLink(item, viewUserIid, rootPathIid)}
                className="review-btn"
              >
                {t3('review')}
              </Link>
              {item && Boolean(Number.parseInt(item.certificate)) && (
                <img
                  src={Certificate}
                  title={t1('download_certificate_and_then_certificate_it')}
                  onClick={() => {
                    downloadCertificate(
                      item.iid,
                      viewUserIid || lodashGet(this.props, 'userInfo.iid'),
                      this.props.dispatch,
                    );
                  }}
                  className="download-certificate-img"
                  alt=""
                />
              )}
              <p className="pull-right point">
                {item.p}
                /100
              </p>
            </div>
          );
          break;
        case courseModes.MODE_FAILED:
          courseActionElement = (
            <div className="failed-action">
              <p className={`pull-left failed-text`}>{t3('failed')}</p>
              <Link
                to={getOverviewCourseLink(item, viewUserIid, rootPathIid)}
                className="review-btn"
              >
                {t3('review')}
              </Link>
              <p className="pull-right point">
                {item.p || 0}
                /100
              </p>
            </div>
          );
          break;
        case courseModes.MODE_IN_PROGRESS:
        case courseModes.MODE_PUBLIC:
        case courseModes.MODE_COMPULSORY: {
          let newNavId = null;
          if (
            item.lastLearnedItem &&
            item.lastLearnedItem.itemPid &&
            item.lastLearnedItem.itemIid
          ) {
            // TODO: Get index from lastLearnedItem, course
            const index = 1;
            newNavId = `${item.lastLearnedItem.itemPid}-${
              item.lastLearnedItem.itemIid
            }-${index}`;
          }

          courseActionElement = (
            <div className="in-progress-action p-t-5">
              <ScoreAndPassing item={item} mode="grid" />
              {/*
              <Link
                to={Links.LearnCourseByPath(item, newNavId, {
                  pathIid: null,
                  isPreview: null,
                })}
                className="continue-btn"
              >
                {progress && progress > 0 ? t3('continue') : t3('learn')}
              </Link>

                 */}
            </div>
          );

          break;
        }
        default:
          courseActionElement = (
            <button className="text-transform pull-right">
              {item.price && item.price !== 0 ? item.price : t1('free')}
            </button>
          );
          break;
      }
    }

    return (
      <React.Fragment>
        <span className="action-deadline">
          {!courseCompletedModes.includes(mode) && (
            <Deadline endDate={lodashGet(item, 'end_date')} />
          )}
        </span>
        {courseActionElement}
      </React.Fragment>
    );
  }
}

export default connect()(withUserInfo(CourseItemInGridFooter));
