import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取
 * GET
 * params: {
 * }
 */
export const register = (params) => {
  return requestPost(`home/register`,params);
}
