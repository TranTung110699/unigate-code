export const onlyDoInDevelopment = (callback) => {
  if (process.env.NODE_ENV === 'development') {
    callback();
  }
};

export const alertInDevelopment = (message) => {
  if (
    process.env.NODE_ENV === 'development' &&
    !window.ignoreDialogIndexAlert
  ) {
    alert(
      `${message} (this message will only appear in development, not in production)`,
    );
  }
};
