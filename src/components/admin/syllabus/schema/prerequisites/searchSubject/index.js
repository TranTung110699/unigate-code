import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import SearchResult from './searchResults';
import schema from './schema-form';

const Layout = (props) => {
  const { addItemsSelected, labelButton, iconButton, itemsSelected } = props;

  const hiddenFields = {
    status: ['approved'],
    type: 'credit',
  };

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <RaisedButton
          label={labelButton || t1("add_'and'_condition")}
          icon={<Icon icon={iconButton || 'plus'} />}
          onClick={showFull}
        />
      )}
      renderFull={({ closeDialog }) => (
        <SearchWrapper
          showResult
          formid={'search-subject-in-edit-prerequisites'}
          schema={schema}
          showSearchButton
          hiddenFields={hiddenFields}
          alternativeApi="/syllabus/my"
          renderResultsComponent={(items) => (
            <SearchResult
              items={items}
              itemsSelected={itemsSelected}
              addItemsSelected={(item) => {
                closeDialog();
                return addItemsSelected(item);
              }}
            />
          )}
        />
      )}
      dialogKey="search-subject"
    />
  );
};

export default Layout;
