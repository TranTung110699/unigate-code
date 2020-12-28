import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Portal, { portals } from 'components/common/portal';
import ResultMarked from '../marking-result';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import UploadAnswers from '../UploadAnswers';
import ViewAnswer from './viewAnswer';

const SubmissionAreaTrinh = ({
  value,
  onChange,
  itemToEdit,
  readOnly,
  question,
  courseIid,
  takeId,
  resultMarked,
  formid,
  handleRowOnChange,
}) => {
  const dialogOptionsProperties = {
    width: '80%',
  };

  const { input_submit, id } = itemToEdit || {};

  if (!Array.isArray(input_submit) || !input_submit.length) {
    return null;
  }

  const currentValue = (Array.isArray(value) &&
    value.find((val) => id === val.id)) || { id };

  return [
    !readOnly && itemToEdit.description && (
      <Portal id={portals.questionHeader(question.id)}>
        {itemToEdit.description}
      </Portal>
    ),
    <ViewAnswer answer={currentValue} />,
    !readOnly && (
      <ResultMarked
        question={question}
        courseIid={courseIid}
        takeId={takeId}
        resultMarked={resultMarked}
        rubricIidsToShowMarking={get(itemToEdit, 'rubric_iid_marking') || null}
      />
    ),

    !readOnly && (
      <Portal id={portals.questionAction(question.id)}>
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <RaisedButton
              primary
              className="m-l-10 m-r-10"
              onClick={showFull}
              label={t1('upload')}
              icon={<Icon icon="plus" />}
            />
          )}
          renderFull={({ closeDialog }) => (
            <UploadAnswers
              formid={formid}
              fields={input_submit}
              currentValue={currentValue}
              onChange={(newValue) => {
                handleRowOnChange(onChange, value, newValue);
                if (closeDialog) closeDialog();
              }}
            />
          )}
          dialogOptionsProperties={dialogOptionsProperties}
        />
      </Portal>
    ),
  ];
};

export default SubmissionAreaTrinh;
