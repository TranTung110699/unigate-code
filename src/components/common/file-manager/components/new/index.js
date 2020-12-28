import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t3 } from 'translate';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from './Menu';
import styled from 'styled-components';
import AddIcon from 'material-ui/svg-icons/content/add';

const Wrapper = styled.div`
  height: ${(props) => (props.fullHeight ? '100%' : 'inherit')};
  width: ${(props) => (props.fullWidth ? '100%' : 'inherit')};
`;

const StyledMenu = styled(Menu)`
  width: 100vw;
  @media (min-width: 768px) {
    width: 250px;
  }
`;

class New extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      className,
      fullWidth,
      fullHeight,
      currentDirCode,
      searchFormId,
      fileTypes,
    } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Wrapper
        className={componentClassName}
        fullHeight={fullHeight}
        fullWidth={fullWidth}
      >
        <RaisedButton
          style={{
            height: fullHeight && '100%',
            width: fullWidth && '100%',
          }}
          label={t3('new')}
          onClick={this.handleClick}
          icon="plus"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          animation={PopoverAnimationVertical}
        >
          <StyledMenu
            fileTypes={fileTypes}
            searchFormId={searchFormId}
            currentDirCode={currentDirCode}
            onNewDirDialogOpen={this.handleRequestClose}
            onUploadFileSuccess={this.handleRequestClose}
          />
        </Popover>
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

export default New;
