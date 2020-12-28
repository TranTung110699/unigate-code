import React from 'react';
import List from 'react-virtualized/dist/es/List';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import lodashGet from 'lodash.get';

import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/pdf.worker.entry';
import { Scrollbars } from 'react-custom-scrollbars';
import Loading from '../loading';

class PdfViewer {
  constructor({ goToPage }) {
    this.goToPage = goToPage;
  }
}

const ContinuousScrollingPdf = ({
  file,
  width,
  height,
  onDocumentLoadSuccess,
  onGoToPage,
  pdfViewerRef,
  rotate,
  loading,
}) => {
  rotate = rotate || 0;

  const scrollBarRef = React.useRef();
  const virtualizedListRef = React.useRef();

  const [numPages, setNumPages] = React.useState();

  /**
   * these variables present pdf document's pages width and height
   * we assume that all pages in document have the same width and height to make the problem easier
   * if this assumption is broken, please refactor this
   */
  const [pdfPageWidth, setPdfPageWidth] = React.useState();
  const [pdfPageHeight, setPdfPageHeight] = React.useState();

  const setPdfPageSize = ({ width, height }) => {
    setPdfPageWidth(width);
    setPdfPageHeight(height);
  };

  const handleLoadDocumentSuccess = React.useCallback(
    (pdfDoc) => {
      pdfDoc.getPage(1).then((firstPdfPage) => {
        const viewport = firstPdfPage.getViewport({ scale: 1 });
        const width = viewport.width;
        const height = viewport.height;
        setPdfPageSize({ width, height });
      });

      setNumPages(pdfDoc.numPages);

      if (onDocumentLoadSuccess) {
        onDocumentLoadSuccess(pdfDoc);
      }
    },
    [onDocumentLoadSuccess],
  );

  const virtualizedListRowRenderer = React.useCallback(
    ({ index, key, style }) => {
      const page = index + 1;
      return (
        <div key={key} style={style}>
          <Page width={width} pageNumber={page} />
        </div>
      );
    },
    [width],
  );

  const scrollBarStyle = React.useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );

  const virtualizedListStyle = React.useMemo(
    () => ({ overflowX: false, overflowY: false }),
    [],
  );

  const rowHeight =
    (rotate % 180 === 0
      ? Math.ceil((width * pdfPageHeight) / pdfPageWidth)
      : Math.ceil((width * pdfPageWidth) / pdfPageHeight)) + 200; // add a little bit of space

  const handleScroll = React.useCallback(
    (event) => {
      const { scrollTop, scrollLeft } = event.target;

      const virtualizedList = virtualizedListRef.current;
      const grid = lodashGet(virtualizedList, 'Grid');
      if (grid) {
        grid.handleScrollEvent({ scrollTop, scrollLeft });
      }

      const page = Math.floor(scrollTop / rowHeight) + 1;
      if (page && typeof onGoToPage === 'function') {
        onGoToPage(page);
      }
    },
    [onGoToPage, rowHeight],
  );

  const scrollToPage = React.useCallback(
    (page) => {
      if (!page) {
        return;
      }

      const distance = (page - 1) * rowHeight;
      const scrollBar = scrollBarRef.current;
      if (scrollBar) {
        scrollBar.scrollTop(distance);
      }
    },
    [rowHeight],
  );

  React.useEffect(
    () => {
      const pdfViewer = new PdfViewer({ goToPage: scrollToPage });
      pdfViewerRef(pdfViewer);
    },
    [pdfViewerRef, scrollToPage],
  );

  return (
    <Document
      file={file}
      onLoadSuccess={handleLoadDocumentSuccess}
      rotate={rotate}
      loading={
        <div style={{ position: 'absolute', width: '100%' }}>
          {loading || <Loading blackLoadingIcon />}
        </div>
      }
    >
      {pdfPageWidth && pdfPageHeight && (
        <Scrollbars
          style={scrollBarStyle}
          ref={scrollBarRef}
          onScroll={handleScroll}
        >
          <List
            style={virtualizedListStyle}
            ref={virtualizedListRef}
            rowHeight={rowHeight}
            width={width}
            height={height}
            rowCount={numPages}
            overscanRowCount={1}
            rowRenderer={virtualizedListRowRenderer}
          />
        </Scrollbars>
      )}
    </Document>
  );
};

const ResponsivePDF = ({
  file,
  onDocumentLoadSuccess,
  onGoToPage,
  pdfViewerRef,
  rotate,
  loading,
}) => {
  return (
    <AutoSizer>
      {({ width, height }) => (
        // TODO: in the future, add more cases for other modes of viewing (page by page, ...)
        <ContinuousScrollingPdf
          width={width}
          height={height - 1} //Một số file pdf làm mất border
          file={file}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          onGoToPage={onGoToPage}
          pdfViewerRef={pdfViewerRef}
          rotate={rotate}
          loading={loading}
        />
      )}
    </AutoSizer>
  );
};

export default ResponsivePDF;
