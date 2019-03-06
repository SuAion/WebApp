import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取订单列表
 * GET
 * params: {
 * }
 */
export const OrderList = (params) => {
  return requestGet(`user/OrderList`,params);
};
