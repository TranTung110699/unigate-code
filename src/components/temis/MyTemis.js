import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withTemisConfig from 'common/hoc/withTemisConfig';
import { editBdtx, editProfile, editTcnn } from './routes';
import Icon from 'components/common/Icon';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import { timestampToDateTimeString } from 'common/utils/Date';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';
import { isHieuTruong } from 'components/admin/user/utils';

const lastUpdated = (ts) => {
  return ts ? (
    <span>
      {' '}
      {t1('last_updated')}: {timestampToDateTimeString(ts)}{' '}
    </span>
  ) : (
    <span>
      <Warning inline>{t1('never_updated')}</Warning> <Icon icon="edit" />
    </span>
  );
};

const iconStyle = {
  fontSize: '800%',
  marginBottom: '20px',
};

class MyTemis extends Component {
  render() {
    const { userId, userIid, temisInfo, temisConfig } = this.props;
    const profile = temisInfo && lodashGet(temisInfo, 'profile');
    const gv = temisInfo && lodashGet(temisInfo, 'gv');
    const ht = temisInfo && lodashGet(temisInfo, 'ht');
    const surveyIid = temisInfo && lodashGet(temisInfo, 'survey_iid');
    const surveyTake = temisInfo && lodashGet(temisInfo, 'surveyTake');
    const globalSurveyTake =
      temisInfo && lodashGet(temisInfo, 'globalSurveyTake');
    const user = temisInfo && lodashGet(temisInfo, 'user');

    return (
      <div>
        <div className="m-t-30">
          <Link to={editBdtx(userIid, surveyIid) || '#'}>
            <div>
              PHIẾU NHU CẦU BỒI DƯỠNG THƯỜNG XUYÊN <br />(
              {lastUpdated(lodashGet(surveyTake, 'updated_ts')) ||
                lodashGet(surveyTake, 'ts')}{' '}
              )
            </div>
          </Link>
        </div>

        {isHieuTruong(user) ? (
          <div className="m-t-30">
            <Link to={editTcnn(userIid, lodashGet(temisConfig, 'tcnn_ht'))}>
              {/*
                  <div>
                    <Icon icon="check-circle" antIcon style={iconStyle} />
                  </div>
                   */}

              <div>
                PHIẾU ĐÁNH GIÁ HIỆU TRƯỞNG/PHÓ HIỆU TRƯỞNG
                <br />(
                {lastUpdated(lodashGet(ht, 'updated_ts')) ||
                  lodashGet(ht, 'ts')}{' '}
                )
              </div>
            </Link>
          </div>
        ) : (
          <div className="m-t-30">
            <Link to={editTcnn(userIid, lodashGet(temisConfig, 'tcnn_gv'))}>
              {/*
                  <div>
                    <Icon icon="form" antIcon style={iconStyle} />
                  </div>

                   */}
              <div>
                PHIẾU ĐÁNH GIÁ GIÁO VIÊN THEO CHUẨN NNGVPT <br /> (
                {lastUpdated(lodashGet(gv, 'updated_ts')) ||
                  lodashGet(gv, 'ts')}{' '}
                )
              </div>
            </Link>
          </div>
        )}

        <div className="m-t-30 ">
          <Link to={editProfile(userId)}>
            <div>
              PHIẾU THÔNG TIN HỒ SƠ CÁ NHÂN <br />(
              {lastUpdated(lodashGet(profile, 'updated_ts'))} )
            </div>
          </Link>
        </div>

        {/*
            <div className="col-md-12 ">
              <Link to="/global-survey">
                <div>
                  <Icon icon="like" antIcon style={iconStyle} />
                </div>
                <div>
                  PHIẾU ĐÁNH GIÁ CUỐI KHÓA HỌC <br /> (
                  {lastUpdated(lodashGet(globalSurveyTake, 'updated_ts')) ||
                    lodashGet(globalSurveyTake, 'ts')}{' '}
                  )
                </div>
              </Link>
            </div>
             */}
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: '/temis/temis/get',
  fetchCondition:
    !!props && lodashGet(props, 'userId') && lodashGet(props, 'userId'),
  refetchCondition: (prevProps) =>
    lodashGet(props, 'userId') !== lodashGet(props, 'userId'),
  params: {
    id: lodashGet(props, 'userId'),
  },
  method: 'get',
  propKey: 'temisInfo',
}))(withTemisConfig(MyTemis));
