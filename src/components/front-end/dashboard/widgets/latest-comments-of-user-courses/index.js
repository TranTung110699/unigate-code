import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
// import apiUrls from 'api-endpoints';
import commentApiUrls from 'components/common/comment/endpoints';
import AntComment from 'antd/lib/comment';
import Avatar from 'components/common/avatar';
import lodashGet from 'lodash.get';
import { displayDurationSinceEpochTime } from 'common/utils/Date';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import DisplayHtml from 'components/common/html';

const renderResultsComponent = (items) => {
  return (items || []).map((it) => {
    return (
      <AntComment
        author={lodashGet(it, 'user.name')}
        datetime={t1('%s_ago', [
          displayDurationSinceEpochTime(lodashGet(it, 'ts')),
        ])}
        content={<DisplayHtml content={lodashGet(it, 'comment.content')} />}
        avatar={<Avatar user={lodashGet(it, 'user')} />}
        actions={[
          <span>
            <Link
              className="text-muted"
              style={{
                fontSize: 12,
              }}
              to={lodashGet(it, 'comment.link_to_item')}
            >
              {t1('comment_on_course_%s', [lodashGet(it, 'course.name')])}
            </Link>
          </span>,
        ]}
      />
    );
  });
};

const LatestCommentsOfUserCourses = ({}) => {
  return (
    <SearchWrapper
      formid={'latest_comments_widget'}
      alternativeApi={commentApiUrls.get_latest_comments_of_user_courses}
      renderResultsComponent={renderResultsComponent}
      paginationProps={{
        showExtraControl: false,
        itemPerPage: [20],
      }}
      showSearchButton={false}
      renderNoResultComponent={() => (
        <div className="text-center">{t1('there_are_no_comments_yet')}</div>
      )}
    />
  );
};

export default LatestCommentsOfUserCourses;
