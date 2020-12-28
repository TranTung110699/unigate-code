import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ReactToPrint from 'react-to-print';
import get from 'lodash.get';

import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { invoiceTypes } from 'configs/constants';

import NodeNew from 'components/admin/node/new';
import Fees from './Fees';
import AcademyInfo from './AcademyInfo';
import InvoicePanel from './InvoicePanel';
import { schemaRequestToCancel } from './schema/form';
import './preview-invoice.scss';

const previewInvoiceBlock = {
  border: '1px solid #DDD',
  background: 'white',
  marginBottom: '15px',
  width: '100%',
  padding: '15px',
  overflow: 'auto',
};

const notesWrapper = {
  minHeight: '168px',
};

class PreviewInvoice extends Component {
  render() {
    let { invoice, student, handleRefetch, userInfo } = this.props;
    invoice = invoice || {};
    const previewInvoiceBlockAndNotesWrapper = Object.assign(
      {},
      previewInvoiceBlock,
      notesWrapper,
    );

    const content = (
      <div>
        <div
          className="payer-info preview-invoice-block"
          style={previewInvoiceBlock}
        >
          <div>
            <span>Người nộp tiền / Payer: </span>
            {invoice.payer && invoice.payer.name}
          </div>
          <div>
            <span>Điện thoại / Tel: </span>
            {invoice.payer && !!invoice.payer.phone && invoice.payer.phone}
          </div>
        </div>
        {student && (
          <div className="preview-invoice-block" style={previewInvoiceBlock}>
            <AcademyInfo userIid={student && student.iid} />
          </div>
        )}
        {invoice && invoice.fees && (
          <div
            className="fee-list-wrapper preview-invoice-block"
            style={previewInvoiceBlock}
          >
            <Fees fees={invoice.fees} invoice={invoice} />
            <div>
              <span>Hình thức thanh toán / Payment method: </span>
              {t1(invoice.type)}
            </div>
          </div>
        )}

        {invoice && invoice.note && (
          <div
            className="notes-wrapper preview-invoice-block"
            style={previewInvoiceBlockAndNotesWrapper}
          >
            <div>Ghi chú / Notes:</div>
            <div>
              <span
                dangerouslySetInnerHTML={{ __html: invoice && invoice.note }}
              />
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div>
        {content}

        <div style={{ display: 'none' }}>
          <InvoicePanel data={invoice} ref={(el) => (this.componentRef = el)}>
            {content}
          </InvoicePanel>
        </div>

        {get(invoice, 'status') !== 'canceled' && (
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
                {get(userInfo, 'id') === get(invoice, 'u.id') &&
                  get(invoice, 'type') !==
                    invoiceTypes.AUTOMATICALLY_PAYMENT_BY_WALLET && (
                    <DetailOnDialog
                      renderPreview={({ showFull }) => (
                        <RaisedButton
                          className="m-l-30"
                          label={
                            get(invoice, 'request_to_cancel.status') === 'sent'
                              ? t1('cancel_request')
                              : t1('request_to_cancel')
                          }
                          onClick={showFull}
                          secondary
                        />
                      )}
                      renderFull={({ closeDialog }) => (
                        <NodeNew
                          resetForm
                          ntype={'invoice'}
                          step={
                            get(invoice, 'request_to_cancel.status') === 'sent'
                              ? 'canceled'
                              : 'sent'
                          }
                          alternativeApi="/invoice/api/request-to-cancel"
                          schema={schemaRequestToCancel}
                          hiddenFields={{
                            id: invoice.id,
                          }}
                          requestSuccessful={() => {
                            closeDialog();
                            if (typeof handleRefetch == 'function') {
                              handleRefetch();
                            }
                          }}
                          submitButton={
                            <div className="text-center">
                              <RaisedButton
                                icon={<Icon icon="create" />}
                                label={
                                  get(invoice, 'request_to_cancel.status') ===
                                  'sent'
                                    ? t1('canceled')
                                    : t1('request')
                                }
                                primary
                                type="submit"
                              />
                            </div>
                          }
                        />
                      )}
                    />
                  )}
              </div>
            </div>
          </div>
        )}
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
