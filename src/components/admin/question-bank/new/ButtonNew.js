import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FlatButton from 'components/common/mui/NewButton';
import { t1 } from 'translate';
import questionsBankApiUrls from 'components/admin/question-bank/endpoints';
import Icon from 'components/common/Icon';
import NodeNew from 'components/admin/node/new';
import Schema from '../schema/form';

const ButtonNew = () => {
  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <FlatButton
          icon={<Icon icon="plus" />}
          label={t1('new_question_bank')}
          onClick={showFull}
        />
      )}
      renderFull={({ closeDialog }) => {
        return (
          <NodeNew
            title={t1('new_question_bank')}
            alternativeApi={questionsBankApiUrls.new}
            schema={Schema}
            closeModal
            searchFormId="question_bank_search"
            formid="new_question_bank"
          />
        );
      }}
    />
  );
};

export default ButtonNew;
