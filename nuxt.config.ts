// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // **--- 1. 静的サイト生成 (SSG) のための設定 ---**
  
  // Nitroの設定: ビルド時に静的ファイルを生成するよう指示
  // Cloudflare PagesのSSGに最適
  nitro: {
    preset: 'static',
    // ↓ 💡 新しく追加/修正する設定
    prerender: {
      // リンクのクロールも有効にして、確実に全ページを生成
      crawlLinks: true,
    }
  },

  // **--- 2. モジュール設定 (変更なし) ---**

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
  ],
  
  // **--- 3. 開発・互換性設定 (変更なし) ---**

  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})