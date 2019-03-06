import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取
 * GET
 * params: {
 * }
 */
export const login = (params) => {
  return requestPost(`home/login`,params);
}
