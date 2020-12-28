import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import { iconBySubtype } from 'components/admin/node/icon';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import LinkItem from './LinkItem';

class ButtonPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handlePopoverOpen = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      options,
      node,
      avatar,
      label,
      editBaseUrl,
      icon,
      addLink,
      flatButtonStyle,
      linkStyle,
      menuStyle,
      checkIfEnableExamTemplate,
    } = this.props;

    return (
      <li>
        <FlatButton
          label={label}
          icon={<Icon icon={icon} />}
          onClick={this.handlePopoverOpen}
        >
          <Popover
            className={'add-item-popover'}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handlePopoverClose}
          >
            <Menu className={'add-item-popover-menu'} style={menuStyle}>
              {options &&
                Array.isArray(options) &&
                options.length > 0 &&
                options.map(({ ntype, subType, label }, index) => (
                  <LinkItem
                    key={`link-item-${index}`}
                    {...this.props}
                    ntype={ntype}
                    subType={subType}
                    label={label}
                    node={node}
                    avatar={avatar}
                    linkStyle={linkStyle}
                    flatButtonStyle={flatButtonStyle}
                    checkIfEnableExamTemplate={checkIfEnableExamTemplate}
                    iconBySubtype={iconBySubtype(ntype, subType)}
                  />
                ))}
            </Menu>
          </Popover>
        </FlatButton>
      </li>
    );
  }
}

ButtonPopover.propTypes = {
  avatar: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  node: PropTypes.shape(),
  flatButtonStyle: PropTypes.shape(),
  linkStyle: PropTypes.shape(),
  menuStyle: PropTypes.shape(),
  editBaseUrl: PropTypes.string,
  icon: PropTypes.string,
  linkTo: PropTypes.string,
  iconBySubtype: PropTypes.string,
  checkIfEnableExamTemplate: PropTypes.bool,
  addLink: PropTypes.func,
  addNewItemClicked: PropTypes.func,
};

ButtonPopover.defaultProps = {
  node: null,
  avatar: '',
  label: '',
  options: null,
  editBaseUrl: '',
  linkTo: '#',
  flatButtonStyle: null,
  linkStyle: null,
  menuStyle: null,
  iconBySubtype: '',
  icon: '',
  checkIfEnableExamTemplate: false,
  addLink: null,
  addNewItemClicked: null,
};
export default ButtonPopover;
