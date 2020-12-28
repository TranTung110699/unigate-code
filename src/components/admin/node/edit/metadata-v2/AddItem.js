import React from 'react';
import get from 'lodash.get';
import Button from 'antd/lib/button';
import RaisedButton from 'components/common/mui/RaisedButton';
import ChooseItemToAdd from 'components/admin/node/edit/metadata-v2/add-item/';
import DetailOnDialog from 'components/common/detail-on-dialog';
import {
  getAddBankDialogTitle,
  getAddItemButtonLabel,
  optionsProperties,
} from './add-item/utils';
import { bankDialogTabDisplayTypes } from 'components/admin/node/bank/utils';

class AddItem extends React.Component {
  /**
   *
   * @param showFull
   * @param bankDialogTabMode : 'new_only' or 'search_bank'
   * @return {*}
   */
  renderPreview = ({ showFull, bankDialogTabMode }) => {
    const { node = {}, outterMost, isCompact } = this.props;

    const label = getAddItemButtonLabel(node, bankDialogTabMode);

    let content;
    if (outterMost)
      content = <RaisedButton primary label={label} onClick={showFull} />;
    else {
      if (isCompact)
        content = (
          <Button
            type={'default'}
            shape="square"
            icon="plus"
            size={'small'}
            onClick={showFull}
          />
        );
      else {
        content = (
          <Button
            type={'default'}
            shape="square"
            icon="plus"
            size={'small'}
            onClick={showFull}
          >
            {label}
          </Button>
        );
      }
    }

    return content;
  };

  renderFull = ({ closeDialog, bankDialogTabMode }) => {
    const { node = {}, childrenTypes = null } = this.props;

    return (
      <ChooseItemToAdd
        node={node}
        childrenTypes={childrenTypes}
        bankDialogTabMode={bankDialogTabMode}
      />
    );
  };

  render() {
    const {
      node,
      childrenTypes = null,
      outterMost,
      path,
      isCompact,
      showLink, // if we want to render add-item into a link into a new page in stead of popping into dialog
    } = this.props;

    if (
      !get(node, 'iid') ||
      !Array.isArray(childrenTypes) ||
      !childrenTypes.length
    ) {
      return null;
    }

    const dialogKey = `metadata_add_item_${get(node, 'iid')}`;

    if (!showLink) {
      // we don't have to show the "Choose From Bank" for questions because we already expose it earlier
      if (node.ntype == 'exercise') {
        return (
          <div>
            <DetailOnDialog
              dialogKey={dialogKey}
              renderPreview={({ showFull }) => {
                return this.renderPreview({
                  showFull,
                  bankDialogTabMode: bankDialogTabDisplayTypes.NEW_ONLY,
                });
              }}
              renderFull={({ closeDialog }) => {
                return this.renderFull({
                  closeDialog,
                  bankDialogTabMode: bankDialogTabDisplayTypes.NEW_ONLY,
                });
              }}
              dialogOptionsProperties={optionsProperties(
                getAddBankDialogTitle(node),
              )}
            />
          </div>
        );
      } else
        return (
          <div>
            <DetailOnDialog
              dialogKey={dialogKey}
              renderPreview={({ showFull }) => {
                return this.renderPreview({
                  showFull,
                  bankDialogTabMode: bankDialogTabDisplayTypes.BOTH,
                });
              }}
              renderFull={({ closeDialog }) => {
                return this.renderFull({
                  closeDialog,
                  bankDialogTabMode: bankDialogTabDisplayTypes.BOTH,
                });
              }}
              dialogOptionsProperties={optionsProperties(
                getAddBankDialogTitle(node),
              )}
            />
          </div>
        );
    }
    /*
    else {
      const label = getAddItemButtonLabel(node);

      let content;
      if (outterMost) content = <RaisedButton primary label={label} />;
      else {
        if (isCompact)
          content = (
            <Button
              type={'default'}
              shape="square"
              icon="plus"
              size={'small'}
            />
          );
        else {
          content = (
            <Button type={'default'} shape="square" icon="plus" size={'small'}>
              {label}
            </Button>
          );
        }
      }

      return (
        <Link title={label} to={`${path}/add-item`}>
          {content}
        </Link>
      );
    }
    */
  }
}

export default AddItem;
