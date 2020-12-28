import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import schemaAdvance from './schema-advance';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import Results from './Results';
import K12Results from './K12Results';
import EtepResult from './Results-Etep';
import Warning from 'components/common/Warning';
import routes from 'routes';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';

class EpCoursesSearch extends React.Component {
  renderResultComponent = (items, props, objects, searchValues) => {
    const {
      node,
      columnsNotToShow,
      formid,
      blackListActions,
      k12,
    } = this.props;

    if (k12)
      return (
        <K12Results
          {...props}
          blackListActions={blackListActions}
          columnsNotToShow={columnsNotToShow}
          items={items}
          searchFormId={formid}
          node={node}
          searchValues={searchValues}
        />
      );
    if (window.isETEP) {
      return (
        <EtepResult
          {...props}
          blackListActions={blackListActions}
          columnsNotToShow={columnsNotToShow}
          items={items}
          searchFormId={formid}
          node={node}
          searchValues={searchValues}
        />
      );
    }

    return (
      <Results
        {...props}
        blackListActions={blackListActions}
        columnsNotToShow={columnsNotToShow}
        items={items}
        searchFormId={formid}
        node={node}
        searchValues={searchValues}
      />
    );
  };

  renderNoResultComponent = () => {
    const { node, noSearchForm } = this.props;
    return (
      <Warning>
        {t1('there_are_no_courses_created')}.
        {!noSearchForm && (
          <Link
            to={routes.url('node_edit', {
              ntype: 'enrolment_plan',
              iid: lodashGet(node, 'iid'),
              stepNodes: [
                {
                  ntype: 'program',
                  iid: lodashGet(node, 'program_iid'),
                },
              ],
            })}
          >
            {t1('create_here')} <Icon icon="edit" />
          </Link>
        )}
      </Warning>
    );
  };

  render() {
    const { node, noSearchForm, hiddenFields, formid } = this.props;

    return (
      <SearchWrapper
        formid={formid}
        schema={
          noSearchForm ? undefined : window.isETEP ? schemaAdvance : schema
        }
        showSearchButton={!(noSearchForm || window.isETEP)}
        hiddenFields={{
          ...(hiddenFields || {}),
          enrolment_plans: [lodashGet(node, 'iid')],
          order_by: 'credit_syllabus',
          order_value: 1,
          _sand_expand: ['credit_syllabus', 'number_of_students'],
          _sand_step: 'enrolment_plan',
        }}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.course_search}
        renderNoResultComponent={this.renderNoResultComponent}
        autoSearchWhenStart
      />
    );
  }
}

EpCoursesSearch.propTypes = {
  className: PropTypes.string,
};

EpCoursesSearch.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => {
  return {
    k12: lodashGet(state, 'domainInfo.conf.k12'),
  };
};

export default connect(mapStateToProps)(EpCoursesSearch);
