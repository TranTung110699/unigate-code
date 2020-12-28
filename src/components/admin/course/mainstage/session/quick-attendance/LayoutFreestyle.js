import React from 'react';
import { t1 } from 'translate';

class LayoutFreestyle extends React.PureComponent {
  render() {
    const { groups } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-12">{groups.id.fieldNames.status}</div>
          {groups.id.fieldNames.note && (
            <div className="col-md-12">
              <div>{t1('reason')}:</div>
              {groups.id.fieldNames.note}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LayoutFreestyle;
