import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1, t3 } from 'translate';
import { jsTimestampToDateString } from 'common/utils/Date';
import './preview-invoice.scss';

const previewInvoiceBlock = {
  border: '1px solid #DDD',
  background: 'white',
  marginBottom: '15px',
  width: '100%',
  padding: '15px',
  overflow: 'auto',
};

const signatureContent = {
  height: '10px',
};

const textCenter = {
  textAlign: 'center',
};

const signatureWrapperItem = {
  width: '33%',
  float: 'left',
};

const previewInvoiceTitle = {
  fontSize: '20px',
  marginBottom: '15px',
};

const invoiceCode = {
  float: 'left',
  width: '50%',
  textAlign: 'right',
};

const schoolInfo = {
  float: 'left',
  width: '50%',
};

const padding30px = {
  padding: '30px',
};

const feesOfInvoice = 'feesOfInvoice';

class InvoicePanel extends Component {
  render() {
    let { data, school } = this.props;
    data = data || {};

    return (
      <div>
        <div className="preview-invoice-wrapper" style={padding30px}>
          <div className="row">
            <div className="school-info-wrapper col-md-12">
              <div className="school-info" style={schoolInfo}>
                <div>
                  {school && school.name} - {school.eng_name}
                </div>
                <div>{school && school.address}</div>
                <div>
                  {t1('tax_identification_number')} ({t3('TIN')}
                  ): {school && school.tax_identification_number}
                </div>
              </div>
              <div className="invoice-code" style={invoiceCode}>
                <div>Số chứng từ / Invoice Code: #{data.code}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="preview-invoice-title" style={previewInvoiceTitle}>
              <div className="text-center">Phiếu thu / Invoice</div>
              <div className="text-center">
                Ngày / Date:{' '}
                {jsTimestampToDateString(data.ts ? data.ts * 1000 : Date.now())}
              </div>
            </div>
          </div>

          {this.props.children}

          <div className="signature-wrapper">
            <div className="row">
              <div
                className="signature-wrapper-item"
                style={signatureWrapperItem}
              >
                <div className="payer" style={textCenter}>
                  <div>Người nộp tiền</div>
                  <div>Payer</div>
                  <div className="signature-content" style={signatureContent} />
                </div>
              </div>
              <div
                className="signature-wrapper-item"
                style={signatureWrapperItem}
              >
                <div className="cashier" style={textCenter}>
                  <div>Thu ngân</div>
                  <div>Cashier</div>
                  <div className="signature-content" style={signatureContent} />
                </div>
              </div>
              <div
                className="signature-wrapper-item"
                style={signatureWrapperItem}
              >
                <div className="accountant" style={textCenter}>
                  <div>Kế toán</div>
                  <div>Accountant</div>
                  <div className="signature-content" style={signatureContent} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const domainInfo = state.domainInfo;
  const school = domainInfo && domainInfo.school;

  return {
    school,
  };
};

export default connect(mapStateToProps)(InvoicePanel);
