// 路由懒加载
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const Home = () => import(/* webpackChunkName:"Home" */ '@/pc/views/Home.vue');

const Login = () => import(/* webpackChunkName:"Login" */ '@/pc/views/Login.vue');

const Content = () => import(/* webpackChunkName:"Index" */ '@/pc/views/content/Index.vue');

const BigEventIndex = () => import(/* webpackChunkName:"BigEventIndex" */ '@/pc/views/content/bigEvent/Index.vue');
const BigEvent = () => import(/* webpackChunkName:"BigEvent" */ '@/pc/views/content/bigEvent/BigEvent.vue');
const BigEventEdit = () => import(/* webpackChunkName:"BigEventEdit" */ '@/pc/views/content/bigEvent/Edit.vue');

const LeaderCareIndex = () => import(/* webpackChunkName:"LeaderCareIndex" */ '@/pc/views/content/leaderCare/Index.vue');
const LeaderCare = () => import(/* webpackChunkName:"LeaderCare" */ '@/pc/views/content/leaderCare/LeaderCare.vue');
const LeaderCareEdit = () => import(/* webpackChunkName:"LeaderCareEdit" */ '@/pc/views/content/leaderCare/Edit.vue');
const AddMinister = () => import(/* webpackChunkName:"AddMinister" */ '@/pc/views/content/leaderCare/AddMinister.vue');


const OrganizeWork = () => import(/* webpackChunkName:"OrganizeWork" */ '@/pc/views/content/organizeWork/OrganizeWork.vue');

const Preface = () => import(/* webpackChunkName:"Preface" */ '@/pc/views/content/preface/Index.vue');
const Video = () => import(/* webpackChunkName:"Video " */ '@/pc/views/content/preface/Video.vue');
const PrefaceContent = () => import(/* webpackChunkName:"PrefaceContent " */ '@/pc/views/content/preface/Content.vue');
const PrefaceEdit = () => import(/* webpackChunkName:"PrefaceEdit" */ '@/pc/views/content/preface/Edit.vue');


const RoleModel = () => import(/* webpackChunkName:"RoleModel" */ '@/pc/views/content/roleModel/RoleModel.vue');

const SevenGroupIndex = () => import(/* webpackChunkName:"SevenGroupIndex" */ '@/pc/views/content/sevenGroup/Index.vue');
const SevenGroupEdit = () => import(/* webpackChunkName:"SevenGroupEdit" */ '@/pc/views/content/sevenGroup/Edit.vue');
const SevenGroupList = () => import(/* webpackChunkName:"SevenGroupList" */ '@/pc/views/content/sevenGroup/List.vue');


const Comment = () => import(/* webpackChunkName:"Comment" */ '@/pc/views/Comment.vue');

const Account  = () => import(/* webpackChunkName:"Account " */ '@/pc/views/Account.vue');

const Material = () => import(/* webpackChunkName:"Material " */ '@/pc/views/Material.vue');

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/content',
          name: 'content',
          component: Content,
          meta: { name: '内容管理', isShowChildren: true },
          children: [
            {
              path: '/preface',
              name: 'preface',
              meta: {name: '序言', isShowChildren: true},
              component: Preface,
              children: [
                {
                  path: '/video',
                  name: 'video',
                  meta: {name: '视频', isShowChildren: true},
                  component: Video,
                },
                {
                  path: '/prefaceContent',
                  name: 'prefaceContent',
                  meta: {name: '序言内容', isShowChildren: true},
                  component: PrefaceContent,
                },
                {
                  path: '/preface-edit',
                  name: 'prefaceEdit',
                  meta: {name: '编辑/新增', isShowChildren: false},
                  component: PrefaceEdit,
                },
              ]
            },
            {
              path: '/LeaderCareIndex',
              name: 'LeaderCareIndex',
              redirect: '/leaderCare',
              meta: {name: '领导关怀', isShowChildren: false},
              component: LeaderCareIndex,
              children: [
                {
                  path: '/leaderCare-edit',
                  name: 'leaderCareEdit',
                  meta: {name: '编辑/新增', isShowChildren: true},
                  component: LeaderCareEdit,
                },
                {
                  path: '/leaderCare',
                  name: 'leaderCare',
                  meta: {name: '领导关怀', isShowChildren: true},
                  component: LeaderCare
                },
                {
                  path: '/AddMinister',
                  name: 'AddMinister',
                  meta: {name: '新增组织部长', isShowChildren: true},
                  component: AddMinister
                }
              ]
            },
            {
              path: '/bigEventIndex',
              name: 'bigEventIndex',
              redirect: '/bigEvent',
              meta: {name: '大事记', isShowChildren: false},
              component: BigEventIndex,
              children: [
                {
                  path: '/bigEvent-edit',
                  name: 'bigEventEdit',
                  meta: {name: '编辑/新增', isShowChildren: true},
                  component: BigEventEdit,
                },
                {
                  path: '/bigEvent',
                  name: 'bigEvent',
                  meta: {name: '大事记', isShowChildren: true},
                  component: BigEvent
                }
              ]
            },
            {
              path: '/organizeWork',
              name: 'organizeWork',
              meta: {name: '组织工作', isShowChildren: true},
              component: OrganizeWork,
            },
            {
              path: '/roleModel',
              name: 'roleModel',
              meta: {name: '榜样力量', isShowChildren: true},
              component: RoleModel,
            },{
              path: '/seven-group-index',
              name: 'sevenGroupIndex',
              redirect: '/seven-group-list',
              meta: {name: '七地组声', isShowChildren: true},
              component: SevenGroupIndex,
              children: [
                {
                  path: '/seven-group-edit',
                  name: 'SevenGroupEdit',
                  meta: {name: '编辑', isShowChildren: false},
                  component: SevenGroupList,
                },
                {
                  path: '/seven-group-list',
                  name: 'SevenGroupList',
                  meta: {name: '拉萨', isShowChildren: true},
                  component: SevenGroupList,
                },
                {
                  path: '/ls',
                  name: 'ls',
                  meta: {name: '拉萨', isShowChildren: true},
                  component: SevenGroupList,
                },
                {
                  path: '/rkz',
                  name: 'rkz',
                  meta: {name: '日喀则', isShowChildren: true},
                  component: SevenGroupList,
                },
                {
                  path: '/sn',
                  name: 'sn',
                  meta: {name: '山南', isShowChildren: true},
                  component: SevenGroupList,
                },
                {
                  path: '/lz',
                  name: 'lz',
                  meta: {name: '林芝', isShowChildren: true},
                  component: SevenGroupList,
                },
                {
                  path: '/cd',
                  name: 'cd',
                  meta: {name: '昌都', isShowChildren: true},
                  component: SevenGroupList,
                },
                {
                  path: '/nq',
                  name: 'nq',
                  meta: {name: '那曲', isShowChildren: true},
                  component: SevenGroupList,
                },
                {
                  path: '/al',
                  name: 'al',
                  meta: {name: '阿里', isShowChildren: true},
                  component: SevenGroupList,
                },
              ]
            }
          ]
        },
        {
          path: '/Comment',
          name: 'Comment',
          component: Comment,
          meta: { name: '评论审核', isShowChildren: true },
        },
        {
          path: '/account',
          name: 'account',
          component: Account,
          meta: { name: '账号管理', isShowChildren: true },
        },
        {
          path: '/material',
          name: 'material',
          component: Material,
          meta: { name: '素材管理', isShowChildren: true },
        },
      ]
    },
    { path: '/', redirect: { name: 'home' } },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    
  ],
});
