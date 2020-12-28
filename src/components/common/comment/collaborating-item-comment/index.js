import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import queryString from 'query-string';
import sagaNodeActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
// import apiUrls from 'api-endpoints/index';
import commentApiUrls from 'components/common/comment/endpoints';
import { t1 } from 'translate';
import { createSelector } from 'reselect';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import fetchData from 'components/common/fetchData';
import CommentDetail from '../comment-detail/ant-comment';
import AddComment from '../add-comment';
import withUserInfo from 'common/hoc/withUserInfo';

import ActionBar from '../action-bar';
import './stylesheet.scss';
import { commentTypes } from 'configs/constants/comment';
import Skeleton from 'antd/lib/skeleton';

const getParamsToQueryComments = ({ collaboratingItem, isLearn }) => {
  return {
    collaborating_item_iid: collaboratingItem && collaboratingItem.iid,
    is_learn: isLearn ? 1 : 0,
    type: commentTypes.COMMENT_COLLABORATING_ITEM,
  };
};

const getParamsToSendComment = ({
  comment,
  collaboratingItem,
  syllabusIid,
  courseIid,
  linkToItem,
  isLearn,
}) => {
  const result = {
    comment: {
      collaborating_item: {
        iid: collaboratingItem.iid,
        id: collaboratingItem.id,
        name: collaboratingItem.name,
      },
      syllabus_iid: syllabusIid,
      course_iid: courseIid,
      link_to_item: linkToItem,
      is_learn: isLearn ? 1 : 0,
    },
    type: commentTypes.COMMENT_COLLABORATING_ITEM,
    syllabus_iid: syllabusIid,
    course_iid: courseIid,
    step: commentTypes.COMMENT_COLLABORATING_ITEM,
  };

  if (comment && comment.id) {
    result.reply_comment_item = comment.id;
  }

  return result;
};

const ItemComments = ({
  title,
  collaboratingItem,
  isLearn,
  count_comments,
  userInfo,
  displayInAdmin,
  onSendCommentSuccessfully,
  handleRefetch,
  syllabusIid,
  courseIid,
  linkToItem,
  queryParams,
  onResolvedCommentSuccessfully,
  dispatch,
}) => {
  const defaultReplyCommentItem = get(queryParams, 'reply_comment_item');

  const [showDetailComments, setShowDetailComments] = React.useState(true); // !!defaultReplyCommentItem,
  const [reply_item, set_reply_item] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [replyCommentItem, setReplyCommentItem] = React.useState(
    defaultReplyCommentItem,
  );

  const collaboratingItemId = get(collaboratingItem, 'id');

  const searchFormCommentsId = `comment_search_${collaboratingItemId}`;

  const handleExpandComment = () => {
    setShowDetailComments((v) => !v);
  };

  const onSendCommentSuccess = () => {
    if (typeof handleRefetch === 'function') {
      handleRefetch();
    }
    if (onSendCommentSuccessfully) {
      onSendCommentSuccessfully(collaboratingItem);
    }

    setShowDetailComments(true);
  };

  const getElementAddComment = (comment = null, userToReply = null) => {
    const formid =
      comment && comment.id
        ? `reply_comment_${comment.id}`
        : `add_comment_${collaboratingItemId}`;

    return (
      <AddComment
        user={userInfo}
        searchFormId={searchFormCommentsId}
        formid={formid}
        key={formid}
        displayInAdmin={displayInAdmin}
        paramsToSendComment={getParamsToSendComment({
          comment,
          collaboratingItem,
          syllabusIid,
          courseIid,
          linkToItem,
          isLearn,
        })}
        onSendCommentSuccess={onSendCommentSuccess}
        userToReply={userToReply}
      />
    );
  };

  const handleResolveCommentSuccess = () => {
    if (typeof handleRefetch === 'function') {
      handleRefetch();
    }

    if (onResolvedCommentSuccessfully) {
      onResolvedCommentSuccessfully(collaboratingItem);
    }
  };

  const handleResolveComment = (item) => {
    const params = {
      _sand_step: 'resolved_comment_collaborating_item',
      id: item.id,
      iid: item.iid,
      syllabus_iid: syllabusIid,
      comment: { ...item.comment, is_resolved: 1 },
    };
    dispatch(
      sagaNodeActions.getDataRequest(
        {
          url: commentApiUrls.resolve_comment,
          post: 1,
          executeOnSuccess: handleResolveCommentSuccess,
          successMessage: t1('comment_is_resolved'),
          failureMessage: t1('you_do_not_have_permission_to_resolve'),
        },
        params,
      ),
    );
  };

  const renderComments = () => {
    if (!Array.isArray(comments)) {
      return null;
    }

    return comments.map((item, index) => (
      <CommentDetail
        canResolveComment={!isLearn}
        replyCommentItem={get(queryParams, 'reply_comment_item')}
        key={item.iid || index}
        displayInAdmin={displayInAdmin}
        onResolveComment={handleResolveComment}
        item={item}
        elementReplyComment={
          get(reply_item, 'id') === item.id && get(reply_item, 'show')
            ? getElementAddComment(item, get(item, 'user.name'))
            : null
        }
        handleShowReplyComment={() => {
          set_reply_item((reply_item) => {
            if (get(reply_item, 'id') !== item.id) {
              return {
                id: item.id,
                show: true,
              };
            }

            return {};
          });
        }}
      />
    ));
  };

  const renderResultsComponent = (
    newComments,
    { formValues, onPageChange },
  ) => {
    let newReplyCommentItem = replyCommentItem;

    if (isEqual(newComments, comments)) {
      return;
    }

    let page = null;
    let comment = null;
    if (newReplyCommentItem) {
      if (Array.isArray(newComments) && newComments.length) {
        comment = newComments.find(({ id }) => id === newReplyCommentItem);
        if (!comment) {
          page = ((formValues && formValues.page) || 1) + 1;
        } else {
          page = formValues.page;
          newReplyCommentItem = null;
        }
      } else if (formValues && formValues.page > 1) {
        newReplyCommentItem = null;
        page = 1;
      }
    }

    setComments(Array.isArray(newComments) ? newComments : []);
    setReplyCommentItem(newReplyCommentItem);

    //TODO: make sure this is called after setComments and setReplyCommentItem has been call successfully
    if (page && !comment) {
      onPageChange(page, 10);
    }
  };

  return (
    <div className="comment-component p-10">
      <ActionBar
        title={title}
        label={
          isLearn ? t1('student_comments_on') : t1('collaborators_comments_on')
        }
        handleExpandComment={handleExpandComment}
        item={collaboratingItem}
        totalComment={count_comments || 0}
        showDetailComments={showDetailComments}
      />
      {getElementAddComment()}

      {count_comments > 0 && (
        <div
          className={`comments ${
            showDetailComments
              ? 'show-detail-comments'
              : 'hidden-detail-comments'
          }`}
        >
          {renderComments()}
          <SearchWrapper
            formid={searchFormCommentsId}
            hiddenFields={getParamsToQueryComments({
              collaboratingItem,
              isLearn,
            })}
            alternativeApi={commentApiUrls.get_collaborating_item_comments}
            renderResultsComponent={renderResultsComponent}
            paginationProps={{
              className: 'comment-pagination',
              showExtraControl: false,
            }}
            renderNoResultComponent={() => <Skeleton active />}
          />
        </div>
      )}
    </div>
  );
};

ItemComments.propTypes = {
  // user: PropTypes.shape(),
  dispatch: PropTypes.func,
  title: PropTypes.string,
  collaboratingItem: PropTypes.shape(),
  syllabusIid: PropTypes.number,
  linkToItem: PropTypes.string,
  collaboratingItemId: PropTypes.string,
  onSendCommentSuccessfully: PropTypes.func,
  onResolvedCommentSuccessfully: PropTypes.func,
  isLearn: PropTypes.bool,
};

ItemComments.defaultProps = {
  // user: null,
  dispatch: null,
  title: '',
  collaboratingItem: null,
  syllabusIid: null,
  linkToItem: null,
  collaboratingItemId: null,
  onSendCommentSuccessfully: null,
  onResolvedCommentSuccessfully: null,
  isLearn: false,
};

const getCollaboratingItem = (collaboratingItemId, collaboratingItem) => {
  if (collaboratingItemId == collaboratingItem && collaboratingItem.id)
    return collaboratingItem;

  const children = collaboratingItem.children;
  if (!children) return collaboratingItem;

  const obj = children.find((item) => item.id == collaboratingItemId);
  return obj && obj.iid ? obj : collaboratingItem;
};

const mapStateToProps = createSelector(
  (state, props) => props.collaboratingItemId,
  (state, props) => props.collaboratingItem,
  (state, props) => props.syllabusIid,
  (state, props) => {
    const queryParams = queryString.parse(window.location.search);
    const newProps = {
      queryParams,
    };
    if (queryParams.reply_comment_item) {
      newProps.linkToItem = window.location.pathname;
    }
    return newProps;
  },
  (collaboratingItemId, collaboratingItem, syllabusIid, newProps) => ({
    ...newProps,
    collaboratingItemId,
    collaboratingItem: getCollaboratingItem(
      collaboratingItemId,
      collaboratingItem,
    ),
  }),
);

export default connect(mapStateToProps)(
  fetchData(({ collaboratingItem, isLearn }) => ({
    baseUrl: commentApiUrls.count_collaborating_item_comments,
    params: getParamsToQueryComments({
      collaboratingItem,
      isLearn,
    }),
    propKey: 'count_comments',
    fetchCondition: true,
    // refetchCondition: false,
    refetchCondition: (prevProps) =>
      prevProps.collaboratingItem.iid !== collaboratingItem.iid,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(withUserInfo(ItemComments)),
);
