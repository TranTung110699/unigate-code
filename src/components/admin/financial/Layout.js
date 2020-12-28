import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import routes from 'routes';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';

import subjectGroupTopMenuSchema from 'components/admin/path/menu/MainstageTopMenuSubjectGroup';
import feeCategoriesTopMenuSchema from './mainstage/fee-categories/menu/teacher-menus';
import feeCategoryTopMenuSchema from './mainstage/fee-categories/menu/teacher-menus/fee-category';
import financeTemplateTopMenuSchema from './mainstage/finance-templates/menu/FeeTemplateMenu';
import appliedFeeTemplateTopMenuSchema from './mainstage/applied-fee-templates/menu/MainstageTopMenu';
import feeCollectingPhaseTopMenuSchema from './mainstage/fee-collecting-phase/menu/MainstageTopMenu';
import benefitTopMenuSchema from './mainstage/finance-templates/menu/BenefitMenu';
import walletTopMenuSchema from './mainstage/wallets/menu/MainstageTopMenu';
import depositTopMenuSchema from './mainstage/deposits/menu/MainstageTopMenu';

import { menuItems } from './menu/sub-menu-left-configs';

import SubjectGroupSearch from 'components/admin/path/search/Layout';
import SubjectFroupNewForm from 'components/admin/path/new/Form';
import SubjectsInGroup from 'components/admin/path/edit/EditContainer';
import DashBoard from './mainstage/dashboard';
import FeeCategories from './mainstage/fee-categories';
import FeeCategory from './mainstage/fee-categories/edit/EditContainer';
import FinanceTemplates from './mainstage/finance-templates/search/Layout';
import AppliedFeeTemplates from './mainstage/applied-fee-templates';
import FeeCollectingPhase from './mainstage/fee-collecting-phase';
import Wallets from './mainstage/wallets/search/Layout';
import WalletTypes from './mainstage/wallets/type/search/Layout';
import FeeUsers from './mainstage/fee-users';
import FeeCronJobs from './mainstage/fee-cron-jobs';
import Invoices from './mainstage/invoices/search/Layout';
import Deposits from './mainstage/deposits/search/Layout';
import FeeTransactions from './mainstage/fee-transactions';
import CreditSyllabuses from './mainstage/credit-syllabuses';
import InvoiceDetail from './mainstage/invoices/Detail';
import AutomaticPay from './mainstage/pay';
import { t1 } from 'translate';

class Layout extends Component {
  getTopMenuSchemaByAction(action, subAction, level3Action) {
    const node = {
      action: subAction,
      type: level3Action,
    };

    switch (action) {
      case 'fee-categories':
        return feeCategoriesTopMenuSchema();
      case 'subjectgroup':
        return subjectGroupTopMenuSchema();
      case 'fee-category':
        return feeCategoryTopMenuSchema(null, { node });
      case 'finance-templates':
        return financeTemplateTopMenuSchema();
      case 'benefits':
        return benefitTopMenuSchema();
      case 'applied-fee-templates':
        return appliedFeeTemplateTopMenuSchema(null, { node });
      case 'fee-collecting-phase':
        return feeCollectingPhaseTopMenuSchema(null, { node });
      case 'wallets':
        return walletTopMenuSchema();
      case 'deposits':
        return depositTopMenuSchema();
      default:
        return null;
    }
  }

  getContentByAction(action, subAction, level3Action) {
    let contentDisplay;

    switch (action) {
      case 'dashboard': {
        contentDisplay = <DashBoard />;
        break;
      }
      case 'fee-categories': {
        contentDisplay = <FeeCategories />;
        break;
      }
      case 'subjectgroup': {
        if (subAction) {
          const hiddenFields = {
            type: action,
            is_credit_transfert_group: subAction === 'new-free' ? 1 : 0,
          };

          contentDisplay = (
            <SubjectFroupNewForm
              mode="new"
              type={action}
              step={action}
              hiddenFields={hiddenFields}
            />
          );
          break;
        }
        const hiddenFields = {
          ntype: 'path',
          type: action,
        };
        contentDisplay = (
          <SubjectGroupSearch hiddenFields={hiddenFields} type={action} />
        );
        break;
      }
      case 'subjects-ingroup': {
        contentDisplay = <SubjectsInGroup />;
        break;
      }
      case 'fee-category': {
        contentDisplay = <FeeCategory />;
        break;
      }
      case 'finance-templates': {
        contentDisplay = <FinanceTemplates classification="fee" />;
        break;
      }
      case 'benefits': {
        contentDisplay = <FinanceTemplates classification="benefit" />;
        break;
      }
      case 'applied-fee-templates': {
        contentDisplay = (
          <AppliedFeeTemplates action={subAction} type={level3Action} />
        );
        break;
      }
      case 'fee-collecting-phase': {
        contentDisplay = (
          <FeeCollectingPhase action={subAction} type={level3Action} />
        );
        break;
      }
      case 'wallets': {
        if (subAction === 'type') {
          contentDisplay = <WalletTypes />;
          break;
        }
        contentDisplay = <Wallets />;
        break;
      }
      case 'fee-users': {
        contentDisplay = <FeeUsers />;
        break;
      }
      case 'fee-cron-jobs': {
        contentDisplay = <FeeCronJobs />;
        break;
      }
      case 'invoice': {
        contentDisplay = subAction ? (
          <InvoiceDetail invoiceIid={subAction} />
        ) : (
          <Invoices />
        );
        break;
      }
      case 'cancel-invoice': {
        contentDisplay = <Invoices type="cancel-invoice" />;
        break;
      }
      case 'deposits': {
        contentDisplay = <Deposits />;
        break;
      }
      case 'fee-transactions': {
        contentDisplay = <FeeTransactions />;
        break;
      }
      case 'credit-syllabuses': {
        contentDisplay = <CreditSyllabuses />;
        break;
      }
      case 'pay': {
        contentDisplay = <AutomaticPay />;
        break;
      }
      default: {
        contentDisplay = <Redirect to={routes.url('financial/dashboard')} />;
        break;
      }
    }

    return contentDisplay;
  }

  render() {
    const { action, subAction, level3Action } = this.props;

    return (
      <div>
        <SubLeftMenuContext schema={menuItems()} />
        <SubTopMenuContext
          action={action}
          schema={this.getTopMenuSchemaByAction(
            action,
            subAction,
            level3Action,
          )}
          lastBreadcrumbName={t1('financial')}
          description={t1('financial_description')}
        />
        {this.getContentByAction(action, subAction, level3Action)}
      </div>
    );
  }
}

Layout.propTypes = {
  action: PropTypes.string,
  subAction: PropTypes.string,
  level3Action: PropTypes.string,
};

Layout.defaultProps = {
  action: '',
  subAction: '',
  level3Action: '',
};

function mapStateToProps(state, props) {
  const {
    match: {
      params: { action, subAction, level3Action },
    },
  } = props;

  return {
    action,
    subAction,
    level3Action,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
