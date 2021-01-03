'use strict';

const getYear = () => new Date().getFullYear()

module.exports = {
  year: getYear(), // 生成编译时的年份
  url: 'https://suyi.xyz',
  pathPrefix: '/',
  title: 'Suyi的小站',
  subtitle: '记录自己的成长历程',
  copyright: [
    `2017 - ${getYear()}`,
    '© 版权所有.'
  ].join(' '),
  disqusShortname: 'suyi-site',
  postsPerPage: 5,
  googleAnalyticsId: 'UA-98612723-2',
  useKatex: false,
  menu: [
    {
      label: '所有',
      path: '/'
    },
    {
      label: '关于',
      path: '/pages/about'
    },
    {
      label: '分类',
      path: '/categories'
    },
    {
      label: '标签',
      path: '/tags'
    }
  ],
  author: {
    name: 'Suyi',
    photo: '/photo.jpg',
    bio: '路漫漫其修远兮。',
    contacts: {
      email: 'suyi_2012@outlook.com',
      facebook: '',
      telegram: '',
      twitter: '',
      github: 'suyi91',
      rss: '',
      vkontakte: '',
      linkedin: '',
      instagram: '',
      line: '',
      gitlab: '',
      weibo: '',
      codepen: '',
      youtube: '',
      soundcloud: '',
    }
  }
};
