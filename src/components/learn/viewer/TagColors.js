import React, { Component } from 'react';
import Tag from 'antd/lib/tag';

class TagColors extends Component {
  render() {
    const tags = ['mt', 'pp', 'dg', 'nd'];

    if (window.TAG_COLORS) {
      return (
        <div>
          Phân loại nội dung:{' '}
          {tags.map((tag) => {
            const tagConfig = window.TAG_COLORS[tag];
            return (
              <Tag key={tagConfig.id} color={tagConfig.hex}>
                {tagConfig.text}
              </Tag>
            );
          })}
        </div>
      );
    }
    return null;
  }
}

export default TagColors;
