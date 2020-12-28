import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { constants, NodeShape } from 'configs/constants';
import routes from 'routes';
import Icon from 'components/common/Icon';
import { hasSettings } from 'components/admin/node/configs';
import sagaActions from 'actions/node/saga-creators';
import TestRuleForm from 'components/admin/contest/test-rule/form';
import ActionSelect from 'components/common/select/ActionSelect';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import { isEditingItemFreeze } from 'components/admin/node/selectors/edit-item';
import { urlActions as actions } from '../utils';
// import ExerciseQuestionDisplayTemplate from './ExerciseQuestionDisplayTemplate';
import ExerciseAdvancedSettings from './ExerciseAdvancedSettings';
import SequentialLearning from './SequentialLearning';
import Card from 'antd/lib/card';

class EditControls extends Component {
  actionSelectStyle = { minWidth: 200, width: 'auto' };
  spanStyle = { color: 'red' };

  constructor(props) {
    super(props);
    this.editTestRule = this.editTestRule.bind(this);
  }

  // hasLegacy() {
  //   const { node } = this.props;
  //   return false;
  //   // only xpeak might need legacy, but legacy is from jquery version and shouldn't exist now, as of Sep 2018
  //   // return node.ntype === 'video';
  // }

  /**
   * In the case of editing testrule for an exercise of a Sco
   * a Sco can have a children structure like this
   * 	"children" : [
     {
       "id" : "5cd3db80abd8b41f49227803",
       "iid" : 382967,
       "ntype" : "video",
       "name" : "asdf asdfsdf",
       "type" : "video"
     },
     {
       "id" : "5cd4e98babd8b42cb500d8ce",
       "iid" : 382970,
       "ntype" : "exercise",
       "duration" : "05:00",
       "options" : {
         "can_resume" : 1,
         "instant_key" : 1,
         "can_review" : 1
       },
       "name" : "asdf"
     }
   ],
   * When we edit options for exercise, we update it to the sco's children metadata
   *
   * TODO: check if this still works if exercise is a DIRECT child of syllabus
   *
   */

  editTestRule = (options) => {
    const { node, nodes, dispatch } = this.props;
    node.options = options;
    const { pid } = node;
    const parentNode = nodes[pid];
    if (
      !pid ||
      !parentNode ||
      !parentNode.metadata ||
      !parentNode.metadata.length
    ) {
      return;
    }
    const metadata = parentNode.metadata.map((item) => {
      if (item.iid.toString() === node.iid.toString()) {
        return Object.assign({}, item, node);
      }
      return item;
    });
    parentNode.metadata = metadata;
    dispatch(
      sagaActions.updateNodeRequest({
        step: 'metadata',
        iid: parentNode.iid,
        data: parentNode,
        closeModal: true,
      }),
    );
  };

  render() {
    const { node, editCourseExamMode, readOnly, syllabus } = this.props;
    const { ntype } = node;
    // const applicableNtypes = constants.getApplicableNtypes(node);

    let editBaseUrl = this.props.location.pathname;

    actions.forEach((action) => {
      if (editBaseUrl.endsWith(`/${action}`)) {
        editBaseUrl = editBaseUrl.replace(`/${action}`, '');
      }
    });

    const hasSequentialLearning =
      syllabus &&
      syllabus.iid &&
      syllabus.ntype &&
      ntype === 'syllabus' &&
      syllabus.type !== 'syllabus_exam';

    return (
      <div>
        {hasSettings(node) && (
          <div>
            {node && node.ntype && ['exercise', 'sco'].includes(node.ntype) ? (
              <React.Fragment>
                <div className="text-muted">{t1('test_rules')}</div>

                <div className="whitebox">
                  {!editCourseExamMode && (
                    <div>
                      {node &&
                        ((node.ntype === 'exercise' &&
                          ['dictation', 'roleplay'].indexOf(
                            node.speaking_type,
                          ) === -1) ||
                          (node.ntype === 'sco' &&
                            node.tpl_type === 'exam')) && (
                          <TestRuleForm
                            iid={node.iid}
                            editSuccess={this.editTestRule}
                          />
                        )}
                    </div>
                  )}
                </div>
              </React.Fragment>
            ) : null}

            {hasSequentialLearning && (
              <div>
                <Card size="small" title={t1('syllabus_learning_sequence')}>
                  <SequentialLearning {...this.props} />
                </Card>
              </div>
            )}

            {node && node.ntype === 'exercise' && (
              <div>
                <div className="text-muted">
                  {t1('question_display_template_settings')}
                </div>
                <div className="whitebox">
                  <ExerciseAdvancedSettings node={node} readOnly={readOnly} />
                  {/*<ExerciseQuestionDisplayTemplate {...this.props} />*/}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

EditControls.propTypes = {
  node: PropTypes.shape(NodeShape),
  addNewItemClicked: PropTypes.func,
  editCourseExamMode: PropTypes.bool,
};

EditControls.defaultProps = {
  editCourseExamMode: false,
};

// const mapStateToProps = (state, props) => ({
//   nodes: state.tree,
//   readOnly: isEditingItemFreeze(state),
// });

export default connect()(EditControls);
