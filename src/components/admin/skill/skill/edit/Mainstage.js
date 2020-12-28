import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditMetadata from '../metadata';
import Children from './children';
import MindMapLayout from '../mind-map/Layout';
import EditForm from './EditForm';
// import PassingDefinition from './PassingDefinition';
import Dashboard from '../dashboard';
import { urlActions } from 'components/admin/skill/routes';

class Mainstage extends Component {
  render() {
    const { node, action } = this.props;
    // console.log('skill Mainstage', action);
    return (
      <div>
        {(action === urlActions.DASHBOARD ||
          action === '' ||
          action === null) && <Dashboard node={node} />}
        {action === urlActions.INFORMATION && <EditForm node={node} />}
        {action === urlActions.MINDMAP && <MindMapLayout node={node} />}
        {action === urlActions.CHILDREN && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <EditForm node={node} />
              </div>
              <div className="col-md-6">
                <Children node={node} />
              </div>
            </div>
          </div>
        )}
        {action === 'relation' && <div>Need to improve UX here</div>}
        {action === urlActions.LEARNING_ITEMS && (
          <EditMetadata node={node} fieldEdit="learning_items" />
        )}
        {action === urlActions.PRACTICE_ITEMS && (
          <div className="row">
            <div className="col-md-10">
              <EditMetadata node={node} fieldEdit="practice_items" />
            </div>
            <div className="col-md-2">
              <EditForm node={node} step="penalty_practice" />
            </div>
          </div>
        )}
        {action === urlActions.ENTRY_ITEMS && (
          <EditMetadata node={node} fieldEdit="entry_items" />
        )}
        {action === urlActions.OUTPUT_ITEMS && (
          <EditMetadata node={node} fieldEdit="output_items" />
        )}
        {action === urlActions.APPLY_ITEMS && (
          <EditMetadata node={node} fieldEdit="apply_items" />
        )}
        {action === urlActions.REFRESH_ITEMS && (
          <div className="row">
            <div className="col-md-10">
              <EditMetadata node={node} fieldEdit="refresh_items" />
            </div>
            <div className="col-md-2">
              <EditForm node={node} step="expiry" />
            </div>
          </div>
        )}
        {action === urlActions.PASSING_DEFINITION && (
          <EditForm node={node} step="passing_definition" />
        )}
      </div>
    );
  }
}

Mainstage.propTypes = {
  ntype: PropTypes.string,
  step: PropTypes.string,
};

Mainstage.defaultProps = {
  ntype: 'skill',
  step: 'skill',
};

export default connect()(Mainstage);
