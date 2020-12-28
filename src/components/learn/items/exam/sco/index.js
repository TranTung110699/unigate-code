import React from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import ExerciseExamItem from '../exercise';
import { modes } from 'common/learn/exercise';
import Loading from 'components/common/loading';
import actions from 'actions/node/creators';

class ScoExamItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount() {
    if (lodashGet(this.props, 'mode') === modes.PREVIEW) {
      this.setState({ loading: true });
      this.fetchSco();
    }
  }

  fetchSco = () => {
    const { dispatch, sco } = this.props;
    dispatch(
      actions.fetchNode({
        iid: sco.iid,
        ntype: sco.ntype,
        editing_syllabus: 2,
        depth: -1,
        executeOnSuccess: () => {
          this.setState({ loading: false });
        },
      }),
    );
  };

  render() {
    const { sco, scoIid, courseIid, loadingStatus } = this.props;

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <ExerciseExamItem
        learnItemIid={scoIid}
        courseIid={courseIid}
        exercises={sco.children}
      />
    );
  }
}

ScoExamItem.propTypes = {};

ScoExamItem.defaultProps = {};

const mapStateToProps = (state, props) => {
  const learnItemIid = props.learnItemIid || state.learn.itemIid;
  const nodes = state.tree;
  const sco = nodes[learnItemIid];

  return {
    scoIid: learnItemIid,
    sco,
  };
};

export default connect(mapStateToProps)(ScoExamItem);
