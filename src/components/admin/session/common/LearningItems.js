import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import getLodash from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import Icon from 'components/common/Icon/index';
import FlatButton from 'components/common/mui/FlatButton';

import EditLearningItems from '../edit/EditLearningItems';

class LearningItems extends Component {
  handleEditLearningItems = (session, closeDialog) => {
    const { node } = this.props;
    const learning_items = Array.isArray(session.learning_items)
      ? session.learning_items.map((item) => item.iid)
      : [];

    return (
      <EditLearningItems
        node={{
          iid: getLodash(node, 'syllabus') || getLodash(node, 'iid'),
          ntype: 'syllabus',
        }}
        searchFormId={this.props.formid}
        closeDialog={closeDialog}
        session={{ ...session, learning_items }}
      />
    );
  };

  render() {
    const { session, hasPermUpdate } = this.props;
    const learningItems = getLodash(session, 'learning_items');

    return (
      <div>
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <div>
              {hasPermUpdate && (
                <FlatButton
                  label={
                    Array.isArray(learningItems) && learningItems.length
                      ? t1('learning_items_(%s_items)', [learningItems.length])
                      : t1('add_learning_items')
                  }
                  icon={<Icon icon="edit" />}
                  onClick={showFull}
                />
              )}
              {Array.isArray(learningItems) && learningItems.length && (
                <ul>
                  {learningItems.map((item) => (
                    <li>
                      <Icon icon={item.ntype} /> {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          renderFull={({ closeDialog }) =>
            hasPermUpdate
              ? this.handleEditLearningItems(session, closeDialog)
              : null
          }
        />
      </div>
    );
  }
}

export default connect()(LearningItems);
