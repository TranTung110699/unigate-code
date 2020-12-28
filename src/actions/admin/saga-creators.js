const adminSagaActions = {
  loginAs: (payload) => ({
    type: 'LOGIN_AS',
    payload, // could be user name, mail, iid
  }),
  synchronizeDataFromDatabaseToRedis: (url, params) => ({
    type: 'SYNCHRONIZE_DATA_FROM_DATABASE_TO_REDIS',
    url,
    params,
  }),
};

export default adminSagaActions;
