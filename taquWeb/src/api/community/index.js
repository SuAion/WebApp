import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取首页轮播
 * GET
 * params: {
 * }
 */
export const FunCircleList = (params) => {
  return requestGet(`home/FunCircleList`,params);
}


/**
 * 获取关注的人列表
 * GET
 * params: {
 * }
 */
export const FunPersonList = (params) => {
    return requestGet(`home/FunPersonList`,params);
  }
  


  /**
 * 获取推荐和关注
 * GET
 * params: {
 * }
 */
export const CirclePush = (params) => {
    return requestGet(`home/CirclePush`,params);
  }
  

 /**
 * 获取首页无线滚动
 * GET
 * params: {
 * }
 */
export const CircleCare = (params) => {
  return requestGet(`home/CircleCare`,params);
}

/**
 * 获取关注某人
 * GET
 * params: {
 * }
 */
export const PersonCollection = (params) => {
  return requestGet(`home/PersonCollection`,params);
}



/**
* 获取取消关注某人
* GET
* params: {
* }
*/
export const PersonCollectionDel = (params) => {
return requestGet(`home/PersonCollectionDel`,params);
}

