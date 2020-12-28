import React from 'react';
import { reduxForm } from 'redux-form';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import Icon from 'components/common/Icon';
import { t3 } from 'translate';
import './stylesheet.scss';

class BlogSearch extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="blog-search" onSubmit={handleSubmit}>
        <TextField
          name="query"
          type="text"
          className="blog-search__text"
          hintText={t3('search')}
        />
        <button className="blog-search__button">
          <Icon icon="search" />
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'blog-search',
})(BlogSearch);
