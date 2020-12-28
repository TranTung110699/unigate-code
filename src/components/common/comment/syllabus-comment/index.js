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

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import CommentDetail from '../comment-detail/ant-comment';
import AddComment from '../add-comment';

import ActionBar from '../action-bar';
import './stylesheet.scss';
import { commentTypes } from 'configs/constants/comment';

const getParamsToQueryComments = ({ syllabusIid, isLearn }) => {
  return {
    collaborating_item_iid: syllabusIid,
    is_learn: isLearn ? 1 : 0,
    type: commentTypes.COMMENT_SYLLABUS,
  };
};

const getParamsToSendComment = ({
  comment,
  syllabus,
  syllabusIid,
  linkToItem,
  isLearn,
  syllabusApproval,
}) => {
  const result = {
    comment: {
      collaborating_item: {
        iid: syllabus.iid,
        id: syllabus.id,
        name: syllabus.name,
      },
      syllabus_iid: syllabusIid,
      link_to_item: linkToItem,
      is_learn: isLearn ? 1 : 0,
      syllabus_approval: syllabusApproval,
    },
    type: commentTypes.COMMENT_SYLLABUS,
    syllabus_iid: syllabusIid,
    step: commentTypes.COMMENT_SYLLABUS,
  };

  if (comment && comment.id) {
    result.reply_comment_item = comment.id;
  }

  return result;
};

const Comment = ({
  title,
  syllabus,
  isLearn,
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
}) => {
  const defaultReplyCommentItem = get(queryParams, 'reply_comment_item');

  const [showDetailComments, setShowDetailComments] = React.useState(true); // !!defaultReplyCommentItem,
  const [syllabusApproval, setSyllabusApproval] = React.useState('reject');
  const [reply_item, set_reply_item] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [replyCommentItem, setReplyCommentItem] = React.useState(
    defaultReplyCommentItem,
  );

  const searchFormCommentsId = `comment_search_${syllabusIid}`;

  const handleExpandComment = () => {
    setShowDetailComments((v) => !v);
  };

  const onSendCommentSuccess = () => {
    if (typeof handleRefetch === 'function') {
      handleRefetch();
    }
    if (onSendCommentSuccessfully) {
      onSendCommentSuccessfully(syllabus);
    }

    setShowDetailComments(true);
  };

  const getElementAddComment = (comment = null, userToReply = null) => {
    return (
      <AddComment
        user={user}
        searchFormId={searchFormCommentsId}
        formid={
          comment && comment.id
            ? `reply_comment_${comment.id}`
            : `add_comment_${syllabusIid}`
        }
        displayInAdmin={displayInAdmin}
        paramsToSendComment={getParamsToSendComment({
          comment,
          syllabus,
          syllabusIid,
          linkToItem,
          isLearn,
          syllabusApproval,
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
      onResolvedCommentSuccessfully(syllabus);
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
        item={syllabus}
        totalComment={count_comments || 0}
        showDetailComments={showDetailComments}
      />
      {getElementAddComment()}
      <RadioButtonGroup
        defaultSelected={'reject'}
        onChange={(event, value) => {
          setSyllabusApproval(value);
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RadioButton
          value="approve"
          label={t1('ready_to_be_used')}
          style={{
            width: '25%',
          }}
        />
        <RadioButton
          value="reject"
          label={t1('not_ready')}
          style={{
            width: '25%',
          }}
        />
      </RadioButtonGroup>
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
              syllabusIid,
              isLearn,
            })}
            alternativeApi={commentApiUrls.get_collaborating_item_comments}
            renderResultsComponent={renderResultsComponent}
            paginationProps={{
              className: 'comment-pagination',
              showExtraControl: false,
            }}
          />
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  user: PropTypes.shape(),
  displayInAdmin: PropTypes.bool,
  title: PropTypes.string,
  syllabus: PropTypes.shape(),
  syllabusIid: PropTypes.number,
  linkToItem: PropTypes.string,
  onSendCommentSuccessfully: PropTypes.func,
  onResolvedCommentSuccessfully: PropTypes.func,
  isLearn: PropTypes.bool,
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

export default connect(mapStateToProps)(
  fetchData(({ syllabusIid, isLearn }) => ({
    baseUrl: commentApiUrls.count_collaborating_item_comments,
    params: getParamsToQueryComments({
      syllabusIid,
      isLearn,
    }),
    propKey: 'count_comments',
    fetchCondition: true,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(Comment),
);
