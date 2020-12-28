import React from 'react';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { UiLibs } from 'configs/constants';
import AntDesignDateTimePicker, {
  modes as antDateTimePickerModes,
} from 'schema-form/elements/ant-date-time-picker';
import MUIDatePicker from 'schema-form/elements/mui-date-picker';

const DatePicker = (props) => {
  const { defaultUiLib, uiLib } = props;
  const chooseUiLib = uiLib || defaultUiLib;

  if (chooseUiLib === UiLibs.MATERIAL_UI) {
    return <MUIDatePicker {...props} unixTimeStamp />;
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
        mode={antDateTimePickerModes.DATE_PICKER}
      />
    );
  }
};

export default withSchoolConfigs(DatePicker, (globalConfigs) => ({
  defaultUiLib: globalConfigs.uiLib,
}));
