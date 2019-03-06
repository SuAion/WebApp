import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取
 * GET
 * params: {
 * }
 */
export const userList = () => {
  return requestPost(`users`);
}
