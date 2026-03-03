# webview-ui/
> L2 | 父级: /AGENTS.md

成员清单
src/main.tsx: 前端渲染入口，挂载 Website 路由壳层。
src/Website.tsx: 官网主路由与页面内容（首页/关于/服务/联系）。
src/site.css: 官网视觉系统与响应式布局样式。
src/App.tsx: 像素办公室引擎容器，支持 extension/website 双模式。
src/hooks/useExtensionMessages.ts: SSE 消息桥接与网站离线演示回退。
src/office/components/OfficeCanvas.tsx: Canvas 渲染和交互主组件。
src/office/components/ToolOverlay.tsx: 角色状态浮层（网站模式可禁用关闭按钮）。
src/index.css: 全局变量、字体和基础样式。
vite.config.ts: 前端构建配置（输出到 ../dist/webview）。
package.json: 前端依赖与开发/构建脚本。
public/assets/: 像素角色、办公室布局和贴图资源。
public/website-screenshot.png: 官网视觉快照，用于 PR UI 变更展示。

法则: 成员完整·一行一文件·父级链接·技术词前置

[PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
