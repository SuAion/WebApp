import { requestGet, requestPost} from '@/common/js/request';


/**
 * 获取动态列表
 * GET
 * params: {
 * }
 */
export const HomeChatRoom = (params) => {
  return requestGet(`gam/HomeChatRoom`,params);
}
