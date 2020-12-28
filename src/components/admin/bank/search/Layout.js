import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { layouts } from 'configs/constants';
import { DefinedUrlParams } from 'routes/links/common';
import NodeNew from 'components/admin/node/new';
import Bank from 'components/admin/node/bank/Bank';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import ImportQuestionToBank from 'components/admin/question/import/Layout';
import getTopMenuItems, {
  filterBankListEnable,
} from 'components/admin/bank/menu/MainstageTopMenu';
import { getLearningItemFormSchema } from 'components/admin/node/schema-form/learning-items';
import { getThemeConfig } from 'utils/selectors';
import get from 'lodash.get';
import { t1 } from 'translate';

const hiddenFields = {};

class Layout extends Component {
  makeNtype = (type) => {
    switch (type) {
      case 'credit':
        return 'syllabus';
      case 'program':
        return 'path';
      default:
        return type;
    }
  };

  render() {
    const { type, action, themeConfig } = this.props;
    const bankList = filterBankListEnable();
    const ntype = this.makeNtype(type);
    const formid = `import_${ntype}`;
    const menuItems = getTopMenuItems().map((item) => (
      <Link to={item.href}>{item.label}</Link>
    ));

    // TODO: Fix this
    if (ntype === 'question') hiddenFields.type = 2;

    let subType = ['sco', 'question'].includes(type) ? undefined : type;
    if (get(themeConfig, 'layout') === layouts.EVN) {
      if (subType === 'path') {
        subType = 'program';
      } else if (subType === 'syllabus') {
        subType = 'credit';
      }
    }

    return (
      <div>
        <SubTopMenuContext
          buttons={menuItems}
          lastBreadcrumbName={t1('bank')}
          description={t1('bank_description')}
        />
        {action === 'import' && (
          <ImportQuestionToBank {...this.props} formid={formid} />
        )}
        {action !== 'import' && (
          <div>
            {action === 'new' && (
              <NodeNew
                ntype={ntype}
                schema={getLearningItemFormSchema(ntype)}
                mode="new"
                hiddenFields={hiddenFields}
              />
            )}
            {!action &&
              bankList &&
              bankList.map(
                (ntype, idx) =>
                  ntype === type && (
                    <Bank
                      key={`${type}-${idx}`}
                      ntype={ntype}
                      subType={subType}
                      mode="new"
                      mod="bank"
                      displayType="view_bank"
                    />
                  ),
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  let type = match && match.params && match.params[DefinedUrlParams.NTYPE];
  if (!type) type = 'video';

  const action = match && match.params && match.params.action;

  return {
    type,
    action,
    themeConfig: getThemeConfig(),
  };
};

export default connect(mapStateToProps)(Layout);
