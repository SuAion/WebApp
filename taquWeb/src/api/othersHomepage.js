import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取查看用户信息
 * GET
 * params: {
 * }
 */
export const PersonInfo = (params) => {
  return requestGet(`home/PersonInfo`,params);
};

/**
 * 获取查看别人动态
 * GET
 * params: {
 * }
 */
export const PersonDynamic = (params) => {
  return requestGet(`home/PersonDynamic`,params);
};

/**
 * 获取查看别人的相册
 * GET
 * params: {
 * }
 */
export const PersonImg = (params) => {
  return requestGet(`home/PersonImg`,params);
};

/**
 * 判断是否购买相册
 * GET
 * params: {
 * }
 */
export const PersonImgBuy = (params) => {
  return requestGet(`home/PersonImgBuy`,params);
};

/**
 * 获取相册详情
 * GET
 * params: {
 * }
 */
export const PersonImgDetail = (params) => {
  return requestGet(`home/PersonImgDetail`,params);
};

/**
 * 关注人
 * GET
 * params: {
 * }
 */
export const PersonCollection = (params) => {
  return requestGet(`home/PersonCollection`,params);
};

/**
 * 取消关注人
 * GET
 * params: {
 * }
 */
export const CancelCollection = (params) => {
  return requestGet(`user/CancelCollection`,params);
};
