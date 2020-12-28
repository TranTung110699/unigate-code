import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from 'store';

import { t1, t3 } from 'translate';
import apiUrls from 'api-endpoints';
import { invoiceStatuses } from 'configs/constants';
import { jsTimestampToDateString } from 'common/utils/Date';
import fetchData from 'components/common/fetchData';

import Icon from 'components/common/Icon';
import Loading from 'components/common/loading';
import RaisedButton from 'components/common/mui/RaisedButton';
import { formatInvoiceData } from 'components/admin/node/schema/format';

import Fees from './Fees';
import NewForm from './new/Form';
import Preview from './Preview';
import AcademyInfo from './AcademyInfo';
import './preview-invoice.scss';

class InvoiceDetail extends Component {
  executeOnSuccess = () => {
    history.push('/admin/financial/invoice');
  };

  render() {
    let { invoice, userInfo, invoiceIid, handleRefetch } = this.props;
    invoice = invoice || {};
    const student = invoice && invoice.student ? invoice.student : {};
    invoice = formatInvoiceData(invoice, student);

    const isInitInvoice =
      invoice &&
      invoice.status &&
      invoice.status.toLowerCase() === invoiceStatuses.INIT;
    if (!isInitInvoice) {
      if (!invoice || !student || !student.iid) {
        return <Loading />;
      }
      return (
        <Preview
          invoice={invoice}
          student={student}
          invoiceIid={invoiceIid}
          handleRefetch={handleRefetch}
          userInfo={userInfo}
        />
      );
    }

    return (
      <div>
        <div className="invoice-detail-wrapper">
          <h1 className="text-center">
            {t3('invoice')} #{invoice.iid}
          </h1>
          <div className="preview-invoice-block">
            <div className="row">
              <div className="col-md-12">
                <div className="pull-left">
                  {t1('date')}: {jsTimestampToDateString(Date.now())}
                </div>
                <div className="pull-right">
                  {t1('made_by')}: {t1('accountant')} {userInfo.name}
                </div>
              </div>
            </div>
          </div>
          {invoice && invoice.student && (
            <div className="preview-invoice-block">
              <AcademyInfo userIid={invoice.student && invoice.student.iid} />
            </div>
          )}
          {invoice && invoice.fees && (
            <div className="preview-invoice-block">
              <Fees fees={invoice.fees} invoice={invoice} />
            </div>
          )}
          <div className="preview-invoice-block">
            <div className="new-invoice-wrapper">
              <NewForm
                mode="edit"
                node={invoice}
                searchFormId="invoice_search"
                formid="update_invoice"
                step="pay_invoice"
                requestSuccessful={() => this.executeOnSuccess()}
                submitButton={
                  <div className="text-center">
                    <RaisedButton
                      className="pay-invoice-btn"
                      name="pay_invoice"
                      id={`pay-invoice-${invoice.code}`}
                      icon={<Icon icon="send" />}
                      label={t1('pay')}
                      primary
                      type="submit"
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { invoiceIid } = props;

  return {
    invoiceIid,
    userInfo: state.user.info,
  };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.get_detail({ iid: props.invoiceIid }, 'invoice'),
    params: {},
    propKey: 'invoice',
    fetchCondition: props.invoiceIid,
    refetchCondition: (prevProps) => {
      return props.invoiceIid !== prevProps.invoiceIid;
    },
  }))(InvoiceDetail),
);
