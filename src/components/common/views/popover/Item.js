import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import SvgIcon from 'common/icons/svg';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 16/04/2017
 **/
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      label,
      action,
      path,
      pathIconClass,
      viewBox,
      children,
      className,
    } = this.props;
    let { linkTo } = this.props;
    const customClassName = `item ${className}`;
    linkTo = linkTo || '#';
    return (
      <Link className={customClassName} to={linkTo} href="#" onClick={action}>
        {path && (
          <SvgIcon
            path={path}
            className={`${pathIconClass} m-r-10`}
            viewBox={viewBox}
          />
        )}
        <span>{label}</span>
        {children}
      </Link>
    );
  }
}

Item.propTypes = {
  action: PropTypes.func,
  children: PropTypes.element,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  pathIconClass: PropTypes.string,
  viewBox: PropTypes.string,
};
Item.defaultProps = {
  className: '',
  children: null,
  label: t1('item'),
  path: undefined,
  pathIconClass: '',
  viewBox: '0 0 512 512',
  action: () => {},
};
export default Item;
