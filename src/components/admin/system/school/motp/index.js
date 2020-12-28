import React, { Component } from 'react';
import { t1 } from 'translate';
import Form from 'components/admin/node/new/';
import schema from './schema';
import apiUrls from 'components/admin/system/endpoints';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import Icon from 'components/common/Icon';
import MotpDetail from './Detail';

class Motp extends Component {
  render() {
    const { schoolSlug } = this.props;

    const hiddenFields = {
      school_slug: schoolSlug,
    };

    return (
      <div>
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <button
              className="m-l-5 m-r-5"
              title={t1('motp')}
              onClick={showFull}
            >
              <Icon icon="timetable" className="action" /> {t1('motp')}
            </button>
          )}
          renderFull={() => (
            <div>
              <MotpDetail schoolSlug={schoolSlug} />

              <Form
                schema={schema}
                hiddenFields={hiddenFields}
                formid={`motp-${schoolSlug}`}
                alternativeApi={apiUrls.generate_motp}
                requestSuccessful={(res) => {
                  const motp = lodashGet(res, 'result');
                  window.alert(motp);
                }}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default Motp;
