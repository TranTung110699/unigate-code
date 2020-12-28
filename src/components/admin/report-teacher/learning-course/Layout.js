import React, { Component } from 'react';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import apiUrls from 'api-endpoints';
import { dateToTimestamp } from 'common/utils/Date';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import commonSagaActions from 'actions/saga-creators';

import schema from './form-filter/schema-form';
import Results from './Results';

class Layout extends Component {
  constructor(props) {
    super(props);
    const timestamp = dateToTimestamp(new Date().getTime());
    this.state = {
      hiddenFields: { start_date: timestamp, end_date: timestamp + 86399 },
    };
  }

  renderResultComponent = (items, props, objects, page) => {
    const { isWidget } = this.props;
    const index =
      parseInt(get(page, 'items_per_page')) * (parseInt(get(page, 'page')) - 1);
    return <Results items={items} index={index} isWidget={isWidget} />;
  };

  componentDidMount() {
    const { isWidget } = this.props;
    if (isWidget) {
      this.interval = setInterval(this.changeHiddenFields, 300000);
    }
  }

  changeHiddenFields = () => {
    const timestamp = dateToTimestamp(new Date().getTime());
    this.setState({
      hiddenFields: { start_date: timestamp, end_date: timestamp + 86399 },
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleExport = (values) => {
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_learning_course,
        values,
      ),
    );
  };

  renderSearchWrapper = ({ schema, hiddenFields, isWidget, formid }) => (
    <SearchWrapper
      hiddenFields={hiddenFields}
      schema={schema && schema(this.handleExport)}
      alternativeApi={apiUrls.report_learning_course}
      formid={formid}
      renderResultsComponent={this.renderResultComponent}
      showSearchButton={!isWidget}
      autoSearchWhenHiddenFieldsChange
    />
  );

  render() {
    const { isWidget } = this.props;
    const { hiddenFields } = this.state;
    if (isWidget) {
      return this.renderSearchWrapper({
        hiddenFields,
        isWidget,
        formid: 'learn-course-widget',
      });
    }

    return (
      <Card title={t2('report_learning_course')}>
        {this.renderSearchWrapper({
          schema,
          formid: 'learn-course-report',
        })}
      </Card>
    );
  }
}

export default connect()(Layout);
