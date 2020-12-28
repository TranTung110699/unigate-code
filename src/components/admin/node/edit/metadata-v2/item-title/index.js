import React, { Component } from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import Question from '../../metadata/row/Question';
import AddItemV2 from '../AddItem';
import Name from 'components/admin/node/edit/metadata/row/Name';
import {
  isScormProcessing,
  isScormProcessingSuccess,
  isScormSco,
} from 'components/admin/scorm/scorm';
import Warning from 'components/common/Warning';
import QuestionsGroupSwitch from 'components/admin/node/edit/controls/QuestionsGroupSwitch';
import ScormProcessingStatus from 'components/admin/scorm/scorm-processing-status';

class ItemTitle extends Component {
  render() {
    const {
      parentNode = {},
      numberOfChildren = 0,
      path,
      childrenTypes,
      ...row
    } = this.props.rowItem;

    const {
      fieldEdit,
      index,
      isCompact,
      readOnly,
      dragSorting,
      updateMetadata,
      expanded,
    } = this.props;

    let questionGroup = null;
    const showQuestionGroup = row && row.ntype == 'question' && !isCompact;

    if (showQuestionGroup) {
      const questions = Array.isArray(get(parentNode, fieldEdit))
        ? get(parentNode, fieldEdit).filter((q) => {
            if (typeof q === 'string') {
              return q;
            }
            return q && q.iid;
          })
        : [];

      questionGroup = (
        <span className="pull-right">
          <Question
            readOnly={readOnly}
            totalNrRows={questions.length}
            item={row}
            items={questions}
            itemIndex={row.itemIndex}
            updateDataRow={(newData) => {
              if (typeof updateMetadata !== 'function') {
                return;
              }
              updateMetadata(parentNode, {
                ...row,
                ...newData,
              });
            }}
          />
        </span>
      );
    }

    const shouldHaveAddItem = !(
      row.ntype == 'exercise' ||
      (row.ntype == 'sco' && row.tpl_type == 'scorm')
    );

    return [
      <span style={{ display: 'inline-block' }}>
        <Name
          item={{
            ...row,
            path: dragSorting
              ? null
              : `${path}/${row.ntype == 'exercise' ? 'children' : 'edit'}`,
          }}
          fieldEdit={fieldEdit}
          parentItem={parentNode}
          isCompact={isCompact}
          index={index}
        />
        {!dragSorting &&
          isScormSco(row) &&
          (isScormProcessing(row) || !isScormProcessingSuccess(row)) && (
            <ScormProcessingStatus item={row} readOnly={readOnly} />
          )}
      </span>,
      !dragSorting && numberOfChildren > 0 && (
        <span className="m-l-5" style={{ display: 'inline-block' }}>
          (
          {row.ntype == 'exercise'
            ? t1('%s_questions', [numberOfChildren])
            : t1('%s_items', [numberOfChildren])}
          )
        </span>
      ),
      !dragSorting && shouldHaveAddItem && (
        <span className="pull-right" style={{ display: 'inline-block' }}>
          <AddItemV2
            node={row}
            childrenTypes={childrenTypes}
            path={path}
            isCompact={isCompact}
          />
        </span>
      ),
      !dragSorting &&
        !readOnly &&
        expanded &&
        row.ntype == 'exercise' &&
        Array.isArray(row.metadata) &&
        row.metadata.length > 1 && (
          <span className="pull-right" style={{ display: 'inline-block' }}>
            <QuestionsGroupSwitch node={row} readOnly={readOnly} />
          </span>
        ),
      !dragSorting && questionGroup,
    ];
  }
}

export default ItemTitle;
