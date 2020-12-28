import React from 'react';
import ReactDOM from 'react-dom';
import isEqual from 'lodash.isequal';

class HorizontalScrolling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientHeight: null,
      clientWidth: null,
      scrolling: null,
    };
  }

  handleWindowResize = () => {
    if (this.horizontalScrollingElement && this.childrenElement) {
      const { clientWidth } = ReactDOM.findDOMNode(
        this.horizontalScrollingElement,
      );

      const childrenClientHeight = ReactDOM.findDOMNode(this.childrenElement)
        .clientHeight;
      const childrenClientWidth = ReactDOM.findDOMNode(this.childrenElement)
        .clientWidth;

      this.setState({
        clientHeight: childrenClientHeight,
        clientWidth,
        scrolling: childrenClientWidth > clientWidth,
      });
    }
  };

  componentDidMount() {
    if (this.childrenElement) {
      ReactDOM.findDOMNode(this.childrenElement).addEventListener(
        'resize',
        this.handleWindowResize,
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.children, this.props.children)) {
      this.setState({ clientHeight: null, clientWidth: null, scrolling: null });
    }
  }

  renderElementFitContent = () => {
    const { children } = this.props;
    const { clientHeight, scrolling } = this.state;
    return (
      <div
        onMouseMove={() => {
          if (this.childrenElement) {
            const childrenClientHeight = ReactDOM.findDOMNode(
              this.childrenElement,
            ).clientHeight;
            if (childrenClientHeight !== clientHeight) {
              this.handleWindowResize();
            }
          }
        }}
        ref={(divElement) => {
          if (divElement !== null) {
            this.childrenElement = divElement;
          }
        }}
        style={scrolling === null ? { width: 'fit-content' } : {}}
        className=""
      >
        {children}
      </div>
    );
  };

  render() {
    const { clientHeight, clientWidth, scrolling } = this.state;

    const containerStyle = {
      overflowY: 'scroll',
      overflowX: 'hidden',
      transform: 'rotate(270deg) translateX(-100%)',
      transformOrigin: 'top left',
      position: 'absolute',
      width: clientHeight,
      height: clientWidth,
    };

    const container2Style = {
      transform: `rotate(90deg) translateY(-${clientHeight}px)`,
      transformOrigin: 'top left',
      display: 'flex',
    };

    return (
      <div
        className={this.props.className}
        style={{
          width: 'initial',
          height: `${clientHeight}px`,
          ...(this.props.style || {}),
        }}
        ref={(divElement) => {
          if (divElement !== null) {
            this.horizontalScrollingElement = divElement;
            if (
              !this._isMounted ||
              (this._isMounted && (!clientWidth || !clientHeight))
            ) {
              this._isMounted = true;
              this.handleWindowResize();
            }
          }
        }}
      >
        {!scrolling || !clientWidth || !clientHeight ? (
          this.renderElementFitContent()
        ) : (
          <div style={containerStyle} ref={this.horizontalScrollingElement}>
            <div style={container2Style}>{this.renderElementFitContent()}</div>
          </div>
        )}
      </div>
    );
  }
}

export default HorizontalScrolling;
