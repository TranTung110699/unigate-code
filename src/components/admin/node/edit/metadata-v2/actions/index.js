import React, { Component } from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Icon from 'antd/lib/icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { modes, types } from 'common/learn/exercise';
import { initExam } from 'actions/learn/exercise/normal/saga-creators';
import ScoExamItem from 'components/learn/items/exam/sco/index';
import ConfirmRemovingChildren from '../../metadata/ConfirmRemoveChildren';
import { isExam, isGroupAssignment } from 'common/learn';
import TimeRange from '../../metadata/row/time-range';
import EditStatusExam from '../../controls/EditStatusExam';

class RowActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeToRemove: {
        iid: null,
        parentIid: null,
      },
    };
  }

  setNodeToRemove = (iid = null, parentIid = null) => {
    this.setState(() => ({
      nodeToRemove: {
        iid,
        parentIid: iid && parentIid ? parentIid : null,
      },
    }));
  };

  removeAction = (nodeToUpdate, iidToRemove = null) => {
    const { fieldEdit, nodes, updateDataInStore } = this.props;
    let dataEdit = get(nodeToUpdate, fieldEdit);

    if (
      !iidToRemove ||
      !get(nodeToUpdate, 'iid') ||
      !Array.isArray(dataEdit) ||
      !dataEdit.length
    ) {
      return;
    }

    nodeToUpdate[fieldEdit] = dataEdit
      .map((valueInArray) => {
        const newValueInArray =
          typeof valueInArray === 'object'
            ? valueInArray
            : get(nodes, valueInArray);
        const iid = get(newValueInArray, 'iid');

        if (!iid || iid === iidToRemove) {
          return false;
        }

        return newValueInArray;
      })
      .filter(Boolean);

    updateDataInStore(nodeToUpdate, fieldEdit, this.setNodeToRemove);
  };

  render() {
    const { row, readOnly, syllabusIid } = this.props;
    return (
      <div>
        <EditStatusExam node={row} noLabel syllabusIid={syllabusIid} />
        {isGroupAssignment(row) && (
          <span style={{ display: 'inline-flex' }} className="m-l-5 m-r-5">
            <TimeRange
              readOnly={readOnly}
              item={row}
              onChangeFinished={({ start_time, end_time }) => {
                this.props.updateMetadata(get(row, 'parentNode'), {
                  ...row,
                  start_time,
                  end_time,
                });
              }}
            />
          </span>
        )}
        {row.ntype === 'sco' && isExam(row) && (
          <DetailOnDialog
            renderPreview={({ showFull }) => (
              <Icon type="eye" title={t1('preview_exam')} onClick={showFull} />
            )}
            renderFull={({ closeDialog }) => {
              const learnInfo = {
                type: types.EXAM,
                id: row.id,
                iid: row.iid,
                name: row.name,
                description: row.description,
                options: {
                  shouldDisplayCheckedResult: true,
                },
                exam_type: row.ntype,
                exam_order: 1,
                duration: row.duration,
                mode: modes.PREVIEW,
              };

              this.props.dispatch(initExam(row.iid, learnInfo));

              return (
                <ScoExamItem
                  key={`${row.iid}-sco-exam`}
                  id={`${row.iid}-sco-exam`}
                  learnItemIid={row.iid}
                  mode={modes.PREVIEW}
                />
              );
            }}
            dialogOptionsProperties={{
              handleClose: true,

              title: t1('preview_exam'),
              modal: true,
              width: '90%',
            }}
          />
        )}
        <span className="m-l-5 m-r-5">
          {get(this.state, 'nodeToRemove.iid') === get(row, 'iid') &&
          get(this.state, 'nodeToRemove.parentIid') ===
            get(row, 'parentNode.iid', null) ? (
            <ConfirmRemovingChildren
              childrenIidRemove={get(row, 'iid')}
              cancelAction={() => this.setNodeToRemove()}
              removeAction={() =>
                this.removeAction(get(row, 'parentNode'), get(row, 'iid'))
              }
            />
          ) : (
            <Icon
              className="buton-delete"
              title={t1('delete_item')}
              type="delete"
              onClick={() =>
                this.setNodeToRemove(
                  get(row, 'iid'),
                  get(row, 'parentNode.iid', null),
                )
              }
            />
          )}
        </span>
      </div>
    );
  }
}

export default RowActions;
