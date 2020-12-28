import PropTypes from 'prop-types';
import React from 'react';
import Card from 'antd/lib/card';
import styled from 'styled-components';
import Button from '../../front-end/common/button';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getBuyPackageUrl } from 'routes/links/common';
import ItemInfoIcon from './item-info-icon';
import { displayVNMoney } from 'common/utils/money';
import { breadCrumb } from 'common/utils/string';
import withUserInfo from 'common/hoc/withUserInfo';
import userLinks from 'routes/links/user';
import ReactPixel from 'react-facebook-pixel';

const CardContainer = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  .title,
  .description {
    color: #434343;
  }
  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 5px;
  }
  .description {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
  .price-box {
    width: 100%;
    .price {
      &-item {
        display: inline-block;
      }
      &-origin {
        font-size: 18px;
        text-decoration-line: line-through;
        color: #c4c4c4;
      }
      &-sale {
        font-size: 24px;
        color: #f7941d;
        &.bold {
          font-weight: bolder;
        }
      }
    }
  }
  .ant-card-body {
    flex-grow: 1;
  }
`;

const Cover = styled.img`
  width: 100%;
  height: 205px;
  object-fit: cover;
`;

const CoverPlaceholder = styled.div`
  background-color: #f7941d;
  display: flex !important;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 100%;
  height: 205px;
  font-weight: bold;
  font-size: 18px;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Item({ dispatch, history, packageItem, userInfo }) {
  const { iid, avatar, name, description, reduced_price, price } = packageItem;

  const onClickBuyNow = () => {
    ReactPixel.track('AddToCart', {
      content_name: name,
      currency: 'VND',
      value: reduced_price !== undefined ? reduced_price : price,
      content_type: 'package',
      content_ids: [iid],
    });
    if (Object.keys(userInfo).length === 0) {
      history.push(
        `${userLinks.login}?next=${getBuyPackageUrl(`cart/${iid}`)}`,
      );
    } else {
      history.push(getBuyPackageUrl(`cart/${iid}`));
    }
  };

  return (
    <CardContainer
      className="card-item"
      cover={
        avatar ? (
          <Cover alt="" src={avatar} />
        ) : (
          <CoverPlaceholder>{breadCrumb(name, 30)}</CoverPlaceholder>
        )
      }
    >
      <Content>
        <div>
          <div className="text-center">
            <p className="title">
              <strong>{name}</strong>
            </p>
            <div className="description">{description}</div>
          </div>
          <ItemInfoIcon packageItem={packageItem} />
        </div>
        <div>
          <div className="price-box text-center m-t-20">
            <span
              className={`price-item ${
                reduced_price !== undefined ? 'price-origin' : 'price-sale bold'
              } m-r-10`}
            >
              {displayVNMoney(price)}
            </span>
            {reduced_price !== undefined ? (
              <span className="price-item price-sale m-l-10">
                <strong>{displayVNMoney(reduced_price, true)}</strong>
              </span>
            ) : null}
          </div>
          <div className="text-center m-t-20">
            <Button onClick={onClickBuyNow}>{t1('buy_now')}</Button>
          </div>
        </div>
      </Content>
    </CardContainer>
  );
}

export default connect()(withRouter(withUserInfo(Item)));

Item.propTypes = {
  dispatch: PropTypes.func,
};

Item.defaultProps = {
  dispatch: () => {},
};
