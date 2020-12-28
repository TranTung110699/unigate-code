import React from 'react';
import { t1 } from 'translate/index';
import get from 'lodash.get';
import './stylesheet.scss';
import NodeNew from 'components/admin/node/new';
import schema from './schema';
// import apiUrls from 'api-endpoints';
import commentApiUrls from 'components/common/comment/endpoints';

const validateValue = (value = '') => {
  const v = value.trim();
  return !!(v && v.length > 0);
};

const AddComment = ({
  user,
  paramsToSendComment = {},
  formid,
  searchFormId,
  onSendCommentSuccess,
  displayInAdmin,
  userToReply,
}) => {
  const { step, ...hiddenFields } = paramsToSendComment;

  const renderSubmitButton = React.useCallback(
    (formValues) => {
      const isValid = validateValue(get(formValues, 'content', ''));

      return (
        <button
          disabled={!isValid}
          className={`send-button ${
            isValid
              ? displayInAdmin
                ? 'active-button-admin'
                : 'active-button'
              : 'not-active-button'
          }`}
          type="submit"
        >
          {t1('send')}
        </button>
      );
    },
    [displayInAdmin],
  );

  return (
    <NodeNew
      resetForm
      formid={formid || 'add-comment'}
      user={user}
      hiddenFields={hiddenFields}
      schema={schema}
      step={step}
      searchFormId={searchFormId}
      submitButton={renderSubmitButton}
      alternativeApi={commentApiUrls.send_comment}
      requestSuccessful={onSendCommentSuccess}
      userToReply={userToReply}
    />
  );
};

export default AddComment;
