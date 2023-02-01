
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [

      { path: '', component: () => import('pages/Intro/Intro.vue') },
      
    ]
  },

  //메인
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path : '/home', name : 'name', component: () => import('pages/main/Index.vue')}
    ]
  },

  //설정
  {
    path : '/setting',
    component: () => import('layouts/SettingLayout.vue'),
    children: [
      //설정
      {path: '/setting', name:'setting', component: () => import('pages/Settings/Setting.vue')},
      //내정보
      {path : '/myinfo', name: 'myinfo', component: () => import('pages/Settings/MyInfo.vue')},
      //알림
      {path: '/notification', name:'notification' , component : () => import('pages/Settings/Notification.vue')},
      //고객센터
      {path : '/service', name: 'service', component: () => import('pages/Settings/Service.vue')},
      //약관
      {path: '/terms', name:'terms', component:() => import('pages/Settings/Terms.vue')},
      //문의
      {path: '/question', name:'question', component:() => import('pages/Settings/Question.vue')},
      //FAQ
      {path: '/faq', name:'faq', component:() => import('pages/Settings/FAQ.vue')},
      //공지사항
      {path: '/notice', name:'notice', component:() => import('pages/Settings/Notice.vue')}
    ]
  },

  //메뉴
  {
    path: '/menu',
    component: () => import('layouts/MenuLayout.vue'),
    children: [
      //tv
      {path: '/tv', name: 'tv', component: () => import('pages/Menu/Tv.vue')},
      //파일
      {path: '/file', name:'file', component: () => import('pages/Menu/File.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
