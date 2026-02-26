# 30X.company Website

30X.company 官网，基于原 Pixel Agents 像素办公室引擎改造。

## 技术栈

- `TypeScript + React + Vite + Canvas`
- 前端代码在 `webview-ui/`
- 可选本地后端 `server.ts`（HTTP + SSE）

## 已完成改造

- 将 `webview-ui` 作为独立官网应用入口
- 保留像素办公室动画渲染
- 新增官网页面：
  - 首页（像素办公室 + 公司介绍）
  - 关于我们
  - 产品/服务
  - 联系方式
- 响应式导航（桌面 + 移动）
- 支持静态部署到 Vercel（含 SPA 路由重写）

## 本地开发

```bash
# 官网开发模式
npm --prefix webview-ui install
npm --prefix webview-ui run dev
```

## 本地构建

```bash
npm --prefix webview-ui run build
```

构建产物输出到 `dist/webview`。

## Vercel 部署

仓库根目录已提供 `vercel.json`，默认配置：

- `buildCommand`: `npm install --prefix webview-ui && npm --prefix webview-ui run build`
- `outputDirectory`: `dist/webview`
- `rewrites`: 全路由回退到 `index.html`

直接导入仓库到 Vercel 即可部署。
