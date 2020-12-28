import React from 'react';
import fetchData from '../../common/fetchData';
import apiUrls from '../../buy-package/api';
import { withRouter } from 'react-router-dom';
import SearchWrapper from '../../common/search-wrap/SearchWrapper';
import AntTable from 'antd/lib/table';
import get from 'lodash.get';
import { displayVNMoney } from 'common/utils/money';
import { timestampToDateString } from 'common/utils/Date';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { orderStatus } from 'configs/constants/sales-package';
import { addCheckoutItem } from '../../../actions/learn/payment/buy-package';
import { getBuyPackageUrl } from '../../../routes/links/common';

const Table = styled(AntTable)`
  table {
    overflow-x: auto;
    display: block;
    width: fit-content;
    max-width: 100%;
  }
`;

const GoToCheckoutText = styled.span`
  color: #6d2266;
  font-size: 14px;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
`;

function renderResultsComponent(items, dispatch, history) {
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      align: 'center',
      render: (value, row, index) => index + 1,
    },
    { title: 'Mã đơn hàng', key: 'iid', align: 'center', dataIndex: 'iid' },
    {
      title: 'Tên gói khóa học',
      key: 'name',
      dataIndex: 'items',
      align: 'center',

      render: (items) => get(items, '0.name'),
    },
    {
      title: 'Mô tả',
      key: 'description',
      dataIndex: 'items',
      align: 'center',

      render: (items) => get(items, '0.description'),
    },
    {
      title: 'Thời hạn (tháng)',
      key: 'duration',
      dataIndex: 'items',
      align: 'center',

      render: (items) => get(items, '0.duration'),
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'total_amount',
      align: 'center',

      render: (amount) => displayVNMoney(amount),
    },
    {
      title: 'Ngày đặt mua',
      key: 'time',
      dataIndex: 'ts',
      align: 'center',

      render: (ts) => timestampToDateString(ts),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'order_status',
      align: 'center',
      render: (status, { iid, total_amount }) => {
        if (status === orderStatus.CREATED) {
          return (
            <GoToCheckoutText
              onClick={() => {
                dispatch(
                  addCheckoutItem({
                    iid,
                    amount: total_amount,
                  }),
                );
                history.push(getBuyPackageUrl('checkout'));
              }}
            >
              Chờ thanh toán
            </GoToCheckoutText>
          );
        } else if (status === orderStatus.CANCELED) {
          return <span>Huỷ</span>;
        } else if (status === orderStatus.FULLFILLED) {
          return <span>Đã mua</span>;
        }
      },
    },
  ];

  return (
    <div className="white-background p-25 m-b-20">
      <Table
        columns={columns}
        dataSource={items}
        rowKey="iid"
        pagination={false}
        childrenColumnName={null}
        bordered
        className="text-center"
        scroll
      />
    </div>
  );
}

function MyOrder({ dispatch, history }) {
  return (
    <div>
      <h2>LỊCH SỬ GIAO DỊCH</h2>
      <SearchWrapper
        alternativeApi={apiUrls.myOrder}
        hideSubmitButton
        renderResultsComponent={(items) =>
          renderResultsComponent(items, dispatch, history)
        }
        autoSearchWhenStart
        showResult
      />
    </div>
  );
}

export default connect()(withRouter(MyOrder));
