import React from 'react';

class ShowFullWhenHover extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState((state) => ({ isHovering: !state.isHovering }));
  }

  render() {
    const { content, style } = this.props;

    return (
      <div
        style={
          !this.state.isHovering
            ? {
                ...style,
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'all .2s linear',
              }
            : style
        }
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {content}
      </div>
    );
  }
}

export default ShowFullWhenHover;
