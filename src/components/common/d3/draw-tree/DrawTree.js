import React from 'react';
import { tree } from 'd3-hierarchy';
import './stylesheet.scss';

class DrawTree extends React.Component {
  textStyle = { textAnchor: 'middle' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { root, pos } = this.props;

    let switchConst = 1;
    if (pos === 'left') {
      switchConst = -1;
    }

    const width = this.props.width / 2 || 1080;
    const height = this.props.height / 2 || 720;

    const localTree = tree().size([height, (switchConst * (width - 150)) / 2]);
    localTree(root);

    const nodes = root.descendants();
    const links = root.links();
    nodes[0].x = height / 2;

    return (
      <g ref="componentPanel" transform={`translate(${width / 2}, 0)`}>
        {links &&
          links.map &&
          links.map((link, index) => (
            <path
              key={index}
              className="link"
              d={`M${link.target.y},${link.target.x}C${(link.target.y +
                link.source.y) /
                2.5},${link.target.x} ${(link.target.y + link.source.y) / 2},${
                link.source.x
              } ${link.source.y},${link.source.x}`}
            />
          ))}
        {nodes &&
          nodes.map &&
          nodes.map((node) => (
            <g
              key={node.data.iid}
              className={
                node.data.iid === root.data.iid
                  ? 'node node--root'
                  : `node ${node.children ? 'node--internal' : 'node--leaf'}`
              }
              transform={`translate(${node.y}, ${node.x})`}
            >
              <circle r="2.5" />
              <text dy="3" style={this.textStyle}>
                {node.data.name}
              </text>
            </g>
          ))}
      </g>
    );
  }
}

DrawTree.propTypes = {};

DrawTree.defaultProps = {};

export default DrawTree;
