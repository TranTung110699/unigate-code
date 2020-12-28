// https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8

import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import App from 'dev/helloworld/App';
import { shallow, mount, render } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe('App', () => {
  let app;

  beforeEach(() => {
    app = shallow(<App />);
  });

  it('App renders nested components', () => {
    expect(app.find('HelloWorld').length).toEqual(1);
    expect(app.find('List').length).toEqual(1);
  });

  it('onAdd updates List', () => {
    const add = app.find('HelloWorld').first();
    add.props().onAdd('Name 1');
    app.update();
    const list = app.find('List').first();
    const listData = list.props().data;
    expect(listData.length).toEqual(1);
    expect(listData[0]).toEqual('Name 1');
  });
});
