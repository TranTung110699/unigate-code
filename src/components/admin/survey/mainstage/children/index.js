import React from 'react';
import Metadata from 'components/admin/node/edit/metadata/MetadataContainer';

class SurveyChildren extends React.Component {
  render() {
    const { node } = this.props;
    //
    // if ([ntypes.QUESTION].includes(node.ntype)) {
    //   return (
    //     <div className="whitebox">
    //       <NodeNew
    //         schema={getLearningItemFormSchema(node.ntype)}
    //         ntype={node.ntype}
    //         node={node}
    //         mode="edit"
    //       />
    //     </div>
    //   );
    // }

    return <Metadata node={node} />;
  }
}
//
// SurveyChildren.propTypes = {
//   className: PropTypes.string,
// };
//
// SurveyChildren.defaultProps = {
//   className: '',
// };

export default SurveyChildren;
