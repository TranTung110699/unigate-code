import React from 'react';

const style = {
  element: {
    padding: '0px 15px',
  },
};

class Index extends React.PureComponent {
  render() {
    const { groups } = this.props;
    return <div style={style.element}>{groups.id.fieldNames.display}</div>;
  }
}

export default Index;
