import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import VarDump from 'components/common/VarDump';
import QuestionPreview from 'components/admin/question/Preview';
import VideoPreview from 'components/admin/video/Preview';

class Preview extends Component {
  render() {
    // const {...data } = this.props;
    const { ntype, node } = this.props;

    if (node && node.answers2) {
      node.mc_answers = node.answers2;
    }

    return (
      <div>
        <h1>Preview {ntype}</h1>
        {ntype === 'question' && <QuestionPreview node={node} />}
        {ntype === 'video' && <VideoPreview node={node} />}

        <div>
          <hr />
          <VarDump data={this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.log('mapStateToProps', props.formid);
  const reduxFormValues = state.form[props.formid];
  const hiddenFields = props.hiddenFields;

  let node =
    reduxFormValues && reduxFormValues.values ? reduxFormValues.values : {};
  node = hiddenFields ? { ...node, ...hiddenFields } : node;

  return { node };
};

export default connect(mapStateToProps)(Preview);
