import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DirExplorer from '../components/DirExplorer';
import apiUrls from 'api-endpoints';
import { getCurrentDirCode } from 'selectors/file-manager';
import { dirSelected } from 'actions/file-manager';
import fetchData from 'components/common/fetchData';
import fileApiUrls from 'components/common/file-manager/endpoints';

class Nav extends React.PureComponent {
  handleDirClick = (dir) => {
    const { selectDir } = this.props;
    if (dir && dir.code) {
      selectDir(dir.code);
    }
  };

  componentDidMount() {
    this.selectDirIfThereAreNoCurrentDir();
  }

  componentDidUpdate() {
    this.selectDirIfThereAreNoCurrentDir();
  }

  selectDirIfThereAreNoCurrentDir() {
    const { dirs, selectDir, currentDirCode } = this.props;
    if (Array.isArray(dirs) && dirs.length > 0 && !currentDirCode) {
      selectDir(dirs[0].code);
    }
  }

  render() {
    const { className, dirs, currentDirCode } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <DirExplorer
          dirs={dirs}
          onDirClick={this.handleDirClick}
          currentDirCode={currentDirCode}
        />
      </div>
    );
  }
}

Nav.propTypes = {
  className: PropTypes.string,
};

Nav.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => ({
  currentDirCode: getCurrentDirCode(state),
});

const mapDispatchToProps = (dispatch) => ({
  selectDir: (dirCode) => dispatch(dirSelected(dirCode)),
});

export default fetchData({
  baseUrl: fileApiUrls.get_file_root_dirs,
  keyState: 'file_manager_dir_explorer',
  propKey: 'dirs',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
})(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Nav),
);
