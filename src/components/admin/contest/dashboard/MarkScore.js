import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';

import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewForm from 'components/admin/contest/exam-round/new/Form';
import contestApiUrls from 'components/admin/contest/endpoints';
import { timestampToDateString } from 'common/utils/Date';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from '../../../common/mui/FlatButton';
import Warning from 'components/common/Warning';

class MarkScore extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch, node, contest, requestSuccessful } = this.props;

    const contentDialog = (
      <div>
        <div className="m-b-50">
          <Warning>
            {t1(
              'this_action_will_automatically_mark_the_results_of_all_taken_contestants',
            )}
          </Warning>
        </div>
        <NewForm
          mode="edit"
          node={node}
          contest={contest}
          requestSuccessful={requestSuccessful}
          step="mark_round"
          submitButton={
            <RaisedButton
              icon={<Icon icon="mark_score" />}
              primary
              label={t1('mark')}
              type="submit"
            />
          }
          title={t1('mark_score_for_exam_round')}
          alternativeApi={contestApiUrls.mark_whole_round}
        />
      </div>
    );

    const optionsProperties = {
      handleClose: true,
      modal: true,

      title: t1('mark_score_for_exam_round'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { node } = this.props;
    return (
      <div>
        <FlatButton
          primary
          icon={<Icon icon="write" />}
          title={t1('mark_score')}
          onClick={() => this.handleOnClick()}
          label={t1('mark_score')}
        />
        <br />
        <span className="text-muted" title={t1('last_marked_timestamp')}>
          {node.marking_ts
            ? timestampToDateString(node.marking_ts, { showTime: true })
            : t1('never_marked')}
        </span>
      </div>
    );
  }
}

export default connect()(MarkScore);
