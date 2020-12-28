/* eslint-disable react/prop-types,no-undef,react/sort-comp,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import { t1 } from 'translate';
import {
  bankUrl,
  importBankUrl,
  addBankUrl,
  bankPracticeSyllabusUrl,
} from '../../utils';
import AddQuestion from 'components/admin/node/edit/metadata/add-item/AddItem';
import Search from './search/SearchLayout';
import Import from './import/ImportLayout';
import PracticeSyllabus from './practice-courses/index';

class ExamTemplateBankContainer extends Component {
  render() {
    const { node, action } = this.props;

    const sub = action === 'bank' ? '' : action.replace('bank-', '');

    const items = [
      {
        id: 'bank',
        active: sub === '',
        link: bankUrl(node),
        label: `${t1('bank')} (${
          node.bank_questions_count ? node.bank_questions_count : 0
        })`,
      },
      {
        id: 'practice-course',
        active: sub === 'practice-course',
        link: bankPracticeSyllabusUrl(node),
        label: `${t1('practice_(%d)', [
          node.bank_practice_courses && node.bank_practice_courses.length
            ? node.bank_practice_courses.length
            : 0,
        ])}`,
      },
      {
        id: 'import',
        active: sub === 'import',
        link: importBankUrl(node),
        label: t1('import_new_bank'),
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
    } else if (sub === 'practice-course') {
      contentDisplay = (
        <div>
          <PracticeSyllabus {...this.props} />
        </div>
      );
    } else {
      contentDisplay = <Search {...this.props} />;
    }

    return (
      <div>
        <HorizontalNav
          items={items}
          content={contentDisplay}
          key={node && node.iid}
        />
      </div>
    );
  }
}

export default ExamTemplateBankContainer;
