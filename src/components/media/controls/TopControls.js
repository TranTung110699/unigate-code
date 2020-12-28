/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';

import ControlItem from './TopItem';
import {
  onMMShowAddFolderBox,
  switchToGridView,
  switchToListView,
} from '../actions';

class MediaControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addFolder = this.addFolder.bind(this);
  }

  addFolder() {
    const { dispatch, isAddingFolder } = this.props;
    if (isAddingFolder) {
      dispatch(onMMShowAddFolderBox(false));
    } else {
      dispatch(onMMShowAddFolderBox(true));
    }
  }

  render() {
    const {
      uploadMedia,
      dispatch,
      isAddingFolder,
      onGoToBackFolder,
    } = this.props;

    return (
      <ul className="list">
        <ControlItem
          iconClass="mi mi-arrow-back mi-24"
          onAction={() => {
            onGoToBackFolder();
          }}
        />
        <ControlItem
          iconClass="mi mi-file-upload mi-24"
          onAction={() => {
            uploadMedia();
          }}
        />
        <ControlItem
          iconClass="mi mi-file-download mi-24"
          onAction={() => {}}
        />
        <li className="item">
          <FlatButton onClick={this.addFolder}>
            <span>
              <i className="mi mi-folder-open mi-24" aria-hidden="true" />
              <i
                className={
                  isAddingFolder ? 'mi mi-close plus' : 'mi mi-add plus'
                }
                aria-hidden="true"
              />
            </span>
          </FlatButton>
        </li>
        <ControlItem
          iconClass="mi mi-folder-shared mi-24"
          onAction={() => {}}
        />
        <ControlItem iconClass="mi mi-delete mi-24" onAction={() => {}} />
        <ControlItem
          iconClass="mi mi-view-list mi-24"
          onAction={() => {
            dispatch(switchToListView());
          }}
        />
        <ControlItem
          iconClass="mi mi-view-comfy mi-24"
          onAction={() => {
            dispatch(switchToGridView());
          }}
        />
      </ul>
      // <ul className="list">
      //     <ControlItem iconClass="fa fa-refresh"/>
      //     <ControlItem iconClass="fa fa-cloud-upload" onAction={() => {
      //         uploadMedia();
      //     }}/>
      //     <ControlItem iconClass="fa fa-cloud-download"/>
      //     <li className="item" onClick={this.addFolder}>
      //         <a>
      //                     <span>
      //                         <i className="fa fa-folder-o" aria-hidden="true"></i>
      //                         <i className={isAddingFolder ? "fa fa-times plus" : "fa fa-plus plus"} aria-hidden="true"></i>
      //                     </span>
      //         </a>
      //     </li>
      //     <ControlItem iconClass="fa fa-pencil-square-o"/>
      //     <ControlItem iconClass="fa fa-trash"/>
      //     <ControlItem iconClass="fa fa-list-ul" onAction={() => {
      //         dispatch(switchToListView());
      //     }}/>
      //     <ControlItem iconClass="fa fa-th" onAction={() => {
      //         dispatch(switchToGridView())
      //     }}/>
      // </ul>
    );
  }
}

const mapStateToProp = (state) => ({
  listView: state.mm.listView,
  isAddingFolder: state.mm.isAddingFolder,
});
export default connect(mapStateToProp)(MediaControl);
