import React from 'react';
import { connect } from 'react-redux';
import { history } from 'store';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import Icon from 'components/common/Icon';
import lodashGet from 'lodash.get';
import Warning from 'components/common/Warning';
import { getUrl } from 'routes/links/common';
import FlatButton from 'components/common/primary-button';
import { ButtonType } from 'components/common/primary-button/button-type-constants';

class DeleteAccount extends React.Component {
  render() {
    const { node, urlCallback, loggedInUser, onRequestSuccessful } = this.props;
    if (loggedInUser.iid === node.iid)
      return <Warning>{t1('you_cannot_delete_your_own_account')}</Warning>;

    return (
      <div>
        <h2>{t1('delete_%s', node.name)} ?</h2>
        <Warning style={{ textAlign: 'center' }} withIcon>
          {t1('please_make_sure_you_know_what_you_are_doing')}
        </Warning>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <DeleteItem
            renderComponent={(props) => (
              <FlatButton
                name="delete"
                secondary
                type="submit"
                icon={<Icon icon="delete" />}
                label={t1('delete_this_user')}
                onClick={props.onClick}
                buttonType={ButtonType.danger}
              />
            )}
            title={t1('remove')}
            alternativeApi={getUrl('node_update_user')}
            params={{
              status: 'deleted',
            }}
            step={'change_status'}
            textConfirm={t1('are_you_sure_you_want_to_do_this')}
            ntype={'user'}
            itemId={node.id}
            onRequestSuccessful={() => {
              if (onRequestSuccessful) {
                onRequestSuccessful();
              } else {
                history.push(urlCallback);
              }
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: lodashGet(state, 'user.info'),
});

export default connect(mapStateToProps)(DeleteAccount);
