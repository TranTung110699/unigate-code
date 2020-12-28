/* eslint-disable jsx-a11y/anchor-is-valid,no-undef,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import PrimaryButton from 'components/common/primary-button';
import GenericConcreteRolesSearch from 'components/admin/abac-role/concrete-role/search';
import { abacRoleTypes } from 'configs/constants';
import NewSyllabusRole from './new';
import { getSearchFormId } from './common/utils';
import StaffHorizontalNav from '../StaffHorizontalNav';
import Icon from 'components/common/Icon';
import routes from 'routes';

class ContestRole extends React.Component {
  cssClass = 'admin-syllabus-role';

  render() {
    const { className, node, action, subAction, location } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <StaffHorizontalNav
          {...this.props}
          content={
            subAction && subAction[0] === 'new' ? (
              <div>
                <h2 className="text-white">
                  {t1('add_new_role_for_syllabus')}
                </h2>
                <NewSyllabusRole node={node} />
              </div>
            ) : (
              <div>
                <GenericConcreteRolesSearch
                  step={'syllabus'}
                  type={abacRoleTypes.SYLLABUS}
                  formid={getSearchFormId(node)}
                  appliedScope={'syllabus'}
                  node={node}
                  location={location}
                />
                <hr
                  style={{
                    borderTop: '.82px solid #d0c9c9eb',
                  }}
                />
                <Link
                  to={routes.url('edit_item', {
                    mode: 'roles/new',
                    item: node,
                  })}
                >
                  <PrimaryButton
                    name="submit"
                    type="submit"
                    icon={<Icon icon="plus" />}
                    label={t1('new_role')}
                    primary
                  />
                </Link>
              </div>
            )
          }
        />
      </div>
    );
  }
}

ContestRole.propTypes = {
  className: PropTypes.string,
};

ContestRole.defaultProps = {
  className: '',
};

export default withRouter(connect()(ContestRole));
