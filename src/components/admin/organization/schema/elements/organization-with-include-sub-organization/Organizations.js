/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { organizationsWithPhongBan } from 'components/admin/organization/schema/elements/index';
import { change } from 'redux-form';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';

class Organizations extends React.PureComponent {
  componentDidMount() {
    this.setDefaultOrganizations(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.defaultOrganizations && !prevProps.defaultOrganizations) {
      this.setDefaultOrganizations(this.props);
    }
  }

  setDefaultOrganizations = (props) => {
    const {
      dispatch,
      formid,
      xpath,
      defaultOrganizations,
      formValues,
      includeSubOrganizations,
    } = props;

    const fieldName = props.fieldName || 'user_organizations';

    if (defaultOrganizations && !formValues[fieldName]) {
      dispatch(
        change(
          formid,
          xpath ? `${xpath}.${fieldName}` : fieldName,
          defaultOrganizations,
        ),
      );

      // sub org
      dispatch(
        change(
          formid,
          xpath
            ? `${xpath}.include_sub_organizations`
            : 'include_sub_organizations',
          includeSubOrganizations,
        ),
      );
    }
  };

  render() {
    const {
      className,
      formid,
      validate,
      defaultOrganizations,
      organizationRootIids,
      includeRootOrganizations,
      getOnlyOrganizationWhereUserHasPermission,
      fieldName,
      includeSubOrganizationsLabel,
    } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <Element
          schema={organizationsWithPhongBan({
            formid,
            name: fieldName || 'user_organizations',
            validate,
            defaultValue: defaultOrganizations,
            shouldGetAllSubTypes: 1,
            rootIids: organizationRootIids,
            includeRoot: includeRootOrganizations,
            getOnlyOrganizationWhereUserHasPermission,
          })}
        />
        <Element
          schema={{
            type: 'checkbox',
            label:
              includeSubOrganizationsLabel || t1('include_sub_organizations'),
            name: 'include_sub_organizations',
          }}
        />
      </div>
    );
  }
}

Organizations.propTypes = {
  className: PropTypes.string,
};

Organizations.defaultProps = {
  className: '',
};

export default connect()(Organizations);
