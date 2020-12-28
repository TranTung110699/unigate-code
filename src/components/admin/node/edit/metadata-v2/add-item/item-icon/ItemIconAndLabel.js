import React, { Component } from 'react';
import { genAddItemLabel } from 'components/admin/node/edit/metadata/add-item/labels';
import ItemIcon from './ItemIcon';

import './styles.scss';

class ItemIconAndLabel extends Component {
  render() {
    const { ntype, subType } = this.props;
    return (
      <div className="item-icon link">
        <div>
          <div className="icon">
            <ItemIcon ntype={ntype} subType={subType} />
          </div>
          <div className="label text-center">
            {genAddItemLabel(ntype, subType)}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemIconAndLabel;
