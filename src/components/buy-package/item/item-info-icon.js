import React from 'react';
import Icon from 'antd/lib/icon';
import { t } from '../../../translate';
import styled from 'styled-components';
const Item = styled.div`
  font-size: 14px;
  color: #979797;
`;

function ItemInfoIcon({ packageItem = {} }) {
  const { count_learner, duration, count_video } = packageItem;

  return (
    <div className="d-flex justify-content-between m-t-10">
      <Item>
        <Icon type="user" />{' '}
        {(count_learner || '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Item>
      <Item>
        <Icon type="play-circle" /> {count_video || 0} {t('video')}
      </Item>
      <Item>
        <Icon type="calendar" /> {duration} {t('month')}
      </Item>
    </div>
  );
}

export default ItemInfoIcon;
