import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import Toggle from 'material-ui/Toggle';
import lodashGet from 'lodash.get';
import Switch from 'antd/lib/switch';
import Form from 'antd/lib/form';
import styled from 'styled-components';

const FormItemContainer = styled(Form.Item)`
  margin-bottom: 0 !important;
  .ant-form-item-label {
    margin-bottom: 0;
    margin-left: 5px;
  }
`;

class ApproveToggle extends React.PureComponent {
  updateDataInStore = (field, value) => {
    const { course, dispatch, searchFormId } = this.props;
    course[field] = value;
    dispatch(
      sagaActions.updateNodeRequest({
        step: field,
        iid: course.iid,
        data: { ...course, ntype: 'course' },
        searchFormId,
      }),
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { course, isSmall, buttonOnly } = this.props;

    if (buttonOnly) {
      return lodashGet(course, 'status') === 'deleted' ? null : (
        <Switch
          size={isSmall ? 'small' : 'default'}
          checked={lodashGet(course, 'status') === 'approved'}
          defaultChecked={lodashGet(course, 'status') === 'approved'}
          onChange={(toggled, event) => {
            const value = toggled ? 'approved' : 'queued';
            this.updateDataInStore('status', value);
          }}
        />
      );
    }

    return lodashGet(course, 'status') === 'deleted' ? null : (
      <FormItemContainer
        label={t1('approved')}
        colon={false}
        className="d-flex align-items-center justify-content-between"
        style={{ flexDirection: 'row-reverse' }}
      >
        {getFieldDecorator('switch', {
          valuePropName: 'checked',
          initialValue: lodashGet(course, 'status') === 'approved',
        })(
          <Switch
            size={isSmall ? 'small' : 'default'}
            checked={lodashGet(course, 'status') === 'approved'}
            defaultChecked={lodashGet(course, 'status') === 'approved'}
            onChange={(toggled, event) => {
              const value = toggled ? 'approved' : 'queued';
              this.updateDataInStore('status', value);
            }}
          />,
        )}
      </FormItemContainer>
    );
  }
}

ApproveToggle.propTypes = {
  className: PropTypes.string,
};

ApproveToggle.defaultProps = {
  className: '',
};

export default connect()(Form.create()(ApproveToggle));
