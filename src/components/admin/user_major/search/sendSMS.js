import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { sendSmsSchema } from '../schema/form';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Input from 'antd/lib/input';
import apiUrls from 'api-endpoints';
import NodeNew from 'components/admin/node/new';

const { TextArea } = Input;

const InputMessage = ({ conditions, closeDialogInputMessage }) => {
  const [message, setMessage] = React.useState('');

  return (
    <div>
      <h3>{t1('message_content')}</h3>
      <TextArea
        placeholder={t1('enter_message')}
        rows={10}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <div className="text-center m-30">
            <RaisedButton
              primary
              disabled={!message || !message.replace(/\s+/g, ' ')}
              onClick={showFull}
              label={t1('send')}
              className="m-l-10 m-r-10"
            />
          </div>
        )}
        renderFull={({ closeDialog }) => {
          return (
            <NodeNew
              resetForm
              formid="send_sms_for_target_group"
              alternativeApi={apiUrls.send_sms_for_target_group}
              hiddenFields={{
                ...conditions,
                messageSMS: message,
              }}
              schema={sendSmsSchema}
              ntype="user-major"
              requestSuccessful={() => {
                closeDialog();
                closeDialogInputMessage();
              }}
              submitButton={
                <div>
                  <RaisedButton
                    secondary
                    label={t1('cancel')}
                    onClick={closeDialog}
                    className="m-l-10 m-r-10"
                  />
                  <RaisedButton
                    primary
                    type="submit"
                    label={t1('send')}
                    className="m-l-10 m-r-10"
                  />
                </div>
              }
            />
          );
        }}
        dialogKey={'submit-message'}
      />
    </div>
  );
};

const ButtonSendSMS = ({ conditions }) => {
  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <RaisedButton
          primary
          onClick={showFull}
          icon={<Icon icon="email" style={{ color: 'white' }} />}
          label={t1('send_sms')}
          className="m-l-10 m-r-10"
        />
      )}
      renderFull={({ closeDialog }) => {
        return (
          <InputMessage
            conditions={conditions}
            closeDialogInputMessage={closeDialog}
          />
        );
      }}
      dialogKey={'input-message'}
    />
  );
};

export default ButtonSendSMS;
