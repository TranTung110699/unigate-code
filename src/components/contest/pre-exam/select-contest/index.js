import React from 'react';
import { connect } from 'react-redux';
import contestApiUrls from 'components/admin/contest/endpoints';

import sagaActions from 'actions/node/saga-creators';
import { createSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { t1, t3 } from 'translate';
import { withRouter } from 'react-router';
import nodeActions from 'actions/node/creators';
import './stylesheet.scss';

const GET_CURRENT_CONTESTS = 'current_contests';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contestCode: null };
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    dispatch(
      sagaActions.getDataRequest(
        {
          url: contestApiUrls.get_current_contests,
          keyState: GET_CURRENT_CONTESTS,
        },
        { user_iid: user && user.iid },
      ),
    );
  }

  handleOnSelectContest = (object) => {
    this.setState({ contestCode: object.target && object.target.value });
  };

  handleGoToContest = () => {
    const { contestCode } = this.state;

    if (contestCode) {
      this.props.history.push(`/exam/info/${contestCode}`);
    } else {
      const { dispatch } = this.props;
      dispatch(nodeActions.snackbar(true, t1('you_need_to_select_a_contest')));
    }
  };

  render() {
    const { contests } = this.props;

    const contestCode =
      contests && contests.length === 1 && contests[0] && contests[0].value;
    if (contestCode) {
      return <Redirect to={`/exam/info/${contestCode}`} />;
    }

    return (
      <div className="select-contest-wrapper">
        <div className="content">
          <h3 className="title">{t3('select_contest')}</h3>
          <select
            className="select-contest"
            onChange={this.handleOnSelectContest}
          >
            <option disabled selected value hidden>
              {t1('select_contest')}
            </option>
            {contests &&
              contests.map((item) => (
                <option className="option" value={item.value}>
                  {item.primaryText}
                </option>
              ))}
          </select>
          <button
            className="btn-go-to-contest"
            onClick={this.handleGoToContest}
          >
            {t3('go_to_contest')}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state) => state.user && state.user.info,
  (state) => state.dataApiResults[GET_CURRENT_CONTESTS],
  (user, contests) => ({
    user,
    contests,
  }),
);

export default withRouter(connect(mapStateToProps)(Index));
