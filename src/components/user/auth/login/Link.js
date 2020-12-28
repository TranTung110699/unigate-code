import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';
import { activeLoginTab, openLoginDialog } from 'actions/auth/auth-dialog';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/

class LoginLink extends React.Component {
  constructor(props) {
    super(props);
    this.openLoginPopup = this.openLoginPopup.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
  }

  openLoginPopup() {
    const { dispatch } = this.props;
    dispatch(openLoginDialog());
  }

  render() {
    const label = t1('Login');
    return (
      // <a href="#" onClick={this.openLoginPopup} alt={label}> {label}</a>
      <FlatButton title={label} onClick={this.openLoginPopup}>
        <i className="fa fa-sign-in" />
      </FlatButton>
    );
  }
}

export default connect()(LoginLink);
