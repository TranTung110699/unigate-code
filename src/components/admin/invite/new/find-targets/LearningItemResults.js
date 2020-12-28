import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import IconAdd from 'material-ui/svg-icons/action/note-add';
import { t1 } from 'translate';
import { extractObject } from 'common/utils/Array';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

const checkKey = 'iid';
const keysSave = ['id', 'iid', 'code', 'ntype', 'name'];

const labels = {
  iid: t1('iid'),
  code: t1('code'),
  name: t1('name'),
  add: t1('add'),
  adds: t1('add_selected_items'),
  noItemSelected: t1('no_item_selected'),
  ntype: t1('ntype'),
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
    let courseSelectedCount = 0;
    let pathSelectedCount = 0;
    itemsSelected.forEach((item) => {
      if (item.ntype === 'course') {
        courseSelectedCount += 1;
      } else {
        pathSelectedCount += 1;
      }
    });
    if (courseSelectedCount && pathSelectedCount) {
      return t1('add_%s_course(s)_and_%s_path(s)_selected', [
        courseSelectedCount,
        pathSelectedCount,
      ]);
    } else if (courseSelectedCount) {
      return t1('add_%s_course(s)_selected', [courseSelectedCount]);
    }
    return t1('add_%s_path(s)_selected', [pathSelectedCount]);
  };

  render() {
    const { items, targets, currentValues } = this.props;

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
      <div className="table-result">
        <RaisedButton
          primary
          labelPosition="after"
          label={
            disabledAdds
              ? labels.noItemSelected
              : this.labelButtonAddItemsSelected(targets)
          }
          disabled={disabledAdds}
          icon={<IconAdd />}
          onClick={() => this.addItemsSelected(targets)}
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
              <TableHeaderColumn title={labels.ntype}>
                {labels.ntype}
              </TableHeaderColumn>
              <TableHeaderColumn title={labels.code}>
                {labels.code}
              </TableHeaderColumn>
              <TableHeaderColumn title={labels.name}>
                {labels.name}
              </TableHeaderColumn>
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
                  <TableRowColumn>{t1(item.ntype)}</TableRowColumn>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>
                    <div className="text-center">
                      <RaisedButton
                        primary
                        disabled={currentValueIids.includes(item.iid)}
                        label={labels.add}
                        labelPosition="after"
                        icon={<IconAdd />}
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

  return {
    targets,
  };
}

export default reduxForm({})(connect(mapStateToProps)(Results));
