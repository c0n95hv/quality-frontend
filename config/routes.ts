export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'asset',
    icon: 'ProjectOutlined',
    path: '/asset',
    routes: [
      {
        path: '/asset/ssd',
        name: 'ssd',
        component: './asset/ssd',
      },
      {
        path: '/asset/server',
        name: 'server',
        component: './asset/server',
      },
      {
        path: '/asset/desktop',
        name: 'desktop',
        component: './asset/desktop',
      },
    ],
  },
  {
    name: 'test',
    icon: 'FormOutlined',
    path: '/test',
    routes: [
      {
        path: '/test/project',
        name: 'project',
        component: './test/project',
      },
      {
        path: '/test/case',
        name: 'case',
        component: './test/case',
      },
      {
        path: '/test/report',
        name: 'report',
        component: './test/report',
      },
      {
        path: '/test/tool',
        name: 'tool',
        component: './test/tool',
      },
    ],
  },
  {
    name: 'automation',
    icon: 'RobotOutlined',
    path: '/automation',
    routes: [
      {
        path: '/automation/task',
        name: 'task',
        component: './automation/task',
      },
    ],
  },
  {
    path: '/setup',
    name: 'setup',
    icon: 'SettingOutlined',
    access: 'canAdmin',
    routes: [
      {
        path: '/setup/user',
        name: 'user',
        icon: 'smile',
        component: './setup/user',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/asset/ssd',
  },
  {
    component: './404',
  },
];
