import React, { Component } from 'react';
import { t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import TextField from 'schema-form/elements/redux-form-fields/AntInputField';
import GeneratePaper from '../new/ButtonNew';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

class FormFilters extends Component {
  render() {
    const { examRound, formid } = this.props;
    const hiddenFields = {
      exam_round_iid: examRound && examRound.iid,
      syllabus_iid: examRound && examRound.syllabus,
    };

    return (
      <div className="elementGroup clearfix m-b-10">
        <div className="row d-flex" style={{ alignItems: 'flex-end' }}>
          <div className="col-md-6">
            <TextField
              fullWidth
              name="name"
              floatingLabelText={t1('name')}
              label={t1('name')}
              hintText={t1('please_type_address_name')}
            />
          </div>
          <div className="col-md-6">
            <RaisedButton
              name="submit"
              type="submit"
              id="submit"
              label="Search"
              primary
            />
            <span className="m-l-10">
              <GeneratePaper
                hiddenFields={hiddenFields}
                generatePaperSuccessful={() => {
                  this.props.dispatch(submit(formid));
                }}
                examScosCount={examRound.exam_scos_count}
              />
            </span>
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default connect()(FormFilters);
