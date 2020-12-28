import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { connect } from 'react-redux';
import { extractObject } from 'common/utils/Array';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { getNodeSelector } from 'components/admin/node/utils';
import nodeSagaActions from 'actions/node/saga-creators';
import { t1 } from 'translate';
import Form from './form';

class AddLearningItemsToRubricSkill extends React.Component {
  cssClass = 'add-learning-items-to-rubric-skill';

  constructor(props) {
    super(props);
    this.state = {
      learningItems: [],
    };
  }

  handleSubmit = (values) => {
    const { getNode, dispatch, item } = this.props;
    let { learningItems } = values;

    learningItems =
      Array.isArray(learningItems) &&
      learningItems.map((learningItem) =>
        extractObject(getNode(learningItem), [
          'iid',
          'id',
          'name',
          'code',
          'ntype',
          'type',
        ]),
      );

    dispatch(
      nodeSagaActions.updateNodeRequest({
        step: 'learning_items',
        iid: item.iid,
        data: {
          id: item.id,
          iid: item.iid,
          ntype: item.ntype,
          learning_items: learningItems,
        },
        closeModal: true,
      }),
    );
  };

  render() {
    const { className, syllabusIid, item } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <span className={componentClassName}>
            <Icon onClick={showFull} icon="add_rubric_learning_items" />
          </span>
        )}
        renderFull={() => (
          <Form
            onSubmit={this.handleSubmit}
            node={{
              iid: syllabusIid,
              ntype: 'syllabus',
            }}
            form={`add_learning_items_to_${item.iid}`}
            skill={item}
          />
        )}
        dialogOptionsProperties={{
          handleClose: true,
          title: t1('add_item'),
        }}
      />
    );
  }
}

AddLearningItemsToRubricSkill.propTypes = {
  className: PropTypes.string,
};

AddLearningItemsToRubricSkill.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => ({
  getNode: getNodeSelector(state),
});

export default connect(mapStateToProps)(AddLearningItemsToRubricSkill);
