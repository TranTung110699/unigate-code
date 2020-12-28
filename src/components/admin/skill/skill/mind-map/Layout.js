import React, { Component } from 'react';
import sagaActions from 'actions/node/saga-creators';
import SkillMindMap from 'components/common/d3/SkillMindMap';
import { connect } from 'react-redux';
import './stylesheet.scss';

const keyState = 'data_draw_mind_map';

class Layout extends Component {
  componentWillMount() {
    const { node } = this.props;
    this.getData(node);
  }

  componentWillReceiveProps(nextProps) {
    const { node } = this.props || {};
    if (
      typeof nextProps !== 'undefined' &&
      typeof nextProps.node !== 'undefined' &&
      typeof nextProps.node.iid !== 'undefined' &&
      nextProps.node.iid !== node.iid
    ) {
      this.getData(nextProps.node);
    }
  }

  getData = (node) => {
    const { dispatch } = this.props;
    const params = {
      ntype: node.ntype,
      _sand_step: 'skill',
      iid: node.iid,
    };
    const url = '/skill/api/mindmap';
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  };

  render() {
    const data = this.props.data || {};

    return <SkillMindMap data={data} />;
  }
}

function mapStateToProps(state) {
  const data = state.dataApiResults[keyState] || {};
  return {
    data,
  };
}

export default connect(mapStateToProps)(Layout);
