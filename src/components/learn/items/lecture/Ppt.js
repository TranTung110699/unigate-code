import React from 'react';

class Ppt extends React.Component {
  render() {
    const { node } = this.props;

    return <div>{node && <div>TODO: Show PPT</div>}</div>;
  }
}

export default Ppt;
