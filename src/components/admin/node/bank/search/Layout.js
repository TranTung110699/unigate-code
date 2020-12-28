/* eslint-disable no-const-assign,react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { Link } from 'react-router-dom';
import RaisedButton from 'components/common/mui/RaisedButton';
import { isExamShift } from 'common/learn';
import { t1 } from 'translate';
import { UsedFor } from 'configs/constants';
import {
  getEnrolmentPlanIidOfEnrolmentPlanProgram,
  isEnrolmentPlanProgram,
} from 'components/admin/node/utils';
import lodashGet from 'lodash.get';
import schema from './schema-advance';
import k12Schema from './k12/schema';
import Results from './Results';
import K12Results from './k12/Results';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.pSubtype !== nextProps.pSubtype ||
      this.props.ntype !== nextProps.ntype ||
      this.props.fieldEdit !== nextProps.fieldEdit ||
      this.props.subType !== nextProps.subType ||
      this.props.editingItemIid !== nextProps.editingItemIid ||
      this.props.editingItemIid !== nextProps.editingItemIid ||
      this.props.editingItemAncestors !== nextProps.editingItemAncestors
    ) {
      return true;
    }
    return false;
  }

  renderResultComponent = (items, props) => {
    return props.isK12 ? (
      <K12Results items={items} {...props} />
    ) : (
      <Results items={items} {...props} />
    );
  };

  render() {
    let {
      hiddenFields,
      mod,
      autoSearchWhenStart,
      displayType,
      editingItemAncestors,
      isSIS,
    } = this.props;
    hiddenFields = hiddenFields || {};

    ['ntype', 'subType', 'pSubtype'].forEach((key) => {
      if (typeof this.props[key] !== 'undefined') {
        hiddenFields = { ...hiddenFields, [key]: this.props[key] };
      }
    });

    if (
      Array.isArray(editingItemAncestors) &&
      isExamShift(editingItemAncestors[0])
    ) {
      hiddenFields = {
        ...hiddenFields,
        exam_round_code: editingItemAncestors[0].exam_round,
        contest_code: editingItemAncestors[0].contest_code,
      };
    }

    if (this.props.ntype === 'survey-question') {
      hiddenFields = {
        ...hiddenFields,
        ntype: 'question',
        used_for: [UsedFor.SURVEY],
      };
    }

    if (this.props.ntype === 'syllabus-online-only') {
      hiddenFields = {
        ...hiddenFields,
        ntype: 'syllabus',
        online_only: 1,
      };
    }

    return (
      <div>
        {displayType === 'view_bank' && (
          <div className="m-b-10">
            <Link to={`/admin/bank/${this.props.ntype}/import`}>
              <RaisedButton primary label={t1('import_from_excel')} />
            </Link>{' '}
            <Link to={`/admin/bank/${this.props.ntype}/new`}>
              <RaisedButton primary label={t1('add_new')} />
            </Link>
          </div>
        )}
        <SearchWrapper
          formid={`bank_search_${this.props.subType}`}
          {...this.props}
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={hiddenFields}
          showQueryField={false}
          autoSearchWhenStart={autoSearchWhenStart}
          schema={this.props.isK12 ? k12Schema : schema}
          defaultValues={
            this.props.isSIS
              ? {}
              : {
                  academic_categories:
                    hiddenFields.defaultAcademicCategories || [],
                  include_sub_organizations: 0,
                }
          }
          node={{
            top_equivalent_positions:
              lodashGet(editingItemAncestors, '[0].top_equivalent_positions') ||
              [],
          }}
          alternativeApi={'/api/v1/syllabus/search'}
          showSearchButton={false}
        />
      </div>
    );
  }
}

Layout.propTypes = {
  ntype: PropTypes.string,
  subType: PropTypes.string,
  pSubtype: PropTypes.string,
};

Layout.defaultProps = {
  ntype: 'syllabus',
};

function mapStateToProps(state, props) {
  const nodes = state.tree;
  const editingItemIid = props.editingItemIid;
  const node = nodes[editingItemIid];
  let hiddenFields = {};

  if (lodashGet(node, 'iid')) {
    hiddenFields.piid = node.iid;
    hiddenFields.ptype = node.ntype;
  }

  return {
    hiddenFields,
  };
}

export default connect(mapStateToProps)(withSchoolConfigs(Layout));
