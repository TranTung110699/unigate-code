import React, { Component } from 'react';
import Icon from 'components/common/Icon';
import Link from 'components/common/router/Link';

export default class LinkWithIcon extends Component {
  render() {
    return (
      <Link
        to={this.props.to || this.props.href}
        className={this.props.className || ''}
      >
        <Icon {...this.props} /> {this.props.name}
      </Link>
    );
  }
}
