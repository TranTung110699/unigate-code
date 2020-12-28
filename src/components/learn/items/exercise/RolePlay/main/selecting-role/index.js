import React from 'react';
import PropTypes from 'prop-types';
import { t1, t3 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import RolePlayCharacter from '../../common/character';
import './stylesheet.scss';

class RolePlaySelectingRole extends React.Component {
  raisedButtonStyle = { color: 'white' };

  constructor(props) {
    super(props);
    this.state = {
      selectedRole: null,
    };
  }

  cssClass = 'role-play-selecting-role';

  getSelectedRoleState = (selectedRole) => ({
    selectedRole,
  });

  handleRoleSelected = (role) => {
    this.setState(Object.assign({}, this.getSelectedRoleState(role)));
  };

  isRoleSelected = (role) => {
    const { selectedRole } = this.state;
    return selectedRole && selectedRole === role;
  };

  handleSpeakingButtonClick = () => {
    const { onRoleSelected } = this.props;
    const { selectedRole } = this.state;
    onRoleSelected(selectedRole);
  };

  render() {
    const { roles } = this.props;
    const { selectedRole } = this.state;
    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__title`}>
          {t1('select_your_character')}
        </div>
        <div className={`${this.cssClass}__roles`}>
          {roles &&
            roles.map((role, index) => {
              const active = this.isRoleSelected(role);
              return (
                <div key={index} className={`${this.cssClass}__role`}>
                  <RolePlayCharacter
                    avatarSize={active ? 100 : 80}
                    item={role}
                    active={active}
                    onClick={this.handleRoleSelected}
                  />
                </div>
              );
            })}
        </div>
        <div className={`${this.cssClass}__buttons`}>
          <RaisedButton
            className={`${this.cssClass}__button`}
            onClick={this.handleSpeakingButtonClick}
            fullWidth
            disabled={!selectedRole}
            style={this.raisedButtonStyle}
          >
            {t3('speak')}
          </RaisedButton>
        </div>
      </div>
    );
  }
}

RolePlaySelectingRole.propTypes = {
  onRoleSelected: PropTypes.func,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

RolePlaySelectingRole.defaultProps = {
  onRoleSelected: () => {},
  roles: [],
};

export default RolePlaySelectingRole;
