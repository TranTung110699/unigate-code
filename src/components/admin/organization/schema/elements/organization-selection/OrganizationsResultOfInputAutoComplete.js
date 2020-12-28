import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import connect from 'react-redux/es/connect/connect';
import organizationApiUrls from 'components/admin/organization/endpoints';
import fetchData from 'components/common/fetchData';
import lodashGet from 'lodash.get';
import { getOrgTypes } from 'configs/constants';
import { isOrganizationWithOrgTypes } from '../index';
import './../stylesheet.scss';

class OrganizationsResultOfInputAutoComplete extends React.Component {
  cssClass = 'admin-organization-field-selection';

  render() {
    const {
      value,
      index,
      onDelete,
      category,
      phongbanOrgTypes,
      donviOrgTypes,
    } = this.props;
    if (!category) {
      return null;
    }
    const { name } = category;
    const organization = lodashGet(
      (lodashGet(category, '__expand.ancestor_iids') || []).find((ancestor) =>
        isOrganizationWithOrgTypes(
          ancestor,
          (donviOrgTypes || []).map((t) => lodashGet(t, 'value')),
        ),
      ),
      'name',
    );

    return (
      <Paper className={`${this.cssClass}`}>
        <div className={`${this.cssClass}__info`}>
          <div className="col-md-12">
            <span className={`${this.cssClass}__name`}>{name}</span>
            {isOrganizationWithOrgTypes(
              category,
              (phongbanOrgTypes || []).map((t) => lodashGet(t, 'value')),
            ) &&
              organization && (
                <span className={`text-muted ${this.cssClass}__organization`}>
                  ({organization})
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

OrganizationsResultOfInputAutoComplete.propTypes = {
  index: PropTypes.number,
  // value: PropTypes.shape({
  //   name: PropTypes.string,
  // }),
  onDelete: PropTypes.func,
  category: PropTypes.shape({
    name: PropTypes.string,
  }),
  // phongbanOrgTypes: PropTypes.arrayOf(),
  // donviOrgTypes: PropTypes.arrayOf(),
};

OrganizationsResultOfInputAutoComplete.defaultProps = {
  index: 0,
  // value: {},
  onDelete: () => {},
  category: {},
  phongbanOrgTypes: [],
  donviOrgTypes: [],
};

const mapStateToProps = (state) => ({
  phongbanOrgTypes: getOrgTypes(state, 'phongban'),
  donviOrgTypes: getOrgTypes(state, 'has_perm'),
});

export default connect(mapStateToProps)(
  fetchData((props) => {
    const iid = props.value;

    return {
      baseUrl: organizationApiUrls.get_organization_info,
      params: {
        iid,
        fields: ['name', 'iid', 'type', 'sub_type'],
        _sand_expand: ['ancestor_iids'],
      },
      propKey: 'category',
      keyState: `organizations_selection_${iid}`,
      refetchCondition: () => false,
      // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
      // he/she did not pass refetchCondition here, therefore, it will never refetch
      // I just refactor make it clearer
    };
  })(OrganizationsResultOfInputAutoComplete),
);
