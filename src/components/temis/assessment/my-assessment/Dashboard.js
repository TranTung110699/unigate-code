import React from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import withTemisConfig from 'common/hoc/withTemisConfig';
import Loading from 'components/common/loading';
import { editTcnn } from '../../routes';
import Icon from 'components/common/Icon';
import fetchData from 'components/common/fetchData';
import { timestampToDateTimeString } from 'common/utils/Date';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';
import withUserInfo from 'common/hoc/withUserInfo';
import Widget from 'components/common/Widget';
import ResultsAssess from './ResultsAssess';
import {
  formatDataSourceFromDataServerToRenderTableAssess,
  radarChartResultsAssess,
} from '../util';
import endPoints from '../endpoints';

const lastUpdated = (ts) => {
  return ts ? (
    <span>
      {t1('last_updated')}: {timestampToDateTimeString(ts)}
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

const TemisAssessmentIndex = ({
  node = {},
  isHieuTruong,
  temisConfig,
  userInfo,
  loadingStatus,
  assessment_name,
  dataSource,
  score_scale,
}) => {
  if (loadingStatus !== 'finished') {
    return <Loading />;
  }

  const userIid = get(userInfo, 'iid');
  const updatedTs = get(node, 'updated_ts') || get(node, 'ts');

  return (
    <div className="container-fluid">
      <div className="row m-t-30">
        <div
          className={
            updatedTs ? 'col-md-6 text-center m-t-35' : 'col-md-12  text-center'
          }
        >
          <Link
            to={editTcnn(
              userIid,
              get(temisConfig, isHieuTruong ? 'tcnn_ht' : 'tcnn_gv'),
            )}
          >
            <div>
              <Icon
                icon={isHieuTruong ? 'check-circle' : 'form'}
                antIcon
                style={iconStyle}
              />
            </div>

            <div>
              {isHieuTruong
                ? 'PHIẾU ĐÁNH GIÁ HIỆU TRƯỞNG/PHÓ HIỆU TRƯỞNG'
                : 'PHIẾU ĐÁNH GIÁ GIÁO VIÊN THEO CHUẨN NNGVPT'}
              <br />({lastUpdated(updatedTs)})
            </div>
          </Link>
        </div>
        {!!updatedTs && (
          <div className="col-md-6 text-center">
            {radarChartResultsAssess(
              dataSource,
              get(node, 'task'),
              score_scale,
              isHieuTruong ? 'tcnn_ht' : 'tcnn_gv',
            )}
          </div>
        )}
      </div>
      <div className="m-t-50">
        <Widget title={t1('results_assess')}>
          <ResultsAssess
            assessment_name={assessment_name}
            dataSource={dataSource}
            score_scale={score_scale}
            selfAssess={node}
          />
        </Widget>
      </div>
    </div>
  );
};

const fetchSelfAssessment = (props) => {
  const rubricIid = get(props, 'rubricToAssessment');
  const userIid = get(props, 'userInfo.iid');
  return {
    baseUrl: endPoints.assessmentResult,
    fetchCondition: rubricIid && userIid,
    refetchCondition: (prevProps) =>
      rubricIid &&
      userIid &&
      (!get(prevProps, 'rubricToAssessment') ||
        !get(prevProps, 'userInfo.iid')),
    params: {
      rubricIid: rubricIid,
      userIid: userIid,
    },
    method: 'get',
    propKey: 'node',
  };
};

const fetchRubricDoAssessment = (props) => {
  const rubricIid = get(props, 'rubricToAssessment');
  return {
    baseUrl: endPoints.dataToAssessment,
    params: {
      rubric_iid: rubricIid,
    },
    propKey: 'rubric',
    formatDataResult: ({ rubrics, score_scale, assessment_name } = {}) => {
      const dataSource = formatDataSourceFromDataServerToRenderTableAssess(
        rubrics,
      );
      return {
        assessment_name,
        dataSource,
        score_scale,
      };
    },
    fetchCondition: !!rubricIid,
    refetchCondition: (prevProps) =>
      rubricIid && !get(prevProps, 'rubricToAssessment'),
  };
};

export default withUserInfo(
  withTemisConfig(
    fetchData(fetchSelfAssessment)(
      fetchData(fetchRubricDoAssessment)(TemisAssessmentIndex),
    ),
  ),
);
