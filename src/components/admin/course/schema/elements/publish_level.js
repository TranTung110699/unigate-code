import { t1 } from 'translate';
import InputToken from 'schema-form/elements/input-token';

const publishLevelOptions = () => [
  {
    value: 'open',
    primaryText: t1('public:_the_course_can_be_learned_from_anywhere'),
  },
  {
    value: 'intranet',
    primaryText: t1(
      "wan:_the_course_can_be_learned_on_company's_premises_only",
    ),
  },
  // {
  //   value: 'office',
  //   primaryText: t1(
  //     'office:_the_course_can_be_learned_through_local_network_only',
  //   ),
  // },
];

export const publish_level = () => ({
  type: 'select',
  label: t1('network_access_limit'),
  floatingLabelText: t1('network_access_limit'),
  hintText: t1('network_access_limit'),
  defaultValue: 'open',
  options: publishLevelOptions(),
  fullWidth: true,
});

export const ip_ranges = () => ({
  type: InputToken,
  floatingLabelText: t1(
    'ip_ranges_(you_can_input_multiple_ip_ranges_&_wildcards_like_127.0.0.*_are_supported',
  ),
  fullWidth: true,
});
