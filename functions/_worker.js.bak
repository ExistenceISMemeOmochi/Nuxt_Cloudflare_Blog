export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // APIリクエストはそのまま通す
    if (url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }
    
    // アセットファイル（拡張子あり）はそのまま返す
    if (url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
      return env.ASSETS.fetch(request);
    }
    
    // それ以外はすべてindex.htmlを返す（SPAルーティング）
    const indexRequest = new Request(new URL('/', request.url), request);
    return env.ASSETS.fetch(indexRequest);
  }
}