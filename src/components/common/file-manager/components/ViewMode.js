import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ViewList from 'material-ui/svg-icons/action/view-list';
import ViewGrid from 'material-ui/svg-icons/action/view-module';
import styled from 'styled-components';
import { t1 } from 'translate';

const StyledButton = styled(IconButton)`
  min-width: 50px !important;
`;

const mapModeToIcon = {
  grid: <ViewGrid />,
  list: <ViewList />,
};

class ViewMode extends React.PureComponent {
  handleModeButtonClick = (m) => {
    const { onModeSelect } = this.props;
    if (typeof onModeSelect === 'function') {
      onModeSelect(m);
    }
  };

  render() {
    const { className, viewMode } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        {['grid', 'list'].map((m) => (
          <StyledButton
            title={t1(`${m}_view`)}
            key={m}
            iconStyle={{
              fill: m === viewMode ? '#00bcd4' : 'currentColor',
            }}
            onClick={() => this.handleModeButtonClick(m)}
          >
            {mapModeToIcon[m]}
          </StyledButton>
        ))}
      </div>
    );
  }
}

ViewMode.propTypes = {
  className: PropTypes.string,
  onModeSelect: PropTypes.func,
};

ViewMode.defaultProps = {
  className: '',
  onModeSelect: null,
};

export default ViewMode;
