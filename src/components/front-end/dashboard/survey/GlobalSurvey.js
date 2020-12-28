import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Survey from 'components/learn/items/survey';
import lodashGet from 'lodash.get';
import Loading from 'components/common/loading';
import withUserInfo from 'common/hoc/withUserInfo';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';

const GlobalSurvey = ({ surveyIid, userInfo }) => {
  if (!surveyIid)
    return (
      <div>
        <h1>Đang tải phiếu đánh giá....</h1>
        <Loading />
      </div>
    );

  if (!userInfo.iid) {
    return <Warning>{t1('you_must_be_logged_in_to_take_survey')}</Warning>;
  }

  return (
    <div className="container p-t-50">
      {window.isETEP && <h1>PHIẾU ĐÁNH GIÁ CUỐI KHÓA HỌC</h1>}
      <Survey surveyIid={surveyIid} displayMaxHeight={Infinity} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    surveyIid: lodashGet(state, 'domainInfo.conf.global_survey_iid'),
  };
};

export default connect(mapStateToProps)(withUserInfo(GlobalSurvey));
