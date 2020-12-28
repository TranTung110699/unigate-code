import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { constants, NodeShape } from 'configs/constants';
import routes from 'routes';
import { hasSettings } from 'components/admin/node/configs';
import nodeActions from 'actions/node/creators';

import ActionSelect from 'components/common/select/ActionSelect';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { isEditingItemFreeze } from 'components/admin/node/selectors/edit-item';
import { urlActions as actions } from '../utils';
import Weight from './Weight';
import QuestionsGroupSwitch from './QuestionsGroupSwitch';
import Card from 'antd/lib/card';

class EditControls extends Component {
  actionSelectStyle = { minWidth: 200, width: 'auto' };
  spanStyle = { color: 'red' };

  handleWeightSchemeChange = (syllabusIid, weightScheme) => {
    // dispatch to store to update node
    this.props.dispatch(
      nodeActions.treeUpsertNode({
        ntype: 'syllabus',
        iid: syllabusIid,
        weight_scheme: weightScheme,
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

    return (
      <div>
        {/*
          {checkable(ntype) &&
            !editCourseExamMode && <CheckList {...this.props} />}
          process.env.NODE_ENV !== 'production' && !editCourseExamMode &&
          <div>
            <h4>
              <Icon icon="time" /> {t1('edit_history')}
            </h4>
            <span style={this.spanStyle}>TODO: load from server if avail</span>
          </div>

           !this.props.showEditForm && applicableNtypes.length > 0 &&
           <div>
           <h4 style={h4Style}><Icon icon="plus" />Add</h4>
           <div >
           <AddChild {...this.props} editBaseUrl={editBaseUrl}/>
           </div>
           </div>
          */}

        {hasSettings(node) && (
          <div>
            <Card size="small" title={t1('item_weight_and_grouping')}>
              <div>
                {node &&
                  node.ntype !== 'question' &&
                  node.ntype !== 'vocab' &&
                  node.metadata &&
                  node.metadata.length && (
                    <Weight readOnly={readOnly} node={node} />
                  )}
                {node &&
                  node.ntype === 'exercise' &&
                  node.metadata &&
                  node.metadata.length && (
                    <QuestionsGroupSwitch node={node} readOnly={readOnly} />
                  )}
              </div>
            </Card>

            {syllabus &&
              syllabus.iid &&
              syllabus.ntype &&
              ntype === 'syllabus' && (
                <div className="m-t-20">
                  <Card size="small" title={t1('syllabus_weight_scheme')}>
                    <ActionSelect
                      floatingLabelText={t1('syllabus_weight_scheme')}
                      name="weight_scheme"
                      value={syllabus && syllabus.weight_scheme}
                      baseURL={routes.url('node_update', {
                        ...syllabus,
                        step: 'weight_scheme',
                      })}
                      dataSet={constants.syllabusWeightSchemes()}
                      style={this.actionSelectStyle}
                      type="radio"
                      handleChange={(ret, weightScheme) => {
                        this.handleWeightSchemeChange(
                          syllabus.iid,
                          weightScheme,
                        );
                      }}
                      readOnly={syllabus && syllabus.freeze}
                    />
                  </Card>
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

const mapStateToProps = (state, props) => ({
  nodes: state.tree,
  syllabus:
    state.tree[props.ancestors && props.ancestors[0] && props.ancestors[0].iid],
  readOnly: isEditingItemFreeze(state),
});

export default connect(mapStateToProps)(EditControls);
