import React, { Component } from 'react';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = {
  ul: {
    display: 'flex',
    padding: 0,
    margin: 0,
  },
  navigate: {
    fontSize: '13px',
    paddingRight: '5px',
    paddingLeft: '5px',
    color: '#a89e9e',
  },
  link: {
    fontSize: '15px',
  },
  icon: {
    fontSize: '13px',
    paddingRight: '4px',
  },
};

class Index extends Component {
  render() {
    const { items } = this.props;
    if (!items || items.length === 0) return '';

    const length = items.length;
    return (
      <ul style={styles.ul}>
        {items.map(
          (item, index) =>
            item && (
              <li className="item" key={`menu-top-${index}`}>
                {index < length - 1 && (
                  <Link to={item.href} style={styles.link}>
                    <Icon style={styles.icon} icon={item.icon} />
                    <span style={styles.label}>{item.label}</span>
                    {
                      <span style={styles.navigate}>
                        <Icon icon="angle-right" />
                      </span>
                    }
                  </Link>
                )}
                {index === length - 1 && (
                  <Link style={styles.link} to={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
            ),
        )}
      </ul>
    );
  }
}

Index.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Index.defaultProps = {
  items: null,
};

export default Index;
