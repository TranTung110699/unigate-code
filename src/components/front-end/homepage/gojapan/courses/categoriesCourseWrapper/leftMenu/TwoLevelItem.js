import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List } from 'material-ui/List';
import Icon from 'components/common/Icon';
import GJOneItem from './OneLevelItem';

class GJTwoLevelItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: true };
  }

  handleCollapseMenu = () => {
    this.setState({ expand: !this.state.expand });
  };

  renderLevel3Item = (child, childIndex, node, className) => {
    const item = child;
    if (item.children && item.children.length) {
      return <Dump item={item} className={`${item.menuLevel} ${className}`} />;
    }

    return (
      <GJOneItem
        key={childIndex}
        item={child}
        node={node}
        className={className}
      />
    );
  };

  render() {
    const { item } = this.props;
    const { expand } = this.state;

    return (
      <div className={`lv1-item ${item.menuLevel}`}>
        <div onClick={this.handleCollapseMenu} className="clear-fix">
          <div>
            {item.icon ? (
              <img className="clear-fix__icon" src={item.icon} alt={'logo'} />
            ) : (
              ''
            )}
            <span>{item.label}</span>
          </div>
          <div className="pull-right">
            {expand ? <Icon icon="angle-down" /> : <Icon icon="angle-left" />}
          </div>
        </div>

        {expand && (
          <List className="left-sub-menu">
            {item.children.map(
              (child, childIndex) =>
                child &&
                !child.hidden &&
                this.renderLevel3Item(
                  child,
                  childIndex,
                  this.props.node,
                  'lv1-item-child',
                ),
            )}
          </List>
        )}
      </div>
    );
  }
}

const Dump = ({ ...props }) => (
  <GJTwoLevelItem {...props} className={props.className} />
);

export default connect()(GJTwoLevelItem);
