import { requestGet, requestPost} from '@/common/js/request';


/**
 * 获取聊天人的列表
 * GET
 * params: {
 * }
 */
export const ChatFriend = (params) => {
  return requestGet(`gam/ChatFriend`,params);
}

/**
 * 获取发送聊天消息
 * GET
 * params: {
 * }
 */
export const OneChat = (params) => {
  return requestPost(`user/OneChat`,params);
}

/**
 * 获取发送聊天消息
 * GET
 * params: {
 * }
 */
export const PersonMessage = (params) => {
  return requestGet(`user/PersonMessage`,params);
}


/**
 * 获取发送聊天消息
 * GET
 * params: {
 * }
 */
export const GetMessage = (params) => {
  return requestGet(`user/GetMessage`,params);
}


/**
 * 获取未读消息
 * GET
 * params: {
 * }
 */
export const ChatPerson = (params) => {
  return requestGet(`user/ChatPerson`,params);
}


/**
 * 获取个人信息
 * GET
 * params: {
 * }
 */
export const userinfo = (params) => {
  return requestGet(`user/userinfo`,params);
}
/**
 * 获取历史
 * GET
 * params: {
 * }
 */
export const GetHistoryMessage = (params) => {
  return requestGet(`user/GetHistoryMessage`,params);
}

/**
 * 获取
 * GET
 * params: {
 * }
 */
export const PersonChat = (params) => {
  return requestGet(`user/PersonChat`,params);
}



