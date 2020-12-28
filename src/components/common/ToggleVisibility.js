import React from 'react';
import Popover from 'material-ui/Popover';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';

class ToggleVisibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  toggleVisibility(ev) {
    ev.preventDefault();
    this.setState({ open: !this.state.open });
  }

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const display = this.state.open ? 'block' : 'none';
    const style = { cursor: 'pointer' };

    const label = this.state.open
      ? this.props.labelWhenVisible
      : this.props.labelWhenHidden;
    if (this.props.popover) {
      return (
        <div>
          <RaisedButton
            primary={this.state.open}
            onClick={this.handleClick}
            label={label}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <div className="elementGroup">{this.props.children}</div>
          </Popover>
        </div>
      );
    }

    // open clse
    return (
      <div>
        <FlatButton
          style={style}
          onClick={(ev) => {
            this.toggleVisibility(ev);
          }}
          primary={this.state.open}
          label={label}
        />
        <div style={{ display }}> {this.props.children}</div>
      </div>
    );
  }
}

export default ToggleVisibility;
