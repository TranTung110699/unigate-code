import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import RaisedButton from 'material-ui/RaisedButton';
import Icon from 'components/common/Icon/index';
import InvoicePanel from '../../invoices/InvoicePanel';
import ReactToPrint from 'react-to-print';
import { formatMoney } from 'common';
import '../../invoices/preview-invoice.scss';

const previewInvoiceBlock = {
  border: '1px solid #DDD',
  background: 'white',
  marginBottom: '15px',
  width: '100%',
  padding: '15px',
  overflow: 'auto',
};

const notesWrapper = {
  minHeight: '100px',
};

const padding30px = {
  padding: '30px',
};

const feesOfInvoice = 'feesOfInvoice';

class PreviewInvoice extends Component {
  getViewerContent = () => {
    let { deposit, school } = this.props;
    deposit = deposit || {};
    let student = deposit.student || {};
    let walletType = deposit.wallet_type || {};
    const previewInvoiceBlockAndNotesWrapper = Object.assign(
      {},
      previewInvoiceBlock,
      notesWrapper,
    );

    return (
      <div>
        <div className="preview-invoice-wrapper" style={padding30px}>
          <div>
            <i>
              <b>
                {t1('student_infomation')} #{student.code}
              </b>
            </i>
          </div>
          <div
            className="payer-info preview-invoice-block"
            style={previewInvoiceBlock}
          >
            <div>
              <span>{t1('student_name')}: </span>
              {`${student.name}`}
            </div>
            <div>
              <span>{t1('tel')}: </span>
              {student.phone}
            </div>
            <div>
              <span>{t1('email')}: </span>
              {student.mail}
            </div>
          </div>

          <div>
            <i>
              <b>{t1('account_infomation')}</b>
            </i>
          </div>
          <div
            className="payer-info preview-invoice-block"
            style={previewInvoiceBlock}
          >
            <div>
              <span>{t1('wallet_code')}: </span>
              {`${walletType.code}`}
            </div>
            <div>
              <span>{t1('wallet_name')}: </span>
              {`${walletType.name}`}
            </div>
          </div>

          <div>
            <i>
              <b>{t1('deposit_detail')}</b>
            </i>
          </div>
          <div
            className="payer-info preview-invoice-block"
            style={previewInvoiceBlock}
          >
            <div>
              {!deposit.deposit_fee_template && (
                <div>
                  <span>{t1('deposit_amount')}: </span>
                  {deposit.total_amount_to_pay_group_by_currency &&
                    Object.keys(
                      deposit.total_amount_to_pay_group_by_currency,
                    ).map((key) => (
                      <span key={`money_single_${key}`}>
                        {formatMoney(
                          deposit.total_amount_to_pay_group_by_currency[key],
                        )}{' '}
                        {key}
                      </span>
                    ))}
                </div>
              )}

              {deposit.deposit_fee_template && (
                <div>
                  <div>
                    {t1('amount')}: {formatMoney(deposit.amount)}{' '}
                    {deposit.currency}
                  </div>
                  <div>
                    {t1('discount_amount')}:{' '}
                    {formatMoney(deposit.discount_amount)} {deposit.currency}
                  </div>
                  <div>
                    {t1('total')}: {formatMoney(deposit.real_amount)}{' '}
                    {deposit.currency}
                  </div>
                </div>
              )}
            </div>

            {deposit.deposit_fee_template && (
              <div>
                <div>
                  <span>{t1('follow_template')}: </span>
                  {deposit.deposit_fee_template.name}
                </div>
                {deposit.deposit_fee_template &&
                  deposit.deposit_fee_template.applied_benefits && (
                    <div>
                      <span>{t1('discount_used')}: </span>
                      {deposit.deposit_fee_template.applied_benefits.map(
                        (benifit, ind) => {
                          return (
                            <div key={`benifit_discount_${ind}`}>
                              - {benifit.name}: {benifit.amount}{' '}
                              {benifit.currency}
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
              </div>
            )}
          </div>
          <div
            className="notes-wrapper preview-invoice-block"
            style={previewInvoiceBlockAndNotesWrapper}
          >
            <div>Ghi chú / Notes:</div>
            <div>
              <span
                dangerouslySetInnerHTML={{ __html: deposit && deposit.note }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { deposit, school } = this.props;
    deposit = deposit || {};
    let student = deposit.student || {};
    let walletType = deposit.wallet_type || {};
    const previewInvoiceBlockAndNotesWrapper = Object.assign(
      {},
      previewInvoiceBlock,
      notesWrapper,
    );

    const content = this.getViewerContent();

    return (
      <div>
        {content}

        <div style={{ display: 'none' }}>
          <InvoicePanel data={deposit} ref={(el) => (this.componentRef = el)}>
            {content}
          </InvoicePanel>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">
              <ReactToPrint
                trigger={() => (
                  <RaisedButton
                    style={{ clear: 'both' }}
                    className="print-invoice-btn"
                    name="print_invoice"
                    id="print-invoice"
                    icon={<Icon icon="print" />}
                    label={t1('print')}
                    primary
                    type="button"
                  />
                )}
                content={() => this.componentRef}
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
  const domainInfo = state.domainInfo;
  const school = domainInfo && domainInfo.school;

  return {
    invoiceIid,
    school,
  };
};

export default connect(mapStateToProps)(PreviewInvoice);
