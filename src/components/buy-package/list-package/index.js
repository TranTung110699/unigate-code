import PropTypes from 'prop-types';
import React from 'react';
import Item from '../item';
import fetchData from '../../common/fetchData';
import apiUrls from '../api';
import Alert from 'antd/lib/alert';
import Spin from 'antd/lib/spin';
import styled from 'styled-components';

const Container = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Col = styled.div`
  flex-basis: 33%;
`;

function BuyCourse({ availablePackages = [], loadingStatus }) {
  if (loadingStatus !== 'finished') {
    return (
      <div className="center">
        <Spin />
      </div>
    );
  }

  if (!availablePackages || availablePackages.length === 0) {
    return (
      <Alert
        message="Chưa có gói nào để mua, vui lòng quay lại sau!"
        type="info"
        showIcon
      />
    );
  }

  return (
    <Container>
      {availablePackages.map((packageItem) => (
        <Col className="col-md-4 col-sm-12 m-b-30">
          <Item packageItem={packageItem} />
        </Col>
      ))}
    </Container>
  );
}

export default fetchData(() => ({
  baseUrl: apiUrls.getAvailablePackages,
  propKey: 'availablePackages',
  refetchCondition: () => false,
}))(BuyCourse);

BuyCourse.propTypes = {
  course: PropTypes.object.isRequired,
};
