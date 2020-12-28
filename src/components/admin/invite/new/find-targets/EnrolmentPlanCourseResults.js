import React from 'react';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import resultWrapper from './resultsWrapper';
import { DisplayHowMemberWasAddedToEnrolmentPlanGivenRelationsWithExpandedData } from 'components/admin/enrolment-plan/mainstage/members/search/common';
import lodashGet from 'lodash.get';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import AcademicCategories from 'components/admin/group/common/AcademicCategories';

class Results extends React.Component {
  render() {
    const {
      items,
      formid,
      checkKey,
      keysSave,
      multiSelectable,
      addUsersToField,
    } = this.props;

    return (
      <Table
        formid={formid}
        itemList={items}
        checkKey={checkKey}
        keysSave={keysSave}
        multiSelectable={multiSelectable}
      >
        <TableHeader adjustForCheckbox enableSelectAll>
          <TableRow>
            {/*
              <TableHeaderColumn title={t1('iid')}>{t1('iid')}</TableHeaderColumn>

               */}
            <TableHeaderColumn title={t1('code')}>
              {t1('code')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('name')}>
              {t1('name')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('email')}>
              {t1('email')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('organization')}>
              {t1('organization')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('academic_categories')}>
              {t1('academic_categories')}
            </TableHeaderColumn>

            {/*
            <TableHeaderColumn title={t1('phone_number')}>
              {t1('phone_number')}
            </TableHeaderColumn>
*/}
            <TableHeaderColumn title={t1('method')}>
              {t1('method')}
            </TableHeaderColumn>
            <TableHeaderColumn title={t1('action')}>
              {t1('action')}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox
          deselectOnClickaway={false}
          showRowHover
          stripedRows
        >
          {items &&
            items.map((item) => (
              <TableRow key={item.id} selected={item.selected}>
                {/*
                <TableRowColumn>{item.iid}</TableRowColumn>
*/}
                <TableRowColumn>{item.code}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.mail}</TableRowColumn>
                <TableRowColumn>
                  {lodashGet(item, '__expand.user_organizations') &&
                  lodashGet(item, '__expand.user_organizations').length ? (
                    <OrganizationsOrPhongBan
                      item={item}
                      attr={'user_organizations'}
                      showParentsInfo
                    />
                  ) : (
                    ''
                  )}
                </TableRowColumn>
                <TableRowColumn>
                  {lodashGet(item, '__expand.academic_categories') &&
                  lodashGet(item, '__expand.academic_categories').length ? (
                    <AcademicCategories
                      item={item}
                      attr={'academic_categories'}
                    />
                  ) : (
                    ''
                  )}
                </TableRowColumn>
                {/*
                <TableRowColumn>{item.phone}</TableRowColumn>
*/}
                <TableRowColumn>
                  <DisplayHowMemberWasAddedToEnrolmentPlanGivenRelationsWithExpandedData
                    relations={lodashGet(item, 'relation')}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <IconButton
                    title={t1('add_user')}
                    iconClassName="mi mi-add"
                    onClick={() => addUsersToField([item])}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default resultWrapper(Results);
