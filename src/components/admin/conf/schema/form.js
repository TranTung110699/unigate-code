import { t1 } from 'translate';
import listSpeaker from './listSpeak';
import ldapServers from './ldapServers';
import importUsers from './templateImportUsers';
import academicCategoriesInGrade from './academicCategoriesInGrade';
import academicCategoriesThatGoTogether from './academicCategoriesThatGoTogether';

const schemaConfig = {
  listSpeaker,
  ldapServers,
  importUsersInNode: importUsers('import-users-in-node'),
  importUsersInTheSystem: importUsers('import-users-in-the-system'),
  academicCategoriesInGrade,
  academicCategoriesThatGoTogether,
};

const defaultSchema = {
  content: {
    type: 'text',
    floatingLabelText: t1('edit_content'),
    rowsMax: 10,
    rows: 4,
    multiLine: true,
    fullWidth: true,
  },
  type: {
    type: 'hidden',
  },
};

const getSchema = ({ renderElementToAdd = '', type = '' }) => {
  if (schemaConfig[renderElementToAdd]) {
    return {
      content: {
        type: type === 'object' ? 'section' : 'array',
        schema: schemaConfig[renderElementToAdd],
      },
      type: {
        type: 'hidden',
      },
    };
  }

  return defaultSchema;
};

const schema = (formid, values) => {
  if (values && values.renderElementToAdd) {
    return getSchema(values) || defaultSchema;
  }

  return defaultSchema;
};

const ui = {
  edit: [
    {
      id: 'default',
      fields: ['content', 'type'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
