import React from 'react';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { UiLibs } from 'configs/constants';
import AntDesignDateTimePicker from 'schema-form/elements/ant-date-time-picker';
import MUDateTimePicker from 'schema-form/elements/mui-date-time-picker';

const DatePicker = (props) => {
  const { defaultUiLib, uiLib, mode } = props;
  const chooseUiLib = uiLib || defaultUiLib;

  //const validate = schema.validate || [];
  //validate.push(isDateTime());

  if (chooseUiLib === UiLibs.MATERIAL_UI) {
    return <MUDateTimePicker {...props} unixTimeStamp />;
  } else {
    const {
      defaultValue,
      minDate,
      maxDate,
      onChange,
      onBlur,
      getStartDate,
      getEndDate,
      errorText,
      fullWidth,
      floatingLabelText,
      value,
      className,
      style,
      disabled,
      allowClear,
      placeholder,
      size,
      formatDate,
      ...reduxFormElementProps
    } = props;
    return (
      <AntDesignDateTimePicker
        {...reduxFormElementProps}
        defaultValue={defaultValue}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        onBlur={onBlur}
        getStartDate={getStartDate}
        getEndDate={getEndDate}
        errorText={errorText}
        fullWidth={fullWidth}
        floatingLabelText={floatingLabelText}
        value={value}
        className={className}
        style={style}
        disabled={disabled}
        allowClear={allowClear}
        placeholder={placeholder}
        size={size}
        formatDate={formatDate}
      />
    );
  }
};

export default withSchoolConfigs(DatePicker, (globalConfigs) => ({
  defaultUiLib: globalConfigs.uiLib,
}));
