/**
 * Created by hungvo on 23/06/17.
 */
import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import NewForm from '../new/Form';
import topMenuSchema from '../menu/MainstageTopMenu';

class Unlock extends Component {
  render() {
    const alternativeApi = '/path/unlock-by-uiids';

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <NewForm
          mode="new"
          step={'unlock_by_uiids'}
          alternativeApi={alternativeApi}
          formid={'unlock_support_by_iid'}
        />
      </div>
    );
  }
}

export default Unlock;
