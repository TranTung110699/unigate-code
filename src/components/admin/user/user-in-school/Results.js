import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { reduxForm } from 'redux-form';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { Link } from 'react-router-dom';
import { getThemeConfig } from 'utils/selectors';
import { getUrl } from 'routes/links/common';
import ResultsEnterprise from 'components/admin/group/edit/member/search-results/ResultsEnterprise';
import ResultsEnterpriseNew from 'components/admin/group/edit/member/search-results/ResultsEnterprise-new';
import ResultsK12 from 'components/admin/group/edit/member/search-results/ResultsK12';
import ResultsSis from 'components/admin/group/edit/member/search-results/ResultsSis';
import { schoolTypes } from 'configs/constants';
import { isK12 } from 'common/k12';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import Icon from '../../../common/Icon';

class Results extends Component {
  actionToggleDataSet = { on: 'add', off: 'kickout' };

  constructor(props) {
    super(props);

    this.unlockPath = this.unlockPath.bind(this);
    this.removeUnlockedPath = this.removeUnlockedPath.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
  }

  changeRelationWithPath(pathIid, userIid, url) {
    const { id, dispatch } = this.props;

    const params = {
      oid: pathIid,
      sid: userIid,
      object: 'path',
      subject: 'user',
      rt: 1,
      formid: id,
    };

    dispatch(commonSagaActions.changeRelationRequest(url, params));
  }

  changeRelationWithGroup(groupIid, userIid, url) {
    const { id, dispatch } = this.props;

    const params = {
      oid: userIid,
      sid: groupIid,
      object: 'user',
      subject: 'category',
      rt: 1,
      type: 'user_group',
      formid: id,
    };

    dispatch(commonSagaActions.changeRelationRequest(url, params));
  }

  unlockPath(pathIid, userIid) {
    this.changeRelationWithPath(pathIid, userIid, apiUrls.add_relation);
  }

  removeUnlockedPath(pathIid, userIid) {
    this.changeRelationWithPath(pathIid, userIid, apiUrls.remove_relation);
  }

  joinGroup(groupIid, userIid) {
    this.changeRelationWithGroup(groupIid, userIid, apiUrls.add_relation);
  }

  leaveGroup(groupIid, userIid) {
    this.changeRelationWithGroup(groupIid, userIid, apiUrls.remove_relation);
  }

  renderActionCell = (item) => {
    const { showEditAccountButton } = this.props;

    return (
      <span>
        {showEditAccountButton && (
          <Link to={getUrl('admin_view_student', item)}>
            <Icon title={t1('edit_user_account_information')} icon="preview" />
          </Link>
        )}
      </span>
    );
  };

  render() {
    const { themeConfig, renderActionCell, k12, isFeatureEnabled } = this.props;

    const Res = k12
      ? ResultsK12
      : themeConfig.type === schoolTypes.ENTERPRISE
      ? isFeatureEnabled(features.NEW_UI_JULY_2019)
        ? ResultsEnterpriseNew
        : ResultsEnterprise
      : ResultsSis;

    return (
      <div className="table-result">
        <Res
          {...this.props}
          renderActionCell={renderActionCell || this.renderActionCell}
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state, props) => {
  const domainInfo = state.domainInfo;
  const { resultFormId } = props;

  return {
    domain: domainInfo && domainInfo.domain,
    themeConfig: getThemeConfig(state),
    form: resultFormId || 'user_school_search_result',
    k12: isK12(state),
  };
};

export default connect(mapStateToProps)(
  reduxForm({})(withFeatureFlags()(Results)),
);
