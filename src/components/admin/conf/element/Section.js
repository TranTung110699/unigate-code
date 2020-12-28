import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Block from './Block';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    };
    this.itemsToBlocks = this.itemsToBlocks.bind(this);
  }

  componentWillMount() {
    this.filterDataRender(this.props.blocksByContent);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.blocksByContent) {
      this.filterDataRender(nextProps.blocksByContent);
    }
  }

  filterDataRender = (items, newItem = {}) => {
    if (!Array.isArray(items) || !items.length) {
      this.setState({ blocks: [] });
      return;
    }
    const mapKey = {};
    items.forEach((item) => {
      if (item && item.name && item.name === newItem.name) {
        mapKey[item.name] = newItem;
      } else if (item && item.name) {
        mapKey[item.name] = item;
      }
    });

    const blocksByContent = items.filter((item) => {
      const dependent = item && item.dependent;
      if (dependent && dependent.block && dependent.value) {
        const value = dependent.value;
        const block = mapKey[dependent.block];
        const content = block && block.content;
        if (
          !Array.isArray(content) &&
          !Array.isArray(value) &&
          String(content) === String(value)
        ) {
          return true;
        } else if (
          !Array.isArray(content) &&
          Array.isArray(value) &&
          value.includes(content)
        ) {
          return true;
        } else if (
          Array.isArray(content) &&
          !Array.isArray(value) &&
          content.includes(value)
        ) {
          return true;
        } else if (Array.isArray(content) && Array.isArray(value)) {
          let check = false;
          content.forEach((key) => {
            check = check || value.includes(key);
          });
          return check;
        }
        return false;
      }
      return true;
    });

    const blocks = this.itemsToBlocks(blocksByContent);
    this.setState({ blocks });
  };

  itemsToBlocks = (items) => {
    const blocks = [];
    const ret = [];
    for (let i = 0; i < items.length; i += 1) {
      if (blocks.indexOf(items[i].block) === -1) {
        blocks.push(items[i].block);
      }
      let exist = 0;
      for (let j = 0; j < ret.length; j += 1) {
        if (ret[j].id === items[i].block) {
          exist = 1;
        }
      }
      if (exist === 0) {
        ret.push({ id: items[i].block, items: [] });
      }
      for (let j = 0; j < ret.length; j += 1) {
        if (ret[j].id === items[i].block) {
          ret[j].items.push(items[i]);
        }
      }
    }
    return ret;
  };

  render() {
    const { section } = this.props;
    const blocks = this.state.blocks || [];
    return (
      <div className="admin-config-section">
        <h3>{section}</h3>
        {blocks &&
          blocks.map &&
          blocks.map((block, index) => (
            <div key={block.id}>
              <b>{block.id ? t1(block.id) : ''}</b>
              <Block key={block.id || index} items={block.items} />
            </div>
          ))}
      </div>
    );
  }
}

Section.propTypes = {
  section: PropTypes.string,
};

Section.defaultProps = {
  section: '',
};

export default Section;
