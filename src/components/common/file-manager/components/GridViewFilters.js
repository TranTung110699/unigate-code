import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'schema-form/elements';
import styled from 'styled-components';
import { reduxForm } from 'redux-form';
import { t1 } from 'translate';
import SortButton from 'schema-form/elements/sort-button';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 15px;
  align-items: center;
`;

const OrderByWrapper = styled.div`
  width: 150px;
`;

const OrderValueWrapper = styled.div`
  //padding-bottom: 17px;
`;

class GridViewFilters extends React.PureComponent {
  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Wrapper className={componentClassName}>
        <OrderByWrapper>
          <Element
            schema={{
              name: 'order_by',
              type: 'select',
              fullWidth: true,
              options: [
                {
                  value: 'name',
                  primaryText: t1('name'),
                },
                {
                  value: 'ts',
                  primaryText: t1('created_time'),
                },
              ],
              floatingLabelText: t1('order_by'),
            }}
          />
        </OrderByWrapper>
        <OrderValueWrapper>
          <Element
            schema={{
              name: 'order_value',
              type: SortButton,
            }}
          />
        </OrderValueWrapper>
      </Wrapper>
    );
  }
}

GridViewFilters.propTypes = {
  className: PropTypes.string,
};

GridViewFilters.defaultProps = {
  className: '',
};

export default reduxForm({
  form: 'grid_view_filters',
})(GridViewFilters);
