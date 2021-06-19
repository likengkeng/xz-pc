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


const OrganizeWorkIndex = () => import(/* webpackChunkName:"OrganizeWorkIndex" */ '@/pc/views/content/organizeWork/Index.vue');
const OrganizeWork = () => import(/* webpackChunkName:"OrganizeWork" */ '@/pc/views/content/organizeWork/OrganizeWork.vue');
const OrganizeWorkEdit = () => import(/* webpackChunkName:"OrganizeWorkEdit" */ '@/pc/views/content/organizeWork/Edit.vue');


const Preface = () => import(/* webpackChunkName:"Preface" */ '@/pc/views/content/preface/Index.vue');
const Video = () => import(/* webpackChunkName:"Video " */ '@/pc/views/content/preface/Video.vue');
const PrefaceContent = () => import(/* webpackChunkName:"PrefaceContent " */ '@/pc/views/content/preface/Content.vue');
const PrefaceEdit = () => import(/* webpackChunkName:"PrefaceEdit" */ '@/pc/views/content/preface/Edit.vue');


const RoleModel = () => import(/* webpackChunkName:"RoleModel" */ '@/pc/views/content/roleModel/RoleModel.vue');
const RoleModelIndex = () => import(/* webpackChunkName:"RoleModelIndex" */ '@/pc/views/content/roleModel/Index.vue');
const RoleModelEdit = () => import(/* webpackChunkName:"RoleModelEdit" */ '@/pc/views/content/roleModel/Edit.vue');

const SevenGroupIndex = () => import(/* webpackChunkName:"SevenGroupIndex" */ '@/pc/views/content/sevenGroup/Index.vue');
const SevenGroupEdit = () => import(/* webpackChunkName:"SevenGroupEdit" */ '@/pc/views/content/sevenGroup/Edit.vue');
const SevenGroupList = () => import(/* webpackChunkName:"SevenGroupList" */ '@/pc/views/content/sevenGroup/List.vue');


const Comment = () => import(/* webpackChunkName:"Comment" */ '@/pc/views/Comment.vue');

const Account  = () => import(/* webpackChunkName:"Account " */ '@/pc/views/Account.vue');

const Material = () => import(/* webpackChunkName:"Material " */ '@/pc/views/Material.vue');




const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'home',
      redirect: '/account',

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
                  meta: {name: '视频/图片', isShowChildren: true},
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
              path: '/organizeWorkIndex',
              name: 'organizeWorkIndex',
              redirect: '/OrganizeWork',
              meta: {name: '组织工作', isShowChildren: false},
              component: OrganizeWorkIndex,
              children: [
                {
                  path: '/organize-work-edit',
                  name: 'OrganizeWorkEdit',
                  meta: {name: '编辑/新增', isShowChildren: false},
                  component: OrganizeWorkEdit,
                },
                {
                  path: '/OrganizeWork',
                  name: 'OrganizeWork',
                  meta: {name: '组织工作', isShowChildren: true},
                  component: OrganizeWork
                }
              ]
            },
            {
              path: '/roleModel-index',
              name: 'roleModelIndex',
              redirect: '/roleModel',
              meta: {name: '榜样力量', isShowChildren: false},
              component: RoleModelIndex,
              children: [
                {
                  path: '/roleModel-edit',
                  name: 'roleModelEdit',
                  meta: {name: '编辑/新增', isShowChildren: false},
                  component: RoleModelEdit,
                },
                {
                  path: '/roleModel',
                  name: 'roleModel',
                  meta: {name: '榜样力量', isShowChildren: true},
                  component: RoleModel
                }
              ]
            },{
              path: '/seven-group-index',
              name: 'sevenGroupIndex',
              redirect: '/ls',
              meta: {name: '七地组声', isShowChildren: true},
              component: SevenGroupIndex,
              children: [
                {
                  path: '/seven-group-edit',
                  name: 'SevenGroupEdit',
                  meta: {name: '编辑', isShowChildren: false},
                  component: SevenGroupEdit,
                },
                {
                  path: '/ls',
                  name: 'ls',
                  meta: {name: '拉萨', isShowChildren: true, type: 1},
                  component: SevenGroupList,
                },
                {
                  path: '/rkz',
                  name: 'rkz',
                  meta: {name: '日喀则', isShowChildren: true, type: 2},
                  component: SevenGroupList,
                },
                {
                  path: '/sn',
                  name: 'sn',
                  meta: {name: '山南', isShowChildren: true, type: 3},
                  component: SevenGroupList,
                },
                {
                  path: '/lz',
                  name: 'lz',
                  meta: {name: '林芝', isShowChildren: true, type: 4},
                  component: SevenGroupList,
                },
                {
                  path: '/cd',
                  name: 'cd',
                  meta: {name: '昌都', isShowChildren: true, type: 5},
                  component: SevenGroupList,
                },
                {
                  path: '/nq',
                  name: 'nq',
                  meta: {name: '那曲', isShowChildren: true, type: 6},
                  component: SevenGroupList,
                },
                {
                  path: '/al',
                  name: 'al',
                  meta: {name: '阿里', isShowChildren: true, type: 7},
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
    { path: '/', redirect: { name: 'home' }, meta: {} },
    {
      path: '/login',
      name: 'login',
      meta: {requireAuth: true},
      component: Login,
    },
    
  ],
});
router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token")) { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    if (sessionStorage.getItem("token")) {
      next('/home');
    } else {
      next();
    }
  }
})
  
export default router