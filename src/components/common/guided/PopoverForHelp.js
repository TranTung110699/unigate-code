import React from 'react';
import MuiPopover from 'material-ui/Popover';
import { t1 } from 'translate';
import Icon from 'antd/lib/icon';
//import Icon from 'components/common/Icon/index';
import Html from 'components/common/html/index';

const popoverFooter = {
  borderTop: '1px solid #eee',
  clear: 'both',
  fontSize: '80%',
  paddingTop: '10px',
  paddingBottom: '10px',
};

const closeButton = {
  cursor: 'pointer',
};

class PopOverForHelp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickGuide = (event) => {
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
    // Can be a simple string or an object like { title, content }
    const { guide } = this.props;
    const targetHorizontal = this.props.targetHorizontal || 'right';
    const targetVertical = this.props.targetVertical || 'top';

    return (
      <React.Fragment>
        <span
          className="text-muted"
          onClick={this.handleClickGuide}
          onMouseEnter={this.handleClickGuide}
          onMouseLeave={this.handleClickGuide}
        >
          <Icon type="question-circle" />
        </span>

        <MuiPopover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{
            horizontal: targetHorizontal,
            vertical: targetVertical,
          }}
          onRequestClose={this.handleRequestClose}
        >
          <div className="elementGroup">
            {typeof guide === 'string' ? (
              guide
            ) : (
              <div>
                <b className="title">{guide.title}</b>
                <div>
                  {typeof guide.content === 'string' ? (
                    <Html content={guide.content} />
                  ) : (
                    guide.content
                  )}
                </div>
              </div>
            )}

            <div style={popoverFooter}>
              <span
                className="pull-right text-muted"
                style={closeButton}
                onClick={this.handleRequestClose}
              >
                <Icon type="close-circle" /> {t1('close')}
              </span>
            </div>
          </div>
        </MuiPopover>
      </React.Fragment>
    );
  }
}

export default PopOverForHelp;
