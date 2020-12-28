/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
/**
 * Created by Peter Hoang Nguyen on 4/1/2017.
 */
import React from 'react';
import { t1 } from 'translate';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import IconClose from 'material-ui/svg-icons/navigation/close';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
class DialogNoHeader extends React.Component {
  iconButtonIconStyle = { width: 30, height: 30 };

  render() {
    const { closeOn } = this.props;
    let { bodyClassName } = this.props;
    const close = t1('close');
    if (bodyClassName) {
      bodyClassName += ' dialog-content-padding0 no-header-dialog';
    } else {
      bodyClassName = 'dialog-content-padding0 no-header-dialog';
    }

    return (
      <Dialog
        {...this.props}
        onRequestClose={closeOn}
        bodyClassName={bodyClassName}
      >
        <IconButton
          onClick={closeOn}
          style={{ position: 'absolute', right: -16, top: -14 }}
          iconStyle={this.iconButtonIconStyle}
          className="close-modal"
        >
          <IconClose className="close-icon" />
        </IconButton>
        {this.props.children}
      </Dialog>
    );
  }
}

export default DialogNoHeader;
