import React from 'react';

class MyIframe extends React.Component {
  render() {
    const { iframe, src, height, width } = this.props;
    const Iframe = iframe;

    return (
      <div>
        <Iframe src={src} height={height} width={width} />
      </div>
    );
  }
}

export default MyIframe;
