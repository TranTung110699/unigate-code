import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import Attachments from 'components/admin/course/mainstage/marking/Attachments';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { timestampToDateTimeString } from 'common/utils/Date';
import Avatar from 'components/common/avatar/index';
import Icon from 'components/common/Icon';
import Toggle from 'material-ui/Toggle';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import nodeActions from 'actions/node/creators';
import get from 'lodash.get';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

import './Results.scss';

class Results extends Component {
  avatarStyle = {
    marginRight: 10,
  };

  toggleThumbSwitchedStyle = { backgroundColor: 'red' };
  toggleTrackSwitchedStyle = { backgroundColor: '#ff9d9d' };
  cssClass = 'assignment-group-marking-answers-result';

  checkPlagiarism = (item, isPlagiarism) => {
    const { dispatch, formid } = this.props;
    if (!item || !item.takeId || !item.iid) {
      return;
    }

    const auto = typeof isPlagiarism === 'undefined' ? 1 : 0;
    const params = {
      take_id: item.takeId,
      question_iid: item.iid,
      is_plagiarism: isPlagiarism ? 1 : 0,
      auto,
    };

    dispatch(
      sagaActions.submitFormRequest('', {
        extraParams: params,
        url: apiUrls.check_take_plagiarism,
        formidToSubmitOnSuccess: formid,
        executeOnSuccess: (post) => {
          if (auto) {
            if (post.result && post.result.is_plagiarism) {
              dispatch(
                nodeActions.snackbar(true, t1('this_work_is_a_plagiarism')),
              );
            } else {
              dispatch(
                nodeActions.snackbar(true, t1('this_work_is_not_a_plagiarism')),
              );
            }
          } else {
            dispatch(nodeActions.snackbar(true, t1('update_successfully')));
          }
        },
      }),
    );
  };

  render() {
    const { items, formid, exercise, displayField } = this.props;

    return (
      <div className="table-result">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width="15%">
                {t1('submission_time')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%">
                {t1('question')}
              </TableHeaderColumn>
              <TableHeaderColumn width="20%">{t1('user')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('content')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('attachments')}</TableHeaderColumn>
              <TableHeaderColumn>{`${t1('is_plagiarism')}?`}</TableHeaderColumn>
              {get(displayField, 'actions') && (
                <TableHeaderColumn>{t1('actions')}</TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover>
            {items &&
              items.map((item, index) => (
                <TableRow
                  key={`${item.iid}-${item.ts}-${item.u && item.u.iid}`}
                >
                  <TableRowColumn width="15%">
                    {timestampToDateTimeString(item.ts)}
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {(() => {
                      const questionIndex =
                        exercise &&
                        Array.isArray(exercise.children) &&
                        exercise.children.findIndex(
                          (question) => question && question.iid === item.iid,
                        );
                      if (
                        questionIndex !== -1 &&
                        typeof questionIndex !== 'undefined'
                      ) {
                        return questionIndex + 1;
                      }
                      return null;
                    })()}
                  </TableRowColumn>
                  <TableRowColumn title={get(item, 'u.name')} width="20%">
                    <Avatar user={item.u} />
                    {get(item, 'u.name')}
                  </TableRowColumn>
                  <TableRowColumn>
                    {get(item, 'answer.content') && (
                      <DetailOnDialog
                        textPreview={item.answer.content}
                        textFull={item.answer.content}
                      />
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.answer &&
                      Array.isArray(item.answer.attachments) &&
                      item.answer.attachments.length > 0 && (
                        <Attachments attachments={item.answer.attachments} />
                      )}
                  </TableRowColumn>
                  <TableRowColumn>
                    {
                      <Toggle
                        onToggle={(event, toggled) =>
                          this.checkPlagiarism(item, toggled)
                        }
                        toggled={item.is_plagiarism}
                        thumbSwitchedStyle={this.toggleThumbSwitchedStyle}
                        trackSwitchedStyle={this.toggleTrackSwitchedStyle}
                      />
                    }
                  </TableRowColumn>
                  {get(displayField, 'actions') && (
                    <TableRowColumn>
                      {item.takeId && get(item, 'answer.content') && (
                        <a
                          className={`${this.cssClass}__check-plagiarism`}
                          onClick={() => this.checkPlagiarism(item)}
                          title={t1('auto_check_for_plagiarism')}
                        >
                          <Icon icon="check_plagiarism" />
                        </a>
                      )}
                    </TableRowColumn>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  displayField: PropTypes.shape(),
};

Results.defaultProps = {
  items: [],
  displayField: {
    actions: true,
    group: false,
  },
};

export default Results;
