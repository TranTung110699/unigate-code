import React from 'react';
import { renderRoutes } from 'react-router-config';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 25/04/2017
 **/
class SubMainLayoutHelper extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  // }

  render() {
    const { route } = this.props;
    return <div>{renderRoutes(route.routes)}</div>;
  }
}

export default SubMainLayoutHelper;
