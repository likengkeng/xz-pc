import { apiCreator } from './index';

const http = {
  login: (data: any) => {
    const url = 'login';
    return apiCreator().post(url, data);
  },
  logout: (data: any) => {
    const url = 'logout';
    return apiCreator().get(url, data);
  },
  // 账号列表
  accountList: (data: any) => {
    const url = 'account/list'
    return apiCreator().post(url, data);
  },
  // 新增账号
  accountAdd: (data: any) => {
    const url = 'account/add'
    return apiCreator().post(url, data);
  },
  // 删除账号 /account/del
  accountDel: (data: any) => {
    const url = 'account/del'
    return apiCreator().post(url, data);
  },
  // 重置密码
  resetPassword: (data: any) => {
    const url = `account/reset/password?accountId=${data.accountId}`
    return apiCreator().get(url, data);
  },
  // 素材列表
  materialList: (data: any) => {
    const url = `material/query?materialType=${data.type}&page_index=${data.page_index}&page_size=${data.page_size}`
    return apiCreator().get(url, data);
  },
  
  materialListType: (data: any) => {
    const url = `material/list?materialType=${data.type}`
    return apiCreator().get(url, data);
  },
   // 素材删除
  materialDel: (data: any) => {
    const url = `material/remove?material_id=${data.material_id}`
    return apiCreator().get(url, data);
  },
  // 序言列表
  prefaceList: (data: any) => {
    const url = `preface/list`
    return apiCreator().post(url, data);
  },
  // 新增序言/preface/add
  prefaceAdd: (data: any) => {
    const url = `preface/add`
    return apiCreator().post(url, data);
  },
  // 编辑序言
  prefaceEdit: (data: any) => {
    const url = `preface/edit`
    return apiCreator().post(url, data);
  },
  // 删除序言
  prefaceDelete: (data: any) => {
    const url = `preface/delete?prefaceId=${data.prefaceId}`
    return apiCreator().get(url, data);
  },
  // 生成断点续传的元数据（大于5m的文件使用该接口上传）小于5m的文件使用/file/upload的上传
  metadataGet: (data: any) => {
    const url = `metadata/get`
    return apiCreator().get(url, data);
  },
  // 元数据上传
  blockUpload: (data: any) => {
    const url = `block/upload`
    return apiCreator({"Content-Type": "application/octet-stream"}).post(url, data);
  },
  fileUpload: (data: any) => {
    const url = `file/upload`
    return apiCreator({"Content-Type": "multipart/form-data"}).post(url, data);
  },
  // 大事记列表
  memorabiliaList: (data: any) => {
    const url = `memorabilia/list`
    return apiCreator().post(url, data);
  },
  // 大事记新增
  memorabiliaAdd: (data: any) => {
    const url = `memorabilia/add`
    return apiCreator().post(url, data);
  },
  // 大事记编辑
  memorabiliaEdit: (data: any) => {
    const url = `memorabilia/edit`
    return apiCreator().post(url, data);
  },
  // 大事记删除
  memorabiliaDelete: (data: any) => {
    const url = `memorabilia/delete?memorabiliaId=${data.memorabiliaId}`
    return apiCreator().get(url);
  },
  // 领导关怀列表
  leaderCareList: (data: any) => {
    const url = `leader/care/list`
    return apiCreator().post(url, data);
  },
   // 领导关怀删除
   leaderCareDelete: (data: any) => {
    const url = `leader/care/delete?leaderCareId=${data.leaderCareId}`
    return apiCreator().get(url);
  },
   // 领导关怀新增
   leaderCareAdd: (data: any) => {
    const url = `leader/care/add`
    return apiCreator().post(url, data);
  },
  // 领导关怀编辑
  leaderCareEdit: (data: any) => {
    const url = `leader/care/edit`
    return apiCreator().post(url, data);
  },

  // 组织工作||榜样力量列表
  powerList: (data: any) => {
    const url = `organization/power/list`
    return apiCreator().post(url, data);
  },
  // 组织工作||榜样力量新增
  powerAdd: (data: any) => {
    const url = `organization/power/add`
    return apiCreator().post(url, data);
  },
  //  组织工作||榜样力量编辑
  powerEdit: (data: any) => {
    const url = `organization/power/edit`
    return apiCreator().post(url, data);
  },
  //  组织工作||榜样力量删除
  powerDelete: (data: any) => {
    const url = `organization/power/delete`
    return apiCreator().post(url, data);
  },
  
  // 七地
  voiceList: (data: any) => {
    const url = `area/voice/list`
    return apiCreator().post(url, data);
  },
  // 七地
  voiceAdd: (data: any) => {
    const url = `area/voice/add`
    return apiCreator().post(url, data);
  },
  // 七地
  voiceEdit: (data: any) => {
    const url = `area/voice/edit`
    return apiCreator().post(url, data);
  },
  // 七地
  voiceDelete: (data: any) => {
    const url = `area/voice/delete`
    return apiCreator().post(url, data);
  },

  // 评论
  commentList: (data: any) => {
    const url = `tourist/comment/list`
    return apiCreator().post(url, data);
  },
  // 评论
  commentNg: (data: any) => {
    const url = `tourist/comment/ng?touristCommentId=${data.touristCommentId}`
    return apiCreator().get(url, data);
  },
  // 评论
  commentOk: (data: any) => {
    const url = `tourist/comment/ok?touristCommentId=${data.touristCommentId}`
    return apiCreator().get(url, data);
  },
  // 评论
  commentReply: (data: any) => {
    const url = `tourist/comment/reply`
    return apiCreator().get(url, data);
  },

}

export default {...http}
