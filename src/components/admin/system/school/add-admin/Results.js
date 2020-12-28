import React, { Component } from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import store from 'store';

class Results extends Component {
  makeAdmin = (uid) => {
    const { slug } = this.props;
    store.dispatch(
      nodeSagaActions.submitFormRequest('', {
        url: '/school/staff/make-admin',
        extraParams: {
          uid,
          slug,
        },
      }),
    );
  };

  render() {
    const { slug, items } = this.props;

    return (
      <div>
        {items &&
          items.map((item) => (
            <div key={item.id}>
              <div>Name: {item.name}</div>
              <div>iid: {item.iid}</div>
              <div>Mail: {item.mail}</div>
              <RaisedButton
                primary
                label={'make_admin'}
                onClick={() => {
                  this.makeAdmin(item.id);
                }}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default Results;
