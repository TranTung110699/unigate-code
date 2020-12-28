import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import lodashGet from 'lodash.get';
import FlatButton from 'components/common/mui/FlatButton';

class Detail extends Component {
  renderFull = () => {
    const { node, organization } = this.props;
    return <Form node={node} organization={organization} />;
  };

  renderPreview = ({ showFull }) => (
    <FlatButton
      disabled={this.props.disabled}
      onClick={showFull}
      title={t1('send_notification')}
      label={t1('send_notification')}
      icon={<Icon icon="submit" />}
    />
  );

  dialogOptionsProperties = () => {
    const { organization, node } = this.props;
    return {
      title: t1(
        'notify_user_about_students_of_organization_%s_in_training_plan_%s',
        [lodashGet(organization, 'name'), lodashGet(node, 'name')],
      ),
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

export default Detail;
