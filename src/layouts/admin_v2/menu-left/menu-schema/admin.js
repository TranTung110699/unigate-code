import { getUrl } from 'routes/links/common';
import { t1, t2, t3 } from 'translate';

/**
 * IMPORTANT Don't change the ids of the submenu
 * Also whenever you add a new menu item here, remember to configure it in School_Model_School::getInstance()->allAdminMenuItemsComplexSettings
 * as well
 *
 * @type {*[]}
 */
const adminMenu = () => {
  return [
    {
      id: 'home',
      url: '/admin',
      title: t2('admin_home'),
      icon: {
        position: 'left',
        type: 'home',
      },
    },

    {
      id: 'academic_materials',
      title: t3('academic_materials'),
      icon: {
        position: 'left',
        type: 'read',
      },
      subMenu: [
        {
          id: 'credit',
          url: getUrl('credit'),
          title: t1('subjects'),
          icon: {
            position: 'left',
            type: 'read',
          },
        },
        {
          id: 'syllabus',
          url: getUrl('syllabus'),
          title: t1('syllabus'),
          icon: {
            position: 'left',
            type: 'read',
          },
        },
        {
          id: 'program',
          url: getUrl('program'),
          title: t1('programs'),
          icon: {
            position: 'left',
            type: 'book',
          },
        },
      ],
    },
    {
      id: 'training',
      title: t3('training'),
      icon: {
        position: 'left',
        type: 'highlight',
      },
      subMenu: [
        {
          id: 'training_plan',
          url: getUrl('training-plan'),
          title: t1('training_plans'),
          icon: {
            position: 'left',
            type: 'schedule',
          },
        },
        {
          id: 'enrolment_plan',
          url: getUrl('enrolment-plan'),
          title: t1('enrolment_plans'),
          icon: {
            position: 'left',
            type: 'schedule',
          },
        },
        // {
        //   id: 'academic-category',
        //   url: getUrl('academic-category'),
        //   title: t1('course_categories'),
        //   icon: {
        //     position: 'left',
        //     type: 'tags',
        //   },
        // },
        // {
        //   id: 'rubric',
        //   url: getUrl('rubric'),
        //   title: t1('rubrics'),
        //   icon: {
        //     position: 'left',
        //     type: 'bars',
        //   },
        // },
        {
          id: 'bank',
          url: getUrl('bank', { type: 'question' }),
          title: t1('bank'),
          icon: {
            position: 'left',
            type: 'bank',
          },
        },
        // {
        //   id: 'media-v1',
        //   url: getUrl('file-manager-v1'),
        //   title: t1('file_manager (legacy)'),
        //   icon: {
        //     position: 'left',
        //     type: 'folder-open',
        //   },
        // },
        // {
        //   id: 'media',
        //   url: getUrl('file-manager'),
        //   title: t1('file_manager'),
        //   icon: {
        //     position: 'left',
        //     type: 'folder-open',
        //   },
        // },
        // {
        //   id: 'survey',
        //   url: getUrl('survey'),
        //   title: t1('survey'),
        //   icon: {
        //     position: 'left',
        //     type: 'pie-chart',
        //   },
        // },
        {
          id: 'semester',
          url: getUrl('semester'),
          title: t1('semesters_&_school_years'),
          icon: {
            position: 'left',
            type: 'calendar',
          },
        },

        {
          id: 'timetable',
          url: getUrl('timetable'),
          title: t1('timetable'),
          icon: {
            position: 'left',
            type: 'table',
          },
        },
        {
          id: 'schedule-overview',
          url: getUrl('schedule-overview'),
          title: t1('schedule_overview'),
          icon: {
            position: 'left',
            type: 'table',
          },
        },
        {
          id: 'course',
          url: getUrl('course'),
          icon: {
            position: 'left',
            type: 'fund',
          },
          title: t1('courses'),
        },

        // {
        //   id: 'assigned_course',
        //   url: getUrl('assigned-course'),
        //   title: t1('assigned_courses'),
        //   icon: {
        //     position: 'left',
        //     type: 'fund',
        //   },
        // },
        {
          id: 'offline-exam',
          url: getUrl('offline-exam'),
          title: t1('offline_exams'),
          icon: {
            position: 'left',
            type: 'project',
          },
        },
        {
          id: 'students_taking_the_offline_exam',
          url: getUrl('students-in-offline-exam'),
          title: t1('students_taking_the_offline_exam'),
          icon: {
            position: 'left',
            type: 'solution',
          },
        },
        // {
        //   id: 'path',
        //   url: getUrl('path'),
        //   title: t1('paths'),
        //   icon: {
        //     position: 'left',
        //     type: 'rise',
        //   },
        // },
        {
          id: 'course_enrolment',
          url: getUrl('invite'),
          title: t1('enrolments'),
          icon: {
            position: 'left',
            type: 'usergroup-add',
          },
        },
        {
          id: 'training-homework',
          url: getUrl('training-homework'),
          title: t1('training_homework'),
          icon: {
            position: 'left',
            type: 'file-text',
          },
        },
        // {
        //   id: 'import_rubrics',
        //   url: getUrl('import-rubrics'),
        //   title: t1('import_rubrics'),
        //   icon: {
        //     position: 'left',
        //     type: 'table',
        //   },
        // },
        {
          id: 'student_feedback',
          url: getUrl('feedback/student'),
          title: t1('student_feedback'),
          icon: {
            position: 'left',
            type: 'exclamation-circle',
          },
        },
        {
          id: 'teacher_feedback',
          url: getUrl('feedback/teacher'),
          title: t1('teacher_feedback'),
          icon: {
            position: 'left',
            type: 'exclamation-circle',
          },
        },
        {
          id: 'time_sheet',
          url: getUrl('time-sheet/specialized-work'),
          title: t1('time_sheet'),
          icon: {
            position: 'left',
            type: 'clock-circle',
          },
        },
        {
          id: 'report',
          url: getUrl('report/dashboard'),
          title: t1('reports'),
          icon: {
            position: 'left',
            type: 'bar-chart',
          },
        },
      ],
    },
    {
      id: 'temis',
      title: t3('temis'),
      icon: {
        position: 'left',
        type: 'file-text',
      },
      subMenu: [
        {
          id: 'temis',
          url: getUrl('temis'),
          title: t1('temis_report'),
          icon: {
            position: 'left',
            type: 'bar-chart',
          },
        },
        {
          id: 'assessment_evidence_template',
          url: getUrl('assessment-evidence-template'),
          title: t1('assessment_evidence_template'),
          icon: {
            position: 'left',
            type: 'file-text',
          },
        },
      ],
    },
    {
      id: 'planning',
      title: t3('academic_planning'),
      icon: {
        position: 'left',
        type: 'deployment-unit',
      },
      subMenu: [
        {
          id: 'ico',
          url: getUrl('ico'),
          title: t1('incoming_classes'),
          icon: {
            position: 'left',
            type: 'contacts',
          },
        },
        {
          id: 'goal',
          url: getUrl('goal'),
          title: t1('goals'),
          icon: {
            position: 'left',
            type: 'trophy',
          },
        },
        {
          id: 'plan',
          url: getUrl('plan'),
          title: t1('teaching_plans'),
          icon: {
            position: 'left',
            type: 'schedule',
          },
        },
        {
          id: 'classgroup',
          url: getUrl('classgroup'),
          title: t1('class_groups'),
          icon: {
            position: 'left',
            type: 'appstore',
          },
        },
      ],
    },
    {
      id: 'department_of_education_and_student_affairs',
      title: t3('department_of_education_and_student_affairs'),
      icon: {
        position: 'left',
        type: 'gateway',
      },
      subMenu: [
        {
          id: 'processing_requests',
          url: '/admin/request',
          title: t1('processing_requests'),
          icon: {
            position: 'left',
            type: 'ordered-list',
          },
        },
        {
          id: 'request_type_manage',
          url: '/admin/req-type',
          title: t1('request_type_manage'),
          icon: {
            position: 'left',
            type: 'ordered-list',
          },
        },
      ],
    },
    {
      id: 'financial',
      url: getUrl('financial'),
      title: t3('financial_management'),
      icon: {
        position: 'left',
        type: 'dollar',
      },
    },
    {
      id: 'exam',
      title: t3('testing'),
      icon: {
        position: 'left',
        type: 'safety',
      },
      subMenu: [
        {
          id: 'contest',
          url: getUrl('contest'),
          title: t1('contests'),
          icon: {
            position: 'left',
            type: 'project',
          },
        },
        {
          id: 'exam-template',
          url: getUrl('exam-template'),
          title: t1('exam_template'),
          icon: {
            position: 'left',
            type: 'file-text',
          },
        },
        {
          id: 'question-bank',
          url: getUrl('question-bank'),
          title: t1('question_bank'),
          icon: {
            position: 'left',
            type: 'bank',
          },
        },
        // {
        //   id: 'template',
        //   url: getUrl('templates'),
        //   title: t1('templates'),
        //   icon: {
        //     position: 'left',
        //     type: 'table',
        //   },
        // },
      ],
    },
    {
      id: 'school',
      title: t3('manager'),
      icon: {
        position: 'left',
        type: 'cluster',
      },
      subMenu: [
        {
          id: 'account',
          url: getUrl('school/accounts'),
          title: t1('accounts'),
          icon: {
            position: 'left',
            type: 'user',
          },
        },
        {
          id: 'user_manage',
          url: getUrl('school/users'),
          title: t1('users'),
          icon: {
            position: 'left',
            type: 'team',
          },
        },
        {
          id: 'teacher',
          url: getUrl('school/teachers'),
          title: t1('trainers'),
          icon: {
            position: 'left',
            type: 'user',
          },
        },
        {
          id: 'parent',
          url: getUrl('school/parents'),
          title: t1('parents'),
          icon: {
            position: 'left',
            type: 'user',
          },
        },
        {
          id: 'group_manage',
          url: getUrl('group'),
          title: t1('groups'),
          icon: {
            position: 'left',
            type: 'usergroup-add',
          },
        },
        {
          id: 'skill',
          url: getUrl('skill'),
          title: t1('skills'),
          icon: {
            position: 'left',
            type: 'bars',
          },
        },
        {
          id: 'organizations',
          url: getUrl('organization'),
          title: t1('organizations_and_departments'),
          icon: {
            position: 'left',
            type: 'cluster',
          },
        },
        {
          id: 'user_majors',
          url: getUrl('user-major'),
          title: t1('user_majors'),
          icon: {
            position: 'left',
            type: 'team',
          },
        },

        {
          id: 'user_group_category',
          url: getUrl('user-group-category'),
          title: t1('user_group_categories'),
          icon: {
            position: 'left',
            type: 'tags',
          },
        },
        {
          id: 'page',
          url: getUrl('page'),
          title: t1('page'),
          icon: {
            position: 'left',
            type: 'file',
          },
        },
        // {
        //   id: 'major',
        //   url: getUrl('major'),
        //   title: t1('majors'),
        //   icon: {
        //     position: 'left',
        //     type: 'radar-chart',
        //   },
        // },
        // {
        //   id: 'job_position',
        //   url: getUrl('job-position'),
        //   title: t1('job_positions'),
        //   icon: {
        //     position: 'left',
        //     type: 'shopping',
        //   },
        // },
        // {
        //   id: 'top-equivalent-position',
        //   url: getUrl('top-equivalent-position'),
        //   title: t1('equivalent_position'),
        //   icon: {
        //     position: 'left',
        //     type: 'shopping',
        //   },
        // },
        // {
        //   id: 'transaction',
        //   url: getUrl('transaction'),
        //   title: t1('transactions'),
        //   icon: {
        //     position: 'left',
        //     type: 'file-sync',
        //   },
        // },
        // {
        //   id: 'conf',
        //   url: getUrl('conf', { menu: 'school', type: 'info' }),
        //   title: t1('configurations'),
        //   icon: {
        //     position: 'left',
        //     type: 'setting',
        //   },
        // },
        // {
        //   id: 'translationAdmin',
        //   url: getUrl('translate'),
        //   title: t1('translation'),
        //   icon: {
        //     position: 'left',
        //     type: 'global',
        //   },
        // },
        {
          id: 'asset',
          url: getUrl('asset/items'),
          title: t1('assets'),
          icon: {
            position: 'left',
            type: 'database',
          },
        },
        // {
        //   id: 'degree',
        //   url: getUrl('degree'),
        //   title: t1('degree'),
        //   icon: {
        //     position: 'left',
        //     type: 'file-protect',
        //   },
        // },
        // {
        //   id: 'venue',
        //   url: getUrl('venue'),
        //   title: t1('venues'),
        //   icon: {
        //     position: 'left',
        //     type: 'switcher',
        //   },
        // },
        // {
        //   id: 'school_in_vietnam',
        //   url: getUrl('search_provinces_or_districts'),
        //   title: t1('schools_in_vietnam'),
        //   icon: {
        //     position: 'left',
        //     type: 'home',
        //   },
        // },
        {
          id: 'budgetary',
          url: getUrl('budgetary-allocations'),
          title: t1('budgetary_allocations'),
          icon: {
            position: 'left',
            type: 'dashboard',
          },
        },
        // {
        //   id: 'message-templates',
        //   url: getUrl('message-templates'),
        //   title: t1('message_templates'),
        //   icon: {
        //     position: 'left',
        //     type: 'table',
        //   },
        // },
        // {
        //   id: 'school-message-templates',
        //   url: getUrl('school-message-templates'),
        //   title: t1('organize_message_templates'),
        //   icon: {
        //     position: 'left',
        //     type: 'setting',
        //   },
        // },
        // {
        //   id: 'school-bus',
        //   url: getUrl('bus'),
        //   title: t1('bus'),
        //   icon: {
        //     position: 'left',
        //     type: 'setting',
        //   },
        // },
      ],
    },
    {
      id: 'graduation',
      title: t3('graduation'),
      icon: {
        position: 'left',
        type: 'file-done',
      },
      subMenu: [
        {
          id: 'admission',
          url: getUrl('admission'),
          title: t1('admission_group'),
          icon: {
            position: 'left',
            type: 'safety-certificate',
          },
        },
        {
          id: 'student-recognition',
          url: getUrl('student-recognition'),
          title: t1('student_recognition'),
          icon: {
            position: 'left',
            type: 'safety-certificate',
          },
        },
        {
          id: 'finishing-senior',
          url: getUrl('finishing-senior'),
          title: t1('finishing_senior'),
          icon: {
            position: 'left',
            type: 'safety-certificate',
          },
        },
        {
          id: 'graduating-senior',
          url: getUrl('graduating-senior'),
          title: t1('graduating_senior'),
          icon: {
            position: 'left',
            type: 'star',
          },
        },
        {
          id: 'expulsion-group',
          url: getUrl('expulsion-group'),
          title: t1('expulsion_group'),
          icon: {
            position: 'left',
            type: 'safety-certificate',
          },
        },
      ],
    },
    {
      id: 'blogs',
      title: t3('blogs_&_events'),
      icon: {
        position: 'left',
        type: 'global',
      },
      subMenu: [
        {
          id: 'event',
          url: getUrl('event'),
          title: t1('event'),
          icon: {
            position: 'left',
            type: 'schedule',
          },
        },
        // {
        //   id: 'blog_categories',
        //   url: getUrl('blog'),
        //   title: t1('blog_categories'),
        //   icon: {
        //     position: 'left',
        //     type: 'tags',
        //   },
        // },
      ],
    },
    {
      id: 'other',
      title: t3('other'),
      icon: {
        position: 'left',
        type: 'gold',
      },
      subMenu: [
        {
          id: 'it-support',
          url: getUrl('it-support'),
          title: t1('it_support'),
          icon: {
            position: 'left',
            type: 'customer-service',
          },
        },
      ],
    },
    {
      id: 'sale',
      title: t1('sale'),
      icon: {
        position: 'left',
        type: 'shop',
      },
      subMenu: [
        {
          id: 'sales_package',
          url: getUrl('sales-package'),
          title: t1('package'),
          icon: {
            position: 'left',
            type: 'inbox',
          },
        },
        {
          id: 'sales_order',
          url: getUrl('sales-order'),
          title: t1('order'),
          icon: {
            position: 'left',
            type: 'shopping-cart',
          },
        },
        {
          id: 'card',
          url: getUrl('card/card-package'),
          title: t1('card'),
          icon: {
            position: 'left',
            type: 'credit-card',
          },
        },
      ],
    },
  ];
};

export default adminMenu;
