import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Search from './search';
import { getTitle } from './common';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/FlatButton';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

class Detail extends Component {
  renderFull = () => {
    const { node, organization } = this.props;
    return (
      <Search node={node} organization={organization} resultTableHeight={550} />
    );
  };

  renderPreview = ({ showFull }) => (
    <FlatButton
      onClick={showFull}
      title={t1('view_details')}
      label={t1('view_details')}
      icon={<Icon icon="view" />}
    />
  );

  handleClose = () => {
    const { dispatch, searchFormId } = this.props;
    dispatch(submit(searchFormId));
  };

  dialogOptionsProperties = () => {
    const { organization, node } = this.props;
    return {
      title: getTitle(node, organization),
      handleClose: true,

      callbacks: {
        onCloseDialog: this.handleClose,
      },
      width: '90%',
    };
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties()}
      />
    );
  }
}

export default connect()(Detail);
