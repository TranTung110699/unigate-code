import React from 'react';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import Icon from 'components/common/Icon';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { t1 } from 'translate';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';

const SuggestedNumberOfUsersPerCourse = ({ value, onChange, label }) => {
  const [tempValue, setTempValue] = React.useState();
  const [isModalOpen, setIsModalOpen] = React.useState();

  React.useEffect(
    () => {
      setTempValue(value);
    },
    [value],
  );

  const onEditButtonClick = React.useCallback(() => setIsModalOpen(true), []);
  const onModalCancel = React.useCallback(() => setIsModalOpen(false), []);

  const onInputChange = React.useCallback((event) => {
    setTempValue(event.target.value);
  }, []);

  const onSaveValue = React.useCallback(
    () => {
      onChange(tempValue);
      setIsModalOpen(false);
    },
    [onChange, tempValue],
  );

  return (
    <>
      <span>
        {label}: {value} <Icon onClick={onEditButtonClick} icon="edit" />
      </span>
      <Modal
        visible={isModalOpen}
        footer={
          <Button type="primary" onClick={onSaveValue}>
            save
          </Button>
        }
        onCancel={onModalCancel}
      >
        <Form.Item label={t1('enter_new_value')} colon={false}>
          <Input value={tempValue} onChange={onInputChange} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default makeReduxFormCompatible({})(SuggestedNumberOfUsersPerCourse);
