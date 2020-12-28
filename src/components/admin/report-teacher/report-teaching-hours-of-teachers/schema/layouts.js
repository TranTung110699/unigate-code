import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';

export const TeachingHoursOfTeachersSearchFormLayout = (props) => {
  const { groups, dispatch, formValues, submitButton } = props;

  const exportTeachingHoursOfTeachers = (event) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_report_teaching_hours_of_teachers,
        formValues,
      ),
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          {groups.default.fieldNames.organizations}
        </div>
        <div className="col-md-6">{groups.default.fieldNames.user_iid}</div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {groups.default.fieldNames.current_contract_info}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">{groups.default.fieldNames.from_date}</div>
        <div className="col-md-6">{groups.default.fieldNames.to_date}</div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          {submitButton}
          <RaisedButton
            name="export"
            type="buttton"
            id="export"
            label={t1('export')}
            primary
            onClick={exportTeachingHoursOfTeachers}
          />
        </div>
      </div>
    </div>
  );
};

export const TeachingHoursOfTeachersSearchFormCurrentContractInfoSectionLayout = ({
  groups,
}) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-4">{groups.default.fieldNames.text}</div>
      <div className="col-md-4">
        {groups.default.fieldNames.start_date_from}
      </div>
      <div className="col-md-4">{groups.default.fieldNames.end_date_to}</div>
    </div>
    <div className="row">
      <div className="col-md-12">
        {groups.default.fieldNames.is_full_time_teacher}
      </div>
    </div>
  </React.Fragment>
);
