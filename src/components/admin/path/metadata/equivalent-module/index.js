import React from 'react';
import { t1 } from 'translate/index';
import getLodash from 'lodash.get';
import Icon from 'components/common/Icon/index';
import { createSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import { ntype as allNtype } from 'configs/constants/index';
import EditEquivalentModule from './edit-form';

const Button = ({ node, itemEditing }) => {
  if (
    getLodash(itemEditing, 'ntype') !== allNtype.PATH ||
    getLodash(itemEditing, 'type') !== allNtype.PROGRAM
  ) {
    return null;
  }

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <Icon
          title={t1('edit_equivalent')}
          className="action"
          icon="equivalent"
          onClick={showFull}
        />
      )}
      renderFull={({ closeDialog }) => (
        <EditEquivalentModule
          node={node}
          closeDialog={closeDialog}
          program={itemEditing}
        />
      )}
      dialogOptionsProperties={{
        title: t1('edit_quivalent_module'),
      }}
    />
  );
};

const getItemEditing = (state) => {
  const itemAncestors = state.editing.itemAncestors || [];
  const itemEditing = itemAncestors[0] || {};
  return itemEditing;
};

const mapStateToProps = createSelector(
  getItemEditing,
  (itemEditing) => ({
    itemEditing,
  }),
);

export default connect(mapStateToProps)(Button);
