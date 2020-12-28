import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import Link from 'components/common/router/Link';
import routes from 'routes';
import get from 'lodash.get';
import {
  globalSurveyApplicationToText,
  surveyStatuses,
  surveyStatusToText,
  surveyTargetTypeToText,
} from 'configs/constants/survey';
import AntdTable from 'antd/lib/table';
import DeleteBtn from 'components/common/action-button/DeleteBtnWithConfirmDialog';

const displayGlobalSurveyApplication = (applications) => {
  const list = applications.map((s) => globalSurveyApplicationToText(s));
  return list.join(', ');
};

const getLinkToEdit = (survey) => {
  return routes.url(
    'node_edit',
    Object.assign({}, survey, { ntype: 'survey' }),
  );
};

const getColumns = ({ renderActionCell, formid, isSIS }) =>
  [
    {
      title: t1('code'),
      key: 'id',
      render: (text, survey) => (
        <Link to={getLinkToEdit(survey)}>{get(survey, 'code')}</Link>
      ),
    },
    {
      title: t1('name'),
      render: (text, survey) => (
        <Link to={getLinkToEdit(survey)}>{get(survey, 'name')}</Link>
      ),
    },
    {
      title: t1('survey_target'),
      render: (text, survey) => {
        return [
          surveyTargetTypeToText(get(survey, 'survey_target_type')),
          isSIS && `: ${t1(get(survey, 'apply_survey_for'))}`,
        ].filter(Boolean);
      },
    },
    {
      title: t1('applied_scope'),
      render: (text, survey) => {
        const globalSurveyApplication = get(
          survey,
          'global_survey_application',
        );
        if (
          get(survey, 'is_global_survey') &&
          Array.isArray(globalSurveyApplication) &&
          globalSurveyApplication.length
        ) {
          return (
            <div>
              <Icon icon="global" />
              {t1('global')}
              <div>
                {displayGlobalSurveyApplication(globalSurveyApplication)}
              </div>
            </div>
          );
        }
        if (isSIS) {
          return (
            <div>
              {get(survey, 'facultyObject.iid') && (
                <p>{`${t1('faculty')}: ${get(
                  survey,
                  'facultyObject.name',
                )}(#${get(survey, 'facultyObject.code')})`}</p>
              )}
              {get(survey, 'majorObject.iid') && (
                <p>{`${t1('major')}: ${get(survey, 'majorObject.name')}(#${get(
                  survey,
                  'majorObject.code',
                )})`}</p>
              )}
              {get(survey, 'training_level') && (
                <p>{`${t1('training_level')}: ${t1(
                  get(survey, 'training_level'),
                )}`}</p>
              )}
              {get(survey, 'training_mode') && (
                <p>{`${t1('training_mode')}: ${t1(
                  get(survey, 'training_mode'),
                )}`}</p>
              )}
              {get(survey, 'icoObject.iid') && (
                <p>
                  `${t1('ico')}: ${get(survey, 'icoObject.name')}(#$
                  {get(survey, 'icoObject.code')})`
                </p>
              )}
            </div>
          );
        }
        return null;
      },
    },
    {
      title: t1('status'),
      render: (text, survey) => surveyStatusToText(get(survey, 'status')),
    },
    {
      title: t1('actions'),
      render: (text, survey) => {
        if (typeof renderActionCell === 'function') {
          return renderActionCell(survey);
        }

        return (
          <React.Fragment>
            <Link to={getLinkToEdit(survey)}>
              <Icon icon={'edit'} title={t1('edit')} />
            </Link>{' '}
            {get(survey, 'status') !== surveyStatuses.DELETED && (
              <DeleteBtn
                formid={formid}
                ntype="survey"
                itemId={get(survey, '')}
              />
            )}
          </React.Fragment>
        );
      },
    },
  ].filter(Boolean);

const searchResultSurvey = ({ items, ...props }) => {
  return (
    <AntdTable
      columns={getColumns(props)}
      dataSource={Array.isArray(items) && items.length ? items : []}
      bordered
      pagination={false}
      size="middle"
      childrenColumnName={null}
      className="white-background"
      rowKey="id"
    />
  );
};

export default searchResultSurvey;
