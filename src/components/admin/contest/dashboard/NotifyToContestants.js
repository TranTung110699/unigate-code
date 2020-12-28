import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from 'components/admin/contest/exam-round/new/Form';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from '../../../common/mui/FlatButton';

class NotifyToContestants extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, node, contest, requestSuccessful } = this.props;

    const hiddenFields = {
      task_list__notify_to_contestants: true,
    };

    const contentDialog = (
      <div>
        <div>
          {t1(
            'when_you_click_all_contestants_in_the_exam_round_will_receive_email_about_this_exam_round',
          )}
        </div>
        <NewForm
          mode="edit"
          node={node}
          contest={contest}
          hiddenFields={hiddenFields}
          requestSuccessful={requestSuccessful}
          step="notify_to_contestants"
          submitButton={
            <RaisedButton
              icon={<Icon icon="notify_to_contestants" />}
              primary
              label={t1('notify_to_contestants')}
              type="submit"
            />
          }
          title={t1('notify_to_contestants')}
        />
      </div>
    );

    const optionsProperties = {
      handleClose: true,
      modal: true,

      title: t1('notify_to_contestants'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <span>
        <FlatButton
          primary
          icon={<Icon icon="notifications" />}
          onClick={() => this.handleOnClick()}
        />
      </span>
    );
  }
}

export default connect()(NotifyToContestants);
