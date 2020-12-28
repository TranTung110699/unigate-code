import { t1 } from 'translate';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Result from 'antd/lib/result';
import Button from 'antd/lib/button';

export default class NoMatch extends Component {
  render() {
    return (
      <Result
        className="m-t-50"
        status="404"
        title="404"
        subTitle={t1('page_not_found.')}
        extra={
          <Button type="primary">
            <Link to="/">{t1('click_to_go_back_to_home_page')}</Link>
          </Button>
        }
      />
    );
  }
}
