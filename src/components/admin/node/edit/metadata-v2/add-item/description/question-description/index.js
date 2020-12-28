import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import QuestionTextExplanation from './QuestionTextExplanation';
import Alert from 'antd/lib/alert';
import { genAddItemLabel } from 'components/admin/node/edit/metadata/add-item/labels';
import DescriptionLayout from '../index';

const QuestionDescription = ({ ntype, subType, link, bankDialogTabMode }) => {
  if (!ntype) {
    return (
      <Alert
        message={t1('click_to_the_item_you_want_to_add_to_see_the_description')}
        type="info"
        showIcon
      />
    );
  }

  return (
    <DescriptionLayout
      ntype={ntype}
      subType={subType}
      link={link}
      bankDialogTabMode={bankDialogTabMode}
      explanation={<QuestionTextExplanation ntype={ntype} subType={subType} />}
      buttons={
        <div>
          <Link to={link} className="m-l-10">
            <RaisedButton
              primary
              label={t1('add_%s', genAddItemLabel(ntype, subType))}
            />
          </Link>
        </div>
      }
    />
  );
};

export default QuestionDescription;
