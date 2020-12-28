import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1, t } from 'translate';
import sagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import Results from './Results';
import RaisedButton from 'components/common/mui/RaisedButton';

class Preview extends Component {
  handleClick = () => {
    const { dispatch, metadata, importEndpoint } = this.props;
    const url = importEndpoint || apiUrls.import_students_action_request;
    let params = this.props.params || {};
    params = Object.assign(params, { id: metadata.import_id });
    dispatch(sagaActions.confirmImportDataRequest(url, params));
  };

  renderResults = () => {
    return <Results {...this.props} />;
  };

  render() {
    const { metadata, node } = this.props;

    return (
      <div>
        <div className="button-center col-md-12">
          {metadata.wrong === 0 ? (
            <h4>
              {node && node.ntype === 'contest' ? (
                <div>
                  Thông tin danh sách thí sinh mời vào cuộc thi hợp lệ. Bạn nhấn
                  vào nút {t1('confirm_import')} để hoàn thành quá trình mời vào
                  cuộc thi.
                </div>
              ) : (
                <div>
                  Thông tin danh sách học viên mời vào {t('enrolment_plan')} hợp
                  lệ. Bạn nhấn vào nút {t1('confirm_import')} để hoàn thành quá
                  trình mời vào
                  {t('enrolment_plan')}.
                </div>
              )}
            </h4>
          ) : (
            <div />
          )}
          <div className="announcement-text row">
            <div className="col-md-4">Tổng số đăng lên: {metadata.total}</div>
            <div className="col-md-4">
              Tổng số dòng đúng: {metadata.correct}
            </div>
            <div className="col-md-4">Tổng số dòng sai: {metadata.wrong}</div>
          </div>
          <RaisedButton
            name="formTemplate"
            type="submit"
            id="submit"
            label={t1('confirm_import')}
            onClick={this.handleClick}
            primary
          />
        </div>

        <div className="button-center col-md-12">{this.renderResults()}</div>
      </div>
    );
  }
}

export default connect()(Preview);
