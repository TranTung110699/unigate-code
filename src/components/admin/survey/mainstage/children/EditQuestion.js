import React from 'react';
import PropTypes from 'prop-types';
import { getLearningItemFormSchema } from 'components/admin/node/schema-form/learning-items';
import NodeNew from 'components/admin/node/new/';
import { ntype as ntypes } from 'configs/constants';

class EditQuestion extends React.Component {
  render() {
    const { node } = this.props;

    if ([ntypes.QUESTION].includes(node.ntype)) {
      return (
        <div className="whitebox">
          <NodeNew
            schema={getLearningItemFormSchema(node.ntype)}
            ntype={node.ntype}
            node={node}
            mode="edit"
          />
        </div>
      );
    }
    return null;
  }
}

EditQuestion.propTypes = {
  className: PropTypes.string,
};

EditQuestion.defaultProps = {
  className: '',
};

export default EditQuestion;
