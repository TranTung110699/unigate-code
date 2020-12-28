/**
 * Created by anhvtt on 05/05/17.
 */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import UsersJoinToTakeExamResults from 'components/admin/report/excels/search/report-result/UsersJoinToTakeExamResults';
import FormFilters from './FormFilters';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent = (items, props) => (
    <UsersJoinToTakeExamResults items={items} {...props} />
  );

  render = () => {
    const { contest, id } = this.props;

    const hiddenFields = {
      contest_code: contest,
    };

    return (
      <SearchWrapper
        formid={id}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
      >
        <FormFilters formid={id} hiddenFields={hiddenFields} />
      </SearchWrapper>
    );
  };
}

export default Layout;
