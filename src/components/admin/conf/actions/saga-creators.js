const sagaActions = {
  reloadDefaultConfValueRequest: (value) => ({
    type: 'RELOAD_DEFAULT_CONF_VALUE_REQUEST',
    value,
  }),
};

export default sagaActions;
