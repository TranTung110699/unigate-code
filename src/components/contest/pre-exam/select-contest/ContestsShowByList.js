import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { t3 } from 'translate';
import ComponentWithoutContent from 'components/common/utils/ComponentWithoutContent';

const style = {
  height: 'auto',
  width: '100%',
  margin: 15,
  padding: 10,
  display: 'inline-block',
};

class ContestsShowByList extends Component {
  render() {
    const { contests, onHandleGoToContest, mode } = this.props;
    return (
      <div>
        {!contests || contests.length === 0 ? (
          <ComponentWithoutContent content="upcoming_contests" />
        ) : (
          contests.map((contest) => (
            <Paper style={style} zDepth={2}>
              <div className="go-to-contest-wrapper">
                <div className="label-go-to-contest">
                  <b>Name:</b> {`${contest.primaryText}`}
                </div>
                {mode === 'admin-edit-user' ? (
                  ''
                ) : (
                  <button
                    className="btn-go-to-contest"
                    onClick={() =>
                      onHandleGoToContest(contest && contest.value)
                    }
                  >
                    {t3('go_to_contest')}
                  </button>
                )}
              </div>
            </Paper>
          ))
        )}
      </div>
    );
  }
}

ContestsShowByList.propTypes = {
  onHandleGoToContest: PropTypes.func,
  onHandleSelectContest: PropTypes.func,
  contests: PropTypes.arrayOf(PropTypes.any),
};

ContestsShowByList.defaultProps = {
  onHandleSelectContest: null,
  onHandleGoToContest: null,
  contests: [],
};

const mapStateToProps = (state) => ({
  prop: state.prop,
});
export default connect(mapStateToProps)(ContestsShowByList);
