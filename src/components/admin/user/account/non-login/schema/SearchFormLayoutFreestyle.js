import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import Button from 'components/common/primary-button';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  handleResendRequiredLogin() {
    const valuesToSubmit = get(this.props, 'valuesToSubmit');
    const resendRequiredLogin = get(
      this.props,
      'layoutOptionsProperties.resendRequiredLogin',
    );

    if (typeof resendRequiredLogin === 'function') {
      resendRequiredLogin(valuesToSubmit);
    }
  }

  render() {
    const { groups } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-12">{get(groups, 'id.fieldNames.text')}</div>
          <div className="col-md-5">
            {get(groups, 'id.fieldNames.user_organizations')}
          </div>
          <div className="col-md-2 m-t-35">
            {get(groups, 'id.fieldNames.include_sub_organizations')}
          </div>
          <div className="col-md-5">
            {get(groups, 'id.fieldNames.login_required_latest')}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 m-b-15 p-t-15">
            <Button
              type="submit"
              name="search"
              id="search"
              icon={<Icon icon={'search'} />}
              label={t1('search')}
              primary
            />
            <Button
              name="export"
              id="export"
              label={t1('resend_all')}
              className="m-l-10"
              primary
              icon={<Icon icon={'mail'} />}
              onClick={() => {
                this.handleResendRequiredLogin();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
