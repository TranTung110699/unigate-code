import React from 'react';
import HashbangContext from 'components/common/modal/hashbang-context';
import EditContestContainer from './EditContainer';

class EditContestContext extends React.Component {
  render() {
    return (
      <HashbangContext.Consumer>
        {(value) => <EditContestContainer {...this.props} isHashbang={value} />}
      </HashbangContext.Consumer>
    );
  }
}

export default EditContestContext;
