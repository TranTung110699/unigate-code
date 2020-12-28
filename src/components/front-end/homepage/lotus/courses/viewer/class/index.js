import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ScrollableAnchor from 'react-scrollable-anchor';
import nodeActions from 'actions/node/creators';
import Select from 'schema-form/elements/redux-form-fields/SelectDefault';
import Input from 'schema-form/elements/redux-form-fields/InputDefault';
import Perm from 'common/utils/Perm';
import { openLoginDialog } from 'actions/auth/auth-dialog';
import './stylesheet.scss';
import classBackground from './images/class_background.png';
import { t, t1, t2 } from 'translate';

class Class extends React.Component {
  handleJoinVirtualClass = () => {
    const { joinClassForm, dispatch, isGuest } = this.props;
    if (isGuest) {
      dispatch(openLoginDialog());
      return;
    }

    if (
      joinClassForm.values &&
      joinClassForm.values.meetingID &&
      joinClassForm.values.username &&
      joinClassForm.values.password
    ) {
      let url = window.APP_LIVE_URL;
      url = `${url}?username=${joinClassForm.values.username}&meetingID=${
        joinClassForm.values.meetingID
      }&password=${joinClassForm.values.password}&action=create`;
      window.open(url, '_blank');
    } else {
      dispatch(
        nodeActions.snackbar(
          true,
          t1('you_need_to_enter_all_the_required_information'),
        ),
      );
    }
  };

  getOptions = (isGuest) => {
    const classList = [
      {
        value: '',
        label: t1('choose_a_class'),
      },
      {
        value: 'ENGL-2013: Research Methods in English',
        label: t('ENGL-2013:_Research_Methods_in_English'),
      },
      {
        value: 'ENGL-2023: Survey of English Literature',
        label: t('ENGL-2023:_Survey_of_English_Literature'),
      },
      {
        value: 'ENGL-2213: Drama Production I',
        label: t('ENGL-2213:_Drama_Production_I'),
      },
      {
        value: 'LAW-1323: Fundamentals of Advocacy',
        label: t('LAW-1323:_Fundamentals_of_Advocacy'),
      },
      {
        value: 'LAW-2273: Business Organizations',
        label: t('LAW-2273:_Business_Organizations'),
      },
      {
        value: 'Virtual Office Hours - Michael Bailetti',
        label: t('Virtual_Office_Hours_-_Michael_Bailetti'),
      },
      {
        value: 'Virtual Office Hours - Steve Stoyan',
        label: t('Virtual_Office_Hours_-_Steve_Stoyan'),
      },
      {
        value: 'Virtual Office Hours - Tony Weiss',
        label: t('Virtual_Office_Hours_-_Tony Weiss'),
      },
    ];

    const roleList = [
      {
        value: '',
        label: t1('choose_a_role'),
      },
      {
        value: 'student123',
        label: t1('student'),
      },
      {
        value: 'prof123',
        label: t1('teacher'),
      },
    ];

    return { classList, roleList };
  };

  render() {
    const { classList, roleList } = this.getOptions(this.props.isGuest);

    return (
      <ScrollableAnchor id="lotus-class">
        <div className="lotus-class">
          <div className="class-background">
            <img src={classBackground} className="fullscreen" alt="" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h3 className="uppercase text-center">
                  {t2('demo_virtual_class')}
                </h3>
                <div className="join-class-form">
                  <div className="row">
                    <div className="col-md-4">
                      <span>{t1('class')}:</span>
                      <Select
                        name="meetingID"
                        className="input-default"
                        options={classList}
                      />
                    </div>
                    <div className="col-md-4">
                      <span>{t1('enter_your_name')}:</span>
                      <Input
                        type="text"
                        id="username"
                        required=""
                        name="username"
                        placeholder={t1('your_name')}
                        size="29"
                        className="field input-default"
                      />
                    </div>
                    <div className="col-md-2">
                      <span>{t1('role')}:</span>
                      <div className="clearfix" />
                      <Select
                        name="password"
                        className="input-default"
                        options={roleList}
                      />
                    </div>
                    <div className="col-md-2 join-class-btn">
                      <button
                        className="uppercase"
                        onClick={this.handleJoinVirtualClass}
                      >
                        {t1('join_class')}
                      </button>
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
  joinClassForm: state.form.joinClassForm,
  isGuest: Perm.isGuest(),
});

export default connect(populateStateToProps)(
  reduxForm({
    form: 'joinClassForm',
  })(Class),
);
