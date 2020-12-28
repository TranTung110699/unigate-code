import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';
import ViewMode from '../components/ViewMode';
import Search from '../components/Search';
import InfoToggle from '../components/InfoToggle';
import styled from 'styled-components';
import fileApiUrls from 'components/common/file-manager/endpoints';
import fetchData from 'components/common/fetchData';
import {
  getCurrentDirCode,
  getViewMode,
  shouldShowFileInfo as shouldShowFileInfoSelector,
} from 'selectors/file-manager';
import {
  dirSelected,
  shouldShowFileInfoSelected,
  viewModeSelected,
} from 'actions/file-manager';
import { change, submit } from 'redux-form';
import { getDirCodeToSubmit } from 'selectors/file-manager';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LeftArea = styled.div`
  display: flex;
`;

const RightArea = styled.div`
  display: flex;
  align-items: stretch;
`;

const Divider = styled.div`
  border-left: solid 1px rgba(224, 224, 224, 1);
  height: 100%;
`;

class Header extends React.PureComponent {
  handleDirClick = (dir) => {
    const { selectDir } = this.props;
    if (dir && dir.code) {
      selectDir(dir.code);
    }
  };

  handleSearchSubmit = ({ text }) => {
    const { submitSearch } = this.props;
    submitSearch();
  };

  handleSearchChange = ({ text }) => {
    const { setSearchTextToSearchForm } = this.props;
    setSearchTextToSearchForm(text);
  };

  handleInfoToggleClick = () => {
    const { shouldShowFileInfo, setShouldShowFileInfo } = this.props;
    setShouldShowFileInfo(!shouldShowFileInfo);
  };

  render() {
    const {
      className,
      dirs,
      currentDirCode,
      viewMode,
      selectViewMode,
      shouldShowFileInfo,
    } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Wrapper className={componentClassName}>
        <LeftArea>
          <BreadCrumb
            dirs={dirs}
            currentDirCode={currentDirCode}
            onDirClick={this.handleDirClick}
          />
        </LeftArea>
        <RightArea>
          <ViewMode viewMode={viewMode} onModeSelect={selectViewMode} />
          <Divider />
          <InfoToggle
            onClick={this.handleInfoToggleClick}
            on={shouldShowFileInfo}
          />
          <Divider />
          <Search
            onSubmit={this.handleSearchSubmit}
            onChange={this.handleSearchChange}
          />
        </RightArea>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => ({
  currentDirCode: getCurrentDirCode(state),
  viewMode: getViewMode(state),
  shouldShowFileInfo: shouldShowFileInfoSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  selectViewMode: (mode) => dispatch(viewModeSelected(mode)),
  selectDir: (dirCode = '') => {
    dispatch(dirSelected(dirCode));
    getDirCodeToSubmit(dirCode, dispatch);
  },
  setSearchTextToSearchForm: (text) =>
    dispatch(change(props.searchFormId, 'text', text ? text : null)),
  submitSearch: () => dispatch(submit(props.searchFormId)),
  setShouldShowFileInfo: (showFileInfo) =>
    dispatch(shouldShowFileInfoSelected(showFileInfo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  fetchData((props) => ({
    baseUrl: fileApiUrls.get_all_file_ancestors,
    keyState: 'all_ancestors_of_current_dir',
    params: { code: props.currentDirCode },
    fetchCondition: props.currentDirCode,
    refetchCondition: (prevProps) =>
      props.currentDirCode !== prevProps.currentDirCode &&
      prevProps.currentDirCode,
    propKey: 'dirs',
  }))(Header),
);
