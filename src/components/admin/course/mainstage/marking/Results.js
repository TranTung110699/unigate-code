/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import sagaActions from 'actions/saga-creators';
import NewForm from 'components/admin/node/new';
import actions from 'actions/node/creators';
import { breadCrumb } from 'common/utils/string';
import Comments from './Comments';
import ScoreEditor from './ScoreEditor';

import { Answer, ExamDetail, ExamInfo, ScoreDetail } from './ResultBlocks';

class Results extends Component {
  tableRowStyle = { textAlign: 'left' };
  tableHeaderColumnStyle = { maxWidth: 150 };

  handleCommentTake = (data) => {
    const { dispatch, formid } = this.props;
    const { takeId, type, iid, cIndex, comments } = data;
    const hiddenFields = {};
    if (type === 'marking') {
      hiddenFields.question = iid;
    }

    const node = { content: '', attachments: [] };
    if (typeof cIndex !== 'undefined') {
      hiddenFields.index = cIndex;
      const comment = comments[cIndex] || {};
      node.content = comment.content;
      node.attachments = comment.attachments || [];
    }

    const contentDialog = (
      <NewForm
        mode="new"
        step="comment"
        ntype="take"
        node={node}
        formid={formid}
        hiddenFields={hiddenFields}
        alternativeApi={`/take/update?id=${takeId}`}
      />
    );
    const title = cIndex ? t1('edit_comment') : t1('add_comment');
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  handleMarkTest = (item, course) => {
    const { dispatch } = this.props;
    const params = {
      exam_order: item.order,
      exam_iid: item.exam.iid,
      user_iid: item.user.iid,
      course_iid: course.iid,
      total: 20,
    };

    dispatch(sagaActions.markTest(params));
  };

  render() {
    const { items, nodes, node } = this.props;

    return (
      <div className="table-result course-marking">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow style={this.tableRowStyle}>
              <TableHeaderColumn style={this.tableHeaderColumnStyle}>
                {t1('user')}
              </TableHeaderColumn>
              <TableHeaderColumn>{t1('question_or_exam')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('student_answer')}</TableHeaderColumn>
              <TableHeaderColumn width="5%">{t1('score')}</TableHeaderColumn>
              <TableHeaderColumn width="20%">
                {t1('exam_score_detail')}
              </TableHeaderColumn>
              <TableHeaderColumn width="20%">
                {t1('comments')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover>
            {items &&
              items.map((item = {}, index) => (
                <TableRow
                  key={`${item.id ||
                    (item.user && item.user.id) ||
                    index}-${index}`}
                >
                  {item.user && item.userRowSpan && (
                    <TableRowColumn
                      rowSpan={item.userRowSpan}
                      style={this.tableHeaderColumnStyle}
                      title={item.user.name}
                    >
                      {breadCrumb(item.user.name, 8)}
                    </TableRowColumn>
                  )}

                  {item.type === 'marking' && item.iid && (
                    <TableRowColumn>
                      <div
                        contentEditable="false"
                        dangerouslySetInnerHTML={{
                          __html:
                            (nodes[item.iid] && nodes[item.iid].content) ||
                            (item.saw_training_package &&
                              `#${item.saw_training_package}`) ||
                            breadCrumb(item.iid, 5),
                        }}
                      />
                    </TableRowColumn>
                  )}
                  {item.type === 'test' && item.exam && item.takeRowSpan && (
                    <TableRowColumn rowSpan={item.takeRowSpan}>
                      <ExamInfo {...item} />
                    </TableRowColumn>
                  )}

                  {item.type === 'marking' && item.answer && (
                    <TableRowColumn>
                      <Answer {...item} />
                    </TableRowColumn>
                  )}
                  {item.type === 'test' && item.order && (
                    <TableRowColumn>
                      <ExamDetail
                        item={item}
                        node={node}
                        handleMarkTest={this.handleMarkTest}
                      />
                    </TableRowColumn>
                  )}
                  <TableRowColumn>
                    <ScoreEditor item={item} index={index} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <ScoreDetail {...item} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Comments
                      item={item}
                      handleCommentTake={this.handleCommentTake}
                      index={index}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nodes: state.tree,
});

export default connect(mapStateToProps)(Results);
