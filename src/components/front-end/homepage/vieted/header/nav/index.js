import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';

class Nav extends React.Component {
  cssClass = 'vieted-home-page-nav';

  render() {
    const { items } = this.props;
    return (
      <div className={`pull-right ${this.cssClass}`}>
        {items &&
          items.map(
            (item) =>
              item && (
                <div
                  key={item.name}
                  className={`${this.cssClass}__item`}
                  onClick={item.onClick}
                >
                  <div className={`${this.cssClass}__item-name`}>
                    {item.name}
                  </div>
                  <div
                    className={`${this.cssClass}__item-image ${
                      this.cssClass
                    }__item-image--normal`}
                  >
                    <div>
                      <img src={item.img} alt={item.name} />
                    </div>
                  </div>
                  <div
                    className={`${this.cssClass}__item-image ${
                      this.cssClass
                    }__item-image--focus`}
                  >
                    <div>
                      <img src={item.imgFocus} alt={item.name} />
                    </div>
                  </div>
                </div>
              ),
          )}
      </div>
    );
  }
}

Nav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      img: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};

Nav.defaultProps = {
  items: [],
};

export default Nav;
