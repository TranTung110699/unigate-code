import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import Avatar from 'components/common/avatar/index';
import { extractObject } from 'common/utils/Array';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import { schoolTypes } from 'configs/constants';
import { getThemeConfigSelector } from 'utils/selector';
import './stylesheet.scss';
import get from 'lodash.get';

const checkKey = 'iid';
const keysSave = ['id', 'iid', 'code', 'type', 'name', 'current_members'];

const labels = {
  iid: t1('iid'),
  code: t1('code'),
  name: t1('name'),
  add: t1('add'),
  adds: t1('add_selected_items'),
  noItemSelected: t1('no_item_selected'),
  type: t1('type'),
  action: t1('action'),
};

class Results extends Component {
  addItemsSelected = (items) => {
    const { addToTheListOfTarget } = this.props;
    if (typeof addToTheListOfTarget === 'function') {
      return addToTheListOfTarget(items);
    }
  };

  labelButtonAddItemsSelected = (itemsSelected) => {
    if (!Array.isArray(itemsSelected) || !itemsSelected.length) {
      return null;
    }
    let userSelectedCount = 0;
    let groupSelectedCount = 0;
    itemsSelected.forEach((item) => {
      if (item.type === 'user') {
        userSelectedCount += 1;
      } else {
        groupSelectedCount += 1;
      }
    });
    if (userSelectedCount && groupSelectedCount) {
      return t1('add_%s_group(s)_and_%s_user(s)_selected', [
        groupSelectedCount,
        userSelectedCount,
      ]);
    } else if (userSelectedCount) {
      return t1('add_%s_user(s)_selected', [userSelectedCount]);
    }
    return t1('add_%s_group(s)_selected', [groupSelectedCount]);
  };

  render() {
    const { items, targets, currentValues, type, isSIS } = this.props;

    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const currentValueIids =
      (Array.isArray(currentValues) &&
        currentValues.map((map) => map && map.iid)) ||
      [];
    const disabledAdds = !!(!targets || !targets.length);

    return (
      <div className="table-result modal-table-result">
        <RaisedButton
          primary
          labelPosition="after"
          label={
            disabledAdds
              ? labels.noItemSelected
              : this.labelButtonAddItemsSelected(targets)
          }
          disabled={disabledAdds}
          icon="plus"
          onClick={() => this.addItemsSelected(targets)}
          className="m-b-10"
        />
        <Table
          name="targets"
          itemList={itemList}
          checkKey={checkKey}
          keysSave={keysSave}
          multiSelectable
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn title={labels.type}>
                {labels.type}
              </TableHeaderColumn>
              <TableHeaderColumn title={labels.code}>
                {labels.code}
              </TableHeaderColumn>
              <TableHeaderColumn title={labels.name}>
                {labels.name}
              </TableHeaderColumn>
              {!isSIS &&
                (type && type === 'user' ? (
                  [<TableHeaderColumn>{t1('organization')}</TableHeaderColumn>]
                ) : (
                  <TableHeaderColumn title={t1('organizations')}>
                    {t1('organizations')}
                  </TableHeaderColumn>
                ))}
              <TableHeaderColumn title={labels.action}>
                {labels.action}
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
                <TableRow
                  key={item.id}
                  disabled={currentValueIids.includes(item.iid)}
                >
                  <TableRowColumn>{t1(item.type)}</TableRowColumn>
                  <TableRowColumn>
                    {item.code || item.iid}
                    {item.code && (
                      <span className="text-muted">({item.iid})</span>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    <Avatar user={item} size={30} />
                    &nbsp;
                    {get(item, 'lname') ||
                      `${get(item, 'last_name', '')} ${get(
                        item,
                        'first_name',
                        '',
                      )}`.trim() ||
                      get(item, 'name')}
                    {typeof item.current_members !== 'undefined' && (
                      <span className="text-muted">
                        {' '}
                        ({t1("%s_member's", [item.current_members])})
                      </span>
                    )}
                  </TableRowColumn>
                  {!isSIS &&
                    (type && type === 'user' ? (
                      [
                        <TableRowColumn>
                          {item.user_organizations &&
                          item.user_organizations.length ? (
                            <OrganizationsOrPhongBan
                              item={item}
                              attr={'user_organizations'}
                            />
                          ) : (
                            '-'
                          )}
                        </TableRowColumn>,
                      ]
                    ) : (
                      <TableRowColumn>
                        {item.organizations_name &&
                          item.organizations_name.join(',')}
                      </TableRowColumn>
                    ))}
                  <TableRowColumn>
                    <div>
                      <RaisedButton
                        primary
                        disabled={currentValueIids.includes(item.iid)}
                        label={labels.add}
                        labelPosition="after"
                        icon="plus"
                        onClick={() =>
                          this.addItemsSelected([extractObject(item, keysSave)])
                        }
                      />
                    </div>
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const emptyArray = [];

Results.propTypes = {
  form: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  form: '',
  items: emptyArray,
};

function mapStateToProps(state, props) {
  const { form } = props;
  const formValues = getFormValues(form)(state);
  const targets = (formValues && formValues.targets) || [];
  const themeConfig = getThemeConfigSelector(state);

  return {
    targets,
    isSIS: themeConfig && themeConfig.type === schoolTypes.SIS,
  };
}

export default reduxForm({})(connect(mapStateToProps)(Results));
