/**
 * Created by DVN on 8/23/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NodeNew from 'components/admin/node/new';
// import { t1 } from 'translate';
import newCardPackage from 'components/admin/card/schema/form';

class FormFilter extends Component {
  render() {
    const { title, mode, node, ntype, formid, searchFormId } = this.props;
    return (
      <NodeNew
        title={title}
        ntype={ntype}
        schema={newCardPackage}
        searchFormId={searchFormId}
        mode={mode}
        node={node}
        closeModal
        step=""
        formid={formid}
      />
    );
  }
}

export default connect()(FormFilter);
