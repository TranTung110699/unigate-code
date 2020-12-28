export default function(state = { numberCommentOfSession: 0 }, action) {
  switch (action.type) {
    case 'NOTIFY_COMMENT_CHANGED': {
      return {
        ...state,
        numberCommentOfSession: parseInt(state.numberCommentOfSession, 10) + 1,
      };
    }
    default:
      return state;
  }
}
