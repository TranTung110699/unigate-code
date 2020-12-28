// import budgetApiUrls from 'components/admin/budgetary-allocations/endpoints';
const urls = {
  get_data_criteria_budgetary:
    '/budgetary-allocations/api/get-data-criteria-budgetary',
  import_budgetary: '/import/index/import-budget',
  export_budgetary: '/budgetary-allocations/data/export',
  cron_job_to_log_expense_to_report_budgetary_master_by_equivalent_positions:
    '/budgetary-allocations/api/log-expense-to-report-budgetary-equivalent-positions',
  // budgetary_report_search:
  //   '/budgetary-allocations/api/search-budgetary-by-syllabus',
  api_budgetary_search: 'budgetary-allocations/api/custom-search',
  api_budgetary_search_mode_equivalent:
    'budgetary-allocations/api/search-equivalent-positions',
  download_budget_template: 'import/data/get-template-form-import-budget',
};

export default urls;
