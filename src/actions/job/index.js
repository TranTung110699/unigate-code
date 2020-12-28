export const jobsActions = {
  cronJobsToReport: (url, params, name = '') => {
    return {
      type: 'CRON_JOBS_TO_REPORT',
      url,
      params,
      name,
    };
  },
};
