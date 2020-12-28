import React, { Component } from 'react';
import 'react-pdf/dist/pdf.worker.entry';
import PDF from 'components/learn/items/lecture/pdf/index';

class PdfViewer extends Component {
  render() {
    return (
      <React.Fragment>
        <PDF link={this.props.link} isNotLearn className="m-b-50" />
      </React.Fragment>
    );
  }
}

export default PdfViewer;
