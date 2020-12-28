import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { equivalentPositionsAutoComplete } from 'components/admin/equivalent-job-position/schema/elements';
import { positionsAutoComplete } from 'components/admin/job-position/schema/elements';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { hasOrganization } from 'common/conf';
import { required } from 'common/validators';

import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import PositionsResultWithMinScore from '../positions-result/PositionsResultWithMinScore';
import {
  examRoundsSelectBox,
  examShiftsSelectBox,
} from 'components/admin/contest/common/elements';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (forRecap = false, forAdvanceSearch = false) => (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
) => {
  let element = {
    exam_round_iid: examRoundsSelectBox(values, null, true),
    exam_shift_iid: examShiftsSelectBox(values),
    advancing_criterion: {
      type: 'select',
      floatingLabelText: t1('advancing_criterion'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: constants.advancingCriteria(),
    },
    number_of_advancing_contestants: {
      type: 'number',
      floatingLabelText: t1('number_of_advancing_contestants'),
      floatingLabelFixed: true,
      fullWidth: true,
    },
    min_score: {
      type: 'number',
      floatingLabelText: t1('min_score'),
      floatingLabelFixed: true,
      fullWidth: true,
    },
    filter_passed_exam_result: {
      type: 'checkbox',
      label: t1('filter_passed_exam_result'),
      inline: true,
    },
    job_positions: positionsAutoComplete(formid, PositionsResultWithMinScore, {
      floatingLabelText: t1('filter_by_job_positions_and_score'),
    }),
    equivalent_job_positions: equivalentPositionsAutoComplete(
      formid,
      PositionsResultWithMinScore,
      {
        floatingLabelText: t1('filter_by_equivalent_job_positions_and_score'),
      },
    ),
    codes: {
      type: 'text',
      floatingLabelText: t1('search_by_codes'),
      hintText: `${t1('ex:_3awQMtU4,_CPB3A5To')}...`,
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    organizations: organizations({
      formid,
      defaultValue: props.orgIids,
      label: t1('enrolment_plan_organizers', 1),
      validate: [required()],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: 1,
    }),
  };

  if (forAdvanceSearch) {
    if (forRecap) {
      return addPropsToEverySchemaElements(element, {
        elementDisplayMode: elementDisplayModes.RECAP,
      });
    }
  } else {
    element = {
      q: {
        type: 'text',
        floatingLabelText: t1('search_contestant_(name,_email...)'),
        floatingLabelFixed: false,
        errorText: '',
        fullWidth: true,
      },
      ...element,
    };
  }

  return element;
};

const getFormFilterFields = (forAdvanceSearch) => (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  const extraField =
    values && values.advancing_criterion && values.advancing_criterion === 'top'
      ? 'number_of_advancing_contestants'
      : 'min_score';

  return [
    ...(!forAdvanceSearch ? ['exam_round_iid', 'exam_shift_iid'] : []),
    // Do nếu thêm phần này requirement sẽ khá phức tạp để làm mượt với phần exam_result_status, nên tạm thời sẽ để làm sau
    /* 'advancing_criterion',
    extraField, */
    'filter_passed_exam_result',
    ...(!forAdvanceSearch ? ['q'] : []),
    'codes',
    ...(props.showJobPosition
      ? ['job_positions', 'equivalent_job_positions']
      : []),
    ...(hasOrganization(domainInfo)
      ? ['organizations', 'include_sub_organizations']
      : []),
  ];
};

const ui = (forAdvanceSearch = false, props) => (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  oldprops,
  mode,
  domainInfo,
) => {
  if (!props) {
    props = oldprops;
  }
  return [
    {
      id: 'id',
      fields: getFormFilterFields(forAdvanceSearch)(
        step,
        values,
        themeConfig,
        xpath,
        formid,
        props,
        mode,
        domainInfo,
      ),
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false, props = {}) => ({
  schema: schema(forRecap, forAdvance),
  ui: ui(forAdvance, props),
  layout: forAdvance
    ? forRecap
      ? {
          freestyle: 1,
          component: MinimalSearchRecapFreeStyleLayout,
        }
      : commonFormLayouts.DEFAULT
    : { component: SearchFormLayoutFreestyle, freestyle: 1 },
});

export const searchFormSchema = (props = {}) => getSchema(false, true, props);
export const searchRecapFormSchema = (props = {}) =>
  getSchema(true, true, props);

export default getSchema();
