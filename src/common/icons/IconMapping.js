/**
 * Created by Peter Hoang Nguyen on 4/7/2017.
 */

class IconMapping {
  FONT_AWESOME = 'font-awesome';
  MATERIAL_ICON = 'material_icon';

  mapping(icon, type) {
    let localType = type;
    if (!localType) {
      localType = this.MATERIAL_ICON;
    }
    switch (icon) {
      case 'home':
        return 'mi mi-home';
      case 'picture':
        return 'mi mi-image';
      case 'user':
        return 'mi mi-person';
      case 'folder':
        return 'mi mi-folder-open';
      case 'audio':
        return 'mi mi-audiotrack';
      case 'file':
        return 'mi mi-insert-drive-file';
      case 'preview':
        return 'mi mi-visibility';
      default:
        return '';
    }
  }
}

const iconMapping = new IconMapping();
export default iconMapping;
