import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取个人信息
 * GET
 * params: {
 * }
 */
export const userinfo = (params) => {
  return requestGet(`user/userinfo`,params);
}

/**
 * 获取关注列表
 * GET
 * params: {
 * }
 */
export const UserCollectionPerson = (params) => {
  return requestGet(`user/UserCollectionPerson`,params);
}


/**
 * 获取圈子列表
 * GET
 * params: {
 * }
 */
export const UserCircle = (params) => {
  return requestGet(`user/UserCircle`,params);
}


/**
 * 获取粉丝列表
 * GET
 * params: {
 * }
 */
export const PersonCollectionUser = (params) => {
  return requestGet(`user/PersonCollectionUser`,params);
}


/**
 * 获取
 * GET
 * params: {
 * }
 */
export const login = (params) => {
  return requestPost(`home/login`,params);
}


/**
 * 获取粉丝列表
 * GET
 * params: {
 * }
 */
export const PersonInfo = (params) => {
  return requestGet(`home/PersonInfo`,params);
}

