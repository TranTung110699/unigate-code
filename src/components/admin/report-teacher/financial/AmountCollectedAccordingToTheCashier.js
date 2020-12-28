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

const formId = 'amount-collected-according';

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
        title: t1('cashier_name'),
        render: (text, row) => (
          <div>
            {get(row, 'user.name')} <br />
            (#{get(row, 'user.code')})
          </div>
        ),
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
        title: t1('amount_collection_address'),
        render: (text, row) => {
          const campus = get(row, 'campus');
          if (!Array.isArray(campus) || !campus.length) {
            return null;
          }

          if (campus.length === 1) {
            return `${get(campus, '[0].name')} (${get(campus, '[0].address')})`;
          }

          return (
            <ul>
              {campus.map((map) => (
                <li>{`${get(map, 'name')} (${get(map, 'address')})`}</li>
              ))}
            </ul>
          );
        },
      },
      {
        title: t1('total_amount_collected'),
        render: (text, row) => {
          const totalAmount = get(row, 'total_amount');
          if (!Array.isArray(totalAmount) || !totalAmount.length) {
            return null;
          }

          return totalAmount.map(({ currency, amount }) => (
            <li style={{ maxWidth: 300 }}>{`${formatMoney(
              amount,
            )} ${currency} (${t1(
              amount_in_numbers_to_words(amount),
            )} ${currency})`}</li>
          ));
        },
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
          schema={schema('amount-collected-according')}
          showResult
          alternativeApi={apiUrls.get_amount_collected_according_to_the_cashier}
        />
      </div>
    );
  }
}

export default AmountCollectedAccordingToTheCashier;
