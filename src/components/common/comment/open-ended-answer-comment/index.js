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
import CommentDetail from '../comment-detail';
import AddComment from '../add-comment';
import addProps from 'components/common/addProps';
import { findDOMNode } from 'react-dom';

import ActionBar from '../action-bar';
import './stylesheet.scss';

import { commentTypes } from 'configs/constants/comment';

const getParamsToQueryComments = ({ collaboratingItem }) => {
  return {
    collaborating_item_iid: collaboratingItem && collaboratingItem.iid,
    type: commentTypes.COMMENT_OPEN_ENDED_QUESTION_ANSWER,
  };
};

const getParamsToSendComment = ({
  comment,
  collaboratingItem,
  syllabusIid,
  linkToItem,
}) => {
  const result = {
    comment: {
      collaborating_item: {
        iid: collaboratingItem.iid,
        id: collaboratingItem.id,
        take_id: collaboratingItem.take_id,
        question_iid: collaboratingItem.question_iid,
      },
      syllabus_iid: syllabusIid,
      link_to_item: linkToItem,
    },
    type: commentTypes.COMMENT_OPEN_ENDED_QUESTION_ANSWER,
    syllabus_iid: syllabusIid,
    step: commentTypes.COMMENT_OPEN_ENDED_QUESTION_ANSWER,
  };

  if (comment && comment.id) {
    result.reply_comment_item = comment.id;
  }

  return result;
};

const Comment = ({
  title,
  collaboratingItem,
  count_comments,
  user,
  displayInAdmin,
  onSendCommentSuccessfully,
  handleRefetch,
  syllabusIid,
  linkToItem,
  queryParams,
  onResolvedCommentSuccessfully,
  dispatch,
  defaultShowDetailComments,
  defaultCommentIdToFocus,
}) => {
  const scrolledToDefaultCommentToFocusToRef = React.useRef(false);
  const checkIfScrolledToDefaultCommentToFocusTo = () => {
    return scrolledToDefaultCommentToFocusToRef.current;
  };
  const setIfScrolledToDefaultCommentToFocusTo = (v) => {
    scrolledToDefaultCommentToFocusToRef.current = v;
  };

  const [
    domNodeOfDefaultCommentToFocus,
    setDomNodeOfDefaultCommentToFocus,
  ] = React.useState(false);

  React.useLayoutEffect(
    () => {
      if (
        !checkIfScrolledToDefaultCommentToFocusTo() &&
        defaultCommentIdToFocus &&
        domNodeOfDefaultCommentToFocus
      ) {
        domNodeOfDefaultCommentToFocus.scrollIntoView();
        setIfScrolledToDefaultCommentToFocusTo(true);
      }
    },
    [defaultCommentIdToFocus, domNodeOfDefaultCommentToFocus],
  );

  const defaultReplyCommentItem = get(queryParams, 'reply_comment_item');

  const [showDetailComments, setShowDetailComments] = React.useState(
    !!defaultReplyCommentItem || defaultShowDetailComments,
  );
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

  const getElementAddComment = (comment = null) => {
    return (
      <AddComment
        user={user}
        searchFormId={searchFormCommentsId}
        formid={
          comment && comment.id
            ? `reply_comment_${comment.id}`
            : `add_comment_${collaboratingItemId}`
        }
        displayInAdmin={displayInAdmin}
        paramsToSendComment={getParamsToSendComment({
          comment,
          collaboratingItem,
          syllabusIid,
          linkToItem,
        })}
        onSendCommentSuccess={onSendCommentSuccess}
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
        withRef={(el) => {
          const domNode = findDOMNode(el);
          if (get(item, 'id') === defaultCommentIdToFocus) {
            setDomNodeOfDefaultCommentToFocus(domNode);
          }
        }}
        replyCommentItem={get(queryParams, 'reply_comment_item')}
        key={item.iid || index}
        displayInAdmin={displayInAdmin}
        onResolveComment={handleResolveComment}
        item={item}
        elementReplyComment={
          get(reply_item, 'id') === item.id && get(reply_item, 'show')
            ? getElementAddComment(item)
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
        label={t1('comments_on')}
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
            })}
            alternativeApi={commentApiUrls.get_collaborating_item_comments}
            renderResultsComponent={renderResultsComponent}
          />
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  user: PropTypes.shape(),
  dispatch: PropTypes.func,
  title: PropTypes.string,
  collaboratingItem: PropTypes.shape(),
  syllabusIid: PropTypes.number,
  linkToItem: PropTypes.string,
  onSendCommentSuccessfully: PropTypes.func,
  onResolvedCommentSuccessfully: PropTypes.func,
  defaultShowDetailComments: PropTypes.bool,
};

const mapStateToProps = createSelector(
  (state) => state.user && state.user.info,
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
  (user, syllabusIid, newProps) => ({
    ...newProps,
    user,
  }),
);

const WithCommentCount = connect(mapStateToProps)(
  fetchData(({ collaboratingItem }) => ({
    baseUrl: commentApiUrls.count_collaborating_item_comments,
    params: getParamsToQueryComments({
      collaboratingItem,
    }),
    propKey: 'count_comments',
    fetchCondition: true,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(Comment),
);

const createVirtualCollaboratingItemToCommentOpenEndedQuestionAnswer = ({
  questionIid,
  takeId,
}) => {
  return {
    id: `${questionIid}-${takeId}`,
    iid: `${questionIid}-${takeId}`,
    take_id: takeId,
    question_iid: questionIid,
  };
};

export default addProps(({ questionIid, takeId }) => {
  return {
    collaboratingItem: createVirtualCollaboratingItemToCommentOpenEndedQuestionAnswer(
      {
        questionIid,
        takeId,
      },
    ),
  };
})(WithCommentCount);
