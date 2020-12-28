/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import routes from 'routes';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import Drivers from '../Drivers';
import Locations from '../Locations';
import RaisedButton from 'components/common/mui/RaisedButton';

class BusDashboard extends React.Component {
  render() {
    const { node } = this.props;
    return (
      <div>
        <h1>Bus: {node.name}</h1>

        <div className={'container-fluid'}>
          <div className={'row'}>
            <div className={'col-md-4'}>
              <h3>{t1('routine')}</h3>
              {t1('start_time')}:{' '}
              <b>
                {node.locations && node.locations.length
                  ? node.locations[0].time
                  : '-'}
              </b>
              <Locations item={node} />
            </div>
            <div className={'col-md-4'}>
              <h3>{t1('drivers')}</h3>
              <Drivers item={node} />
            </div>
          </div>
        </div>

        <hr />

        <div>
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({
                ntype: 'group',
                iid: lodashGet(node, 'group'),
                step: 'attendance',
              }),
            )}
          >
            <RaisedButton label={t1('mark_bus_attendance')} primary />
          </Link>
        </div>
      </div>
    );
  }
}

export default BusDashboard;
