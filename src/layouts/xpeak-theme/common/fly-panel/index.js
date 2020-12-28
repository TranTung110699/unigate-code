import React from 'react';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class FlyPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { className: {} };
    this.onWindowScroll = this.onWindowScroll.bind(this);
  }

  componentDidMount() {
    let { mode, defaultClass } = this.props;
    defaultClass = defaultClass || 'hidden';
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
    this.setState({ className: defaultClass });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }

  onWindowScroll() {
    let { mode, breakPoint, breakPointClass, defaultClass } = this.props;
    defaultClass = defaultClass || 'hidden';
    breakPointClass = breakPointClass || 'menu-fly';

    if (breakPoint <= window.scrollY) {
      this.setState({ className: breakPointClass });
      return;
    }
    this.setState({ className: defaultClass });
  }

  render() {
    const { className } = this.state;
    return (
      <div className={`ui-fly-panel ${className}`}>{this.props.children}</div>
    );
  }
}

export default FlyPanel;
