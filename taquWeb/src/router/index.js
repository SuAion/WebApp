import Vue from 'vue'
import Router from 'vue-router'

const MainComponent = () => import('@/components/main/index');
//登陆注册
const UserLogin = () => import('@/components/user/login');
const UserLeader = () => import('@/components/user/leader');
const UserRegis = () => import('@/components/user/regis');

//主页板块
const IndexMain = () => import('@/components/homepage/index');
const ImageList = () => import('@/components/homepage/imageList');
const ImagePriew = () => import('@/components/homepage/imagePriew');

//社区板块
const CommunityMain = () => import('@/components/community/index');
const GroupMain = () => import('@/components/community/group');
const GroupListMain = () => import('@/components/community/groupList');
const pulishPost = () => import('@/components/community/pulishPost');


//交友板块
const FirendsMain = () => import('@/components/firends/index');
const chatListMain = () => import('@/components/firends/chatList');



//我的板块
const MineMain = () => import('@/components/mine/index');
const help = () => import('@/components/mine/help');
const MineFollow = () => import('@/components/mine/follow');
const MyselfSpeak = () => import('@/components/mine/myselfSpeak');



//设置按钮
const SetUpIndex = () => import('@/components/setUpBtn/index');
//编辑资料
const EditingMaterials = () => import('@/components/setUpBtn/editingMaterials');


//别人主页
const MineOthers = () => import('@/components/othersHomepage/others');
const OthersAlbum = () => import('@/components/othersHomepage/othersAlbum');

//钱包(金币)
const WalletIndex = () => import('@/components/wallet/index');
const WalletEntry = () => import('@/components/wallet/walletEntry');
const WalletPay = () => import('@/components/wallet/payPage');
const SuccessPay = () => import('@/components/wallet/successPay');
const HistoricalRecord = () => import('@/components/wallet/historicalRecord');

//订单
const OrderPage = () => import('@/components/orderPage/list');

//发送动态
const DevelopmentTrend = () => import('@/components/developmentTrend/index');
const DynamicAlbum = () => import('@/components/developmentTrend/album');
const DynamicAlbumList = () => import('@/components/developmentTrend/albumList');
const circleDetails= () => import('@/components/developmentTrend/circleDetails');

//评论详情
const DynamicDetails = () => import('@/components/developmentTrend/dynamicDetails');


//聊天室
const ManyPeople = () => import('@/components/chatRoom/manyPeople');
const ChatList = () => import('@/components/chatRoom/chatList');
const Chating = () => import('@/components/chatRoom/chating');
const ChatHistory = () => import('@/components/chatRoom/chatHistory');
const FriendChat = () => import('@/components/chatRoom/friendChat');


Vue.use(Router)

export default new Router({
  routes: [
    //    //登陆注册
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      path: '/welcome',
      component: UserLeader
    },
    {
      path: '/login',
      component: UserLogin
    },
    ,
    {
      path: '/regis',
      component: UserRegis
    },
    {
      path: '/welcome',
      component: UserLeader
    },
    {
      path: '/main',
      component: MainComponent,
      children: [
        {
          path: '/',
          name: '首页',
          component: IndexMain,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'index',
          name: '首页',
          component: IndexMain,
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'community',
          name: '社区',
          component: CommunityMain,
          meta: {
            requireAuth: true
          }
        }, {
          path: 'firends',
          name: '交友',
          component: FirendsMain,
          meta: {
            requireAuth: true
          }
        }, {
          path: 'mine',
          name: '我的',
          component: MineMain,
          meta: {
            requireAuth: true
          }
        },
      ],
    },
    //圈子详情
    {
      path: '/group',
      name: '圈子',
      component: GroupMain,
      meta: {
        requireAuth: true
      }
    },
    //生活圈子
    {
      path: '/grouplist',
      name: '圈子',
      component: GroupListMain,
      meta: {
        requireAuth: true
      }
    },
    //交友列表
    {
      path: '/chatList',
      name: '交友列表',
      component: chatListMain,
      meta: {
        requireAuth: true
      }
    },

    //图片预览系列
    {
      path: '/imgList',
      name: '精选系列',
      component: ImageList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/imgPriew',
      name: '图片预览',
      component: ImagePriew,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/help',
      name: '信息发布',
      component: help,
      meta: {
        requireAuth: true
      }
    },
    
    //个人关注
    {
      path: '/mineFollow',
      component: MineFollow,
      meta: {
        requireAuth: true
      }
    },
    //个人发言
    {
      path: '/myselfSpeak',
      component: MyselfSpeak,
      meta: {
        requireAuth: true
      }
    },
    //别人主页
    {
      path: '/others',
      component: MineOthers,
      name: '别人主页',
      meta: {
        requireAuth: true
      }
    },
    //别人相册
    {
      path: '/othersAlbum',
      component: OthersAlbum,
      name: '别人相册',
      meta: {
        requireAuth: true
      }
    },
    //设置页
    {
      path: '/setup',
      component: SetUpIndex,
      name: '设置',
      meta: {
        requireAuth: true
      }
    },
    //编辑资料
    {
      path: '/edit',
      component: EditingMaterials,
      name: '编辑资料',
      meta: {
        requireAuth: true
      }
    },
    //钱包主页
    {
      path: '/walletIndex',
      component: WalletIndex,
      name: '钱包主页',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/walletEntry',
      component: WalletEntry,
      name: '输入金额',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/walletPay',
      component: WalletPay,
      name: '付钱',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/successPay',
      component:  SuccessPay,
      name: '付钱成功',
      meta: {
        requireAuth: true
      }
    },
    //发布帖子在某个房间
    {
      path: '/pulishPost',
      component:  pulishPost,
      name: '发布帖子',
      meta: {
        requireAuth: true
      }
    },
    //查看帖子详情
    {
      path: '/circleDetails',
      component:  circleDetails,
      name: '查看帖子详情',
      meta: {
        requireAuth: true
      }
    },
    
    //金额历史记录
    {
      path: '/historicalRecord',
      component: HistoricalRecord,
      name: '历史记录',
      meta: {
        requireAuth: true
      }
    },
    //订单首页
    {
      path: '/orderPage',
      component: OrderPage,
      name: '订单首页',
      meta: {
        requireAuth: true
      }
    },
    //发送动态
    {
      path: '/dynamicIndex',
      component: DevelopmentTrend,
      name: '发送动态',
      meta: {
        requireAuth: true
      }
    },
    //上传相册or图片
    {
      path: '/dynamicAlbum',
      component: DynamicAlbum,
      name: '上传相册',
      meta: {
        requireAuth: true
      }
    },
    //相册列表
    {
      path: '/dynamicAlbumList',
      component: DynamicAlbumList,
      name: '相册列表',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/dynamicDetails',
      component: DynamicDetails,
      name: '帖子详情',
      meta: {
        requireAuth: true
      }
    },
    //多人聊天室
    {
      path: '/manyPeople',
      component: ManyPeople,
      name: '多人聊天',
      meta: {
        requireAuth: true
      }
    },
    //聊天人列表
    {
      path: '/chatRoomList',
      component:ChatList,
      name: '多人聊天',
      meta: {
        requireAuth: true
      }
    },
    //与XXX聊天(数据库)
    
    {
      path: '/chating',
      component:Chating,
      name: '私人聊天',
      meta: {
        requireAuth: true
      }
    },
     //XXX聊天面板(数据库)
     {
      path: '/chatHistory',
      component:ChatHistory,
      name: '聊天面板',
      meta: {
        requireAuth: true
      },
    },
    //XXX聊天面板(数据库)
    {
      path: '/friendChat',
      component:FriendChat,
      name: '聊天面板',
      meta: {
        requireAuth: true
      },
    },
    
  ]
})
