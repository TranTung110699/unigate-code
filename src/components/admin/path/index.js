import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import ImportForm from 'components/admin/path/import/ImportForm';
import AssignUserToClass from 'components/admin/path/assign-user-to-class';

import NewForm from './new/Form';
import SearchForm from './search/Layout';
import ButtonNew from './new/ButtonNew';
import ButtonNewSubjectGroup from './new/subject-group/ButtonNew';
import { getPathname } from 'common/selectors/router';

class Layout extends Component {
  getContentDisplay = () => {
    const { type, action } = this.props;
    const hiddenFields = {
      ntype: 'path',
      type,
    };

    switch (action) {
      case 'new': {
        return (
          <NewForm mode="new" type={type} step={type === 'path' ? '' : type} />
        );
      }
      case 'assign': {
        return <AssignUserToClass />;
      }
      case 'import': {
        return <ImportForm formid="import_path_form" />;
      }
      default:
        return (
          <SearchForm hiddenFields={hiddenFields} type={type} action={action} />
        );
    }
  };

  getTopMenuButtons = () => {
    const { type, action } = this.props;
    const mod = action === 'import' ? 'path_import' : type || 'path';

    switch (mod) {
      case 'path':
      case 'path_import': {
        const importURL = getUrl('path', {
          action: 'import',
        });

        return [
          <Link to={importURL}>{t1('import')}</Link>,
          <ButtonNew label={t1('new_path')} type="path" />,
        ];
      }
      case 'subjectgroup':
        return [<ButtonNewSubjectGroup />];
      case 'classgroup':
        return [<ButtonNew label={t1('new_class_group')} type="classgroup" />];
      default:
    }

    return [];
  };

  render() {
    return (
      <div>
        <SubTopMenuContext buttons={this.getTopMenuButtons()} />
        {this.getContentDisplay()}
      </div>
    );
  }
}

/*
 Layout.propTypes = {
 type: PropTypes.string, // [either '' or 'program' ]
 };
 */
const mapStateToProps = (state) => {
  // get location
  let action = '';
  const location = getPathname(state);
  // const hashTmp = location.split('#');
  // if (hashTmp.length > 1)
  //   dialogHash = hashTmp[1];
  const tmp = location.split('/');
  let type = '';
  if (tmp.length >= 3 && tmp[2] === 'classgroup') type = 'classgroup';
  else if (tmp.length >= 4 && tmp[3] === 'subjectgroup') type = 'subjectgroup';
  else type = 'path';

  if (tmp.length >= 5 && ['new', 'assign', 'import'].includes(tmp[4])) {
    action = tmp[4];
  } else if (tmp.length >= 4 && ['new', 'assign', 'import'].includes(tmp[3])) {
    action = tmp[3];
  }

  return {
    type,
    action, // if it's '#new' then show the dialog?
  };
};

export default connect(mapStateToProps)(Layout);
