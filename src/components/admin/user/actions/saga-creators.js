const sagaActions = {
  changeStatusRequest: (url, params) => ({
    type: 'CHANGE_STATUS_REQUEST',
    url,
    params,
  }),
  changeUsersExamRoundRequest: (userIds, examRound, contestCode) => ({
    type: 'CHANGE_USERS_EXAM_ROUND_REQUEST',
    userIds,
    examRound,
    contestCode,
  }),
  downloadImportTemplateRequest: (param) => ({
    type: 'DOWNLOAD_IMPORT_TEMPLATE_REQUEST',
    param,
  }),
};

export default sagaActions;
