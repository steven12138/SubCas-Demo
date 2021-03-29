// 返回信息原型接口
// 包括HTTP状态码 statusCode，状态码信息 message 和 可选的值 data

export interface Respond {
  statusCode: number;
  message: string;
  data?: any;
}
