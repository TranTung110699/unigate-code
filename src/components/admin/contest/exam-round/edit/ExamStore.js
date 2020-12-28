import React from 'react';
import { connect } from 'react-redux';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import Metadata from 'components/admin/node/edit/metadata/MetadataContainer';

class RoundExamStore extends React.Component {
  render() {
    const { examRound, action, itemAncestors, node } = this.props;
    return (
      <div>
        <Metadata
          examStoreAAAAAAAAA={1}
          node={node}
          syllabusIid={examRound.syllabus}
          ancestors={itemAncestors}
          action={action}
        />
      </div>
    );
  }
}

export default withNodeEditContainer(RoundExamStore);
