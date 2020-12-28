import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'components/common/mui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import Checkbox from 'material-ui/Checkbox';

class DeleteItem extends React.Component {
  state = {
    open: false,
    autoRemoveLearningItems: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeRelation(categoryIid, userIid) {
    const { id, dispatch } = this.props;

    const params = {
      oid: userIid,
      sid: categoryIid,
      object: 'user',
      subject: 'category',
      formid: id,
      autoRemoveLearningItems: this.state.autoRemoveLearningItems,
    };

    dispatch(
      commonSagaActions.changeRelationRequest(apiUrls.remove_relation, params),
    );

    this.handleClose();
  }

  render() {
    const { hiddenFields, item } = this.props;
    let { title, textConfirm } = this.props;
    title = title || t1('delete item');
    textConfirm = textConfirm || t1('are_you_sure_you_want_to_do_this');

    const actions = [
      <FlatButton label={t1('cancel')} primary onTouchTap={this.handleClose} />,
      <FlatButton
        label={t1('ok')}
        primary
        onClick={() => this.removeRelation(hiddenFields.category_iid, item.iid)}
      />,
    ];

    return (
      <span>
        <IconButton
          title={title}
          iconClassName="mi mi-clear"
          onTouchTap={this.handleOpen}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div>{textConfirm}</div>
          <Checkbox
            label={t1('remove_the_learning_items_invite_by_group')}
            onCheck={(e, value) => {
              this.setState({
                autoRemoveLearningItems: value,
              });
            }}
          />
        </Dialog>
      </span>
    );
  }
}

export default connect()(DeleteItem);
