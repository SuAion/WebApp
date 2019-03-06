import { requestGet, requestPost} from '@/common/js/request';

/**
 * 获取个人信息
 * GET
 * params: {
 * }
 */
export const InfoDetail = (params) => {
  return requestGet(`user/InfoDetail`,params);
}

/**
 * 上传图片
 * POST
 * params: {
 * }
 */
export const IconPutFile = (params) => {
  return requestPost(`user/IconPutFile`,params);
}

/**
 * 上传图片
 * POST
 * params: {
 * }
 */
export const InfoSet = (params) => {
  return requestPost(`user/InfoSet`,params);
}
