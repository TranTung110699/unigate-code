import React from 'react';
import { t1 } from 'translate';
import Descriptions from 'antd/lib/descriptions';
import { timestampToDateString } from 'common/utils/Date';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';
import routes from 'routes';
import lodashGet from 'lodash.get';
import { displayVNMoney } from 'common/utils/money';
import {
  orderStatusLabel,
  paymentMethodLabel,
} from 'configs/constants/sales-package';
import Badge from 'antd/lib/badge';
import Icon from 'antd/lib/icon';
import colors from '../../search/colors';

const { Item } = Descriptions;

function DashBoard({ node }) {
  const { u, items, card_number } = node;
  return (
    <div className="white-background p-10 border-round">
      <Descriptions title={t1('order_information')} bordered column={1}>
        <Item label={t1('name')}>{node.name}</Item>
        <Item label={t1('order_time')}>
          {timestampToDateString(node.ts, { showTime: true })}
        </Item>
        <Item label={t1('user_order')}>
          <Link to={getUrl('admin_view_student', { iid: u.iid })}>
            <div>
              {u.name || u.lname}
              <div className="text-muted">
                <u>{u.phone}</u>
                <div>{u.mail}</div>
              </div>
            </div>
          </Link>
        </Item>
        {!!(Array.isArray(items) && items.length) && (
          <Item label={t1('package')}>
            {items.map((item) => (
              <div>
                <Link
                  to={routes.url(
                    'node_edit',
                    Object.assign({}, item, {
                      ntype: 'sales-package',
                    }),
                  )}
                  target="_blank"
                >
                  {lodashGet(item, 'name')}
                </Link>
              </div>
            ))}
          </Item>
        )}
        <Item label={t1('price')}>{displayVNMoney(node.total_amount)}</Item>
        {!!card_number && <Item label={t1('card_number')}>{card_number}</Item>}
        <Item
          label={
            <>
              {t1('status')}{' '}
              <Link
                to={routes.url('node_edit', {
                  ntype: 'sales-order',
                  iid: lodashGet(node, 'iid'),
                  step: 'status',
                })}
              >
                <Icon type="edit" />
              </Link>
            </>
          }
        >
          <Badge
            color={colors[node.order_status]}
            text={t1(orderStatusLabel(node.order_status))}
          />
        </Item>
        <Item
          label={
            <>
              {t1('note')}{' '}
              <Link
                to={routes.url('node_edit', {
                  ntype: 'sales-order',
                  iid: lodashGet(node, 'iid'),
                  step: 'status',
                })}
              >
                <Icon type="edit" />
              </Link>
            </>
          }
        >
          {node.note}
        </Item>
      </Descriptions>
    </div>
  );
}

export default DashBoard;
