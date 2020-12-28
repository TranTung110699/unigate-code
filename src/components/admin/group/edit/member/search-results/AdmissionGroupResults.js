import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import { Link } from 'react-router-dom';
import Avatar from 'components/common/avatar';
import IconButton from 'material-ui/IconButton';

import { getUrl } from 'routes/links/common';
import { timestampToDateString } from '../../../../../../common/utils/Date';

const urlUpdateInfo = '/category/api/update-other-info-for-user-in-category';

class AdmissionsGroupResults extends Component {
  actionToggleDataSet = { on: 1, off: 0 };

  render() {
    const {
      items,
      itemList,
      checkKey,
      keysSave,
      addMemberToGroupForm,
      updateOtherInformation,
      group,
    } = this.props;

    return (
      <div className="table-full-border">
        <Table
          name="targets"
          itemList={itemList}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable
        >
          <TableHeader enableSelectAll displaySelectAll>
            <TableRow rowCheckBoxSpan={2}>
              <TableHeaderColumn
                title={t1('student_info')}
                className="text-center"
                colSpan={4}
              >
                {t1('student_info')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('form_of_training')}
                className="text-center"
                colSpan={3}
              >
                {t1('form_of_training')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('status')}
                className="text-center"
                rowSpan={2}
              >
                {t1('status')}
              </TableHeaderColumn>
              {!addMemberToGroupForm && (
                <TableHeaderColumn
                  title={t1('note')}
                  className="text-center"
                  rowSpan={2}
                >
                  {t1('note')}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn
                title={t1('actions')}
                className="text-center"
                rowSpan={2}
              >
                {t1('actions')}
              </TableHeaderColumn>
            </TableRow>
            <TableRow rowCheckBoxSpan={0}>
              <TableHeaderColumn
                title={t1('student_code')}
                className="text-center"
              >
                {t1('student_code')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('student_name')}
                className="text-center"
              >
                {t1('student_name')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('student_birthday')}
                className="text-center"
              >
                {t1('student_birthday')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('student_sex')}
                className="text-center"
              >
                {t1('student_sex')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('ico_in_form_of_training')}
                className="text-center"
              >
                {t1('ico_in_form_of_training')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('major_in_form_of_training')}
                className="text-center"
              >
                {t1('major_in_form_of_training')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('specialization_in_form_of_training')}
                className="text-center"
              >
                {t1('specialization_in_form_of_training')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={false}
          >
            {items &&
              items.map(({ majors, ...user }, rowNumber) => {
                if (!Array.isArray(majors) || !majors.length) {
                  return null;
                }

                const rowSpan = majors.length;

                return majors.map(
                  (
                    {
                      ico,
                      major,
                      training_mode,
                      training_level,
                      specialization,
                      icoObject,
                      majorObject,
                      specializationsObject,
                      note,
                      status,
                    },
                    index,
                  ) => {
                    return (
                      <TableRow
                        key={`${user.id}-${index}`}
                        rowCheckBoxSpan={index === 0 ? rowSpan : 0}
                        rowNumberSelected={rowNumber}
                      >
                        {index === 0 && [
                          <TableRowColumn rowSpan={rowSpan}>
                            {user.code}
                          </TableRowColumn>,
                          <TableRowColumn rowSpan={rowSpan}>
                            <Link to={getUrl('admin_view_student', user)}>
                              <Avatar user={user} size={30} />
                              {user && user.name}
                            </Link>
                          </TableRowColumn>,
                          <TableRowColumn rowSpan={rowSpan}>
                            {user.birthday > 0 &&
                              timestampToDateString(user.birthday)}
                          </TableRowColumn>,
                          <TableRowColumn rowSpan={rowSpan}>
                            {user.sex && parseInt(user.sex) === 0
                              ? t1('female')
                              : t1('male')}
                          </TableRowColumn>,
                        ]}
                        <TableRowColumn>
                          {getLodash(icoObject, 'name')}
                        </TableRowColumn>
                        <TableRowColumn>
                          {getLodash(majorObject, 'name')}
                        </TableRowColumn>
                        <TableRowColumn>
                          {Array.isArray(specializationsObject) &&
                            specializationsObject.length > 0 &&
                            specializationsObject
                              .map((ob) => {
                                return getLodash(ob, 'name');
                              })
                              .join(',')}
                        </TableRowColumn>
                        <TableRowColumn>{t1(status)}</TableRowColumn>
                        {!addMemberToGroupForm && (
                          <TableRowColumn>{note}</TableRowColumn>
                        )}
                        <TableRowColumn>
                          {this.props.renderActionCell
                            ? this.props.renderActionCell(user, {
                                training_mode,
                                training_level,
                                ico,
                                major,
                                specialization,
                              })
                            : null}
                          {!addMemberToGroupForm &&
                            updateOtherInformation(
                              'note',
                              {
                                ...user,
                                note: note || '',
                              },
                              {
                                training_mode,
                                training_level,
                                ico,
                                major,
                                specialization,
                              },
                              ({ showFull }) => (
                                <IconButton
                                  title={t1('edit_degree_info')}
                                  iconClassName="mi mi-edit"
                                  onClick={showFull}
                                />
                              ),
                            )}
                        </TableRowColumn>
                      </TableRow>
                    );
                  },
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

AdmissionsGroupResults.propTypes = {
  form: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

AdmissionsGroupResults.defaultProps = {
  form: '',
  items: [],
};

export default AdmissionsGroupResults;
