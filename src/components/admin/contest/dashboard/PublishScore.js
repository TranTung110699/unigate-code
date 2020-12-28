import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from 'components/admin/contest/exam-round/new/Form';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from '../../../common/mui/FlatButton';

class PublishScore extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, node, contest, requestSuccessful } = this.props;

    const hiddenFields = {
      should_show_score: 1,
    };

    const contentDialog = (
      <div>
        <div>
          {t1(
            'users_will_be_able_to_see_the_score_in_their_contest_dashboard_once_you_published_the_score',
          )}
        </div>
        <NewForm
          mode="edit"
          node={node}
          contest={contest}
          hiddenFields={hiddenFields}
          requestSuccessful={requestSuccessful}
          step="should_show_score"
          submitButton={
            <RaisedButton
              icon={<Icon icon="publish_score" />}
              primary
              label={t1('publish')}
              type="submit"
            />
          }
        />
      </div>
    );

    const optionsProperties = {
      handleClose: true,
      modal: true,

      title: t1('publish_score_for_exam_round'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <span>
        <FlatButton
          primary
          icon={<Icon icon="publish_score" />}
          onClick={() => this.handleOnClick()}
        />
      </span>
    );
  }
}

export default connect()(PublishScore);
