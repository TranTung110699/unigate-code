import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

import { t1 } from 'translate';
import { getTextFromValue } from 'utils/Util';
import { constants, languages as availableLanguages } from 'configs/constants';
import apiUrls from 'api-endpoints';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Drivers from '../edit/Drivers';
import Locations from '../edit/Locations';

class Results extends Component {
  render() {
    const {
      items,
      searchValues: { methods, languages },
      formid,
    } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('start_time')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('bus_stops')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('drivers')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows={false}
          >
            {items &&
              items.filter(Boolean).map((item, index) => {
                return (
                  <TableRow key={v4()}>
                    <TableRowColumn>{item.name}</TableRowColumn>

                    <TableRowColumn>
                      {item.locations && item.locations.length
                        ? item.locations[0].time
                        : '-'}
                    </TableRowColumn>

                    <TableRowColumn>
                      <Locations item={item} />
                    </TableRowColumn>

                    <TableRowColumn>
                      <Drivers item={item} />
                    </TableRowColumn>

                    <TableRowColumn>
                      <Link to={`/admin/bus/${item.iid}`}>
                        <IconButton iconClassName="mi mi-remove-red-eye" />
                      </Link>
                    </TableRowColumn>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Results;
