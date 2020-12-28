/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import iconMapping from 'common/icons/IconMapping';
import FlatButton from 'components/common/mui/FlatButton';

class RootFolderList extends React.Component {
  render() {
    const { mediaDB, onOpenFolder } = this.props;
    return (
      <ul className="ui-folder-default">
        {mediaDB &&
          mediaDB.roots &&
          mediaDB.roots.map((root) => (
            <li key={root.id}>
              <FlatButton
                onClick={() => {
                  onOpenFolder(root, true);
                }}
              >
                <i
                  className={iconMapping.mapping(root.icon)}
                  aria-hidden="true"
                />
                <span>{root.name}</span>
              </FlatButton>
            </li>
          ))}
      </ul>
    );
  }
}

const mapStateToProp = (state) => ({
  listView: state.mm.listView,
  mediaDB: state.mm.mediaDB,
});
RootFolderList.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

export default connect(mapStateToProp)(RootFolderList);
