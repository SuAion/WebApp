import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取发送聊天消息
 * GET
 * params: {
 * }
 */
export const GetMessage = (params) => {
  return requestGet(`user/GetMessage`,params);
}



