import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper  from 'material-ui/Paper';
import Conf from './Conf';

class Block extends Component {
  style = { margin: '15px 0' };

  render() {
    const { items } = this.props;
    return (
      <Paper zDepth={1} style={this.style}>
        <div className="admin-config-section__block admin-config-block">
          {Array.isArray(items) &&
            items.map((item, index) => (
              <Conf
                key={item.name}
                item={item}
                formid={item.name}
                isLastInBlock={index === items.length - 1}
              />
            ))}
        </div>
      </Paper>
    );
  }
}

Block.propTypes = {
  block: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      component: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
        PropTypes.object,
      ]),
      display_name: PropTypes.string,
      display_text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dmn: PropTypes.string,
      id: PropTypes.string,
      meaning: PropTypes.string,
      name: PropTypes.string,
      ts: PropTypes.number,
      type: PropTypes.string,
    }),
  ),
};

Block.defaultProps = {
  block: '',
  items: null,
};

export default Block;
