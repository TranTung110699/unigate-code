/*
import assetApiUrls from 'components/admin/asset-manager/endpoints';

 */
const urls = {
  asset_search: '/asset/index/search',
  // report_stationery_search: '/asset/api/search-report-stationery',
  // report_equipment_search: '/asset/api/search-report-equipment',
  report_future_projection_search: '/asset/api/search-report-future-projection',
  stationery_asset_search: '/asset/index/search-stationery',
  stationery_search_import_items: '/asset/api/search-stationery-import-items',
  add_stationery_items: '/asset/api/add-stationeries',
  update_stationery_items: '/asset/index/update?type=stationery',
  // change_stationery_quantity: '/asset/api/change-stationery-quantity',
  asset_category_search: '/api/v2/category/search?type=asset',
  stationery_item_delete: '/asset/index/delete-stationery',
  training_plan_stationery_usage_rate:
    '/asset/api/search-stationery-usage-rate?type=training-plan',
  export_stationery_future_projection:
    '/asset/api/export-stationery-future-projection',
  course_stationery_usage_rate:
    '/asset/api/search-stationery-usage-rate?type=course',
};

export default urls;
