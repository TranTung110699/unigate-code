import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';

import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/NewButton';

class ButtonNew extends React.PureComponent {
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
    return (
      <FlatButton
        icon={<Icon icon="plus" />}
        label={t1('new_group')}
        onClick={this.handlePopoverOpen}
      >
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handlePopoverClose}
        >
          <Menu>
            <MenuItem onClick={this.handlePopoverClose}>
              <Link to="/admin/financial/subjectgroup/new">
                {t1('subject_group')}
              </Link>
            </MenuItem>
            <MenuItem onClick={this.handlePopoverClose}>
              <Link to="/admin/financial/subjectgroup/new-free">
                {t1('credit_transfert_group')}
              </Link>
            </MenuItem>
          </Menu>
        </Popover>
      </FlatButton>
    );
  }
}

export default connect()(ButtonNew);
