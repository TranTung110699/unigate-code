import React from 'react';
import ConfCategoryEditLayout from 'components/admin/conf/CategoryLayout';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { Link } from 'react-router-dom';
import { hashType } from 'configs/constants';
import Card from 'antd/lib/card';

const dialogOptionsProperties = {
  width: '80%',
};

const styles = {
  minHeight: '150px',
};

const SettingsWidget = ({ linkItems, configItems, title }) => {
  return (
    <Card title={title}>
      <div style={styles}>
        {linkItems &&
          linkItems.map((item) => (
            <div>
              <Link
                to={
                  item.hash ? `/admin/settings${hashType}${item.url}` : item.url
                }
              >
                {item.title}
              </Link>
            </div>
          ))}

        {configItems &&
          configItems.map((item) => (
            <div>
              <DetailOnDialog
                textTooltip={item.description}
                textPreview={item.title}
                renderFull={() => {
                  return (
                    <ConfCategoryEditLayout domain="admin" menu={item.id} />
                  );
                }}
                dialogOptionsProperties={dialogOptionsProperties}
              />
            </div>
          ))}
      </div>
    </Card>
  );
};

export default SettingsWidget;
