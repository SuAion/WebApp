import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取个人信息
 * GET
 * params: {
 * }
 */
export const DynamicDetail = (params) => {
  return requestGet(`home/DynamicDetail`,params);
}

/**
 * 获取帖子的详情
 * GET
 * params: {
 * }
 */
export const ArticleDetail = (params) => {
  return requestGet(`circle/ArticleDetail`,params);
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


/**
 * 回复消息
 * GET
 * params: {
 * }
 */
export const DynamicComment = (params) => {
  return requestPost(`home/DynamicComment`,params);
}

/**
 * 回复消息
 * GET
 * params: {
 * }
 */
export const circleComment = (params) => {
  return requestPost(`circle/ArticleComment`,params);
}


/**
 * 获取个人信息
 * GET
 * params: {
 * }
 */
export const GetUserMsg = (params) => {
  return requestGet(`user/GetUserMsg`,params);
}
