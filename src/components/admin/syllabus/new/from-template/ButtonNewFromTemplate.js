import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import routes from 'routes/index';
import { t1 } from 'translate/index';
import FlatButton from 'components/common/mui/NewButton';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon/index';
import NewForm from './Form';

class ButtonNewFromTemplate extends Component {
  handleOnClick = () => {
    const { dispatch, history } = this.props;
    const hiddenFields = {
      type: 'syllabus_exam',
    };

    const contentDialog = (
      <NewForm
        mode="new"
        step="exam"
        hiddenFields={hiddenFields}
        requestSuccessful={(post) => {
          const url = routes.url('edit_item', {
            base: '',
            item: { ntype: 'credit', iid: post.result.iid },
          });
          history.push(url);
        }}
      />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('new_exam_store_from_template'),
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        className={'m-l-10'}
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_exam_store_from_template')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default withRouter(connect()(ButtonNewFromTemplate));
