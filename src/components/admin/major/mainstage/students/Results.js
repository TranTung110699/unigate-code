import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import Avatar from 'components/common/avatar';
import DetailOnDialog from 'components/common/detail-on-dialog';
import UserPrograms from 'components/admin/user/transcript-by-program-tree/index';

const dialogOptionsProperties = {
  width: '90%',
};

class Results extends React.PureComponent {
  render() {
    const items = this.props.items || [];
    return (
      <div className="table-full-border">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn className="text-center">
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn className="text-center" title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn className="text-center">
                {t1('forms_of_training')}
              </TableHeaderColumn>
              <TableHeaderColumn className="text-center">
                {t1('status')}
              </TableHeaderColumn>
              <TableHeaderColumn className="text-center">
                {t1('summary')}
              </TableHeaderColumn>
              <TableHeaderColumn className="text-center">
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={false}
            stripedRows={false}
          >
            {Array.isArray(items) &&
              items.map(({ user, major, forms_of_training }) => {
                if (
                  !user ||
                  !major ||
                  !Array.isArray(forms_of_training) ||
                  !forms_of_training.length
                ) {
                  return null;
                }

                return forms_of_training.map(
                  (
                    {
                      ico,
                      training_mode,
                      training_level,
                      status,
                      accumulation,
                    },
                    index,
                  ) => {
                    const { total_credit, average_score, classification } =
                      accumulation || {};

                    return (
                      <TableRow
                        key={`user-${user.iid}_major-${major.iid}_${index}th`}
                      >
                        {index === 0 && (
                          <TableRowColumn
                            rowSpan={forms_of_training.length}
                            className="text-center"
                          >
                            {user.code || user.iid}
                            <br />
                            {user.code && (
                              <span className="text-muted">#{user.iid}</span>
                            )}
                          </TableRowColumn>
                        )}
                        {index === 0 && (
                          <TableRowColumn rowSpan={forms_of_training.length}>
                            <Avatar user={user} /> {user.name}
                          </TableRowColumn>
                        )}
                        <TableRowColumn>
                          <ul>
                            <li>{`${t1(
                              'training_mode',
                            )}: ${training_mode}`}</li>
                            <li>
                              {`${t1('training_level')}: ${training_level}`}
                            </li>
                            <li>{`${t1('ico')}: ${ico && ico.name}`}</li>
                          </ul>
                        </TableRowColumn>
                        <TableRowColumn className="text-center">
                          {t1(status)}
                        </TableRowColumn>
                        <TableRowColumn>
                          <ul>
                            <li>{`${t1('total_credit')}: ${total_credit ||
                              0}`}</li>
                            <li>{`${t1('average_score')}: ${average_score ||
                              0}`}</li>
                            {typeof classification !== 'undefined' && (
                              <li>{`${t1(
                                'classification',
                              )}: ${classification}`}</li>
                            )}
                          </ul>
                        </TableRowColumn>
                        <TableRowColumn className="text-center">
                          <DetailOnDialog
                            renderPreview={({ showFull }) => (
                              <FlatButton
                                icon={<Icon icon="preview" />}
                                onClick={showFull}
                              />
                            )}
                            renderFull={() => (
                              <UserPrograms
                                userIid={user.iid}
                                formOfTraining={{
                                  major: major.iid,
                                  training_mode,
                                  training_level,
                                  ico: ico && ico.iid,
                                }}
                              />
                            )}
                            dialogOptionsProperties={{
                              ...dialogOptionsProperties,
                              title: t1('transcript_of_%s_by_program_tree', [
                                user.name,
                              ]),
                            }}
                            dialogKey="viewer_user_program"
                          />
                          <DetailOnDialog
                            renderPreview={({ showFull }) => (
                              <FlatButton
                                icon={<Icon icon="certificate" />}
                                onClick={showFull}
                              />
                            )}
                            renderFull={() => <div>{t1('coming_soon')}</div>}
                            dialogKey="print_certificate"
                          />
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
Results.defaultProps = {
  items: [],
};
export default Results;
