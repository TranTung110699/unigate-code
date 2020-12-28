/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import { t1 } from 'translate';
import Dialog from 'material-ui/Dialog';
import IconClose from 'material-ui/svg-icons/action/highlight-off';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
class DialogHeader extends React.Component {
  iconCloseStyle = {
    position: 'absolute',
    right: 25,
    top: 25,
    width: 30,
    height: 30,
  };

  render() {
    const { closeOn } = this.props;
    let { bodyClassName } = this.props;
    const close = t1('close');
    if (bodyClassName) {
      bodyClassName += ' header-dialog';
    } else {
      bodyClassName = 'header-dialog';
    }
    return (
      <Dialog
        {...this.props}
        onRequestClose={closeOn}
        bodyClassName={bodyClassName}
      >
        <IconClose onClick={closeOn} style={this.iconCloseStyle} />
        {this.props.children}
      </Dialog>
    );
  }
}

export default DialogHeader;
