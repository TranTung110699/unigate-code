import { t1 } from 'translate';
import RTE from 'schema-form/elements/richtext';

const schema = (formid) => ({
  site_name: {
    type: 'text',
    hintText: t1('site_name'),
    floatingLabelText: t1('site_name'),
    defaultValue: '',
  },
  website_title: {
    type: 'text',
    hintText: t1('website_title'),
    floatingLabelText: t1('website_title'),
    defaultValue: '',
  },
  website_description: {
    type: RTE,
    hintText: t1('website_description'),
    floatingLabelText: t1('website_description'),
    multiLine: true,
  },
});

const ui = () => [
  {
    fields: ['site_name', 'website_title', 'website_description'],
    id: 'g2',
  },
];

const seo = {
  schema,
  ui,
  // layout,
};

export default seo;
