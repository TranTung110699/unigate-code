export const summitFormTypes = {
  HANDLE_SUMMIT_FORM: 'HANDLE_SUMMIT_FORM',
};

export default {
  handleSummitForm(url, method, values, options) {
    return {
      type: summitFormTypes.HANDLE_SUMMIT_FORM,
      url,
      method,
      values,
      options,
    };
  },
};
