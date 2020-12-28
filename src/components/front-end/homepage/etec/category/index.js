/**
 * Created by DVN on 9/18/2017.
 */
import React, { Component } from 'react';
import Category from './items/index';
import IC1 from './images/ic-1.png';
import IC2 from './images/ic-2.png';
import IC3 from './images/ic-3.png';
import IC4 from './images/ic-4.png';

const pictures = [
  {
    icon: IC1,
  },
  {
    icon: IC2,
  },
  {
    icon: IC3,
  },
  {
    icon: IC4,
  },
];

class CategoryIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { paths: null };
  }

  createPaths = () => {
    const { path } = this.props;
    if (!path) return null;
    let children = path.children;
    if (!children || children.length < 0) return null;

    let i;
    const paths = [];
    let child;
    if (children.length >= 4) {
      for (i = 0; i < 4; ++i) {
        child = children[i];
        child = Object.assign(child, pictures[i]);
        paths.push(child);
      }
      return paths;
    }

    for (i in children) {
      if (children.hasOwnProperty(i)) {
        child = children[i];
        if (i < 2) {
          child = Object.assign(child, pictures[i]);
          paths.push(child);
        } else if (i == 2) {
          const pathChildren = child.children;
          for (let j in pathChildren) {
            if (j < 2) {
              child = pathChildren[j];
              child = Object.assign(child, pictures[parseInt(j) + 2]);
              paths.push(child);
            }
          }
          return paths;
        }
      }
    }
    return paths;
  };

  render() {
    if (!this.state.paths) {
      this.state.paths = this.createPaths();
    }
    const paths = this.state.paths;
    return (
      <div className="row">
        {paths &&
          paths.map((p, index) => (
            <Category
              key={index}
              className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
              path={p}
            />
          ))}
      </div>
    );
  }
}

export default CategoryIndex;
