import React from 'react';
import get from 'lodash.get';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

class LayoutFreestyle extends React.PureComponent {
  render() {
    const { formValues, xpath } = this.props;
    const currentValue = formValues && get(formValues, xpath);

    if (!currentValue) {
      return null;
    }

    return (
      <div>
        <div className="col-md-2">
          <Icon icon={currentValue.ntype}>
            &nbsp;
            {t1(currentValue.ntype)}
          </Icon>
        </div>
        <div className="col-md-4">
          {currentValue.name}
          <br />
          <span className="text-muted">
            ({currentValue.code || currentValue.iid})
          </span>
        </div>
        <div className="col-md-6">{/*TODO: Show information*/}</div>
      </div>
    );
  }
}

export default LayoutFreestyle;
