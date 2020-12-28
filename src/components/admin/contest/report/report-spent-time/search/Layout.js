import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import contestApiUrls from 'components/admin/contest/endpoints';
import { connect } from 'react-redux';
import Results from './Results';
import schema from './schema-form';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { node, formId } = this.props;

    let hiddenFields = {};

    if (node) {
      hiddenFields = { contest_iid: node.iid, ...hiddenFields };
    }

    return (
      <SearchWrapper
        formid={formId}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
        showSearchButton
        schema={schema}
        hiddenFields={hiddenFields}
        alternativeApi={contestApiUrls.report_spent_time}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const formId = 'report_spent_time';

  return {
    formId,
    action: match && match.params && match.params.action,
  };
};

export default connect(mapStateToProps)(Layout);
