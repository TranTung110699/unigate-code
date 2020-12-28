import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import { extractObject } from 'common/utils/Array';
import { parseScoreToString } from 'common/utils/Score';
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
// import ActionToggle from 'components/common/toggle/ActionToggle';
import DegreeInfo from './DegreeInfo';
import { scoreScaleTypes } from 'configs/constants';

class GroupSeniorResults extends Component {
  constructor(props) {
    super(props);
  }

  actionToggleReadOnlyLabelSet = { on: 'accepted', off: 'not_accepted' };
  actionToggleDataSet = { on: 1, off: 0 };

  getAccumulationsToRender = (accumulations, otherInformation) => {
    if (!Array.isArray(otherInformation) || !otherInformation.length) {
      return accumulations;
    }

    return accumulations
      .map((row) => {
        const otherInfo = otherInformation.find((info) => {
          const fields = Object.keys(
            extractObject(info, [
              'ico',
              'major',
              'specialization',
              'training_level',
              'training_mode',
            ]),
          );
          let filter = true;
          fields.forEach((field) => {
            if (filter && info[field] !== row[field]) {
              filter = false;
            }
          });
          return filter;
        });
        if (!otherInfo) {
          return null;
        }
        return { ...row, otherInfo };
      })
      .filter(Boolean);
  };

  getHeaderColumnsByGroupType = () => {
    const { group } = this.props;

    if (group.type === 'finishing_senior') {
      return [
        <TableHeaderColumn title={t1('note')} rowSpan="2">
          {t1('note')}
        </TableHeaderColumn>,
      ];
    }
    return [
      <TableHeaderColumn title={t1('status')} rowSpan="2">
        {t1('status')}
      </TableHeaderColumn>,
      <TableHeaderColumn title={t1('note')} rowSpan="2">
        {t1('degree_info')}
      </TableHeaderColumn>,
    ];
  };

  getContentRowColumns = (user, formOfTraining, otherInfo = {}) => {
    const { group, updateOtherInformation } = this.props;

    if (group.type === 'finishing_senior') {
      return [
        <TableRowColumn>
          {otherInfo && otherInfo.note}
          {updateOtherInformation(
            'note',
            {
              ...user,
              note: otherInfo && otherInfo.note,
            },
            formOfTraining,
          )}
        </TableRowColumn>,
      ];
    }

    let status = t1('not_received');
    switch (otherInfo.status) {
      case 1: {
        status = t1('received');
        break;
      }
      case 2: {
        status = t1('partially_received');
        break;
      }
      default: {
        status = t1('not_received');
      }
    }
    return [
      <TableRowColumn>{status}</TableRowColumn>,
      <TableRowColumn>
        <DegreeInfo degree_info={otherInfo && otherInfo.degree_info} />
      </TableRowColumn>,
    ];
  };

  render() {
    const {
      items,
      itemList,
      checkKey,
      keysSave,
      addMemberToGroupForm,
      group,
      updateOtherInformation,
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
              <TableHeaderColumn title={t1('student_info')} rowSpan="2">
                {t1('student_info')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('form_of_training')} rowSpan="2">
                {t1('form_of_training')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('total_credit')} rowSpan="2">
                {t1('total_credit')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('average_score')} colSpan="2">
                {t1('average_score')}
              </TableHeaderColumn>
              {!addMemberToGroupForm && this.getHeaderColumnsByGroupType()}
              <TableHeaderColumn title={t1('action')} rowSpan="2">
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
            <TableRow rowCheckBoxSpan={0}>
              <TableHeaderColumn title={t1('score_scale_for_studying')}>
                {t1('score_scale_for_studying')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('score_scale_for_0_4')}>
                {t1('score_scale_for_0_4')}
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
              items.map(
                ({ accumulations, other_information, ...user }, rowNumber) => {
                  if (!Array.isArray(accumulations) || !accumulations.length) {
                    return null;
                  }

                  const accumulationsRender = this.getAccumulationsToRender(
                    accumulations,
                    other_information,
                  );

                  return accumulationsRender.map(
                    (
                      {
                        specialization,
                        training_mode,
                        training_level,
                        ico,
                        major,
                        form_of_training,
                        otherInfo,
                        score_scale,
                        average_score,
                        average_score_by_0_4,
                        total_credit,
                      },
                      index,
                    ) => {
                      const { majorObject, icoObject } = form_of_training || {};
                      const specializationObject =
                        Array.isArray(form_of_training.specializationObject) &&
                        form_of_training.specializationObject.find(
                          (row) => row.iid === specialization,
                        );

                      const rowSpan = accumulationsRender.length;
                      return (
                        <TableRow
                          key={`${user.id}-${index}`}
                          rowCheckBoxSpan={index === 0 ? rowSpan : 0}
                          rowNumberSelected={rowNumber}
                        >
                          {index === 0 && (
                            <TableRowColumn rowSpan={rowSpan}>
                              <Link to={getUrl('admin_view_student', user)}>
                                <Avatar user={user} size={30} />
                                {user && user.name}{' '}
                                <span className="text-muted">
                                  {user && user.iid && `(${user.iid})`}
                                </span>
                              </Link>
                              {user.code && [<br />, t1(`code: ${user.code}`)]}
                              {user.mail && [<br />, t1(`mail: ${user.mail}`)]}
                              {user.phone && [
                                <br />,
                                t1(`code: ${user.phone}`),
                              ]}
                            </TableRowColumn>
                          )}
                          <TableRowColumn>
                            <ul>
                              {getLodash(majorObject, 'name') && (
                                <li>
                                  {t1('major:_%s', [
                                    getLodash(majorObject, 'name'),
                                  ])}
                                </li>
                              )}
                              {training_level && (
                                <li>
                                  {t1('training_level:_%s', [
                                    t1(training_level),
                                  ])}
                                </li>
                              )}
                              {training_mode && (
                                <li>
                                  {t1('training_mode:_%s', [t1(training_mode)])}
                                </li>
                              )}
                              {getLodash(icoObject, 'name') && (
                                <li>
                                  {t1('ico:_%s', [
                                    getLodash(icoObject, 'name'),
                                  ])}
                                </li>
                              )}
                              {getLodash(specializationObject, 'name') && (
                                <li>
                                  {t1('specialization:_%s', [
                                    getLodash(specializationObject, 'name'),
                                  ])}
                                </li>
                              )}
                            </ul>
                          </TableRowColumn>
                          <TableRowColumn className="text-center">
                            {total_credit}
                          </TableRowColumn>
                          <TableRowColumn
                            colSpan={
                              [
                                scoreScaleTypes.pmd,
                                scoreScaleTypes['0_4'],
                              ].includes(score_scale)
                                ? 2
                                : 1
                            }
                            className="text-center"
                          >
                            {parseScoreToString(average_score, score_scale)}
                          </TableRowColumn>
                          <TableRowColumn
                            colSpan={
                              [
                                scoreScaleTypes.pmd,
                                scoreScaleTypes['0_4'],
                              ].includes(score_scale)
                                ? 0
                                : 1
                            }
                            className="text-center"
                          >
                            {parseScoreToString(
                              average_score_by_0_4,
                              scoreScaleTypes['0_4'],
                            )}
                          </TableRowColumn>

                          {!addMemberToGroupForm &&
                            this.getContentRowColumns(
                              user,
                              {
                                training_mode,
                                training_level,
                                ico,
                                major,
                                specialization,
                              },
                              otherInfo,
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
                              group.type === 'graduating_senior' &&
                              updateOtherInformation(
                                'degree_info',
                                {
                                  ...user,
                                  degree_info:
                                    otherInfo && otherInfo.degree_info,
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
                },
              )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

GroupSeniorResults.propTypes = {
  form: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

GroupSeniorResults.defaultProps = {
  form: '',
  items: [],
};

export default GroupSeniorResults;
