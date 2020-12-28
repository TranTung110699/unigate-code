import React from 'react';
import { t, t1 } from 'translate';
import Widget from 'components/common/Widget';
import { displayVNMoney } from 'common/utils/money';
import DisplayHtml from 'components/common/html';
import { packageStatus } from 'configs/constants/sales-package';
import sagaActions from 'actions/node/saga-creators';
import api from '../../endpoints';
import Tag from 'antd/lib/tag';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import PackageControl from '../../edit/PackageControl';

function DashBoard({ node, dispatch }) {
  const { status } = node;
  return (
    <div>
      <img src={node.avatar} alt="" width={150} className="m-b-20" />
      <div className="row">
        <div className="col-md-8">
          <Widget title={t1('sale_package_information')}>
            <div>
              {t1('name')}: {node.name}
            </div>
            <div>
              {t1('price')}: {displayVNMoney(node.price)}
            </div>
            <div>
              {t1('reduced_price')}: {displayVNMoney(node.reduced_price)}
            </div>
            <div>
              {t1('description')}: <DisplayHtml content={node.description} />
            </div>
            <div>
              {t1('count_learner')}: {node.count_learner}
            </div>
            <div>
              {t1('duration')}: {node.duration} {t('month')}
            </div>
          </Widget>
        </div>
        <div className="col-md-4">
          <Widget title={t1('status')}>
            {status !== packageStatus.deleted ? (
              <>
                <PackageControl item={node} label />
                <hr />
                <Popconfirm
                  title={t1('are_you_sure_you_want_to_delete_%s?', [node.name])}
                  onConfirm={() => {
                    dispatch(
                      sagaActions.updateNodeRequest({
                        alternativeApi: api.changeStatus,
                        iid: node.iid,
                        data: {
                          iid: node.iid,
                          status: packageStatus.deleted,
                        },
                      }),
                    );
                  }}
                  okText="OK"
                  cancelText={t1('cancel')}
                >
                  <div className="text-center">
                    <Button type="danger" icon="delete">
                      {t1('delete')}
                    </Button>
                  </div>
                </Popconfirm>
              </>
            ) : (
              <Tag color="red">{t1(packageStatus.deleted)}</Tag>
            )}
          </Widget>
        </div>
      </div>
    </div>
  );
}

export default connect()(DashBoard);
