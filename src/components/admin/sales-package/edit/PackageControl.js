import PropTypes from 'prop-types';
import React from 'react';
import { packageStatus } from 'configs/constants/sales-package';
import Tag from 'antd/lib/tag';
import { t1 } from 'translate';
import Switch from 'antd/lib/switch';
import sagaActions from 'actions/node/saga-creators';
import api from '../endpoints';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import routes from 'routes';
import { withRouter } from 'react-router';

function PackageControl({
  item = {},
  formid,
  dispatch,
  label = false,
  history,
}) {
  const enrolmentPlan = get(item, 'enrollment_plans', []);

  const handleChangeStatus = (status) => {
    dispatch(
      sagaActions.updateNodeRequest({
        alternativeApi: api.changeStatus,
        iid: item.iid,
        data: {
          iid: item.iid,
          status,
        },
        searchFormId: formid,
      }),
    );
  };

  if (item.status === packageStatus.deleted) {
    return <Tag color="red">{t1(packageStatus.deleted)}</Tag>;
  }

  const SwitchControl = (
    <Switch
      checked={item.status === packageStatus.approved}
      defaultChecked={item.status === packageStatus.approved}
      onChange={(toggled) => {
        const status = toggled ? packageStatus.approved : packageStatus.created;
        if (enrolmentPlan.length === 0 && toggled) {
          return Modal.confirm({
            title: t1('this_sale_package_is_empty_enrolment_plans'),
            content: (
              <div>
                {t1('are_you_sure_to_continue')}
                <br />
                <Button
                  type="link"
                  className="p-0"
                  onClick={() => {
                    history.push(
                      routes.url('node_edit', {
                        ntype: 'sales-package',
                        iid: get(item, 'iid'),
                        step: 'enrolment-plans',
                      }),
                    );
                    Modal.destroyAll();
                  }}
                >
                  <u>{t1('add_enrolment_plan')}</u>
                </Button>
              </div>
            ),
            closable: true,
            onOk() {
              handleChangeStatus(status);
            },
          });
        } else {
          handleChangeStatus(status);
        }
      }}
    />
  );

  if (label)
    return (
      <div className="d-flex justify-content-between">
        <span>
          {t1(item.status === packageStatus.approved ? 'approved' : 'created')}
        </span>
        {SwitchControl}
      </div>
    );

  return SwitchControl;
}

export default connect()(withRouter(PackageControl));

PackageControl.propTypes = {
  formid: PropTypes.string,
  item: PropTypes.object.isRequired,
};
