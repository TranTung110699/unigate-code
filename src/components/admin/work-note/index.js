import React, { Component } from 'react';
import { t1 } from 'translate';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import WorkNotes from './WorkNotes';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <WorkNotes items={items} {...props} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'work-note',
      _sand_step: 'work-note',
    };
    const { hideTitle } = this.props;
    return (
      <div>
        {!hideTitle && <h1>{t1('work_note')}</h1>}
        <SearchWrapper
          formid="get_work_note"
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          hidePagination={false}
        />
      </div>
    );
  }
}

export default Layout;
