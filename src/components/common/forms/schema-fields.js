// json schema fields
import { required } from 'common/validators';
import { t1 } from 'translate';

export const input = (labelText, isRequired) => ({
  type: 'text',
  hintText: labelText,
  floatingLabelText: labelText,
  defaultValue: '',
  validate: isRequired ? [required()] : null,
});

export const avatar = () => ({
  type: 'text',
  hintText: t1('avatar'),
});

export const shareable = () => ({
  type: 'checkbox',
  label: t1('also_share_this_content_with_other_organizations'),
  defaultValue: 0,
});
