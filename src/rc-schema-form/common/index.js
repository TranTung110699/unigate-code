import actionCreator from '../action-creators';
import Store from 'store';

export const options = {
  /**
   * endpoint
   */
  url: null,
  endpoint: null,

  /**
   *  onSummit(event, values)
   * The function that handle the dom event.
   * return true: the submit will be continues
   * return false: the summit will be cancel
   */
  onSummit: (event, values) => {
    return true;
  },

  /**
   *  beforeSummit(event, values)
   * The function that already call before summit function.
   * return data: that can be summit to server (include the values) or void
   */
  beforeSummit: (event, values) => {
    return {};
  },

  /**
   * onSuccess(setResult)
   *
   * the function that call when request setSuccess
   */
  onSuccess: (result, values) => {},

  /**
   * onFail(setResult)
   *
   * the function that call when request fail
   */
  onFail: (result, values) => {},

  /**
   * checkSuccessOnField: string
   *
   * sometime the setResult will return from server that don't have setSuccess field (if using the 3rd partner lib)
   */
  checkSuccessOnField: null,

  /**
   * dispatchFullResponse: boolean
   *
   * true: dispatch the full response that return from server.
   * default is fail: dispatch the full response.setResult
   */
  dispatchFullResponse: false,

  /**
   * dispatchAfterSuccess: (response.setResult) => {}
   *
   * the action creator that will becall after setSuccess
   */
  dispatchAfterSuccess: false,

  /**
   * method: summit method = postAsForm || get || post || more detail check all the method on common/network/http/Request
   */
  networkMethod: null,

  namespace: undefined,
};

export default {
  submitForm: (event, form, options) => {
    event.preventDefault();
    let {
      url,
      endpoint,
      onSummit,
      beforeSummit,
      onSuccess,
      onFail,
      checkSuccessOnField,
      dispatchFullResponse,
      dispatchAfterSuccess,
    } = options;
    let method = options.method || options.networkMethod || 'post';
    let data = options.data || {};
    let submitOptions = {
      onSuccess,
      onFail,
      checkSuccessOnField,
      dispatchFullResponse,
      dispatchAfterSuccess,
    };

    form.validateFields((err, values) => {
      if (!err) {
        let submitData = values || {};
        submitData = { ...submitData, ...data };
        if (beforeSummit) {
          const attachedData = beforeSummit(event, submitData) || {};
          submitData = { ...attachedData, ...submitData };
        }
        const isSubmitToServer = onSummit ? onSummit(event, submitData) : true;

        if (isSubmitToServer) {
          Store.dispatch(
            actionCreator.handleSummitForm(
              url || endpoint,
              method,
              submitData,
              submitOptions,
            ),
          );
        }
      }
    });
  },

  submitOptions: options,
};
