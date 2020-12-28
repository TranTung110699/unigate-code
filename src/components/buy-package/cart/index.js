import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import styled from 'styled-components';
import { buyPackageUrl } from 'routes/root-url';
import ItemInfoIcon from '../item/item-info-icon';
import Button from '../../front-end/common/button';
import AntDivider from 'antd/lib/divider';
import fetchData from '../../common/fetchData';
import apiUrls from '../api';
import { displayVNMoney } from 'common/utils/money';
import sagaActions from 'actions/node/saga-creators';
import nodeActions from 'actions/node/creators';
import {
  addCheckoutItem,
  addCheckoutItemSaga,
  addPackageToBuy,
} from 'actions/learn/payment/buy-package';
import get from 'lodash.get';
import lodashGet from 'lodash.get';
import { orderStatus } from 'configs/constants/sales-package';
import withUserInfo from 'common/hoc/withUserInfo';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import { getBuyPackageUrl, getDashboardUrl } from 'routes/links/common';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import Result from 'antd/lib/result';
import trim from 'lodash.trim';
import { breadCrumb } from '../../../common/utils/string';
import ReactPixel from 'react-facebook-pixel';

const CartContainer = styled.div`
  .item {
    padding: 0;
    .info {
      display: flex;
      .image {
        width: 270px;
        height: 180px;
        object-fit: cover;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &-content {
        padding: 25px 30px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        &--text {
          height: 100%;
          flex-grow: 1;
          .title-box {
            .title {
              font-weight: bold;
              font-size: 18px;
              line-height: 21px;
              color: #434343;
            }
          }
          .description {
            font-size: 14px;
            line-height: 16px;
            color: #434343;
          }
        }
      }
    }
    @media (max-width: 767px) {
      padding: 0;
      background-color: #fff;
      &.card-item {
        border-radius: 0 !important;
        padding: 20px;
      }
      .info {
        display: unset;
        .image {
          width: 110px;
          height: 60px;
          border-radius: 5px;
        }
        &-content {
          padding: 0 0 0 10px;
          .title {
            font-size: 14px;
          }
          .description {
            font-size: 12px;
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .checkout-info {
    padding: 25px;
    color: #434343;
    .title {
      font-size: 18px;
    }
    .coupon-text {
      font-size: 14px;
      text-align: center;
    }
    .coupon {
      display: flex;
      width: 100%;
      border: 1px solid #c4c4c4;
      border-radius: 40px;
      height: 40px;
      padding: 4px 4px 4px 15px;
      align-items: center;
      input {
        flex: 1;
        flex-grow: 2;
        border: none;
        outline: none;
        height: 100%;
      }
    }
    .price-detail {
      margin-top: 15px;
      &-item {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
    .total {
      font-size: 18px;
      &-price {
        color: #f7941d;
      }
    }
    .term-link {
      text-align: center;
      margin-top: 20px;
      a {
        font-size: 14px;
        text-decoration: underline !important;
        color: #6d2266;
      }
    }
  }
  .item-price {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #f7941d;

    @media (max-width: 767px) {
      font-size: 14px;
      margin-bottom: 0;
    }
  }
  .display-desktop {
    @media (max-width: 767px) {
      display: none;
    }
  }
  .display-mobile {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const CouponButton = styled(Button)`
  min-width: unset !important;
  height: 100% !important;
  line-height: unset !important;
`;

const Divider = styled(AntDivider)`
  background: #434343 !important;
  margin: 15px 0 !important;
`;

const AvatarPlaceholder = styled.div`
  background-color: #f7941d;
  display: flex !important;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 270px;
  height: 205px;
  font-weight: bold;
  font-size: 18px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  @media (max-width: 767px) {
    width: 110px;
    height: 60px;
    border-radius: 5px;
  }
`;

function Cart({
  packageDetail = {},
  dispatch,
  history,
  userInfo = {},
  match,
  loadingStatus,
}) {
  const [coupon, setCoupon] = React.useState('');
  const [cardInfo, setCardInfo] = React.useState({});
  const [couponLoading, setCouponLoading] = React.useState(false);
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);
  const itemIid = get(match, 'params.iid');

  if (!itemIid || Object.keys(userInfo).length === 0) {
    return <Redirect to={buyPackageUrl} />;
  }

  if (Object.keys(userInfo).length === 0) {
    return <Redirect to={getBuyPackageUrl(`cart/${itemIid}`)} />;
  }

  if (loadingStatus === 'finished' && Object.keys(packageDetail).length === 0) {
    return <Redirect to={buyPackageUrl} />;
  }

  const {
    avatar,
    name,
    price,
    reduced_price,
    description,
    iid,
  } = packageDetail;
  const priceToDisplay = reduced_price !== undefined ? reduced_price : price;

  const onApplyButtonClick = () => {
    setCouponLoading(true);
    dispatch(
      sagaActions.getDataRequest(
        {
          url: apiUrls.cardStatus,
          keyState: 'cardInfo',
          executeOnSuccess: (data) => {
            setCouponLoading(false);
            if (get(data, 'status') === 'available') {
              setCardInfo(data);
            } else {
              dispatch(
                nodeActions.snackbar(
                  'error',
                  'Mã giảm giá không tồn tại hoặc đã được sử dụng',
                ),
              );
            }
          },
          executeOnFailure: () => {
            setCouponLoading(false);
            dispatch(
              nodeActions.snackbar(
                'error',
                'Có lỗi xảy ra, vui lòng thử lại sau!',
              ),
            );
          },
        },
        {
          card_number: coupon,
        },
      ),
    );
  };

  let totalMoney = priceToDisplay;
  const { value, card_number } = cardInfo;
  const isCardValid = value > 0;

  if (isCardValid) {
    totalMoney -= value;
  }

  const onCheckoutButtonClick = () => {
    setCheckoutLoading(true);
    dispatch(
      addCheckoutItemSaga({
        params: {
          name: `Order #${moment().format('YYYYMMDD')}${iid}${userInfo.iid}`,
          total_amount: totalMoney,
          amount: priceToDisplay,
          customer_name: lodashGet(userInfo, 'name'),
          customer_iid: lodashGet(userInfo, 'iid'),
          items: [packageDetail],
          order_status: orderStatus.CREATED,
          card_number: isCardValid ? card_number : '',
        },
        executeOnSuccess: ({ iid, total_amount }) => {
          ReactPixel.track('Purchase', {
            content_name: name,
            currency: 'VND',
            value: total_amount,
            content_type: 'package',
            content_ids: [iid],
          });

          setCheckoutLoading(false);
          if (totalMoney <= 0) {
            const contentDialog = (
              <Result
                status="success"
                title="Mua khoá học thành công"
                subTitle={`Đơn hàng #${iid} đã được đặt thành công. Vui lòng quay trở lại trang chủ và đợi 5-10 phút để có thể học khoá đã mua!`}
                extra={[
                  <Button
                    icon="home"
                    onClick={() => {
                      history.push(getDashboardUrl('courses'));
                      dispatch(
                        actions.handleOpenDialog(
                          { openDialog: false },
                          `order-${iid}`,
                        ),
                      );
                    }}
                  >
                    {t1('home')}
                  </Button>,
                ]}
              />
            );
            dispatch(
              actions.handleOpenDialog({ contentDialog }, `order-${iid}`),
            );
          } else {
            history.push(getBuyPackageUrl('checkout'));
          }
        },
        executeOnFailure: () => setCheckoutLoading(false),
      }),
    );
  };

  if (totalMoney < 0) {
    totalMoney = 0;
  }

  return (
    <Spin spinning={loadingStatus === 'loading'}>
      <CartContainer>
        <div className="row">
          <div className="col-md-8 col-sm-12 m-b-15 item card-item">
            <div className="info">
              <div className="d-flex w-100">
                {avatar ? (
                  <img src={avatar} alt="" className="image" />
                ) : (
                  <AvatarPlaceholder>{breadCrumb(name, 30)}</AvatarPlaceholder>
                )}
                <div className="info-content">
                  <div className="info-content--text">
                    <div className="title-box d-flex justify-content-between">
                      <span className="title">{name}</span>
                      <span className="item-price display-desktop">
                        {displayVNMoney(priceToDisplay, true)}
                      </span>
                    </div>
                    <div className="description m-t-10">
                      <p>{description}</p>
                      <p className="item-price display-mobile text-right">
                        {displayVNMoney(priceToDisplay)}
                      </p>
                    </div>
                  </div>
                  <div className="display-desktop">
                    <ItemInfoIcon packageItem={packageDetail} />
                  </div>
                </div>
              </div>
              <div className="display-mobile">
                <ItemInfoIcon packageItem={packageDetail} />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <Spin spinning={checkoutLoading}>
              <div className="checkout-info card-item">
                <p className="title">
                  <strong>Thông tin đơn hàng</strong>
                </p>
                {priceToDisplay > 0 && (
                  <>
                    <p className="coupon-text m-b-5">
                      Nhập mã giảm giá (nếu có)
                    </p>
                    <div className="coupon">
                      <input
                        type="text"
                        onChange={(event) =>
                          setCoupon(trim(event.target.value))
                        }
                        value={coupon}
                      />
                      <CouponButton
                        onClick={onApplyButtonClick}
                        disabled={!coupon || checkoutLoading}
                        loading={couponLoading}
                      >
                        Áp dụng
                      </CouponButton>
                    </div>
                  </>
                )}
                <div className="price-detail">
                  <div className="price-detail-item origin-price">
                    <span>Tạm tính</span>
                    <span>{displayVNMoney(priceToDisplay)}</span>
                  </div>
                  {isCardValid && (
                    <div className="price-detail-item sale-price">
                      <span>Giảm giá</span>{' '}
                      <span>- {displayVNMoney(value)}</span>
                    </div>
                  )}
                </div>
                <Divider />
                <div className="total d-flex justify-content-between">
                  <span>
                    <strong>Tổng tiền</strong>
                  </span>
                  <span className="total-price">
                    <strong>{displayVNMoney(totalMoney)}</strong>
                  </span>
                </div>
                <div className="term-link">
                  <a
                    href="https://gojapan.vn/dieu-khoan-su-dung/"
                    target="_blank"
                  >
                    Điều khoản sử dụng
                  </a>
                </div>
                <div className="text-center m-t-20">
                  <Button
                    onClick={onCheckoutButtonClick}
                    disabled={couponLoading || checkoutLoading}
                    loading={checkoutLoading}
                  >
                    Tiến hành đặt mua
                  </Button>
                </div>
              </div>
            </Spin>
          </div>
        </div>
      </CartContainer>
    </Spin>
  );
}

const mapStateToProps = (state) => ({
  itemIid: state.buyPackage.packageIid,
  cardInfo: state.dataApiResults.cardInfo,
});

export default connect(mapStateToProps)(
  fetchData(({ match }) => ({
    baseUrl: apiUrls.getPackageDetail,
    params: {
      iid: get(match, 'params.iid'),
    },
    propKey: 'packageDetail',
    refetchCondition: () => false,
  }))(withRouter(withUserInfo(Cart))),
);

Cart.propTypes = {
  itemIid: PropTypes.string.isRequired,
};
