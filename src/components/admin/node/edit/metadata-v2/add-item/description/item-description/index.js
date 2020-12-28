import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import ItemTextExplanation from './ItemTextExplanation';
import Alert from 'antd/lib/alert';
import { genAddItemLabel } from 'components/admin/node/edit/metadata/add-item/labels';
import { bankDialogTabDisplayTypes } from 'components/admin/node/bank/utils';
import DescriptionLayout from '../index';

const ItemDescription = ({ ntype, subType, link, bankDialogTabMode }) => {
  return (
    <DescriptionLayout
      ntype={ntype}
      subType={subType}
      link={link}
      bankDialogTabMode={bankDialogTabMode}
      explanation={<ItemTextExplanation ntype={ntype} subType={subType} />}
      buttons={
        <div>
          <Link
            to={`${link}/${bankDialogTabDisplayTypes.NEW_ONLY}`}
            className="m-l-10"
          >
            <RaisedButton
              primary
              label={t1('add_%s', genAddItemLabel(ntype, subType))}
            />
          </Link>
          <Link
            to={`${link}/${bankDialogTabDisplayTypes.SEARCH_ONLY}`}
            className="m-l-10"
          >
            <RaisedButton
              primary
              label={t1('add_%s_from_bank', genAddItemLabel(ntype, subType))}
            />
          </Link>
        </div>
      }
    />
  );
};

export default ItemDescription;
