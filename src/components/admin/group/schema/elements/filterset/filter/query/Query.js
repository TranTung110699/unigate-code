import React from 'react';
import { t1 } from 'translate/index';

class Query extends React.Component {
  render() {
    return (
      <div>
        <b>{t1('user_name_or_id_or_email_or_code_matching')}</b>:{' '}
        <b>{this.props.text}</b>. ({t1('matching_type')}:{' '}
        {this.props.textOp === '$eq' ? t1('exact') : t1('similar')})
      </div>
    );
  }
}

export default Query;
