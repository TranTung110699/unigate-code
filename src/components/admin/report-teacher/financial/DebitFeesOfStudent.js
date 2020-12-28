import React from 'react';
import get from 'lodash.get';
import apiUrls from 'api-endpoints';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema-form';
import { menuItems } from '../menu/sub-left-menu-configs';
import { t1 } from 'translate';
import { formatMoney, amount_in_numbers_to_words } from 'common';
import AntdTable from 'antd/lib/table';

const formId = 'debit-fees-of-student';

class AmountCollectedAccordingToTheCashier extends React.PureComponent {
  renderResultComponent = (items, props, objects, page) => {
    const position =
      (parseInt(get(page, 'page', 0)) - 1) *
      parseInt(get(page, 'items_per_page', 0));
    const columns = [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1 + position,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('student_code'),
        render: (text, row) => get(row, 'user.code'),
      },
      {
        title: t1('student_name'),
        render: (text, row) => get(row, 'user.name'),
      },
      {
        title: t1('email'),
        render: (text, row) => get(row, 'user.mail'),
      },
      {
        title: t1('phone'),
        render: (text, row) => ({
          children: get(row, 'user.phone'),
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('ico'),
        render: (text, row) =>
          get(row, 'icos', [])
            .map(({ name }) => name)
            .join(','),
      },
      {
        title: t1('major'),
        render: (text, row) =>
          get(row, 'majors', [])
            .map(({ name }) => name)
            .join(','),
      },
      {
        title: t1('training_level'),
        render: (text, row) => get(row, 'training_levels', []).join(','),
      },
      {
        title: t1('training_mode'),
        render: (text, row) => get(row, 'training_modes', []).join(','),
      },
      {
        title: t1('total_amount'),
        render: (text, row) => ({
          children: get(row, 'total_fees', [])
            .map(({ currency, amount }) => `${formatMoney(amount)} ${currency}`)
            .join(','),
          props: {
            className: 'text-right',
          },
        }),
      },
      {
        title: t1('amount_can_be_collected'),
        render: (text, row) => ({
          children: get(row, 'total_fees', [])
            .map(
              ({ currency, amount_can_be_collected }) =>
                `${formatMoney(amount_can_be_collected)} ${currency}`,
            )
            .join(','),
          props: {
            className: 'text-right',
          },
        }),
      },
      {
        title: t1('paid_amount_collected'),
        render: (text, row) => ({
          children: get(row, 'total_fees', [])
            .map(
              ({ currency, paid_amount }) =>
                `${formatMoney(paid_amount)} ${currency}`,
            )
            .join(','),
          props: {
            className: 'text-right',
          },
        }),
      },
      {
        title: t1('debit_amount'),
        render: (text, row) => ({
          children: get(row, 'total_fees', [])
            .map(
              ({ currency, debit_amount }) =>
                `${formatMoney(debit_amount)} ${currency}`,
            )
            .join(','),
          props: {
            className: 'text-right',
          },
        }),
      },
    ];
    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
      />
    );
  };

  render() {
    return (
      <div>
        <SubLeftMenuContext schema={menuItems(this.props)} />
        <SearchWrapper
          formid={formId}
          renderResultsComponent={this.renderResultComponent}
          showSearchButton
          schema={schema('debit-fees-of-student')}
          showResult
          alternativeApi={apiUrls.get_debit_fees_of_student}
        />
      </div>
    );
  }
}

export default AmountCollectedAccordingToTheCashier;
