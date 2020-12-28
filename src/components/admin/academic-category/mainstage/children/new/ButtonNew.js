import React, { Component } from 'react';

import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/NewButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/academic-category/schema/form';

import { getSearchFormId } from '../common/utils';

class ButtonNew extends Component {
  dialogOptionsProperties = {
    handleClose: true,

    title: t1('new_academic_category'),
    modal: true,
  };

  renderPreview = ({ showFull }) => (
    <FlatButton
      name="submit"
      type="submit"
      icon={<Icon icon="plus" />}
      label={t1('new_academic_category')}
      onClick={showFull}
    />
  );

  renderFull = () => {
    const { node } = this.props;
    return (
      <NodeNew
        mode="new"
        step="academic"
        params={{
          type: 'academic',
          pid: node.id,
        }}
        schema={schema}
        ntype={'academic_category'}
        closeModal
        formid={'new_academic_category_children'}
        searchFormId={getSearchFormId(node)}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

export default ButtonNew;
