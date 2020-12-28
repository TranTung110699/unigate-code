import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import enhanceWithClickOutside from 'react-click-outside';
import { t1 } from 'translate';
import AutoComplete from 'material-ui/AutoComplete';
import Icon from 'components/common/Icon';
import SearchIcon from './images/search.png';

class Form extends React.Component {
  fieldAnchorOrigin = { vertical: 'bottom', horizontal: 'right' };
  fieldTargetOrigin = { vertical: 'top', horizontal: 'right' };

  fieldPopoverProps = {
    style: {
      width: 'auto',
      minWidth: 200,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      displayInput: false,
    };
  }

  cssClass = 'etec-menu-search-form';

  handleClickOutside() {
    this.setState({
      displayInput: false,
    });
  }

  handleButtonClick = (event) => {
    const { displayInput } = this.state;
    event.preventDefault();
    if (!displayInput) {
      this.setState(
        {
          displayInput: true,
        },
        () => {
          if (this.input) {
            this.input.focus();
          }
        },
      );
    } else {
      this.setState({
        displayInput: false,
      });
    }
  };

  handleInputNewRequest = (chosenRequest, index) => {
    const { suggest, onSuggestionSelected } = this.props;
    let localChosenRequest = chosenRequest;
    if (index === -1) {
      localChosenRequest = suggest[0];
    }
    if (typeof onSuggestionSelected === 'function') {
      onSuggestionSelected(localChosenRequest);
    }
  };

  renderInput = ({ input, ...custom }) => (
    <AutoComplete
      onNewRequest={this.handleInputNewRequest}
      ref={(el) => {
        this.input = el;
      }}
      onUpdateInput={input.onChange}
      searchText={input.value}
      {...custom}
    />
  );

  autoCompleteFilter = (searchText, key) => true;

  render() {
    const { className, handleSubmit, suggest, onClick } = this.props;
    const { displayInput } = this.state;

    return (
      <form
        className={`${className || ''} ${this.cssClass}`}
        onSubmit={handleSubmit}
        onClick={onClick}
      >
        <div
          className={`${this.cssClass}__input ${
            displayInput ? `${this.cssClass}__input--show` : ''
          }`}
        >
          <Field
            filter={this.autoCompleteFilter}
            name="term"
            component={this.renderInput}
            fullWidth
            dataSource={suggest || []}
            hintText={`${t1('search')}...`}
            anchorOrigin={this.fieldAnchorOrigin}
            targetOrigin={this.fieldTargetOrigin}
            popoverProps={this.fieldPopoverProps}
          />
        </div>
        <button
          onClick={this.handleButtonClick}
          className={`${this.cssClass}__button`}
        >
          {!displayInput ? (
            <img src={SearchIcon} alt="search" />
          ) : (
            <Icon icon="cancel" />
          )}
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClick: PropTypes.func,
  suggest: PropTypes.arrayOf(PropTypes.shape()),
};

Form.defaultProps = {
  className: '',
  handleSubmit: null,
  onSuggestionSelected: null,
  suggest: null,
  onClick: null,
};

export default reduxForm({})(enhanceWithClickOutside(Form));
