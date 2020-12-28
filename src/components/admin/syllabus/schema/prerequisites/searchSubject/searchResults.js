import React from 'react';
import RaisedButton from 'components/common/mui/RaisedButton';
import IconAdd from 'material-ui/svg-icons/action/note-add';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

const labels = {
  iid: t1('iid'),
  code: t1('code'),
  name: t1('name'),
  credit: t1('credit'),
  add: t1('add'),
  adds: t1('add_selected_items'),
  ntype: t1('ntype'),
  action: t1('action'),
};

const Results = (props) => {
  const { items, addItemsSelected, itemsSelected } = props;

  const itemList = items && items.filter((item) => !!item);
  if (!itemList) {
    return null;
  }

  return (
    <div className="table-result">
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn title={labels.name}>
              {labels.name}
            </TableHeaderColumn>
            <TableHeaderColumn title={labels.code}>
              {labels.code}
            </TableHeaderColumn>
            <TableHeaderColumn title={labels.credit}>
              {labels.credit}
            </TableHeaderColumn>
            <TableHeaderColumn title={labels.action}>
              {labels.action}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover
          stripedRows
        >
          {items &&
            items.map((item) => (
              <TableRow key={item.id}>
                <TableRowColumn>{t1(item.ntype)}</TableRowColumn>
                <TableRowColumn>{item.code}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>
                  <div className="text-center">
                    <RaisedButton
                      primary
                      label={labels.add}
                      labelPosition="after"
                      disabled={
                        Array.isArray(itemsSelected) &&
                        itemsSelected
                          .map(
                            (itemSelected) => itemSelected && itemSelected.iid,
                          )
                          .includes(item && item.iid)
                      }
                      icon={<IconAdd />}
                      onClick={() => addItemsSelected(item)}
                    />
                  </div>
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Results;
