import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import Icon from './Icon';
import { breadCrumb } from 'common/utils/string';
import { getFileFullName } from 'common/utils/File';
import GridViewFilters from './GridViewFilters';
import { createSelectable, SelectableGroup } from 'react-selectable';
import styled from 'styled-components';
import { defaultSearchOrder } from './common';

const Wrapper = styled(SelectableGroup)`
  display: flex;
  flex-wrap: wrap;
  min-height: 400px;
`;

const FileWrapper = styled.div`
  min-width: 150px;
  padding: 10px;
  width: 20%;
`;

const IconWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  font-size: 45px !important;
  margin: auto !important;
  color: lightskyblue;
`;

const selectedFileColor = 'cornflowerblue';

const File = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  ${StyledIcon} {
    ${(props) => (props.selected ? `color: ${selectedFileColor}` : '')};
  }
  &:hover {
    ${StyledIcon} {
      color: ${selectedFileColor};
    }
  }
`;

const SelectableFile = createSelectable(File);

const NameWrapper = styled.div`
  text-align: center;
  word-wrap: break-word;
  font-size: 13px;
  background: ${(props) => (props.isStaged ? '#e6eaf2' : 'transparent')};
`;

class GridView extends React.PureComponent {
  handleFilterChange = (values) => {
    const { onSortDataChange } = this.props;
    if (
      typeof onSortDataChange === 'function' &&
      values.order_value &&
      values.order_by
    ) {
      onSortDataChange({
        [values.order_by]: values.order_value,
      });
    }
  };

  render() {
    const {
      className,
      items,
      onFileClick,
      onFileDoubleClick,
      onStagedItemsChange,
      stagedItems,
    } = this.props;
    return (
      <div>
        <GridViewFilters
          initialValues={defaultSearchOrder}
          onChange={this.handleFilterChange}
        />
        <Wrapper
          onNonItemClick={() =>
            typeof onStagedItemsChange === 'function' && onStagedItemsChange([])
          }
          onSelection={onStagedItemsChange}
          selectOnMouseMove
          className={`${className || ''} ${this.cssClass || ''}`}
        >
          {Array.isArray(items) &&
            items.filter(Boolean).map((item) => {
              const fullName = getFileFullName(item);
              const isStaged =
                Array.isArray(stagedItems) &&
                !!stagedItems.find((elem) => elem && elem.code === item.code);
              return (
                <FileWrapper key={item.id} title={fullName}>
                  <SelectableFile
                    onDoubleClick={(event) => {
                      if (typeof onFileDoubleClick === 'function') {
                        onFileDoubleClick(item);
                      }
                      event.stopPropagation();
                      event.preventDefault();
                    }}
                    onClick={() => {
                      typeof onFileClick === 'function' && onFileClick(item);
                    }}
                    selected={isStaged}
                    selectableKey={item}
                    key={item && item.id}
                  >
                    <IconWrapper>
                      <StyledIcon item={item} />
                    </IconWrapper>
                    <NameWrapper isStaged={isStaged}>
                      {breadCrumb(fullName, 40)}
                    </NameWrapper>
                  </SelectableFile>
                </FileWrapper>
              );
            })}
        </Wrapper>
      </div>
    );
  }
}

GridView.propTypes = {
  className: PropTypes.string,
};

GridView.defaultProps = {
  className: '',
};

export default reduxForm({
  form: 'file_manager_list_view',
})(GridView);
