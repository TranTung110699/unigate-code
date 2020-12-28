import React from 'react';
import Tabs from 'antd/lib/tabs';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import { connect } from 'react-redux';
import FormCommon from 'rc-schema-form/common';
import './stylesheet.scss';

const FormItem = Form.Item;

const TabPane = Tabs.TabPane;

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/12/2017
 **/
class GenerateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSummitForm = (e) => {
    const {
      url,
      onSummit,
      beforeSummit,
      onSuccess,
      onFail,
      checkSuccessOnField,
      dispatchFullResponse,
      dispatchAfterSuccess,
    } = this.props;
    const options = {
      url,
      onSummit,
      beforeSummit,
      onSuccess,
      onFail,
      checkSuccessOnField,
      dispatchFullResponse,
      dispatchAfterSuccess,
    };
    FormCommon.submitForm(e, this.props.form, options);
  };

  render() {
    let {
      submitLabel,
      resetLabel,
      className,
      confirmBeforeSummit,
      confirmText,
      layout,
    } = this.props;
    submitLabel = submitLabel || 'submit';
    const formProps = this.props.formProps || {};
    return (
      <Form
        {...formProps}
        className={`ant-advanced-search-form schema-form-panel ${className}`}
      >
        {this.props.children}

        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            {confirmBeforeSummit && (
              <Popconfirm
                placement="topLeft"
                title={confirmText}
                onConfirm={this.onSummitForm}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">{submitLabel}</Button>
              </Popconfirm>
            )}
            {!confirmBeforeSummit && (
              <Button type="primary" onClick={this.onSummitForm}>
                {submitLabel}
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect()(Form.create()(GenerateForm));
