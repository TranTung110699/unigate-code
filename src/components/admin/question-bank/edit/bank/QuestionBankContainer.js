/* eslint-disable react/prop-types,no-undef,react/sort-comp,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import { t1 } from 'translate';
import { bankUrl, importBankUrl, addBankUrl } from '../../utils';
import AddQuestion from 'components/admin/node/edit/metadata/add-item/AddItem';
import Search from './search/SearchLayout';
import Import from './import/ImportLayout';

class QuestionBankContainer extends Component {
  render() {
    const { node, action } = this.props;

    const sub = action === 'bank' ? '' : action.replace('bank-', '');

    const items = [
      {
        id: 'bank',
        active: sub === '',
        link: bankUrl(node),
        label: t1('search_in_form_bank'),
      },
      {
        id: 'import',
        active: sub === 'import',
        link: importBankUrl(node),
        label: t1('import_questions'),
      },
      {
        id: 'add',
        active: sub === 'add',
        link: addBankUrl(node),
        label: t1('add_question_manually'),
      },
    ];

    let contentDisplay;

    if (sub === 'import') {
      contentDisplay = <Import {...this.props} />;
    } else if (sub === 'add') {
      contentDisplay = <AddQuestion showList horizontal node={node} />;
    } else {
      contentDisplay = <Search {...this.props} />;
    }

    return (
      <div>
        <HorizontalNav
          items={items}
          content={contentDisplay}
          node={node && node.iid}
        />
      </div>
    );
  }
}

export default QuestionBankContainer;
