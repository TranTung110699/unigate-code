import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import Paper from 'material-ui/Paper';
import apiUrls from 'api-endpoints';
import Title from 'schema-form/field-set/Title';
import fetchData from 'components/common/fetchData';
import Icon from 'components/common/Icon/index';
import { formatMoney } from 'common';
import { reqTypes } from 'configs/constants';

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

const layoutFreeStyle = (props) => {
  const fieldNames = getLodash(props, 'groups.id.fieldNames') || {};
  const feeTemplate = getLodash(
    props,
    'requestTypeDetail.appliedFeeTemplate.fee_template',
  );
  const attachments = getLodash(props, 'requestTypeDetail.attachments');

  let showButtonSubmit = true;
  const requestType = getLodash(props, 'formValues.request_type');
  if (!getLodash(props, 'formValues.request_type_iid')) {
    showButtonSubmit = false;
  } else if (requestType === reqTypes.POSTPONE_FEE_DEADLINE) {
    const fees = getLodash(
      props,
      `formValues.request_data.${reqTypes.POSTPONE_FEE_DEADLINE}.fees`,
    );
    showButtonSubmit = Array.isArray(fees) && fees.length > 0;
  }

  return (
    <div>
      <Paper style={stylePaper}>
        <Title title={t1('choose_request_type')} />
        <div className="row">
          <div className="col-md-12">
            {fieldNames.request_type}
            {fieldNames.request_type_iid}
          </div>
          {Array.isArray(attachments) && attachments.length > 0 && (
            <div className="col-md-12">
              {attachments.map((file) => (
                <li>
                  <a
                    href={file.link}
                    className="download-template"
                    target="_blank"
                  >
                    <Icon
                      icon="fileDownload"
                      style={{
                        fontSize: 20,
                        top: 4,
                      }}
                    />{' '}
                    {file.name}
                  </a>
                </li>
              ))}
            </div>
          )}
          {feeTemplate && feeTemplate.amount > 0 && (
            <div className="col-md-12">
              {`${t1('fee_to_make_the_request')}: ${formatMoney(
                feeTemplate.amount,
              )} ${feeTemplate.currency}`}
            </div>
          )}
        </div>
      </Paper>
      {fieldNames.request_data && (
        <Paper style={stylePaper}>
          <Title title={t1('request_data_information')} />
          <div className="row">
            <div className="col-md-12">{fieldNames.request_data}</div>
          </div>
        </Paper>
      )}
      {fieldNames.status && (
        <Paper style={stylePaper}>
          <Title title={t1('status_will_process')} />
          <div className="row">
            <div className="col-md-12">{fieldNames.status}</div>
          </div>
        </Paper>
      )}
      {showButtonSubmit && (
        <div className="col-md-12 text-center m-t-20">
          {getLodash(props, 'submitButton')}
        </div>
      )}
    </div>
  );
};

export default fetchData((props) => ({
  baseUrl: apiUrls.get_detail_request_type,
  params: {
    iid: getLodash(props, 'formValues.request_type_iid'),
  },
  propKey: 'requestTypeDetail',
  fetchCondition: getLodash(props, 'formValues.request_type_iid'),
  refetchCondition: (prevProps) => {
    const iid = getLodash(props, 'formValues.request_type_iid');
    return iid && iid !== getLodash(prevProps, 'formValues.request_type_iid');
  },
}))(layoutFreeStyle);
