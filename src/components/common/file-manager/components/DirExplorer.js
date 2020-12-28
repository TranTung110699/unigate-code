import React from 'react';
import PropTypes from 'prop-types';
import FolderOpenIcon from 'material-ui/svg-icons/file/folder-open';
import FolderHomeIcon from 'material-ui/svg-icons/action/home';
import FlatButton from 'components/common/mui/FlatButton';
import styled from 'styled-components';
import { t1 } from 'translate';

const getIcon = (dir) => {
  if (!dir) return FolderOpenIcon;
  switch (dir.id) {
    case 'home': {
      return <FolderHomeIcon />;
    }
    case 'public':
    default: {
      return <FolderOpenIcon />;
    }
  }
};

const StyledMenuItem = styled(FlatButton)`
  text-align: left !important;
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')} !important;
  color: ${(props) =>
    props.isSelected ? '#00bcd4' : 'rgba(0, 0, 0, 0.87)'} !important;
  background-color: ${(props) =>
    props.isSelected ? 'rgba(0, 0, 0, 0.1)' : 'inherit'} !important;
`;

class DirExplorer extends React.PureComponent {
  isCurrentDir = (directory) => {
    const { currentDirCode } = this.props;
    return directory && currentDirCode && directory.code === currentDirCode;
  };

  handleMenuItemClick = (directory) => {
    const { onDirClick } = this.props;
    if (typeof onDirClick === 'function') {
      onDirClick(directory);
    }
  };

  render() {
    const { className, dirs } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        {Array.isArray(dirs) &&
          dirs.map((directory) => (
            <StyledMenuItem
              fullWidth
              key={directory && directory.code}
              onClick={() => this.handleMenuItemClick(directory)}
              isSelected={this.isCurrentDir(directory)}
              label={(directory && directory.name) || t1('unknown')}
              icon={getIcon(directory)}
              flatButton
            />
          ))}
      </div>
    );
  }
}

DirExplorer.propTypes = {
  className: PropTypes.string,
  currentDirCode: PropTypes.string,
  dirs: PropTypes.arrayOf(PropTypes.shape()),
  onDirClick: PropTypes.func,
};

DirExplorer.defaultProps = {
  className: '',
  currentDirCode: '',
  dirs: [],
  onDirClick: null,
};

export default DirExplorer;
