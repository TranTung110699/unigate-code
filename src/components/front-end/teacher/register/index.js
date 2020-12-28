import React from 'react';
import { constants } from 'configs/constants';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import ScrollableAnchor from 'react-scrollable-anchor';
import Request from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import Select from 'schema-form/elements/redux-form-fields/SelectDefault';
import Input from 'schema-form/elements/redux-form-fields/InputDefault';

import './stylesheet.scss';
import registerXpeakLiveBackground from './images/register_xpeak_live.png';

class RegisterXpeakVip extends React.Component {
  registerXpeakVip = () => {
    const { registerPackageForm, dispatch } = this.props;

    if (
      registerPackageForm.values &&
      registerPackageForm.values.name &&
      registerPackageForm.values.mail &&
      registerPackageForm.values.level &&
      registerPackageForm.values.phone &&
      registerPackageForm.values.age
    ) {
      Request.get('/report/new', registerPackageForm.values)
        .then((response) => {
          if (response.success) {
            dispatch(reset('registerPackageForm'));
            dispatch(
              nodeActions.snackbar(
                true,
                'Chúc mừng bạn đã đăng ký thành công!',
              ),
            );
          } else {
            dispatch(nodeActions.snackbar(true, response.message));
          }
        })
        .catch((response) => {
          dispatch(nodeActions.snackbar(true, response.message));
        });
    } else {
      dispatch(nodeActions.snackbar(true, 'Bạn cần nhập đủ thông tin'));
    }
  };

  render() {
    return (
      <ScrollableAnchor id={'register-xpeak-live'}>
        <div className="register-xpeak-live">
          <div className="class-background">
            <img
              src={registerXpeakLiveBackground}
              className="fullscreen"
              alt=""
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-7 col-xs-12">
                    <h3 className="uppercase text-center">
                      Cải thiện tiếng anh ngay hôm nay
                      <br /> với các khóa học Xpeak
                    </h3>
                    <div className="register-package-form">
                      <div className="row">
                        <div className="col-md-12">
                          <span>Họ và tên:</span>
                          <Input
                            type="text"
                            id="name"
                            required=""
                            name="name"
                            placeholder="VD: Tường Vy"
                            size="29"
                            className="field input-default"
                          />
                        </div>
                        <div className="col-md-12">
                          <span>Email:</span>
                          <Input
                            type="text"
                            id="mail"
                            required=""
                            name="mail"
                            placeholder="VD: tuongvy@gmail.com"
                            size="29"
                            className="field input-default"
                          />
                        </div>
                        <div className="col-md-12">
                          <span>Số điện thoại:</span>
                          <Input
                            type="text"
                            id="phone"
                            required=""
                            name="phone"
                            placeholder="VD: 0986888***"
                            size="29"
                            className="field input-default"
                          />
                        </div>
                        <div className="col-md-12">
                          <span>Độ tuổi:</span>
                          <Select
                            name="age"
                            className="selected input-default"
                            options={constants.ageOptions()}
                          />
                        </div>
                        <div className="col-md-12">
                          <span>Bạn đang quan tâm đến gói?</span>
                          <div className="clearfix" />
                          <Select
                            name="level"
                            className="selected input-default"
                            options={constants.levelXpeakVips()}
                          />
                        </div>
                        <div className="col-md-12 register-package-btn">
                          <button
                            className="uppercase"
                            onClick={this.registerXpeakVip}
                          >
                            Đăng ký
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollableAnchor>
    );
  }
}

const populateStateToProps = (state) => ({
  registerPackageForm: state.form.registerPackageForm,
});

export default connect(populateStateToProps)(
  reduxForm({
    form: 'registerPackageForm',
  })(RegisterXpeakVip),
);
