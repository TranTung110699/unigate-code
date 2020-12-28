const sagaActions = {
  changeStatusRequest: (url, params, handleSuccess) => ({
    type: 'CHANGE_CARD_STATUS_REQUEST',
    url,
    params,
    handleSuccess,
  }),
};

export default sagaActions;
