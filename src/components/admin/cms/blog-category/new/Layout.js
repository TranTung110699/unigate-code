import React, { Component } from 'react';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Form from './Form';
import topMenuSchema from '../menu/MainstageTopMenu';

class BlogNew extends Component {
  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <Form />
      </div>
    );
  }
}

export default BlogNew;
