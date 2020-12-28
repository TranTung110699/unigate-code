import React from 'react';
import Button from 'components/common/mui/RaisedButton';

class NewButton extends React.Component {
  render() {
    const { buttonProps = {}, ...props } = this.props;
    if (this.props.secondary) {
      return <Button type="submit" secondary {...props} {...buttonProps} />;
    }
    return <Button type="submit" primary {...props} {...buttonProps} />;
  }
}

export default NewButton;
