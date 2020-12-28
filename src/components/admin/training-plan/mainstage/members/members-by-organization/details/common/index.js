import { t1 } from 'translate';
import lodashGet from 'lodash.get';

export const getTitle = (node, organization) =>
  t1('students_of_organization_%s_in_training_plan_%s', [
    lodashGet(organization, 'name'),
    lodashGet(node, 'name'),
  ]);
