import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { reduxForm } from 'redux-form';
import { t1 } from 'translate';
import SearchIcon from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  align-items: flex-end;
  padding-right: 20px;
`;

const StyledIconButton = styled(IconButton)`
  padding-bottom: 39px !important;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 30px !important;
  height: 30px !important;
`;

class Search extends React.PureComponent {
  render() {
    const { className, handleSubmit } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <Wrapper onSubmit={handleSubmit} className={componentClassName}>
        <StyledIconButton>
          <StyledSearchIcon />
        </StyledIconButton>
        <TextField
          fullWidth
          name="text"
          hintText={t1('search')}
          shouldShowClearIcon
        />
      </Wrapper>
    );
  }
}

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

export default reduxForm({
  form: 'file_manager_search_box',
})(Search);
