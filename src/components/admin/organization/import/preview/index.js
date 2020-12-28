import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { getThemeConfig } from 'utils/selectors';
import Results from './Results';

// import { layouts } from 'configs/constants';

class Preview extends Component {
  h4Style = { color: 'red' };
  handleClick = () => {
    const { dispatch, metadata } = this.props;
    const url = apiUrls.import_organizations;
    const params = {
      import_id: metadata.import_id,
    };
    dispatch(sagaActions.confirmImportDataRequest(url, params));
  };

  render() {
    const { metadata, items, shouldDisableImportButtonIfNotValid } = this.props;
    const isOK = !metadata.wrong;
    const isDisableBecauseDataNotValid =
      shouldDisableImportButtonIfNotValid && metadata.correct <= 0;

    return (
      <div>
        <div className="button-center col-md-12">
          {isOK && (
            <h4>{`${t1('all_data_are_valid')}. ${t1(
              'Click_on_confirm_button_to_start_import',
            )}`}</h4>
          )}
          <h4 style={this.h4Style}>
            {isDisableBecauseDataNotValid &&
              `${t1('some_data_are_invalid')}. ${t1(
                'please_check_your_submited_file_again',
              )}`}
          </h4>
          {!isDisableBecauseDataNotValid && (
            <RaisedButton
              name="formTemplate"
              type="submit"
              id="submit"
              label={t1('confirm_import')}
              onClick={this.handleClick}
              primary
            />
          )}
          <div className="announcement-text">
            <div>
              {t1('total')}: {metadata.total}
            </div>
            <div>
              {t1('correct')}: {metadata.correct}
            </div>
            <div>
              {t1('wrong')}: {metadata.wrong}
            </div>
          </div>
        </div>
        <div className="button-center col-md-12">
          <Results items={items} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    themeConfig: getThemeConfig(state),
  };
}

export default connect(mapStateToProps)(Preview);
