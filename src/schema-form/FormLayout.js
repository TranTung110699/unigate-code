import React from 'react';
import TwoColsAndRow from './layouts/TwoColsAndRow';
import Default from './layouts/Default';
import FlexBox from './layouts/FlexBox';
import FlexBoxWraper from './layouts/FlexBoxWraper';
import CompactSearch from './layouts/CompactSearch';
import { commonFormLayouts } from 'schema-form/constants';

class FormLayout extends React.PureComponent {
  render() {
    const {
      layout,
      groups,
      groupsMetadata,
      submitButton,
      showAddNewAndEditButton,
      addNewAndEditButton,
      formType,
      readOnly,
      message,
      xpath,
    } = this.props;

    // console.log({layout: typeof layout, layoutValue: layout});
    if (
      typeof layout !== 'string' &&
      typeof layout !== 'undefined' &&
      typeof layout !== 'object'
    ) {
      // if (typeof layout === 'function')
      //   return layout(this.props);
      // else // component
      const Layout = layout;
      return <Layout {...this.props} />;
    }

    // else layout is a string
    switch (layout) {
      case commonFormLayouts.THREE_COLS:
        return (
          <FlexBox
            xpath={xpath}
            groups={groups}
            readOnly={readOnly}
            message={message}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
          />
        );
      case commonFormLayouts.TWO_COLS_AND_ROW:
        return (
          <TwoColsAndRow
            xpath={xpath}
            groups={groups}
            readOnly={readOnly}
            message={message}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
          />
        );
      case commonFormLayouts.TWO_COLS:
        return (
          <FlexBox
            xpath={xpath}
            groups={groups}
            readOnly={readOnly}
            message={message}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
          />
        );
      case commonFormLayouts.FLEX_BOX_WRAP:
        return (
          <FlexBoxWraper
            xpath={xpath}
            groups={groups}
            readOnly={readOnly}
            message={message}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
          />
        );
      case commonFormLayouts.COMPACT_SEARCH:
        return (
          <CompactSearch
            xpath={xpath}
            groups={groups}
            groupsMetadata={groupsMetadata}
            readOnly={readOnly}
            message={message}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
          />
        );
      case commonFormLayouts.DEFAULT:
      default:
        return (
          <Default
            xpath={xpath}
            layout={layout}
            groups={groups}
            groupsMetadata={groupsMetadata}
            formType={formType}
            readOnly={readOnly}
            message={message}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
          />
        );
    }
  }
}

export default FormLayout;
