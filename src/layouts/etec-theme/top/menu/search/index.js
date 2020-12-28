import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { suggestAutoComplete } from 'actions/suggest/saga-creators';
import { ntype } from 'configs/constants';
import { withRouter } from 'react-router-dom';
import getSuggestList from './getSuggestLinks';
import Form from './Form';
import './stylesheet.scss';

const form = 'etec-menu-search';
const ntypes = [ntype.SCO, ntype.COURSE, ntype.PATH];

class Search extends React.Component {
  cssClass = 'etec-menu-search';

  handleFormChange = (values, dispatch) => {
    const term = values && values.term;
    dispatch(
      suggestAutoComplete({
        ntypes,
        term,
        typeahead: 1,
        auto_suggest_prefix: 'etec',
      }),
    );
  };

  handleSuggestionSelected = (suggestion) => {
    const { history } = this.props;
    if (suggestion && suggestion.link) {
      history.push(suggestion.link);
    }
  };

  render() {
    const { className, suggest, onClick } = this.props;
    return (
      <Form
        form={form}
        className={`${className || ''} ${this.cssClass}`}
        onChange={this.handleFormChange}
        onSuggestionSelected={this.handleSuggestionSelected}
        onClick={onClick}
        suggest={getSuggestList(suggest)}
      />
    );
  }
}

Search.propTypes = {
  className: PropTypes.string,
  suggest: PropTypes.shape(),
  onClick: PropTypes.func,
};

Search.defaultProps = {
  className: '',
  suggest: null,
  onClick: null,
};

const mapStateToProps = (state) => ({
  suggest: state.suggest,
});

export default withRouter(connect(mapStateToProps)(Search));
