import React from 'react';
import { t1 } from 'translate';
import { Element } from 'schema-form/elements';
import Icon from 'components/common/Icon';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import PaymentCard from './card';
import PaymentBank from './bank';
import { paymentMethodOptions } from './configs';

class PaymentContainer extends React.Component {
  imgStyle = { maxWidth: '100%' };

  render() {
    const { method, user, items } = this.props;
    return (
      <div className="payment-container">
        <div>
          <Element
            schema={{
              type: 'select',
              name: 'method',
              floatingLabelText: t1('payment_method'),
              floatingLabelFixed: true,
              options: paymentMethodOptions,
            }}
          />
          {method === 'card' && (
            <div>
              <div className="payment-container__section-title">
                Nạp tiền bằng thẻ cào các nhà mạng viễn thông
              </div>
              <div className="payment-container__section-content">
                <PaymentCard />
              </div>
              <div className="payment-container__section-title">
                Hướng dẫn nạp thẻ
              </div>
              <div className="payment-container__section-content">
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <li>
                        Hỗ trợ thẻ cào của các nhà mạng : MOBI, VIETTEL,
                        VINAPHONE
                      </li>
                      <li>Hỗ trợ thẻ cào được phát hành bởi : VIETED</li>
                      <li>
                        Mỗi thẻ cào thường sẽ có 2 trường : số Seri & Mã PIN
                      </li>
                      <li>Số Seri mà mã bạn nhìn thấy khi chưa cần cào thẻ</li>
                      <li>Mã PIN là mã sau lớp thẻ cào</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <img
                      src={`${window.APP_ASSETS_CDN}/img/thecaotratruoc.jpg`}
                      alt="Hướng dẫn nạp thẻ"
                      style={this.imgStyle}
                    />
                    <p>Hướng dẫn tìm số SERI và mã PIN trên thẻ cào</p>
                  </div>
                </div>
              </div>
              <div className="payment-container__section-title">
                Thanh toán online an toàn
              </div>
              <div className="payment-container__section-content">
                <div>
                  <div>
                    <p>
                      <Icon icon="ok" />
                      Thanh toán tại VietED hoàn toàn diễn ra trên các{' '}
                      <b>cổng thanh toán thứ 3</b> như Bảo Kim hoặc Ngân Lượng.
                      Đây là những cổng thanh toán giúp bạn có thể nạp được tiền
                      qua thẻ cào điện thoại hoặc chuyển khoản online banking 1
                      cách dễ dàng.
                    </p>

                    <p>
                      <Icon icon="ok" /> Tất cả các giao dịch trên VietED đều
                      được sao chép ra nhiều nguồn khác nhau và được kế toán ghi
                      chép cẩn thận. Khi có bất cứ vấn đề gì, các bạn đều có thể
                      <a href="/page/contact">liên hệ</a> với hotline của VietEd
                      để khiếu nại.
                    </p>

                    <p>
                      <Icon icon="ok" /> Nếu bạn chuyển khoản online, khi bạn
                      nhấn "Recharge" VietED sẽ chuyển đến trang web của Baokim,
                      NganLuong. Sau khi thanh toán xong, bạn sẽ được quay lại
                      VietED.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {method === 'bank' && (
            <div>
              <div className="payment-container__section-title">
                Thông tin tài khoàn
              </div>
              <div className="payment-container__section-content">
                <PaymentBank user={user} items={items} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const user = state.user && state.user.info;
  const { form } = props;
  const formValues = getFormValues(form)(state);
  const method = formValues && formValues.method;

  return {
    user,
    method,
  };
};

export default reduxForm({
  initialValues: {
    method: paymentMethodOptions[0].value,
  },
  form: 'payment',
})(connect(mapStateToProps)(PaymentContainer));
