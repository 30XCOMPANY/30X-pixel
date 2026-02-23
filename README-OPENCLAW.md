# Pixel Agents OpenClaw

将 Claude Code 的 Pixel Agents 改造成 OpenClaw 的 Mission Board。

## 功能

- 像素风办公室可视化
- 每个 OpenClaw agent 对应一个像素小人
- 实时状态显示 (active / idle / waiting)
- 点击小人查看任务详情

## 运行

```bash
cd ~/.openclaw/workspace/pixel-agents-openclaw

# 启动服务
npx tsx server.ts
```

服务运行在 http://localhost:3456

## 架构

- **server.ts** - HTTP + SSE 服务器
  - 轮询 `~/.openclaw/agents/main/sessions/sessions.json`
  - 通过 Server-Sent Events 推送状态给前端
- **webview-ui/** - React + Canvas 前端
  - 保留原版像素风渲染
  - 用浏览器 SSE 替代 VS Code postMessage

## 待完成

1. ✅ 核心骨架
2. ⏳ 消息协议适配（webview 期望的格式）
3. ⏳ pingping 远程访问（需要暴露端口或用 tunnel）
4. ⏳ 点击小人查看任务详情

## 给 pingping 用的远程接口

当前 server 读取的是本地 sessions.json。pingping 远程访问需要：

1. **方案 A**: 把 server 部署到有公网 IP 的机器
2. **方案 B**: 用 `ssh -R` 端口转发
3. **方案 C**: 通过 OpenClaw Gateway API 暴露

推荐方案 B，简单：
```bash
# 在有公网 IP 的机器上运行
ssh -R 3456:localhost:3456 pingping@<远程机器>
```
