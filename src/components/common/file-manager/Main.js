import React from 'react';
import PropTypes from 'prop-types';
import Content from './content';
import Nav from './nav';
import Header from './header';
import New from './new';
import styled from 'styled-components';
import { getCurrentDirCode } from 'selectors/file-manager';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  border-top: 1px solid rgba(224, 224, 224, 1);
  border-left: 1px solid rgba(224, 224, 224, 1);
  border-right: 1px solid rgba(224, 224, 224, 1);
  background-color: #ffffff;
`;

const Region = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Left = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 25%;
  }
  @media (min-width: 992px) {
    width: 16.66666667%;
  }
  border-right: 1px solid rgba(224, 224, 224, 1);
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

const Right = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 75%;
  }
  @media (min-width: 992px) {
    width: 83.33333333%;
  }
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

const StyledNew = Left.withComponent(New);

const StyledContent = Right.withComponent(Content);

const StyledHeader = Right.withComponent(Header);

const StyledNav = Left.withComponent(Nav);

class Main extends React.PureComponent {
  render() {
    const {
      className,
      onFileSelect,
      fileTypes,
      multiple,
      getFile,
      currentDirCode,
    } = this.props;
    const searchFormId = `file_manager_search_${currentDirCode}`;

    return (
      <Wrapper className={`${className || ''}`}>
        <Region>
          <StyledNew fileTypes={fileTypes} searchFormId={searchFormId} />
          <StyledHeader searchFormId={searchFormId} />
        </Region>
        <Region>
          <StyledNav />
          <StyledContent
            style={{
              display: 'flex',
              minHeight: 450,
            }}
            multiple={multiple}
            fileTypes={fileTypes}
            onFileSelect={onFileSelect}
            searchFormId={searchFormId}
            getFile={getFile}
          />
        </Region>
      </Wrapper>
    );
  }
}

Main.propTypes = {
  className: PropTypes.string,
};

Main.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => ({
  currentDirCode: getCurrentDirCode(state),
});

export default connect(mapStateToProps)(Main);
