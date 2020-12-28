import { takeEvery } from 'redux-saga/effects';
import actions from 'actions/creators';
import Store from 'store';
import { preloadDataTypes } from 'configs/constants';
import shuffle from 'lodash.shuffle';

function onLoadedData(itemIid, preloadData, unLoadingMediaFiles) {
  Store.dispatch(
    actions.savePreloadData(itemIid, {
      ...preloadData,
      unLoadingMediaFiles: unLoadingMediaFiles.slice(1),
      loadedFilesTotal: preloadData.loadedFilesTotal + 1,
    }),
  );
}

function onErrorData(itemIid, preloadData, unLoadingMediaFiles) {
  Store.dispatch(
    actions.savePreloadData(itemIid, {
      ...preloadData,
      unLoadingMediaFiles,
      errorFilesTotal: (preloadData.errorFilesTotal || 0) + 1,
    }),
  );
}

function preloadMediaData(action) {
  const { preloadData, itemIid } = action;

  try {
    const unLoadingMediaFiles = shuffle(preloadData.unLoadingMediaFiles || []);

    if (unLoadingMediaFiles && unLoadingMediaFiles.length) {
      const path = unLoadingMediaFiles[0].path;

      if (unLoadingMediaFiles[0].type === preloadDataTypes.AUDIO) {
        const audio = new Audio(path);
        audio.onloadeddata = () => {
          onLoadedData(itemIid, preloadData, unLoadingMediaFiles);
        };

        audio.onerror = () => {
          onErrorData(itemIid, preloadData, unLoadingMediaFiles);
        };
      } else if (unLoadingMediaFiles[0].type === preloadDataTypes.IMAGE) {
        const image = new Image();

        image.onload = () => {
          onLoadedData(itemIid, preloadData, unLoadingMediaFiles);
        };

        image.onerror = () => {
          onErrorData(itemIid, preloadData, unLoadingMediaFiles);
        };

        image.src = path;
      }
    }
  } catch (ex) {
    console.log('Preload media data failed', ex);
  }
}

export default function* preloadMediaDataSaga() {
  yield takeEvery('PRELOAD_MEDIA_DATA', preloadMediaData);
}
