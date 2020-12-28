import React, { Component } from 'react';
import FlatButton from 'components/common/mui/NewButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import { inviteUrl } from '../utils';

const Button = ({ type, primary }) =>
  type === 'raised' ? (
    <RaisedButton
      icon={<Icon icon="plus" />}
      label={t1('enrol_new_students')}
      primary={primary}
    />
  ) : (
    <FlatButton
      icon={<Icon icon="plus" />}
      label={t1('enrol_new_students')}
      primary={primary}
    />
  );

class ButtonNew extends Component {
  render() {
    const { node, type, primary } = this.props;
    const url = inviteUrl(node);
    return (
      <Link to={url} className="m-t-20">
        <Button type={type} primary={primary} />
      </Link>
    );
  }
}

export default ButtonNew;
