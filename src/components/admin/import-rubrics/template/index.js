import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import NodeNew from 'components/admin/node/new';
import Tabs from 'components/common/tabs';
import RaisedButton from 'components/common/mui/RaisedButton';
import getSchema from './schema';

const DownloadFileTemplate = (props) => {
  const { closeDialog } = props;
  const types = ['by_subject', 'by_rubrics'];

  return (
    <Tabs
      tabs={types.map((type) => ({
        label: t1(`download_template_${type}`),
        content: (
          <NodeNew
            ntype={'major'}
            formid={`download_template_${type}`}
            schema={getSchema({ type })}
            hiddenFields={{ type }}
            node={
              type === 'by_rubrics'
                ? {
                    test_rubrics: [
                      {
                        name: t1('on_going_%s', 1),
                        weight: 40,
                      },
                    ],
                    exam_rubrics: [
                      {
                        name: t1('final_exam_rubric'),
                        weight: 60,
                      },
                    ],
                  }
                : {}
            }
            closeModal
            resetForm
            requestSuccessful={closeDialog}
            alternativeApi="/import/data/get-template-form-import-score"
            submitButton={
              <div className="text-center">
                <RaisedButton
                  icon={<Icon icon="download" />}
                  label={t1('download')}
                  primary
                  type="submit"
                />
              </div>
            }
          />
        ),
      }))}
    />
  );
};

export default DownloadFileTemplate;
