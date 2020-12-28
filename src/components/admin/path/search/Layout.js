import React, { PureComponent } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import SearchWrapperV2 from 'components/common/search-wrap-v2/SearchWrapper';
import FormFilters from 'components/admin/node/search/FormFilters';
import Results from './Results';
import SubjectGroupResults from './SubjectGroupResults';
import ClassGroupResults from './ClassGroupResults';
import { getSearchFormId } from '../utils';
import ClassGroupFormFilter from './FormFilters';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import schema from './schema';
import schemaAdvance from './schema-advance';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import { t1 } from 'translate';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class Layout extends PureComponent {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const type = this.props.type || 'path';
    const searchFormId = props && props.formid;
    return (
      <div>
        {type === 'path' && (
          <Results
            items={items}
            {...this.props}
            ntype="path"
            formid={searchFormId}
          />
        )}
        {type === 'subjectgroup' && (
          <SubjectGroupResults
            items={items}
            {...this.props}
            ntype="path"
            formid={searchFormId}
          />
        )}
        {type === 'classgroup' && (
          <ClassGroupResults
            items={items}
            {...this.props}
            ntype="path"
            formid={searchFormId}
          />
        )}
      </div>
    );
  }

  render() {
    const { action, hiddenFields, isEnterprise, isFeatureEnabled } = this.props;
    let newHiddenFields = hiddenFields ? { ...hiddenFields } : {};
    const type = this.props.type || 'path';
    const mod = action === 'import' ? 'path_import' : type;
    newHiddenFields.type = newHiddenFields.type || type;
    const searchFormId = this.props.formid || getSearchFormId(mod);

    const searchWrapperProps = {
      ...this.props,
      formid: searchFormId,
      hiddenFields: newHiddenFields,
      renderResultsComponent:
        this.props.renderResultsComponent || this.renderResultComponent,
      onResultChange: this.props.onResultChange,
      showSearchButton: true,
      classWapperSearchButton: 'col-md-2 submit-btn-col',
    };

    if (isEnterprise) {
      return (
        <SearchWrapperV2
          {...searchWrapperProps}
          schema={
            isFeatureEnabled(features.NEW_UI_JULY_2019) ? schemaAdvance : schema
          }
          defaultValues={{
            status: ['queued', 'approved'],
            program_type: type === 'program' ? ['program'] : null,
            is_credit_transfert_group: type === 'subjectgroup' ? [0.1] : null,
          }}
          showSearchButton={!isFeatureEnabled(features.NEW_UI_JULY_2019)}
        />
      );
    }

    return (
      <React.Fragment>
        <SubTopMenuContext
          lastBreadcrumbName={t1(type)}
          description={t1(`${type}_description`)}
        />
        <SearchWrapper {...searchWrapperProps}>
          {type === 'classgroup' ? (
            <ClassGroupFormFilter formid={searchFormId} />
          ) : (
            <FormFilters formid={searchFormId} hiddenFields={newHiddenFields} />
          )}
        </SearchWrapper>
      </React.Fragment>
    );
  }
}

export default withSchoolConfigs(withFeatureFlags()(Layout));
