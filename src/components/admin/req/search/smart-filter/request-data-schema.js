import getLodash from 'lodash.get';
import { reqTypes } from 'configs/constants/index';
import registerCreditSyllabusSchema from './register-credit-syllabus-schema';
import postponeFeeDeadlineSchema from './postpone-fee-deadline-schema';

const schema = (formid, values) => {
  const requestType = getLodash(values, 'request_type');
  const result = {};

  let schemaByRequestType = {};
  switch (requestType) {
    case reqTypes.REGISTER_CREDIT_SYLLABUS: {
      schemaByRequestType = {
        type: 'section',
        schema: registerCreditSyllabusSchema,
      };
      break;
    }
    case reqTypes.POSTPONE_FEE_DEADLINE: {
      schemaByRequestType = {
        type: 'section',
        schema: postponeFeeDeadlineSchema,
      };
      break;
    }
    default: {
      break;
    }
  }

  result[requestType] = schemaByRequestType;

  return result;
};

const ui = (step, values) => [
  {
    id: 'default',
    fields: [getLodash(values, 'request_type')],
  },
];

export default { schema, ui };
