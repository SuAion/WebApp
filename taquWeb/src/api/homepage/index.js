import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取首页轮播
 * GET
 * params: {
 * }
 */
export const HomeAutoImg = () => {
  return requestGet(`wap/HomeAutoImg`);
}


/**
 * 获取首页圈子
 * GET
 * params: {
 * }
 */
export const HomeCircleList = () => {
    return requestGet(`wap/HomeCircleList`);
  }
  


  /**
 * 获取首页专栏列表
 * GET
 * params: {
 * }
 */
export const HomeMajorList = () => {
    return requestGet(`wap/HomeMajorList`);
  }
  

 /**
 * 获取首页无线滚动
 * GET
 * params: {
 * }
 */
export const ChoiceList = () => {
  return requestGet(`wap/ChoiceList`);
}

/**
 * 获取发送聊天消息
 * GET
 * params: {
 * }
 */
export const GetMessage = (params) => {
  return requestGet(`user/GetMessage`,params);
}



