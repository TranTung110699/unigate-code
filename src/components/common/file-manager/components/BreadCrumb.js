import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlatButton from 'components/common/mui/FlatButton';
import ArrowRight from 'material-ui/svg-icons/image/navigate-next';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Part = styled.div`
  display: flex;
`;

const Directory = styled(FlatButton)`
  border: none;
  background: none;
  outline: none;
  display: flex;
  align-items: center;
  margin: 0;
  color: ${(props) =>
    props.isCurrentDir ? '#00bcd4' : 'rgba(0, 0, 0, 0.87)'} !important;
  font-weight: ${(props) =>
    props.isCurrentDir ? 'bold' : 'normal'} !important;
  min-width: 0 !important;
  padding: 0 10px !important;
`;

const Separator = styled(ArrowRight)`
  font-size: 20px;
  margin: auto 0;
  font-weight: bold;
`;

class BreadCrumb extends React.PureComponent {
  isCurrentDir = (directory) => {
    const { dirs, currentDirCode } = this.props;
    if (!currentDirCode) {
      return Array.isArray(dirs) && dirs[dirs.length - 1] === directory;
    }
    return directory && directory.code === currentDirCode;
  };

  handleDirClick = (directory) => {
    const { onDirClick } = this.props;
    if (typeof onDirClick === 'function') {
      onDirClick(directory);
    }
  };

  render() {
    const { className, dirs } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Wrapper className={componentClassName}>
        {Array.isArray(dirs) &&
          dirs.map((directory, index) => (
            <Part>
              {index !== 0 && (
                <Separator
                  key={`${(directory && directory.code) || ''}__separator`}
                />
              )}
              <Directory
                key={directory && directory.code}
                isCurrentDir={this.isCurrentDir(directory)}
                onClick={() => this.handleDirClick(directory)}
              >
                {directory && directory.name}
              </Directory>
            </Part>
          ))}
      </Wrapper>
    );
  }
}

BreadCrumb.propTypes = {
  className: PropTypes.string,
};

BreadCrumb.defaultProps = {
  className: '',
};

export default BreadCrumb;
