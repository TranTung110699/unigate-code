import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import actions from 'actions/node/creators';
import lGet from 'lodash.get';
import { getConf } from 'utils/selectors/index';
import {
  allCreditSyllabusesAreOnlineOnly,
  creditSyllabusHasTags,
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
  enableScorm,
} from 'common/conf';
import UpdateForm from 'components/admin/syllabus/new/Form';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import CreditResultsOld from './CreditResults-old';
import CreditResultsNew from './CreditResults-new';

class Results extends Component {
  deepCloneSuccessFul = () => {
    const { dispatch, formid } = this.props;
    dispatch(submit(formid));
  };

  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_credit')}
        node={item}
        step="credit"
        formid="edit_credit"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_syllabus'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { isFeatureEnabled } = this.props;

    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      return (
        <CreditResultsNew
          {...this.props}
          deepCloneSuccessFul={this.deepCloneSuccessFul}
        />
      );
    }

    return (
      <CreditResultsOld
        {...this.props}
        deepCloneSuccessFul={this.deepCloneSuccessFul}
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => ({
  schoolType: lGet(state, 'domainInfo.school.type'),
  ntypesDeepCloneEnable:
    lGet(state, 'domainInfo.conf.ntypes_deep_clone_enable') || [],
  enableScormConfig: enableScorm(state.domainInfo),
  allCreditSyllabusesAreOnlineOnlyConfig: allCreditSyllabusesAreOnlineOnly(
    state.domainInfo,
  ),
  creditSyllabusHasTopEquivalentPositionCodeConfig: creditSyllabusHasTopEquivalentPositionCode(
    state.domainInfo,
  ),
  creditSyllabusLevelsConfig: creditSyllabusLevels(state.domainInfo),
  creditSyllabusHasTagsConfig: creditSyllabusHasTags(state.domainInfo),
  isRoot: lGet(state, 'domainInfo.isRoot'),
  academicCategoriesEnabled: getConf(state).academic_categories_enabled,
});

export default connect(mapStateToProps)(withFeatureFlags()(Results));
