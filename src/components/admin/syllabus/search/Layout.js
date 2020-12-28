import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubMenuTopContext from 'common/context/menu/SubMenuTop';
import SyllabusExamSearchForm from './SyllabusExamSearchForm';
import CreditSearchForm from './credit-search/CreditSearchForm';
import SyllabusSearchForm from './SyllabusSearchForm';
import NewCreditButton from '../new/credit/ButtonNew';
import NewFromTemplateButton from '../new/from-template/ButtonNewFromTemplate';
import NewSyllabusButton from '../new/ButtonNew';
import { t1 } from 'translate';

class SyllabusLayout extends Component {
  getCreateNewButton = (props) => {
    const { type } = props;

    switch (type) {
      case 'syllabus':
        return <NewSyllabusButton />;
      // case 'syllabus_exam':
      //   return <NewSyllabusExamButton />;
      case 'credit':
        return <NewCreditButton />;
      default:
        return <NewFromTemplateButton />;
    }
  };

  render() {
    const { contest, examRound, type } = this.props;

    let hiddenFields = {};
    let classFormFilter = '';

    if (contest) {
      hiddenFields = { contest_code: contest.code, ...hiddenFields };
      classFormFilter = 'display-none';
    }

    if (examRound && examRound.code) {
      hiddenFields = { exam_round: examRound.code, ...hiddenFields };
    }

    return (
      <div>
        {type !== 'syllabus_exam' && (
          <SubMenuTopContext
            button={this.getCreateNewButton(this.props)}
            lastBreadcrumbName={t1(type === 'credit' ? 'credit' : 'syllabus')}
            description={t1(
              'credit_is_a_structured_learning_materials_with_a_clear_goal_in_mind_as_what_streamlined_skill_students_will_archive_by_learning_it',
            )}
          />
        )}
        {(() => {
          if (type === 'syllabus_exam') {
            return (
              <SyllabusExamSearchForm
                hiddenFields={hiddenFields}
                {...this.props}
                classFormFilter={classFormFilter}
              />
            );
          }

          if (type === 'credit') {
            return (
              <CreditSearchForm
                hiddenFields={hiddenFields}
                {...this.props}
                classFormFilter={classFormFilter}
              />
            );
          }

          return (
            <SyllabusSearchForm
              hiddenFields={hiddenFields}
              {...this.props}
              classFormFilter={classFormFilter}
            />
          );
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let { type } = props;

  let originalType = type;
  if (!type) {
    const { location } = props;
    const { pathname } = location;
    const tmp = pathname.split('/');
    type = tmp.length >= 3 ? tmp[2] : 'syllabus';
    originalType = type;

    if (['credit', 'syllabus_exam'].indexOf(type) === -1) {
      type = 'syllabus';
    }
  }

  return {
    originalType,
    type,
    action: props.match && props.match.params && props.match.params.action,
  };
};

SyllabusLayout.propTypes = {
  dispatch: PropTypes.func,
  type: PropTypes.string,
};

SyllabusLayout.defaultProps = {
  dispatch: () => {},
  type: '',
};

export default connect(mapStateToProps)(SyllabusLayout);
