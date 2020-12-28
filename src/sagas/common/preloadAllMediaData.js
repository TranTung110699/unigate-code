import { takeEvery } from 'redux-saga/effects';
import actions from 'actions/creators';
import Store from 'store';
import { preloadDataTypes } from 'configs/constants';
import shuffle from 'lodash.shuffle';

function onLoadedData(itemIid, preloadData, unLoadingMediaFiles) {
  const newPreloadData = {
    ...preloadData,
    unLoadingMediaFiles: unLoadingMediaFiles.slice(1),
    loadedFilesTotal: preloadData.loadedFilesTotal + 1,
  };

  preloadMediaData(newPreloadData, itemIid);

  Store.dispatch(actions.savePreloadData(itemIid, newPreloadData));
}

const ERROR_UPPER_BOUND = 500;
let errorCount = 0;

function onErrorData(itemIid, preloadData, unLoadingMediaFiles) {
  if (errorCount > ERROR_UPPER_BOUND) {
    return;
  }
  errorCount += 1;

  const newPreloadData = {
    ...preloadData,
    unLoadingMediaFiles,
    errorFilesTotal: (preloadData.errorFilesTotal || 0) + 1,
  };

  preloadMediaData(newPreloadData, itemIid);

  Store.dispatch(actions.savePreloadData(itemIid, newPreloadData));
}

function preloadMediaData(preloadData, itemIid) {
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
  } catch (ex) {}
}

function preloadAllMediaData(action) {
  const { preloadData, itemIid } = action;
  preloadMediaData(preloadData, itemIid);
}

export default function* preloadAllMediaDataSaga() {
  yield takeEvery('PRELOAD_ALL_MEDIA_DATA', preloadAllMediaData);
}
