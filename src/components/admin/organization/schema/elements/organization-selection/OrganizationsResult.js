import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import lodashGet from 'lodash.get';
import { isOrganizationWithOrgTypes } from '../index';
import connect from 'react-redux/es/connect/connect';
import { getOrgTypes } from 'configs/constants';
import './../stylesheet.scss';

class OrganizationsResult extends React.Component {
  // eslint-disable-next-line no-undef
  cssClass = 'admin-organization-field-selection';

  render() {
    const { value, index, onDelete, orgTypes } = this.props;
    if (!value) {
      return null;
    }
    const { name } = value;

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info`}>
          <div className="col-md-12">
            <span className={`${this.cssClass}__name`}>{name}</span>
            {isOrganizationWithOrgTypes(value, Object.keys(orgTypes)) && (
              <span className={`text-muted ${this.cssClass}__organization`}>
                ({lodashGet(value, '__expand.org_id.name')})
              </span>
            )}
          </div>
        </div>
        <div className={`${this.cssClass}__delete`}>
          <IconDelete
            onClick={() => {
              if (onDelete) {
                onDelete(value, index);
              }
            }}
          />
        </div>
      </Paper>
    );
  }
}

OrganizationsResult.propTypes = {
  index: PropTypes.number,
  value: PropTypes.shape({
    name: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  orgTypes: PropTypes.arrayOf(),
};

OrganizationsResult.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
  orgTypes: [],
};

const mapStateToProps = (state) => {
  return {
    orgTypes: getOrgTypes(state, 'phongban'),
  };
};

export default connect(mapStateToProps)(OrganizationsResult);
