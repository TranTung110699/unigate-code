import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { getThemeConfig } from 'utils/selectors';
import { layouts, schoolTypes } from 'configs/constants';
import get from 'lodash.get';

import DefaultResults from './DefaultResults';
import UmsStudentsResults from './UmsStudentsResults';
import EnterpriseUsersResults from './EnterpriseUsersResults';
import './../stylesheet.scss';
import fetchData from 'components/common/fetchData';
import SuccessAlert from '../../../../common/SuccessAlert';
import Warning from '../../../../common/Warning';

class Results extends Component {
  handleClick = () => {
    const { dispatch } = this.props;
    const url = apiUrls.import_students_action_request;
    const params = {
      id: get(this.props, 'importInfo.id'),
    };
    dispatch(sagaActions.confirmImportDataRequest(url, params));
  };

  renderResults = () => {
    const { themeConfig } = this.props;
    if (themeConfig && themeConfig.type === schoolTypes.ENTERPRISE) {
      return <EnterpriseUsersResults {...this.props} />;
    } else if (themeConfig.layout === layouts.UMS) {
      return <UmsStudentsResults {...this.props} />;
    }

    return <DefaultResults {...this.props} />;
  };

  render() {
    const importInfo = get(this.props, 'importInfo');
    const { importDataStatus, defaultPassword } = this.props;

    return (
      <div>
        <div className="row">
          <div className="button-center col-md-12">
            <div className="m-b-10">
              {defaultPassword ? (
                <SuccessAlert>
                  {t1('note_that_default_password_is_set_in_config_key')} :{' '}
                  <b>{defaultPassword}</b>
                  {t1('you_can_set_default_password_in_the_config_key')} :{' '}
                  <b>default_password_when_import_user</b>
                </SuccessAlert>
              ) : (
                <Warning>
                  {t1(
                    'you_should_set_default_password_is_set_in_the_config_key',
                  )}{' '}
                  : <b>default_password_when_import_user</b>
                </Warning>
              )}
            </div>

            {get(importInfo, 'report.error') === 0 && (
              <div>
                <b>{t1('click_confirm_to_import')}</b>
              </div>
            )}
            <div className="announcement-text row">
              <div className="col-md-4">
                {t1('total_students')}: {get(importInfo, 'report.count') || 0}
              </div>
              <div className="col-md-4">
                {t1('total_correct')}:{' '}
                {get(importInfo, 'report.available') || 0}
              </div>
              <div className="col-md-4">
                {t1('total_wrong')}: {get(importInfo, 'report.error') || 0}
              </div>
            </div>
            <div className="m-10">
              <RaisedButton
                name="formTemplate"
                type="submit"
                id="submit"
                label={t1('confirm_import')}
                onClick={this.handleClick}
                primary
              />
            </div>
          </div>
        </div>
        <div className="row">{this.renderResults()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    themeConfig: getThemeConfig(state),
    importDataStatus: state.importData.status,
  };
}

export default connect(mapStateToProps)(
  fetchData(() => ({
    baseUrl: '/user/import/get-default-password-when-import',
    propKey: 'defaultPassword',
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(Results),
);
