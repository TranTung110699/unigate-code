import React from 'react';
import { connect } from 'react-redux';
import fetchData from 'components/common/fetchData';
import Perm from 'common/utils/Perm';
import ScoExamItem from 'components/learn/items/exam/sco';
import ExerciseExamItem from 'components/learn/items/exam/exercise';
import fetchNode from 'actions/node/creators';
import { DefinedUrlParams } from 'routes/links/common';
import Loading from 'components/common/loading';
import { startPreviewTake } from 'actions/learn/exercise/normal/saga-creators';
import contestApiUrls from '../../admin/contest/endpoints';
import lGet from 'lodash.get';

class PreviewTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadAsync: true,
    };
  }

  componentWillReceiveProps() {
    if (this.props.takeInfo) this.onFetchLearnItem();
  }

  getTakeInfoForPreview = () => {
    const { dispatch, takeId } = this.props;

    dispatch(startPreviewTake(takeId));
  };

  onFetchLearnItem() {
    const { takeId, takeInfo, dispatch } = this.props;

    dispatch(
      fetchNode.fetchNode({
        apiUrl: contestApiUrls.load_paper_by_take_id, //_for_previewing take,
        iid: lGet(takeInfo, 'exam.iid'),
        is_testing: 1,
        ntype: lGet(takeInfo, 'exam.exam_type'),
        depth: -1,
        learning: false,
        take_id: takeId,
        executeOnSuccess: this.onFetchLearnItemSuccess,
      }),
    );
  }

  onFetchLearnItemSuccess = () => {
    this.getTakeInfoForPreview();
    this.setState({ loadAsync: 'loading' });
  };

  render() {
    const { takeInfo } = this.props;
    const loadAsync = this.state.loadAsync;

    if (loadAsync === true) {
      return <Loading />;
    }
    if (!takeInfo) return <Loading />;

    const exam = lGet(takeInfo, 'exam');

    const examOrder = exam.exam_order;
    const examIid = exam.iid;
    const examType = exam.exam_type;
    const courseIid = takeInfo.course;

    if (examType === 'exercise') {
      return (
        <ExerciseExamItem
          key={`${examIid}-${examOrder}-exercise-exam`}
          id={`${examIid}-${examOrder}-exercise-exam`}
          courseIid={courseIid}
          learnItemIid={examIid}
          exercises={[examIid]}
        />
      );
    }

    return (
      <ScoExamItem
        key={`${examIid}-${examOrder}-sco-exam`}
        id={`${examIid}-${examOrder}-sco-exam`}
        courseIid={courseIid}
        learnItemIid={examIid}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    takeId: lGet(props, `match.params.${DefinedUrlParams.TAKE_ID}`),
  };
};

const fetchDataConfig = (props) => ({
  baseUrl: contestApiUrls.get_take_info,
  fetchCondition: props.appliedScope,
  params: {
    id: lGet(props, 'takeId'),
  },
  propKey: 'takeInfo',
  keyState: 'takeInfo',
});

export default connect(mapStateToProps)(
  fetchData(fetchDataConfig)(PreviewTest),
);
