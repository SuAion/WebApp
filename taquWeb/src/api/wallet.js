import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取充值档位
 * GET
 * params: {
 * }
 */
export const gearList = (params) => {
  return requestGet(`cash/gearList`,params);
};

/**
 * 获取二维码
 * GET
 * params: {
 * }
 */
export const getQR = (params) => {
  return requestGet(`cash/getQR`,params);
};

/**
 * 确定充值
 * POST
 * params: {
 * }
 */
export const recharge = (params) => {
  return requestPost(`cash/recharge`,params);
};

/**
 * 获取交易记录
 * GET
 * params: {
 * }
 */
export const TurnoverList = (params) => {
  return requestGet(`user/TurnoverList`,params);
};

/**
 * 获取当前金币数量
 * GET
 * params: {
 * }
 */
export const userinfo = (params) => {
  return requestGet(`user/userinfo`,params);
};

