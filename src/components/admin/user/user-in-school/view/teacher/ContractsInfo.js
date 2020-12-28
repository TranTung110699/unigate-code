import React, { Component } from 'react';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import routes from 'routes';
import { Link } from 'react-router-dom';

class ContractsInfo extends Component {
  render() {
    const { user, showHeader } = this.props;

    return (
      <div>
        {showHeader !== false && <h3>{t1('contracts_of_teacher')}</h3>}

        {user.contracts &&
          user.contracts.map((contract) => (
            <div>
              {contract.name && (
                <div>
                  {' '}
                  {t1('name')}: <b>{contract.name}</b>
                </div>
              )}
              <div>
                {t1('time')}: {t1('from')}
                <b>
                  {' '}
                  {contract.start_date &&
                    timestampToDateString(contract.start_date)}
                </b>{' '}
                {t1('to')}{' '}
                <b>
                  {contract.end_date &&
                    timestampToDateString(contract.end_date)}
                </b>
              </div>

              <div>
                <b>{t1('subjects_can_teach')}</b>
              </div>
              <div>
                {contract.credit_syllabuses &&
                  contract.credit_syllabuses.map((credit) => (
                    <div>
                      <div>
                        <Link
                          to={routes.url('edit_item', {
                            base: '',
                            item: { ntype: 'credit', iid: credit.iid },
                          })}
                        >
                          {t1('name')}: <b>{credit.name}</b>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default ContractsInfo;
