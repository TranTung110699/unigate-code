import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ApproveToggle from './ApproveToggle';
import routes from 'routes';
import Link from 'components/common/router/Link';
import { courseLearningTypes } from 'configs/constants';
import { getUrl } from 'routes/links/common';
import Icon from 'antd/lib/icon';
import styled from 'styled-components';
import AntButton from 'antd/lib/button';
// import

const AntIcon = styled(Icon)`
  font-size: 24px;
  margin-right: 15px;
`;

class CourseSearchResultActions extends React.PureComponent {
  render() {
    const {
      className,
      course,
      deleteSuccessful,
      searchFormId,
      deleteItemParams,
      blackListActions,
      isViewingEp, // the couse is currently displayed inside an EP
      showAction,
      showDelete,
      managerOnly,
      approvedOnly,
    } = this.props;
    const componentClassName = `${className || ''}`;

    const courseViewLink = getUrl(
      'node_edit',
      {
        ntype: 'course',
        iid: course.iid,
      },
      // isViewingEp
    );

    const target = courseViewLink
      ? {
          target: '_blank',
        }
      : {};

    if (managerOnly && !(blackListActions || []).includes('manage')) {
      return (
        <span>
          <Link to={courseViewLink} {...target}>
            <AntIcon type="eye" title={t1('manage_class')} />
          </Link>
        </span>
      );
    }

    if (approvedOnly && !(blackListActions || []).includes('approve')) {
      return (
        <ApproveToggle
          course={course}
          searchFormId={searchFormId}
          isSmall
          buttonOnly
        />
      );
    }

    if (showAction) {
      return (
        <div className={componentClassName}>
          {!(blackListActions || []).includes('manage') && (
            <span>
              <Link to={courseViewLink} {...target}>
                <AntButton icon="eye" size="small">
                  {t1('manage_class')}
                </AntButton>
              </Link>
            </span>
          )}
          {!(blackListActions || []).includes('approve') && (
            <ApproveToggle
              course={course}
              searchFormId={searchFormId}
              isSmall
            />
          )}
          {course.learning_type !== courseLearningTypes.ONLINE &&
            !(blackListActions || []).includes('timetable') &&
            !window.isETEP && (
              <span>
                {isViewingEp ? (
                  <a
                    href={routes.url('node_edit', {
                      ...course,
                      step: 'timetable',
                    })}
                    target="_blank"
                  >
                    <AntIcon type="schedule" title={t1('timetable')} />
                  </a>
                ) : (
                  <Link
                    to={routes.url('node_edit', {
                      ...course,
                      step: 'timetable',
                    })}
                  >
                    <AntIcon type="schedule" title={t1('timetable')} />
                  </Link>
                )}
              </span>
            )}
        </div>
      );
    }

    if (
      showDelete &&
      course.status !== 'deleted' &&
      !(blackListActions || []).includes('delete')
    ) {
      return (
        <DeleteItem
          title={t1('delete_this_class')}
          textComfirm={t1('are_you_sure_you_want_to_do_this')}
          formid={searchFormId || 'course_search'}
          ntype="course"
          params={deleteItemParams}
          onRequestSuccessful={() => {
            if (deleteSuccessful) {
              deleteSuccessful(course && course.iid);
            }
          }}
          itemId={course.id}
        />
      );
    }

    return (
      <div className={componentClassName}>
        {!(blackListActions || []).includes('approve') && (
          <div>
            <ApproveToggle course={course} searchFormId={searchFormId} />
          </div>
        )}
        <div className="m-t-10">
          {course.status !== 'deleted' &&
            !(blackListActions || []).includes('delete') && (
              <DeleteItem
                title={t1('delete_this_class')}
                textComfirm={t1('are_you_sure_you_want_to_do_this')}
                formid={searchFormId || 'course_search'}
                ntype="course"
                params={deleteItemParams}
                onRequestSuccessful={() => {
                  if (deleteSuccessful) {
                    deleteSuccessful(course && course.iid);
                  }
                }}
                itemId={course.id}
              />
            )}
          {course.learning_type !== courseLearningTypes.ONLINE &&
            !(blackListActions || []).includes('timetable') && (
              <span>
                {isViewingEp ? (
                  <a
                    href={routes.url('node_edit', {
                      ...course,
                      step: 'timetable',
                    })}
                    target="_blank"
                  >
                    <AntIcon type="schedule" title={t1('timetable')} />
                  </a>
                ) : (
                  <Link
                    to={routes.url('node_edit', {
                      ...course,
                      step: 'timetable',
                    })}
                  >
                    <AntIcon type="schedule" title={t1('timetable')} />
                  </Link>
                )}
              </span>
            )}
          {!(blackListActions || []).includes('manage') && (
            <span>
              <Link to={courseViewLink} {...target}>
                <AntIcon type="eye" title={t1('manage_class')} />
              </Link>
            </span>
          )}
        </div>
      </div>
    );
  }
}

CourseSearchResultActions.propTypes = {
  className: PropTypes.string,
};

CourseSearchResultActions.defaultProps = {
  className: '',
};

export default connect()(CourseSearchResultActions);
