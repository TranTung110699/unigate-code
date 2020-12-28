import React from 'react';
import { connect } from 'react-redux';
import Perm from 'common/utils/Perm';
import ScoExamItem from 'components/learn/items/exam/sco';
import fetchNode from 'actions/node/creators';
import { DefinedUrlParams } from 'routes/links/common';
import Loading from 'components/common/loading';
import { modes, types } from 'common/learn/exercise';
import { initExam } from 'actions/learn/exercise/normal/saga-creators';
import { setCurrentLearningElement } from 'actions/learn';
import { getLearnItemInfoSelector } from 'common/learn';
import { startPreviewPaper } from '../../../actions/learn/exercise/normal/saga-creators';
import contestApiUrls from 'components/admin/contest/endpoints';

class PreviewPaper extends React.Component {
  componentWillMount() {
    this.state = {
      loadAsync: true,
    };

    this.onFetchLearnItem();
  }

  componentWillReceiveProps() {
    if (!Perm.hasPerm('staff')) {
      window.location.assign('/');
    }
  }

  onFetchLearnItem() {
    const { dispatch, paperId, syllabusIid } = this.props;

    dispatch(
      fetchNode.fetchNode({
        apiUrl: contestApiUrls.load_paper,
        syllabus_iid: syllabusIid,
        paper_id: paperId,
        depth: -1,
        is_testing: true,
        learning: false,
        executeOnSuccess: this.onFetchLearnItemSuccess,
      }),
    );
  }

  onFetchLearnItemSuccess = (node) => {
    const { dispatch, paperId, syllabusIid } = this.props;

    const examOrder = 1;
    const learnInfo = {
      type: types.EXAM,
      id: node.id,
      iid: node.iid,
      name: node.name,
      description: node.description,
      options: node.options,
      exam_type: node.ntype,
      exam_order: examOrder,
      duration: node.duration,
      mode: modes.PREVIEW,
    };

    dispatch(initExam(node.iid, learnInfo));

    dispatch(
      setCurrentLearningElement({
        itemIid: node.iid,
        courseIid: null,
      }),
    );

    dispatch(startPreviewPaper(syllabusIid, paperId));

    this.setState({ loadAsync: 'loading' });
  };

  render() {
    const { itemIid } = this.props;
    const loadAsync = this.state.loadAsync;

    if (loadAsync === true) {
      return <Loading />;
    }

    return (
      <ScoExamItem
        key={`${itemIid}-sco-exam`}
        id={`${itemIid}-sco-exam`}
        courseIid={null}
        learnItemIid={itemIid}
      />
    );
  }
}

const getParams = (match, param) => {
  if (match && match.params && match.params[param]) {
    return match.params[param];
  }

  return null;
};

const mapStateToProps = (state, props) => {
  const { match } = props;

  const paperId = getParams(match, DefinedUrlParams.PAPER_ID);
  const syllabusIid = getParams(match, DefinedUrlParams.SYLLABUS_IID);
  const userInfo = state.user.info;
  const itemIid = state.learn.itemIid;
  const learnItem = state.tree[itemIid];
  const learnInfo = getLearnItemInfoSelector(state)(itemIid);

  return {
    paperId,
    syllabusIid,
    userInfo,
    itemIid,
    learnItem,
    learnInfo,
  };
};

export default connect(mapStateToProps)(PreviewPaper);
