export function GenerateToken(length: number): string {
  length = length == undefined ? 32 : length; //如果没设置token长度自动为32位
  //预设随机字符串
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789';
  let token = '';
  //以长度单位进行循环
  for (let i = 0; i < length; ++i) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
