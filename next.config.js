/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    typescript: {
    // !! 警告 !!
    // あなたのプロジェクトに型エラーがあったとしても、プロダクションビルドを正常に完了するために危険な許可をする。
    // !! 警告 !!
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
