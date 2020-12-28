import React from 'react';
import { t1 } from 'translate';
import ItemIcon from '../item-icon/ItemIcon';
import Alert from 'antd/lib/alert';
import './styles.scss';

const Description = ({
  ntype,
  subType,
  link,
  bankDialogTabMode,
  explanation,
  buttons,
}) => {
  if (!ntype) {
    return (
      <Alert
        message={t1('click_to_the_item_you_want_to_add_to_see_the_description')}
        type="info"
        showIcon
      />
    );
  }

  // componentWillReceiveProps(nextProps) {
  //   if (ntype != nextProps.ntype) {
  //     return alert;
  //   }
  // }
  return (
    <div className="text-center item-description">
      <div className="icon">
        <ItemIcon ntype={ntype} subType={subType} />
      </div>

      <div style={{ minHeight: '150px' }} className="m-t-30">
        {explanation}
      </div>

      <div className="m-t-10">{buttons}</div>
    </div>
  );
};
export default Description;
