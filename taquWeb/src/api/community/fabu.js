
import { requestGet, requestPost} from '@/common/js/request';


/**
 * 发布帖子
 * GET
 * params: {
 * }
 */
export const CircleArticlePush = (params) => {
  return requestPost(`user/CircleArticlePush`,params);
}

/**
 * 上传图片
 * POST
 * params: {
 * }
 */
export const dynamicFile = (params) => {
    return requestPost(`user/dynamicFile`,params);
  }
  