import React from 'react';
import { t1 } from 'translate';
import EditContainerV2 from '../../edit/EditContainerV2';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';

class AcademicCategoryDashboard extends React.Component {
  render() {
    const { node } = this.props;
    return (
      <EditContainerV2 buttons={null} {...this.props}>
        <div>
          <h1>
            {t1('dashboard')} {node.name}
          </h1>
        </div>
      </EditContainerV2>
    );
  }
}

export default withNodeEditContainer(AcademicCategoryDashboard);
