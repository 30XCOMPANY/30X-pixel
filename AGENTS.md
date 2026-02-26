# 30X.company Website - Pixel Office Official Site
TypeScript + React + Vite + Canvas + Node.js(Express/SSE)

<directory>
webview-ui/ - 官网前端与像素办公室渲染核心 (6 子目录: src/public/...)
src/ - VSCode 扩展主逻辑（保留，非官网主入口）
scripts/ - 资源导入与工具脚本
dist/ - 构建产物目录（web 输出到 dist/webview）
</directory>

<config>
package.json - 项目脚本与依赖入口
vercel.json - Vercel 构建与 SPA 重写配置
tsconfig.json - 根 TS 编译配置
server.ts - 本地 HTTP + SSE 服务入口
</config>

法则: 极简·稳定·导航·版本精确
