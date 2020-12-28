import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import withUserOrganizations from 'common/hoc/withUserOrganizations';
import lodashGet from 'lodash.get';

/**
 * Will pass down the following props to component
 *
 * @returns {*}
 */
const withETEP = () => (WrappedComponent) => {
  const HOC = (props) => {
    if (window.isETEP) {
      const { orgIids, orgainzations, ...originalProps } = props;
      return (
        <WrappedComponent
          {...originalProps}
          etep_isETEP
          etep_isGVDHSP={(orgIids || []).find((iid) =>
            (
              lodashGet(window.ETEP_CONFIG, 'GVDHSP_organization_iids') || []
            ).find((anotherIid) => anotherIid == iid),
          )}
          etep_boGiaoDucVaDaoTaoIid={lodashGet(
            window.ETEP_CONFIG,
            'boGiaoDucVaDaoTaoIid',
          )}
          etep_boGiaoDucVaDaoTaoSubType={lodashGet(
            window.ETEP_CONFIG,
            'etep_boGiaoDucVaDaoTaoSubType',
          )}
          etep_soGiaoDucVaDaoTaoSubType={lodashGet(
            window.ETEP_CONFIG,
            'etep_soGiaoDucVaDaoTaoSubType',
          )}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  hoistNonReactStatic(HOC, WrappedComponent);

  return withUserOrganizations(HOC);
};

export default withETEP;
