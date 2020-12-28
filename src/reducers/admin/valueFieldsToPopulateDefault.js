function ValueFieldsToPopulateDefault(state = {}, { type, formid, values }) {
  switch (type) {
    case 'CHANGE_VALUE_OF_FIELDS_HAVE_TO_PERSIST': {
      return { ...state, [formid]: values };
    }
    default:
      return state;
  }
}

export default ValueFieldsToPopulateDefault;
