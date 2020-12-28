import React from 'react';
import Title from './Title';
import Info from './Info';

class Index extends React.Component {
  render() {
    const {} = this.props;

    return (
      <div className="container p-b-50">
        <Title {...this.props} />
        <Info {...this.props} />
      </div>
    );
  }
}

export default Index;
