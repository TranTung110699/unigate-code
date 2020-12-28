import React from 'react';
import Input from 'antd/lib/input';
import AntdIcon from 'antd/lib/icon';
import useForceUpdate from 'components/common/hook/useForceUpdate';
import Form from 'schema-form/Form';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';
import Measure from 'react-measure';
import Popover from 'antd/lib/popover';
import lodashGet from 'lodash.get';
import './stylesheet.scss';
import Button from 'antd/lib/button';
import { t1 } from 'translate';
import styled from 'styled-components';
import AntdTag from 'antd/lib/tag';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Tag = styled(AntdTag)`
  cursor: pointer !important;
  margin-right: 0 !important;
  margin-left: 5px !important;
`;

const Search = (props) => {
  let {
    value,
    onChange,
    handleSubmit,
    schema,
    recapSchema,
    formid,
    labelText,
    hideSearchButton,
    errors,
    hideAdvanceSearchSchema,
  } = props;
  const cssClass = 'schema-form-advance-search';

  const forceUpdate = useForceUpdate();
  const [isAdvanceSearchVisible, setAdvanceSearchVisibility] = React.useState(
    false,
  );
  const [width, setWidth] = React.useState();
  const [height, setHeight] = React.useState();

  const handleSearchButtonClick = React.useCallback(
    () => {
      handleSubmit();
      if (!errors) {
        setAdvanceSearchVisibility(false);
        forceUpdate();
      }
    },
    [handleSubmit, forceUpdate, errors],
  );

  const handleAdvanceSearchClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    setAdvanceSearchVisibility(!isAdvanceSearchVisible);
  };

  const popoverContent = React.useMemo(
    () => {
      if (!formid) {
        return null;
      }

      return (
        <React.Fragment>
          <h3>{t1('advanced_filters')}</h3>
          <Form
            formid={formid}
            isFormSection
            schema={schema}
            submitButton={
              <Button
                type="primary"
                onClick={handleSearchButtonClick}
                icon="search"
              >
                {t1('search')}
              </Button>
            }
          />
        </React.Fragment>
      );
    },
    [formid, schema, handleSearchButtonClick],
  );

  const recapContent = React.useMemo(
    () => {
      if (!formid) {
        return null;
      }

      return (
        <Form
          formid={formid}
          isFormSection
          schema={recapSchema}
          hideSubmitButton
        />
      );
    },
    [formid, recapSchema],
  );

  const popoverStyle = React.useMemo(
    () => ({
      minWidth: Math.max(width, 375),
      width,
      overflow: 'auto',
      maxHeight: Math.max(height, 100),
      minHeight: 100,
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.45)',
      zIndex: 1502,
    }),
    [width, height],
  );

  const hasAdvanceSearchSchema =
    schema &&
    schema.schema &&
    (schema.schema.length || typeof schema.schema === 'object');
  const hasAdvanceSearchRecapSchema =
    recapSchema &&
    recapSchema.schema &&
    (recapSchema.schema.length || typeof recapSchema.schema === 'object');

  const suffixIcon =
    !hideAdvanceSearchSchema && hasAdvanceSearchSchema
      ? {
          suffix: (
            <Tag onClick={handleAdvanceSearchClick}>
              {t1('advanced_filters')}{' '}
              <AntdIcon type={isAdvanceSearchVisible ? 'up' : 'down'} />
            </Tag>
          ),
        }
      : {};

  const addonAfter = !hideSearchButton
    ? {
        addonAfter: (
          <AntdIcon
            type="search"
            style={{ cursor: 'pointer' }}
            onClick={handleSearchButtonClick}
          />
        ),
      }
    : {};

  return (
    <div className="advance-search-container">
      <Popover
        visible={isAdvanceSearchVisible}
        placement="bottomRight"
        content={hasAdvanceSearchSchema ? popoverContent : null}
        overlayStyle={popoverStyle}
        trigger="click"
        overlayClassName={`${cssClass}__popover-overlay`}
        onVisibleChange={setAdvanceSearchVisibility}
      >
        <Measure
          bounds
          onResize={(contentRect) => {
            const bounds = lodashGet(contentRect, 'bounds');
            const width = lodashGet(bounds, 'width');
            const top = lodashGet(bounds, 'top');
            const screenHeight = window.innerHeight;
            setWidth(width);
            setHeight(screenHeight - top - 50);
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef}>
              <Input
                value={value}
                onChange={onChange}
                {...addonAfter}
                {...suffixIcon}
                placeholder={labelText || t1('search')}
                allowClear
              />
            </div>
          )}
        </Measure>
      </Popover>
      {hasAdvanceSearchRecapSchema ? (
        <div className={`${cssClass}__recap`}>{recapContent}</div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { formid = '' } = props;
  return {
    errors: lodashGet(state, `form.${formid}.syncErrors`),
  };
};

export default compose(
  connect(mapStateToProps),
  makeReduxFormCompatible({}),
)(Search);
