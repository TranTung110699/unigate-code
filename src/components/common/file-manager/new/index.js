import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewButton from '../components/new';
import styled from 'styled-components';
import { getCurrentDirCode } from 'selectors/file-manager';

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
`;

class New extends React.PureComponent {
  render() {
    const { className, currentDirCode, searchFormId, fileTypes } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Wrapper className={componentClassName}>
        <NewButton
          fileTypes={fileTypes}
          currentDirCode={currentDirCode}
          fullHeight
          fullWidth
          searchFormId={searchFormId}
        />
      </Wrapper>
    );
  }
}

New.propTypes = {
  className: PropTypes.string,
};

New.defaultProps = {
  className: '',
};

const mapDispatchToProps = (state) => ({
  currentDirCode: getCurrentDirCode(state),
});

export default connect(mapDispatchToProps)(New);
