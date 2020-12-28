import React, { Component } from 'react';
import { getParams } from 'common';
import ImportForm from './ImportForm';
import PreviewForm from './Preview';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from 'components/admin/user/menu/DynamicMenu';
import ImportUsers from '../../import-users';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import HelpImportUsers from './Help';

class Layout extends Component {
  render() {
    const params = getParams(this.props);

    if (!this.props.isSIS) {
      return [
        params.importId && <SubTopMenuContext schema={topMenuSchema()} />,
        <div>
          <HelpImportUsers />
          <ImportUsers importId={params.importId} />
        </div>,
      ].filter(Boolean);
    }

    if (params && params.importId) {
      return [
        <SubTopMenuContext schema={topMenuSchema()} />,
        <PreviewForm importId={params.importId} />,
      ];
    }
    return <ImportForm formid="import_students_form" />;
  }
}

export default withSchoolConfigs(Layout);
