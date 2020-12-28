import React, { Component } from 'react';
import { t1 } from 'translate';
import Tabs from 'components/common/tabs';
import NewForm from 'components/admin/course/new/Form';
// import Paper from '../../paper/search/Layout';
// import Validation from './../Validation';
import ContestantsLayout from '../../contestants/contestant-search/Layout';
// import TestRuleForm from '../../test-rule/form';
import sagaActions from 'actions/node/saga-creators';
import fetchNode from 'actions/node/creators';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';

class ManageExamShiftWrapper extends Component {
  componentDidMount() {
    const { examShift, dispatch } = this.props;

    dispatch(
      fetchNode.fetchNode({
        iid: examShift.syllabus,
        ntype: 'syllabus',
        depth: 2,
        courseIid: examShift.iid,
      }),
    );
  }

  // editTestRuleSuccess = (value) => {
  //   const { dispatch, examStoreOfExamShift } = this.props;
  //   const node = examStoreOfExamShift;
  //   delete node.children;
  //
  //   node.options = value;
  //
  //   dispatch(
  //     sagaActions.updateNodeRequest({
  //       step: 'options',
  //       iid: node.iid,
  //       data: node,
  //       closeModal: true,
  //     }),
  //   );
  // };

  render() {
    const { contestIid, examShift, options } = this.props;

    return (
      <div style={{ minHeight: '600px' }}>
        <Tabs
          tabs={[
            {
              label: t1('exam_shift_information'),
              content: (
                <NewForm
                  node={examShift}
                  mode="edit"
                  step={'exam_shift'}
                  title="Update Node"
                  contestIid={examShift.contest_iid}
                />
              ),
            },
            {
              label: t1('exam_shift_contestants'),
              content: (
                <ContestantsLayout
                  contestIid={contestIid}
                  examShift={examShift}
                  {...options}
                />
              ),
            },
            /*
            {
              label: t1('exam_shift_rules'),
              content: (
                <TestRuleForm
                  iid={examShift.syllabus}
                  editSuccess={this.editTestRuleSuccess}
                />
              ),
            },
            {
              label: t1('exam_shift_papers'),
              content: (
                <Paper course={examShift} />
              ),
            },
            {
              label: t1('exam_shift_validation'),
              content: <Validation examShift={examShift} showInTheMiddle />,
            },
            */
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const examStoreOfExamShiftIid = lodashGet(props, 'examShift.syllabus');

  return {
    examStoreOfExamShift:
      getNodeSelector(state)(examStoreOfExamShiftIid, null, 1) || {},
  };
};

export default connect(mapStateToProps)(ManageExamShiftWrapper);
