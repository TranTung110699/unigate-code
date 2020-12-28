import React from 'react';
import { connect } from 'react-redux';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import examRoundTopMenuSchema from '../menu/MainstageTopMenu';
import UpdateExamRoundForm from 'components/admin/contest/exam-round/new/Form';
import HorizontalNav from 'layouts/admin_v2/horizontal-nav/index-v2';
import { t1 } from 'translate';
import { examRoundActions, examRoundUrl } from '../../routes';
import Metadata from 'components/admin/node/edit/metadata/MetadataContainer';
import lodashGet from 'lodash.get';
import ExamPaper from 'components/admin/contest/paper/search/Layout';
import InvalidQuestions from './invalid-questions';
import { getLearningItemFormSchema } from 'components/admin/node/schema-form/learning-items';
import NodeNew from 'components/admin/node/new/';

class ExamRoundEditContainer extends React.Component {
  getTopMenuSchemaByAction(props) {
    const { action, contest, examRound, subAction } = props;

    switch (action) {
      case 'information': {
        if (examRound && examRound.code) {
          return examRoundTopMenuSchema();
        }
        break;
      }
      // case 'exam-stores': {
      //   return [
      //     {
      //       button: <NewSyllabusExamButton />,
      //       id: 'new_syllabus_exam',
      //       type: 'modal',
      //       floatRight: true,
      //       icon: 'plus',
      //     },
      //   ];
      // }
      default: {
        return null;
      }
    }
  }

  getContentByAction(props) {
    const { examRound, contest, action, itemAncestors, node, readOnly } = props;
    let contentDisplay;
    switch (action) {
      case examRoundActions.information: {
        contentDisplay = (
          <UpdateExamRoundForm
            mode="edit"
            contest={contest}
            node={examRound}
            step={'exam_round'}
            formid="edit_exam_round"
          />
        );
        break;
      }
      case examRoundActions.paper: {
        //                 <Paper course={examShift}/>
        contentDisplay = <ExamPaper examRound={examRound} contest={contest} />;
        break;
      }
      case examRoundActions.examStore: {
        contentDisplay = <div>Exam store</div>;
        break;
      }
      case examRoundActions.invalidQuestions: {
        contentDisplay = <InvalidQuestions examRound={examRound} />;
        break;
      }
      case 'edit': {
        if (node.ntype === 'question' && node.type === 2 && !node.sub_type) {
          node.sub_type = 'MC';
        }
        contentDisplay = (
          <NodeNew
            key={node.iid}
            schema={getLearningItemFormSchema(node.ntype)}
            readOnly={readOnly}
            // message={readOnly ? `(*${t1('this_form_is_read_only')})` : ''}
            ntype={node.ntype}
            node={node}
            mode="edit"
            step={node.type === 'credit' ? 'credit' : ''}
          />
        );
        break;
      }
      default: {
        //Edit exam store, sco, exercise children in edit contest container

        contentDisplay = (
          <div>
            {/*
            <BasicInformationNavMenu {...this.props} contestMode />
            <ExamStore examRound={examRound} />
            */}
            <Metadata
              node={this.props.node}
              syllabusIid={examRound.syllabus}
              ancestors={itemAncestors}
              action={action}
            />
            {/*
            <MetadataV2
              node={this.props.node}
              syllabusIid={examRound.syllabus}
              itemAncestors={itemAncestors}
              action={action}
            />
               */}
          </div>
        );
        break;
      }
    }
    return contentDisplay;
  }

  render() {
    const { contest, examRound, action, subAction } = this.props;
    // console.log({props: this.pro})
    let activeMenu;
    if (action === examRoundActions.information) activeMenu = 'information';
    else if (action === examRoundActions.paper) activeMenu = 'paper';
    else if (action === examRoundActions.invalidQuestions)
      activeMenu = 'invalid-questions';
    else if (['children', 'edit'].includes(action)) activeMenu = 'exam-store';

    const contestIid = contest.iid;
    const navItems = [
      {
        id: 'information',
        active: activeMenu === 'information',
        label: t1('exam_round_information'),
        link: examRoundUrl(contestIid, examRound, examRoundActions.information),
      },
      {
        id: 'exam-store',
        active: activeMenu === 'exam-store',
        label: `${t1('exam_store')} (${examRound.exam_scos_count || 0})`,
        link: examRoundUrl(contestIid, examRound, examRoundActions.examStore),
      },
      {
        id: 'paper',
        active: activeMenu === 'paper',
        label: `${t1('exam_papers')} (${examRound.paper_count || 0})`,
        link: examRoundUrl(contestIid, examRound, examRoundActions.paper),
      },
      {
        id: 'invalid-questions',
        active: activeMenu === 'invalid-questions',
        label: `${t1('process_invalid_questions')}`,
        link: examRoundUrl(
          contestIid,
          examRound,
          examRoundActions.invalidQuestions,
        ),
      },
    ];

    return (
      <div>
        <SubTopMenuContext
          lastBreadcrumbName={contest.name}
          action={action}
          subAction={subAction}
          schema={this.getTopMenuSchemaByAction(this.props)}
          isSmallSize
        />
        <HorizontalNav
          items={navItems}
          content={this.getContentByAction(this.props)}
          key={`${contest && contest.iid}_${examRound && examRound.iid}`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const examRound = props.examRound;
  if (examRound && examRound.syllabus) {
    return {
      syllabus: lodashGet(state, `tree.${examRound.syllabus}`),
    };
  }
};

export default connect(mapStateToProps)(ExamRoundEditContainer);
