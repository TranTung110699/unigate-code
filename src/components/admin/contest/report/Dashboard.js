import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Card from 'components/admin/report-teacher/common/Card';
import { Link } from 'react-router-dom';

import { t1 } from 'translate';
import Paper from 'components/common/paper';

import Title from 'schema-form/field-set/Title';
import { menuItems } from './configs';
import Icon from 'components/common/Icon';

class Dashboard extends Component {
  render() {
    const { node, conf } = this.props;
    const items = menuItems(node, conf);

    return (
      <div>
        <Card>
          <h1>{t1('reports')}</h1>
          <div className="row">
            {!Array.isArray(items) || !items.length ? (
              t1(
                'please_go_to_the_configuration_to_select_the_report_list_to_display',
              )
            ) : (
              <div className="flex-container-wrap">
                {items.map((item) => {
                  return (
                    <div className="col-xs-3 flex-item m-10">
                      <Paper className={'p-10'}>
                        <Title
                          title={
                            <Link to={item.url}>
                              {item.title} <Icon icon="preview" />
                            </Link>
                          }
                          className={'text-transform'}
                        />
                        <div
                          style={{
                            minHeight: '70px',
                          }}
                        >
                          {item.description}
                        </div>
                      </Paper>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conf: get(state, 'domainInfo.conf'),
});

export default connect(mapStateToProps)(Dashboard);
