import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import NewButton from 'components/common/primary-button';
import { withRouter } from 'react-router';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import NewForm from './Form';

export const showNewSkill = (props) => {
  const { dispatch, type } = props;
  const params = { type };
  const contentDialog = <NewForm mode="new" step={type} params={params} />;
  const title = type === 'rubric' ? t1('add_new_skill') : t1('add_new_rubric');

  const optionsProperties = {
    handleClose: true,

    title,
    modal: true,
    callbacks: {
      onCloseDialog: () => {
        // history && history.push('/admin/skill');
      },
    },
  };
  dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
};

class NewSkillButton extends Component {
  render() {
    const { type } = this.props;
    const link = type === 'rubric' ? '/admin/rubric/new' : '/admin/skill/new';
    const label = type === 'rubric' ? t1('new_rubric') : t1('new_skill');

    return (
      <Link to={link}>
        <NewButton
          name="submit"
          type="submit"
          icon={<Icon icon="plus" />}
          label={label}
          onClick={() => showNewSkill(this.props)}
        />
      </Link>
    );
  }
}

export default withRouter(connect()(NewSkillButton));
