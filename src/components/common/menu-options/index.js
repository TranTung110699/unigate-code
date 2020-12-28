import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Icon from '../Icon';

const style = {
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'top',
  },
  targetOrigin: {
    horizontal: 'right',
    vertical: 'top',
  },
  label: { color: '#15bcd5', paddingLeft: '14px' },
  divider: { margin: 0, padding: 0 },
  title: {
    background: '#15bcd5',
    margin: 0,
    color: 'white',
    padding: '4px 5px',
  },
  listStyle: {
    padding: '0 !important',
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    fontSize: '17px',
    height: '74px',
    top: '3px',
    position: 'relative',
    cursor: 'pointer',
  },
};

/**
 * It's component support display options for parent component
 */
class MenuOptions extends React.Component {
  renderItemMenu = (item) => {
    switch (item.type) {
      case 'label':
        return (
          <div key={item.id} style={style.label}>
            {item.label}
          </div>
        );

      case 'divider':
        return <hr key={item.id} style={style.divider} />;

      default:
        return (
          <MenuItem
            anchorOrigin={style.anchorOrigin}
            targetOrigin={style.targetOrigin}
            innerDivStyle={{ padding: '0px 5px' }}
            style={{
              height: 40,
              maxHeight: 40,
              minHeight: 'unset',
              overflow: 'hidden',
            }}
            key={item.id}
            primaryText={item.label}
            onClick={() => {
              if (item.handleClick) {
                item.handleClick(item);
              } else if (this.props.onItemClick) {
                this.props.onItemClick(item);
              }
            }}
          />
        );
    }
  };

  render() {
    const { title, menus, icon, iconStyle } = this.props;
    return (
      <IconMenu
        iconButtonElement={
          <Icon icon={icon} style={Object.assign({}, style.icon, iconStyle)} />
        }
        anchorOrigin={style.anchorOrigin}
        targetOrigin={style.targetOrigin}
        listStyle={style.listStyle}
      >
        {title && <h3 style={style.title}>{title}</h3>}
        {menus && menus.map(this.renderItemMenu)}
      </IconMenu>
    );
  }
}

/**
 * menus is list item.
 * item is object format {
 *   id,
 *   type: [label, divider, action item],
 *   label: 'name display,
 * }
 * @type {{menus, icon}}
 */
MenuOptions.propTypes = {
  menus: PropTypes.instanceOf(Array),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onItemClick: PropTypes.func,
};

MenuOptions.defaultProps = {
  menus: null,
  icon: null,
  onItemClick: null,
};
export default MenuOptions;
