export const config = {
  runtime: 'edge',
  regions: ['iad1'] // 核心！强制该脚本只在美国东部（华盛顿）节点运行
};

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "";
  // 拼接出正确的 Google API 请求地址
  const targetUrl = new URL(`/${path}`, "https://generativelanguage.googleapis.com");
  
  const newHeaders = new Headers(req.headers);
  // 核心！抹除暴露你真实位置的请求头
  newHeaders.delete("x-forwarded-for");
  newHeaders.delete("x-real-ip");
  
  return fetch(new Request(targetUrl, {
    method: req.method,
    headers: newHeaders,
    body: req.body
  }));
}
