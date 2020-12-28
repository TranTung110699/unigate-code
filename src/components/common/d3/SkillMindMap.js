import React from 'react';
import { hierarchy } from 'd3-hierarchy';
import { removeDuplicatedObjects } from 'common/utils/Array';
import DrawTree from './draw-tree/DrawTree';

class SkillMindMap extends React.Component {
  render() {
    const data = this.props.data || {};
    data.right = data.right || {};
    data.left = data.left || {};
    data.right.children = data.right.children || [];
    data.left.children = data.left.children || [];
    const config = this.props.config || {};

    let recent = [];

    recent.push({
      name: data.right.name,
      iid: data.right.iid,
      id: data.right.id,
    });

    // Left data
    const data1 = {
      name: data.right.name,
      iid: data.right.iid,
      id: data.right.id,
      children: JSON.parse(JSON.stringify(data.right.children)),
    };

    // Right data
    const data2 = {
      name: data.left.name,
      iid: data.left.iid,
      id: data.left.id,
      children: JSON.parse(JSON.stringify(data.left.children)),
    };

    // Create d3 hierarchies
    const right = hierarchy(data1);
    const left = hierarchy(data2);

    recent = removeDuplicatedObjects(recent);

    const width = config.width || window.innerWidth * 0.8;
    const height = config.height || window.innerHeight * 0.8;
    return (
      <svg ref="componentPanel" viewBox={`0 0 ${width} ${height}`}>
        <DrawTree root={right} recent={recent} width={width} height={height} />
        <DrawTree root={left} recent={recent} width={width} height={height} />
      </svg>
    );
  }
}

SkillMindMap.propTypes = {};

SkillMindMap.defaultProps = {};

export default SkillMindMap;
