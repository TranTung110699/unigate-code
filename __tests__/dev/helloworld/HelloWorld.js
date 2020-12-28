// https://www.codementor.io/vijayst/unit-testing-react-components-jest-or-enzyme-du1087lh8

import React from 'react';
import renderer from 'react-test-renderer';
import HelloWorld from 'dev/helloworld/HelloWorld';
import HelloWorldList from 'dev/helloworld/List';

import { shallow, mount, render } from 'enzyme';


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


// snapshot
// describe('Welcome (Snapshot)', () => {
//   it('Welcome renders hello world', () => {
//     const component = renderer.create(<HelloWorld />);
//     const json = component.toJSON();
//     expect(json).toMatchSnapshot();
//   });
// });


// enzyme
describe('Welcome', () => {
  it('Welcome renders hello world', () => {
    const welcome = shallow(<HelloWorld />);
    expect(welcome.find('h1').text()).toEqual('Hello world');
  });
});


// testing structure
describe('HelloWorldList', () => {
  let list;

  beforeEach(() => {
    list = shallow(<HelloWorldList data={['Name 1', 'Name 2', 'Name 3']} />);
  });

  it('List renders lists', () => {
    expect(list.find('li').length).toEqual(3);
  });

  it('List renders data', () => {
    const arr = list.find('li');
    expect(arr.length).toEqual(3);
    expect(arr.at(1).text()).toEqual('Name 2');
  });
});

// testing behavior
describe('Add', () => {
  let add;
  let onAdd;

  beforeEach(() => {
    onAdd = jest.fn();
    add = mount(<HelloWorld onAdd={onAdd} />);
  });

  it('Add requires onAdd prop', () => {
    expect(add.props().onAdd).toBeDefined();
  });

  it('Add renders button', () => {
    const button = add.find('button').first();
    expect(button).toBeDefined();
  });

  it('Button click calls onAdd', () => {
    const button = add.find('button').first();
    const input = add.find('input').first();
    input.simulate('change', { target: { value: 'Name 4' } });
    button.simulate('click');
    expect(onAdd).toBeCalledWith('Name 4');
  });
});

