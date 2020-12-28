/* eslint-disable no-undef */
import React from 'react';
import lodashGet from 'lodash.get';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import DownloadTemplate from './DownloadTemplate';
import { required } from 'common/validators';
import InputFile from 'schema-form/elements/input-file';
import IconSave from 'material-ui/svg-icons/content/save';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import ImportPreview from './ImportPreview';
import { Link } from 'react-router-dom';
import { epReportLink } from 'components/admin/enrolment-plan/routes';

const LayoutFreeStyle = (props) => {
  const { formValues, groups } = props;
  const enrolmentPlanIid = lodashGet(formValues, 'enrolment_plan_iid');
  const courseIid = lodashGet(formValues, 'course_iid');
  const numberOfUsers = lodashGet(formValues, 'number_of_users');
  const importFile = lodashGet(formValues, 'import_file');

  return (
    <div className="container-fluid p-15">
      <div className="row">
        <div className="col-md-6">{groups.default.fieldNames.course_iid}</div>
        <div className="col-md-6">
          {groups.default.fieldNames.number_of_users}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">{groups.default.fieldNames.import_file}</div>
      </div>
      <div className="row p-t-15 p-b-15">
        <div className="col-md-12 text-center">
          <RaisedButton
            name="submit"
            type="submit"
            className="m-l-10 m-r-10"
            disabled={[
              enrolmentPlanIid,
              courseIid,
              numberOfUsers,
              importFile,
            ].some(
              (param) => !param, // only enable if all params are there
            )}
            label={t1('preview')}
            primary
            icon={<IconSave />}
          />
          <DownloadTemplate
            enrolmentPlanIid={enrolmentPlanIid}
            courseIid={courseIid}
            numberOfUsers={numberOfUsers}
          />
        </div>
      </div>
    </div>
  );
};

const schema = {
  schema: (formid, values, step, xpath, { enrolmentPlanIid }, domainInfo) => {
    return {
      course_iid: {
        type: 'select',
        floatingLabelText: t1('course'),
        fullWidth: true,
        options: 'async',
        validate: [required()],
        populateValue: true,
        paramsasync: {
          key: `select_course_for_ep_${enrolmentPlanIid}_import_survey_takes`,
          __url__: apiUrls.get_enrolment_plan_course_options,
          value: {
            enrolment_plan_iid: enrolmentPlanIid,
          },
          transformData: (data) => {
            if (!Array.isArray(data) || !data.length) {
              return [];
            }

            return data.map((row) => ({
              value: lodashGet(row, 'iid'),
              primaryText: lodashGet(row, 'name'),
            }));
          },
        },
      },
      number_of_users: {
        type: 'number',
        floatingLabelText: t1('number_of_users'),
        fullWidth: true,
        validate: [required()],
      },
      import_file: {
        type: InputFile,
        accept: ['.xlsx', '.xls', '.xlsm'],
        hintText: t1('import_file'),
        fullWidth: true,
        validate: [required(t1('import_file_cannot_be_empty'))],
      },
    };
  },
  ui: () => [
    {
      id: 'default',
      fields: ['course_iid', 'number_of_users', 'import_file'],
    },
  ],
  layout: {
    freestyle: 1,
    component: LayoutFreeStyle,
  },
};

const renderResultsComponent = (
  data,
  { onImportSuccessful, imported, enrolmentPlan },
) => {
  if (imported) {
    return (
      <div>
        <h2
          style={{
            color: 'green',
          }}
        >
          {t1('imported_successfully')}
        </h2>
        <ul>
          <li>
            <Link
              target="_blank"
              to={epReportLink(enrolmentPlan, 'credit-syllabus-survey-result')}
            >
              {t1('click_here_to_edit_survey_results_targeting_course')}
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to={epReportLink(enrolmentPlan, 'teacher-survey-result')}
            >
              {t1('click_here_to_edit_survey_results_targeting_teachers')}
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <ImportPreview
      data={data}
      onImportSuccessful={onImportSuccessful}
      imported={imported}
    />
  );
};

const ImportForm = ({ enrolmentPlan }) => {
  const enrolmentPlanIid = lodashGet(enrolmentPlan, 'iid');
  const [imported, setImported] = React.useState();

  const onImportSuccessful = React.useCallback(() => {
    setImported(true);
  }, []);

  const handleSearchFormSubmit = React.useCallback(() => {
    setImported(false);
  }, []);

  return (
    <SearchWrapper
      className="white-box border-round"
      enrolmentPlanIid={enrolmentPlanIid}
      enrolmentPlan={enrolmentPlan}
      schema={schema}
      formid={`import_survey_takes_${enrolmentPlanIid}`}
      alternativeApi={apiUrls.preview_import_enrolment_plan_survey_takes}
      hiddenFields={{
        enrolment_plan_iid: enrolmentPlanIid,
      }}
      renderResultsComponent={renderResultsComponent}
      showResult
      onImportSuccessful={onImportSuccessful}
      imported={imported}
      resultsRerenderTrigger={[imported]}
      onSubmit={handleSearchFormSubmit}
    />
  );
};

export default connect()(ImportForm);
