import React from 'react';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { UiLibs } from 'configs/constants';
import MUInputToken from 'schema-form/elements/mui-input-token';
import AntdInputTag from 'schema-form/elements/input-tag';

const InputToken = (props) => {
  const { defaultUiLib, uiLib } = props;
  const chooseUiLib = uiLib || defaultUiLib;

  if (chooseUiLib === UiLibs.MATERIAL_UI) {
    return <MUInputToken {...props} />;
  } else {
    return <AntdInputTag {...props} />;
  }
};

export default withSchoolConfigs(InputToken, (globalConfigs) => ({
  defaultUiLib: globalConfigs.uiLib,
}));
