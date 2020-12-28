import React from 'react';
import { t1 } from 'translate';
import categoryCourseIcon from '../../../resources/view-grid.png';
import popularCourseIcon from '../../../resources/crown.png';
import blogIcon from '../../../resources/blog.png';
import { getCatalogueUrl } from 'routes/links/common';

export default function(academicCategoriesMenu, page, blogCategoriesMenu = []) {
  let menus = [];
  const popularityCourse = {
    id: 'popularityCourse',
    menuLevel: 'menu-lv1',
    action: 'popularity-course',
    icon: popularCourseIcon,
    href: '#',
    label: t1('popular_courses'),
    children: [
      /* {
        id: 'top-courses',
        action: 'top-courses',
        href: getCatalogueUrl('top-courses'),
        label: t1('top_courses'),
      }, */
      {
        id: 'popular-courses',
        menuLevel: 'menu-lv2',
        action: 'popular-courses',
        href: getCatalogueUrl('popular-courses'),
        label: t1('popular_courses'),
      },
    ],
  };

  if (page === 'catalogue') {
    menus.push(popularityCourse);
  }

  menus = menus.concat({
    id: 'categoriesCourse',
    menuLevel: 'menu-lv1',
    action: 'categories-course',
    href: '#',
    icon: categoryCourseIcon,
    label: t1('categories_course'),
    children: [
      ...((academicCategoriesMenu &&
        academicCategoriesMenu.map((academicCategory) => {
          const categoryIid = academicCategory.iid;
          const categoryName = academicCategory.name;
          return {
            id: `category-courses-${categoryIid}`,
            menuLevel: 'menu-lv2',
            action: 'category-courses',
            href: getCatalogueUrl('category-courses', { page, categoryIid }),
            label: t1(categoryName),
            children:
              academicCategory &&
              academicCategory.children &&
              academicCategory.children.map((child) => {
                const childIid = child.iid;
                const childName = child.name;
                return {
                  id: `category-courses-${categoryIid}`,
                  menuLevel: 'menu-lv3',
                  action: 'sub-category-courses',
                  href: getCatalogueUrl('category-courses', {
                    page,
                    categoryIid: childIid,
                  }),
                  label: t1(childName),
                };
              }),
          };
        })) ||
        []),
    ],
  });

  if (page === 'catalogue') {
    menus = menus.concat({
      id: 'blogCategories',
      menuLevel: 'menu-lv1',
      action: 'blog-categories',
      href: '#',
      icon: blogIcon,
      label: t1('blog_categories'),
      children: [
        ...((blogCategoriesMenu &&
          blogCategoriesMenu.map((blogCategory) => {
            const categoryIid = blogCategory.iid;
            const categoryName = blogCategory.name;
            if (blogCategory.status !== 'approved') return;
            return {
              id: `category-blog-${categoryIid}`,
              menuLevel: 'menu-lv2',
              action: 'category-blog',
              href: getCatalogueUrl('category-blog', { page, categoryIid }),
              label: t1(categoryName),
              // children:
              //   blogCategory &&
              //   blogCategory.children &&
              //   blogCategory.children.map((child) => {
              //     const childIid = child.iid;
              //     const childName = child.name;
              //     if (child.status !== 'approved') return;
              //     return {
              //       id: `category-blog-${categoryIid}`,
              //       menuLevel: 'menu-lv3',
              //       action: 'sub-category-blog',
              //       href: getCatalogueUrl('category-blog', {
              //         page,
              //         categoryIid: childIid,
              //       }),
              //       label: t1(childName),
              //     };
              //   }),
            };
          })) ||
          []),
      ],
    });
  }

  return menus;
}
