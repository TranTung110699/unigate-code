/**
 * Created by hungvo on 23/06/17.
 */
import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import NewForm from './../new/Form';
import topMenuSchema from '../menu/MainstageTopMenu';

class Unlock extends Component {
  render() {
    const alternativeApi = '/site/migrate-items-unlock';

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <NewForm
          mode="new"
          step={'migrate_items_unlock'}
          alternativeApi={alternativeApi}
          formid={'migrate_items_unlock'}
        />
      </div>
    );
  }
}

export default Unlock;
