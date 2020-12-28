export default (props, paramName) => {
  let { match } = props;
  match = match || {};
  const params = match.params || {};
  const param = params[paramName];
  return param;
};
