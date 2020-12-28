export const conditionForPreload = (preloadData, newPreloadData) => {
  return (
    newPreloadData &&
    newPreloadData !== preloadData &&
    (!newPreloadData.loadedFilesTotal ||
      newPreloadData.loadedFilesTotal !== preloadData.loadedFilesTotal) &&
    newPreloadData.loadedFilesTotal < newPreloadData.total &&
    (!newPreloadData.errorFilesTotal ||
      newPreloadData.errorFilesTotal < newPreloadData.total)
  );
};
