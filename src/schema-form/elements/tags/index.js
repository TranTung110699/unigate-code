import React, { Component } from 'react';
import Chip  from 'material-ui/Chip';
import PropTypes from 'prop-types';

class MUTags extends Component {
  render() {
    const { tags } = this.props;

    const style = {
      float: 'left',
      margin: '2px',
    };

    return (
      <div>
        {tags &&
          tags.map &&
          tags.map((tag) => (
            <Chip key={tag} style={style}>
              {tag}
            </Chip>
          ))}
      </div>
    );
  }
}

MUTags.propTypes = {
  tags: PropTypes.objectOf(PropTypes.string),
};

MUTags.defaultProps = {
  tags: {},
};

export default MUTags;
