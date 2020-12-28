import React from 'react';
import { t1, t3 } from 'translate';
import Icon from 'components/common/Icon';
import { errorCodes } from './codes';
import './not-allowed.scss';
import userLinks from 'routes/links/user';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import withUserInfo from 'common/hoc/withUserInfo';
import { buyPackageUrl } from 'routes/root-url';

class LearnPermissionError extends React.PureComponent {
  renderCTA = (permError) => {
    let contentDisplay;

    if (
      parseInt(permError.code) === errorCodes.ERR_LEARN_PERMISSION_NOT_INVITE
    ) {
      contentDisplay = (
        <div>
          <Link to={buyPackageUrl}>
            <button className="m-l-10 btn-primary">{t1('buy_now')}</button>
          </Link>
        </div>
      );
    } else if (
      parseInt(permError.code) ===
      errorCodes.ERR_LEARN_PERMISSION_GUEST_CANNOT_LEARN
    ) {
      contentDisplay = (
        <div>
          <Link
            to={{
              pathname: userLinks.login,
              query: { nextUrl: this.props.location.pathname },
            }}
          >
            <button className="m-l-10 btn-primary">{t1('login')}</button>
          </Link>
          <Link to={userLinks.register}>
            <button className="m-l-10 btn-secondary">{t1('register')}</button>
          </Link>
        </div>
      );
    }

    return contentDisplay;
  };

  render() {
    const { permError } = this.props;

    let msg = '';

    switch (parseInt(permError.code)) {
      case errorCodes.ERR_LEARN_PERMISSION_DEADLINE_OVER:
        msg = t3('deadline_is_over');
        break;
      case errorCodes.ERR_LEARN_PERMISSION_INVITE_STATUS_DELETED_OR_REJECTED:
        msg = t3('you_have_been_rejected_or_deleted_from_course');
        break;
      case errorCodes.ERR_LEARN_PERMISSION_GUEST_CANNOT_LEARN:
        msg = t3('guest_users_are_not_allowed_to_access_this_course');
        break;
      case errorCodes.ERR_LEARN_PERMISSION_END_DATE_OVER_TIME:
        msg = t3('exam_shift_end_date_is_over_time');
        break;
      case errorCodes.ERR_LEARN_PERMISSION_INVALID_IP:
        msg = t3('your_ip_address_is_not_in_valid_IP_range');
        break;
      case errorCodes.ERR_LEARN_PERMISSION_NOT_INVITE:
        msg = t3('the_course_is_private,_you_have_to_be_invited_to_learn_it');
        break;
      case errorCodes.ERR_LEARN_PERMISSION_START_DATE_NOT_YET_STARTED:
        msg = t3('start_date_learning_not_yet_started');
        break;
      default:
        msg = t3('you_are_not_allowed_to_access_this_course');
        break;
    }

    return (
      <div className="not-allowed-wrapper">
        <div>
          <Icon className="warning-icon" icon="warning" />
          <h3 className="error-message">{msg}</h3>
          {this.renderCTA(permError)}
        </div>
      </div>
    );
  }
}

export default withUserInfo(withRouter(LearnPermissionError));
