import React from 'react';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import withUserInfo from 'common/hoc/withUserInfo';
import { connect } from 'react-redux';
import get from 'lodash.get';
import styled from 'styled-components';
import { t1 } from 'translate';
import bankImage from './images/bank.png';
import momoWallet from './images/momo.png';
import Typography from 'antd/lib/typography';
import Tooltip from 'antd/lib/tooltip';
import Alert from 'antd/lib/alert';
import { Redirect } from 'react-router';
import { buyPackageUrl } from 'routes/root-url';
import { displayVNMoney } from 'common/utils/money';
import {
  addCheckoutItem,
  addPackageToBuy,
} from 'actions/learn/payment/buy-package';
import * as PropTypes from 'prop-types';
import Button from '../../front-end/common/button';
import { getDashboardUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';
import Perm from 'common/utils/Perm';
import userLinks from 'routes/links/user';

const CheckoutContainer = styled.div`
  .payment-method {
    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
    }
    @media (max-width: 767px) {
      &-row {
        display: flex;
        > .col-sm-6 {
          flex-basis: 50%;
          &:nth-child(odd) {
            padding-right: 5px;
          }
          &:nth-child(even) {
            padding-left: 5px;
          }
        }
      }
    }
  }
  .payment-type {
    background: #ffffff;
    border: 2px solid #c4c4c4;
    border-radius: 5px;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: box-shadow 0.3s ease-out;
    margin-bottom: 15px;
    img {
      height: 40px;
      margin-right: 10px;
    }
    &:hover {
      box-shadow: 1px 8px 10px rgba(0, 0, 0, 0.15);
    }
    &-title {
      color: #979797;
      font-size: 18px;
    }
    &.disabled,
    &.active {
      pointer-events: none;
    }
    &.active {
      border-color: #6d2266;
      color: #6d2266;
      .payment-type-title {
        color: #6d2266;
      }
    }
    &.disabled {
      cursor: not-allowed;
      background: #e3e3e3;
      pointer-events: none;
      img {
        opacity: 0.6;
      }
    }
    @media (max-width: 767px) {
      padding: 10px 15px;
      img {
        height: 30px;
      }
      &-title {
        font-size: 14px;
      }
    }
  }
  .alert {
    padding: 25px 30px !important;

    @media (max-width: 767px) {
      padding: 20px !important;
    }
  }
  .banking-info {
    background: #ffffff;
    border-radius: 5px;
    padding: 20px 30px;
    font-size: 16px;
    color: #434343;
    margin-top: 15px;
    p:last-child {
      margin-bottom: 0;
    }
    @media (max-width: 767px) {
      padding: 20px;
    }
  }
  .anticon-copy {
    color: #f7941d;
  }
  @media (min-width: 768px) {
    .guide-alert {
      display: table;
      &-row {
        display: table-row;
        .guide-alert-cell {
          &:first-child {
            width: 120px;
          }
        }
      }
      &-cell {
        display: table-cell;
        text-align: justify;
      }
    }
  }
  .bank-list {
    display: flex;
    flex-wrap: wrap;
    .bank-item {
      flex-basis: 50%;
      width: 100%;
      margin-bottom: 20px;
      padding-right: 0;
      padding-left: 0;
      @media (min-width: 768px) {
        &:nth-child(odd) {
          padding-left: 0;
          padding-right: 10px;
        }
        &:nth-child(even) {
          padding-right: 0;
          padding-left: 10px;
        }
      }
      @media (max-width: 767px) {
        flex-basis: 100%;
      }
      .card-item {
        padding: 20px 15px;
        display: flex;
        align-items: center;
        height: 100%;
        .bank-image {
          width: 120px;
          display: flex;
          align-items: stretch;
          .image {
            width: 120px;
            object-fit: cover;
            align-self: flex-start;
          }
        }
        .bank-info {
          margin-left: 15px;
          p {
            margin-bottom: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
  a.contact-link {
    text-decoration: underline !important;
    color: #6d2266;
    font-weight: bold;
  }
`;

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(addPackageToBuy(undefined));
    dispatch(addCheckoutItem(undefined));
  }

  render() {
    let {
      enableMomoPayment,
      userInfo,
      bankAccounts,
      checkoutItem,
      location,
      paymentHotline,
    } = this.props;
    const { activeTab } = this.state;

    if (Object.keys(checkoutItem).length === 0) {
      return <Redirect to={buyPackageUrl} />;
    }

    if (Perm.isGuest()) {
      return <Redirect to={`${userLinks.login}?next=${location.pathname}`} />;
    }

    return (
      <CheckoutContainer>
        <div className="payment-method row">
          <div className="col-md-6 col-sm-12">
            <div className="row payment-method-row">
              <div className="col-md-6 col-sm-6">
                <div
                  className={`payment-type ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => this.setState({ activeTab: 0 })}
                >
                  <img src={bankImage} alt="" />
                  <span className="payment-type-title">{t1('banking')}</span>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <Tooltip
                  title={
                    !enableMomoPayment
                      ? 'Tạm ngừng thanh toán bằng ví Momo'
                      : ''
                  }
                >
                  <div
                    className={`payment-type ${
                      activeTab === 1 ? 'active' : ''
                    } ${!enableMomoPayment ? 'disabled' : ''}`}
                    onClick={() => this.setState({ activeTab: 1 })}
                  >
                    <img src={momoWallet} alt="" />
                    <span className="payment-type-title">Ví Momo</span>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="banking-info">
                  <p>
                    {t1('money_need_to_purchase')}:{' '}
                    <strong>{displayVNMoney(checkoutItem.amount)}</strong>
                  </p>
                  <p>
                    {t1('payment_note')}:{' '}
                    <Typography.Text strong copyable>
                      {checkoutItem.iid} - {userInfo.lname} - {userInfo.phone}
                    </Typography.Text>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Alert
          type="success"
          className="row m-t-30 alert"
          message={
            <div className="guide-alert">
              <div className="guide-alert-row">
                <div className="guide-alert-cell">
                  <strong>HƯỚNG DẪN:</strong>
                </div>
                <div className="guide-alert-cell">
                  Bạn có thể chuyển khoản số tiền đến một trong các tài khoản
                  ngân hàng dưới đây của chúng tôi.
                </div>
              </div>
              <div className="guide-alert-row m-t-10">
                <div className="guide-alert-cell">
                  <strong>QUAN TRỌNG:</strong>
                </div>
                <div className="guide-alert-cell">
                  Bạn phải gửi đúng <strong>Số tiền cần chuyển</strong> và{' '}
                  <strong>Nội dung chuyển khoản</strong> như hướng dẫn để hệ
                  thống có thể xác nhận đơn hàng của bạn nhanh nhất. Mọi thông
                  tin cần hỗ trợ xin vui lòng liên hệ Hotline{' '}
                  <strong>{paymentHotline}</strong>
                </div>
              </div>
            </div>
          }
        />
        <div className="m-t-30 bank-list">
          {bankAccounts.map(
            ({
              bank_image,
              bank_name,
              account_name,
              bank_branch,
              account_number,
            }) => (
              <div className="col-md-6 col-sm-12 bank-item">
                <div className="card-item">
                  <div className="bank-image">
                    <img src={bank_image} alt="" className="image" />
                  </div>
                  <div className="bank-info">
                    <p>{bank_name}</p>
                    {account_number && (
                      <p>
                        Số tài khoản:{' '}
                        <Typography.Text strong copyable>
                          {account_number}
                        </Typography.Text>
                      </p>
                    )}
                    {account_name && (
                      <p>
                        Chủ tài khoản: <strong>{account_name}</strong>
                      </p>
                    )}
                    {bank_branch && (
                      <p>
                        Chi nhánh: <strong>{bank_branch}</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
        <p>
          Cảm ơn bạn đã mua khóa học này! Nếu cần tư vấn thêm bạn hãy để lại
          thông tin{' '}
          <a
            href="https://gojapan.vn/lien-he/"
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            tại đây
          </a>{' '}
          hoặc gọi hotline{' '}
          <a href="tel: 09.68.68.8668" className="contact-link">
            09.68.68.8668
          </a>
        </p>
        <div className="text-center">
          <Link to={getDashboardUrl('courses')}>
            <Button icon="home">{t1('home')}</Button>
          </Link>
        </div>
      </CheckoutContainer>
    );
  }
}

CheckOut.propTypes = {
  enableMomoPayment: PropTypes.any,
  userInfo: PropTypes.any,
  bankAccounts: PropTypes.arrayOf(PropTypes.any),
  checkoutItem: PropTypes.any,
  dispatch: PropTypes.any,
};

CheckOut.defaultProps = { bankAccounts: [] };

const mapStateToProps = (state) => ({
  enableMomoPayment: !!get(state, 'domainInfo.conf.enable_momo_payment', false),
  paymentHotline: get(state, 'domainInfo.conf.payment_hotline'),
  checkoutItem: get(state, 'buyPackage.checkoutItem', {}),
});

export default connect(mapStateToProps)(
  fetchData(() => ({
    baseUrl: apiUrls.get_bank_accounts,
    propKey: 'bankAccounts',
    refetchCondition: () => false,
  }))(withUserInfo(CheckOut)),
);
