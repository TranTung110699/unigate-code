import React from 'react';
import lodashGet from 'lodash.get';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import {
  isNotEmptyArray,
  populateRowSpanInfoToRenderListOfItemAsTable,
  sum,
  unwind,
} from 'common/utils/Array';
import { filterObjectKeys } from 'common/utils/object';
import Tabs from 'components/common/tabs';
import DisplayHtml from 'components/common/html';
import RaisedButton from 'components/common/mui/RaisedButton';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import Warning from '../../../../../common/Warning';

const keepOnlySurveysDataWithErrors = (surveysData) => {
  return (surveysData || []).filter((d) =>
    isNotEmptyArray(lodashGet(d, 'errors')),
  );
};

const countNumberOfErrorsInSurveysData = (surveysData) => {
  return sum(
    (surveysData || []).map((d) => lodashGet(d, 'errors.length') || 0),
  );
};

const Errors = ({ surveysErrorData }) => {
  surveysErrorData = unwind(surveysErrorData, 'errors', 'error').map((d) =>
    filterObjectKeys(d, ['survey', 'error']),
  );

  surveysErrorData = populateRowSpanInfoToRenderListOfItemAsTable(
    surveysErrorData,
    ['survey.iid'],
  );

  return (
    <AntdTable
      dataSource={surveysErrorData}
      columns={[
        {
          title: t1('survey'),
          key: 'survey.name',
          render: (item) => {
            return {
              children: <b>{lodashGet(item, 'survey.name')}</b>,
              props: {
                rowSpan: lodashGet(item, ['rowSpans', 'survey.iid']),
              },
            };
          },
        },
        {
          title: t1('error'),
          key: 'error.message',
          dataIndex: 'error.message',
        },
        {
          title: t1('excel_position'),
          key: 'error.excel_position',
          dataIndex: 'error.position',
        },
      ]}
      pagination={false}
    />
  );
};

const getSurveysForCoursesDataRow = ({ surveysForCoursesData }) => {
  let surveysForCoursesDataRows = unwind(
    surveysForCoursesData,
    'survey.children',
    'question',
    (elem, surveyIndex, questionIndexInSurvey) =>
      Object.assign({}, elem, {
        questionIndexInSurvey,
      }),
  );

  surveysForCoursesDataRows = populateRowSpanInfoToRenderListOfItemAsTable(
    surveysForCoursesDataRows,
    ['survey.iid'],
  );

  return surveysForCoursesDataRows;
};

const getSurveyForTeachersDataRow = ({ surveyForTeachersData }) => {
  let surveyForTeachersDataRows = unwind(
    [surveyForTeachersData],
    'teachers',
    'teacher',
  );

  surveyForTeachersDataRows = unwind(
    surveyForTeachersDataRows,
    'survey.children',
    'question',
    (elem, surveyIndex, questionIndexInSurvey) =>
      Object.assign({}, elem, {
        questionIndexInSurvey,
      }),
  );

  surveyForTeachersDataRows = populateRowSpanInfoToRenderListOfItemAsTable(
    surveyForTeachersDataRows,
    ['teacher.iid'],
  );

  return surveyForTeachersDataRows;
};

const ValidData = ({
  surveysForCoursesData,
  surveyForTeachersData,
  takeUserIids,
}) => {
  const surveysForCoursesDataRows = getSurveysForCoursesDataRow({
    surveysForCoursesData,
  });

  const surveyForTeachersDataRows = getSurveyForTeachersDataRow({
    surveyForTeachersData,
  });

  let dataSource = [
    ...(surveysForCoursesDataRows || []).map((d) => ({
      ...(d || {}),
      isSurveyForCourse: 1,
    })),
    ...(surveyForTeachersDataRows || []).map((d) => ({
      ...(d || {}),
      isSurveyForTeacher: 1,
    })),
  ];

  dataSource = dataSource.filter((d) =>
    isNotEmptyArray(lodashGet(d, 'dataToSaveSurveyTakes')),
  );

  return (
    <AntdTable
      bordered
      scroll={{ x: true }}
      columns={[
        {
          title: t1('survey'),
          key: 'survey.name',
          render: (item) => {
            const isSurveyForCourse = lodashGet(item, 'isSurveyForCourse');

            if (isSurveyForCourse) {
              return {
                children: <b>{lodashGet(item, 'survey.name')}</b>,
                props: {
                  rowSpan: lodashGet(item, ['rowSpans', 'survey.iid']),
                },
              };
            }

            return {
              children: (
                <b>
                  {lodashGet(item, 'teacher.name')}
                  <br />
                  <span className="text-muted">
                    ({lodashGet(item, 'teacher.code')})
                  </span>
                </b>
              ),
              props: {
                rowSpan: lodashGet(item, ['rowSpans', 'teacher.iid']),
              },
            };
          },
          width: '10%',
        },
        {
          title: t1('question'),
          key: 'question.content',
          render: (item) => {
            return (
              <DisplayHtml content={lodashGet(item, 'question.content')} />
            );
          },
          width: '10%',
        },
        ...(takeUserIids || []).map((userIid, index) => ({
          title: index + 1,
          key: `take_user_${index}`,
          render: (item) => {
            const isSurveyForTeacher = lodashGet(item, 'isSurveyForTeacher');
            const teacherIid = lodashGet(item, 'teacher.iid');

            const surveyTakeData = (
              lodashGet(item, 'dataToSaveSurveyTakes') || []
            ).find((d) => {
              return (
                lodashGet(d, 'userIid') == userIid &&
                (!isSurveyForTeacher || lodashGet(d, 'targetIid') == teacherIid)
              );
            });

            const question = lodashGet(item, 'question');

            // THIS ONLY WORK WITH QUESTION OF TYPE NUMBER
            // because we do not have time to implement all types right now
            const answer = lodashGet(surveyTakeData, [
              'answers',
              lodashGet(question, 'id'),
              'answer',
              0,
            ]);

            return answer;
          },
        })),
      ]}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

const ImportButton = ({
  haveErrors,
  importId,
  onImportSuccessful,
  disabled,
}) => {
  return (
    <ApiRequestBtnWithConfirmDialog
      renderComponent={({ onClick }) => {
        return (
          <RaisedButton
            label={
              haveErrors
                ? t1('ignore_all_errors_and_import_valid_data')
                : t1('import')
            }
            onClick={onClick}
            disabled={disabled}
          />
        );
      }}
      url={apiUrls.import_enrolment_plan_survey_takes}
      params={{
        import_id: importId,
      }}
      textConfirm={
        haveErrors
          ? `${t1('do_you_want_to_import_only_the_valid_data?')} ${t1(
              'all_cells_that_have_errored_data_will_be_ignore',
            )}`
          : undefined
      }
      onRequestSuccessful={onImportSuccessful}
    />
  );
};

const ImportPreview = ({ data, onImportSuccessful, importButtonDisabled }) => {
  if (!data) {
    return null;
  }

  const importId = lodashGet(data, 'import_id');
  const allSurveysData = (lodashGet(data, 'surveys_for_courses') || []).concat([
    lodashGet(data, 'survey_for_teachers'),
  ]);
  const numberOfErrors = countNumberOfErrorsInSurveysData(allSurveysData);
  const surveysErrorData = keepOnlySurveysDataWithErrors(allSurveysData);
  const haveErrors = numberOfErrors > 0;

  return (
    <div>
      <Warning
        style={{
          fontSize: '1.5em',
          marginBottom: 20,
        }}
      >
        {t1('check_your_data_carefully')}.{' '}
        {t1('when_ready_click_the_import_button')}
      </Warning>
      <Tabs
        tabs={[
          ...(haveErrors
            ? [
                {
                  label: (
                    <span style={{ color: 'red' }}>
                      {t1('errors')} ({numberOfErrors})
                    </span>
                  ),
                  content: <Errors surveysErrorData={surveysErrorData} />,
                },
              ]
            : []),
          {
            label: <span style={{ color: 'green' }}>{t1('valid_data')}</span>,
            content: (
              <ValidData
                surveysForCoursesData={lodashGet(data, 'surveys_for_courses')}
                surveyForTeachersData={lodashGet(data, 'survey_for_teachers')}
                takeUserIids={lodashGet(data, 'take_user_iids')}
              />
            ),
          },
        ]}
      />
      <div
        style={{
          marginTop: 20,
        }}
      >
        <ImportButton
          haveErrors={haveErrors}
          importId={importId}
          onImportSuccessful={onImportSuccessful}
          disabled={importButtonDisabled}
        />
      </div>
    </div>
  );
};

export default ImportPreview;
