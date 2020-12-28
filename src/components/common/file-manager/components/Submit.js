import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';

const SubmitButton = ({ onAddFile, items = [] }) => (
  <RaisedButton
    onClick={() => onAddFile(items)}
    primary={true}
    label={`${t1('add')}(${items.length} file)`}
    raisedButton
  />
);
export default SubmitButton;
