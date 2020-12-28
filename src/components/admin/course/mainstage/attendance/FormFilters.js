import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Element } from 'schema-form/elements';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';

class FormFilters extends Component {
  render() {
    const {
      hasPermUpdateNumberStudent,
      handleShowDialogNumberStudent,
    } = this.props;
    return (
      <div style={{ margin: '0 -15px' }}>
        <div className="col-md-4">
          <Element
            schema={{
              type: 'text',
              name: 'q',
              floatingLabelText: t1('name_or_id_or_iid_of_user'),
              fullWidth: true,
              label: t1('search_by_name_or_iid'),
              hintText: t1('please_type_search_text'),
            }}
          />
        </div>
        <div className="col-md-8  m-t-25">
          <RaisedButton
            name="submit"
            type="submit"
            id="submit"
            label={t1('search')}
            primary
          />
          {hasPermUpdateNumberStudent && (
            <span>
              <RaisedButton
                name="number-student"
                style={{ marginLeft: 10 }}
                id="number-student"
                label={t1('enter_student_count')}
                primary
                onClick={handleShowDialogNumberStudent}
              />
              <span className="text-muted">
                (
                {t1(
                  'used_by_inspector_to_just_enter_the_number_of_students_in_class_he_can_count',
                )}
                )
              </span>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(FormFilters);
