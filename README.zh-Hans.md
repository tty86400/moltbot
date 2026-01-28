# 🦞 Clawdbot — 个人 AI 助手

[English](README.md) | **简体中文**

<p align="center">
  <img src="https://raw.githubusercontent.com/clawdbot/clawdbot/main/docs/whatsapp-clawd.jpg" alt="Clawdbot" width="400">
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/clawdbot/clawdbot/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/clawdbot/clawdbot/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/clawdbot/clawdbot/releases"><img src="https://img.shields.io/github/v/release/clawdbot/clawdbot?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://deepwiki.com/clawdbot/clawdbot"><img src="https://img.shields.io/badge/DeepWiki-clawdbot-111111?style=for-the-badge" alt="DeepWiki"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**Clawdbot** 是一个运行在你自己设备上的*个人 AI 助手*。
它可以在你已经使用的频道上回复你（WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、Microsoft Teams、WebChat），以及扩展频道如 BlueBubbles、Matrix、Zalo 和 Zalo Personal。它可以在 macOS/iOS/Android 上进行语音交互，并能渲染一个你可以控制的实时 Canvas。Gateway 只是控制平面——产品本身就是这个助手。

如果你想要一个个人化的、单用户的助手，感觉本地化、快速且始终在线，这就是你要找的。

[网站](https://molt.bot) · [文档](https://docs.molt.bot) · [快速开始](https://docs.molt.bot/start/getting-started) · [更新](https://docs.molt.bot/install/updating) · [展示](https://docs.molt.bot/start/showcase) · [FAQ](https://docs.molt.bot/start/faq) · [向导](https://docs.molt.bot/start/wizard) · [Nix](https://github.com/clawdbot/nix-clawdbot) · [Docker](https://docs.molt.bot/install/docker) · [Discord](https://discord.gg/clawd)

推荐设置：运行入门向导（`clawdbot onboard`）。它会引导你完成 gateway、workspace、channels 和 skills 的配置。CLI 向导是推荐的方式，适用于 **macOS、Linux 和 Windows（通过 WSL2；强烈推荐）**。
支持 npm、pnpm 或 bun。
新安装？从这里开始：[快速开始](https://docs.molt.bot/start/getting-started)

**订阅服务（OAuth）：**
- **[Anthropic](https://www.anthropic.com/)** (Claude Pro/Max)
- **[OpenAI](https://openai.com/)** (ChatGPT/Codex)

模型说明：虽然支持任何模型，但我强烈推荐 **Anthropic Pro/Max (100/200) + Opus 4.5**，因为它具有长上下文能力和更好的提示注入抵抗能力。参见[入门指南](https://docs.molt.bot/start/onboarding)。

## 模型（选择 + 认证）

- 模型配置 + CLI：[模型](https://docs.molt.bot/concepts/models)
- 认证配置文件轮换（OAuth vs API keys）+ 故障转移：[模型故障转移](https://docs.molt.bot/concepts/model-failover)

## 安装（推荐）

运行时：**Node ≥22**。

```bash
npm install -g moltbot@latest
# 或：pnpm add -g moltbot@latest

moltbot onboard --install-daemon
```

向导会安装 Gateway 守护进程（launchd/systemd 用户服务），使其保持运行。
遗留说明：`clawdbot` 仍作为兼容性 shim 可用。

## 快速开始（TL;DR）

运行时：**Node ≥22**。

完整的初学者指南（认证、配对、频道）：[快速开始](https://docs.molt.bot/start/getting-started)

```bash
moltbot onboard --install-daemon

moltbot gateway --port 18789 --verbose

# 发送消息
moltbot message send --to +1234567890 --message "Hello from Moltbot"

# 与助手对话（可选择将回复发送到任何已连接的频道：WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat）
moltbot agent --message "Ship checklist" --thinking high
```

升级？[更新指南](https://docs.molt.bot/install/updating)（并运行 `moltbot doctor`）。

## 开发频道

- **stable**：标记的发布版本（`vYYYY.M.D` 或 `vYYYY.M.D-<patch>`），npm dist-tag `latest`。
- **beta**：预发布标签（`vYYYY.M.D-beta.N`），npm dist-tag `beta`（macOS 应用可能缺失）。
- **dev**：`main` 分支的移动头部，npm dist-tag `dev`（发布时）。

切换频道（git + npm）：`clawdbot update --channel stable|beta|dev`。
详情：[开发频道](https://docs.molt.bot/install/development-channels)。

## 从源码构建（开发）

推荐使用 `pnpm` 从源码构建。Bun 是可选的，用于直接运行 TypeScript。

```bash
git clone https://github.com/clawdbot/clawdbot.git
cd clawdbot

pnpm install
pnpm ui:build # 首次运行时自动安装 UI 依赖
pnpm build

pnpm moltbot onboard --install-daemon

# 开发循环（TS 更改时自动重载）
pnpm gateway:watch
```

注意：`pnpm moltbot ...` 直接运行 TypeScript（通过 `tsx`）。`pnpm build` 生成 `dist/` 用于通过 Node / 打包的 `moltbot` 二进制文件运行。

## 安全默认设置（DM 访问）

Clawdbot 连接到真实的消息平台。将入站 DM 视为**不可信输入**。

完整安全指南：[安全](https://docs.molt.bot/gateway/security)

Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack 上的默认行为：
- **DM 配对**（`dmPolicy="pairing"` / `channels.discord.dm.policy="pairing"` / `channels.slack.dm.policy="pairing"`）：未知发送者会收到一个短配对码，机器人不会处理他们的消息。
- 批准方式：`clawdbot pairing approve <channel> <code>`（然后发送者被添加到本地允许列表存储）。
- 公开入站 DM 需要明确选择加入：设置 `dmPolicy="open"` 并在频道允许列表中包含 `"*"`（`allowFrom` / `channels.discord.dm.allowFrom` / `channels.slack.dm.allowFrom`）。

运行 `clawdbot doctor` 以发现有风险/配置错误的 DM 策略。

## 亮点

- **[本地优先 Gateway](https://docs.molt.bot/gateway)** — 用于会话、频道、工具和事件的单一控制平面。
- **[多频道收件箱](https://docs.molt.bot/channels)** — WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、BlueBubbles、Microsoft Teams、Matrix、Zalo、Zalo Personal、WebChat、macOS、iOS/Android。
- **[多代理路由](https://docs.molt.bot/gateway/configuration)** — 将入站频道/账户/对等方路由到隔离的代理（工作区 + 每个代理的会话）。
- **[Voice Wake](https://docs.molt.bot/nodes/voicewake) + [Talk Mode](https://docs.molt.bot/nodes/talk)** — macOS/iOS/Android 的始终在线语音，配合 ElevenLabs。
- **[Live Canvas](https://docs.molt.bot/platforms/mac/canvas)** — 代理驱动的可视化工作区，配合 [A2UI](https://docs.molt.bot/platforms/mac/canvas#canvas-a2ui)。
- **[一流的工具](https://docs.molt.bot/tools)** — 浏览器、canvas、nodes、cron、sessions 和 Discord/Slack 操作。
- **[配套应用](https://docs.molt.bot/platforms/macos)** — macOS 菜单栏应用 + iOS/Android [nodes](https://docs.molt.bot/nodes)。
- **[入门向导](https://docs.molt.bot/start/wizard) + [技能](https://docs.molt.bot/tools/skills)** — 向导驱动的设置，包含捆绑/托管/工作区技能。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=clawdbot/clawdbot&type=date&legend=top-left)](https://www.star-history.com/#clawdbot/clawdbot&type=date&legend=top-left)


## 我们迄今为止构建的一切

### 核心平台
- [Gateway WS 控制平面](https://docs.molt.bot/gateway)，包含 sessions、presence、config、cron、webhooks、[Control UI](https://docs.molt.bot/web) 和 [Canvas host](https://docs.molt.bot/platforms/mac/canvas#canvas-a2ui)。
- [CLI 界面](https://docs.molt.bot/tools/agent-send)：gateway、agent、send、[wizard](https://docs.molt.bot/start/wizard) 和 [doctor](https://docs.molt.bot/gateway/doctor)。
- [Pi 代理运行时](https://docs.molt.bot/concepts/agent)，RPC 模式，支持工具流和块流。
- [会话模型](https://docs.molt.bot/concepts/session)：直接聊天的 `main`、群组隔离、激活模式、队列模式、回复。群组规则：[Groups](https://docs.molt.bot/concepts/groups)。
- [媒体管道](https://docs.molt.bot/nodes/images)：图像/音频/视频、转录钩子、大小限制、临时文件生命周期。音频详情：[Audio](https://docs.molt.bot/nodes/audio)。

### 频道
- [Channels](https://docs.molt.bot/channels)：[WhatsApp](https://docs.molt.bot/channels/whatsapp) (Baileys)、[Telegram](https://docs.molt.bot/channels/telegram) (grammY)、[Slack](https://docs.molt.bot/channels/slack) (Bolt)、[Discord](https://docs.molt.bot/channels/discord) (discord.js)、[Google Chat](https://docs.molt.bot/channels/googlechat) (Chat API)、[Signal](https://docs.molt.bot/channels/signal) (signal-cli)、[iMessage](https://docs.molt.bot/channels/imessage) (imsg)、[BlueBubbles](https://docs.molt.bot/channels/bluebubbles) (扩展)、[Microsoft Teams](https://docs.molt.bot/channels/msteams) (扩展)、[Matrix](https://docs.molt.bot/channels/matrix) (扩展)、[Zalo](https://docs.molt.bot/channels/zalo) (扩展)、[Zalo Personal](https://docs.molt.bot/channels/zalouser) (扩展)、[WebChat](https://docs.molt.bot/web/webchat)。
- [群组路由](https://docs.molt.bot/concepts/group-messages)：提及门控、回复标签、每个频道的分块和路由。频道规则：[Channels](https://docs.molt.bot/channels)。

### 应用 + nodes
- [macOS 应用](https://docs.molt.bot/platforms/macos)：菜单栏控制平面、[Voice Wake](https://docs.molt.bot/nodes/voicewake)/PTT、[Talk Mode](https://docs.molt.bot/nodes/talk) 覆盖层、[WebChat](https://docs.molt.bot/web/webchat)、调试工具、[远程 gateway](https://docs.molt.bot/gateway/remote) 控制。
- [iOS node](https://docs.molt.bot/platforms/ios)：[Canvas](https://docs.molt.bot/platforms/mac/canvas)、[Voice Wake](https://docs.molt.bot/nodes/voicewake)、[Talk Mode](https://docs.molt.bot/nodes/talk)、相机、屏幕录制、Bonjour 配对。
- [Android node](https://docs.molt.bot/platforms/android)：[Canvas](https://docs.molt.bot/platforms/mac/canvas)、[Talk Mode](https://docs.molt.bot/nodes/talk)、相机、屏幕录制、可选 SMS。
- [macOS node 模式](https://docs.molt.bot/nodes)：system.run/notify + canvas/camera 暴露。

### 工具 + 自动化
- [浏览器控制](https://docs.molt.bot/tools/browser)：专用的 clawd Chrome/Chromium、快照、操作、上传、配置文件。
- [Canvas](https://docs.molt.bot/platforms/mac/canvas)：[A2UI](https://docs.molt.bot/platforms/mac/canvas#canvas-a2ui) push/reset、eval、snapshot。
- [Nodes](https://docs.molt.bot/nodes)：相机快照/剪辑、屏幕录制、[location.get](https://docs.molt.bot/nodes/location-command)、通知。
- [Cron + 唤醒](https://docs.molt.bot/automation/cron-jobs)；[webhooks](https://docs.molt.bot/automation/webhook)；[Gmail Pub/Sub](https://docs.molt.bot/automation/gmail-pubsub)。
- [技能平台](https://docs.molt.bot/tools/skills)：捆绑、托管和工作区技能，带安装门控 + UI。

### 运行时 + 安全
- [频道路由](https://docs.molt.bot/concepts/channel-routing)、[重试策略](https://docs.molt.bot/concepts/retry) 和 [流式/分块](https://docs.molt.bot/concepts/streaming)。
- [Presence](https://docs.molt.bot/concepts/presence)、[输入指示器](https://docs.molt.bot/concepts/typing-indicators) 和 [使用跟踪](https://docs.molt.bot/concepts/usage-tracking)。
- [模型](https://docs.molt.bot/concepts/models)、[模型故障转移](https://docs.molt.bot/concepts/model-failover) 和 [会话修剪](https://docs.molt.bot/concepts/session-pruning)。
- [安全](https://docs.molt.bot/gateway/security) 和 [故障排除](https://docs.molt.bot/channels/troubleshooting)。

### 运维 + 打包
- [Control UI](https://docs.molt.bot/web) + [WebChat](https://docs.molt.bot/web/webchat) 直接从 Gateway 提供服务。
- [Tailscale Serve/Funnel](https://docs.molt.bot/gateway/tailscale) 或 [SSH 隧道](https://docs.molt.bot/gateway/remote)，带 token/password 认证。
- [Nix 模式](https://docs.molt.bot/install/nix) 用于声明式配置；基于 [Docker](https://docs.molt.bot/install/docker) 的安装。
- [Doctor](https://docs.molt.bot/gateway/doctor) 迁移、[日志](https://docs.molt.bot/logging)。

## 工作原理（简述）

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / Microsoft Teams / Matrix / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       (控制平面)              │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi agent (RPC)
               ├─ CLI (clawdbot …)
               ├─ WebChat UI
               ├─ macOS app
               └─ iOS / Android nodes
```

## 关键子系统

- **[Gateway WebSocket 网络](https://docs.molt.bot/concepts/architecture)** — 用于客户端、工具和事件的单一 WS 控制平面（加上运维：[Gateway 运行手册](https://docs.molt.bot/gateway)）。
- **[Tailscale 暴露](https://docs.molt.bot/gateway/tailscale)** — 用于 Gateway 仪表板 + WS 的 Serve/Funnel（远程访问：[Remote](https://docs.molt.bot/gateway/remote)）。
- **[浏览器控制](https://docs.molt.bot/tools/browser)** — clawd 管理的 Chrome/Chromium，带 CDP 控制。
- **[Canvas + A2UI](https://docs.molt.bot/platforms/mac/canvas)** — 代理驱动的可视化工作区（A2UI 主机：[Canvas/A2UI](https://docs.molt.bot/platforms/mac/canvas#canvas-a2ui)）。
- **[Voice Wake](https://docs.molt.bot/nodes/voicewake) + [Talk Mode](https://docs.molt.bot/nodes/talk)** — 始终在线的语音和持续对话。
- **[Nodes](https://docs.molt.bot/nodes)** — Canvas、相机快照/剪辑、屏幕录制、`location.get`、通知，以及仅限 macOS 的 `system.run`/`system.notify`。

## Tailscale 访问（Gateway 仪表板）

Clawdbot 可以自动配置 Tailscale **Serve**（仅 tailnet）或 **Funnel**（公开），同时 Gateway 保持绑定到 loopback。配置 `gateway.tailscale.mode`：

- `off`：无 Tailscale 自动化（默认）。
- `serve`：仅 tailnet 的 HTTPS，通过 `tailscale serve`（默认使用 Tailscale 身份头）。
- `funnel`：公开 HTTPS，通过 `tailscale funnel`（需要共享密码认证）。

注意：
- 启用 Serve/Funnel 时，`gateway.bind` 必须保持 `loopback`（Clawdbot 强制执行此规则）。
- 可以通过设置 `gateway.auth.mode: "password"` 或 `gateway.auth.allowTailscale: false` 强制 Serve 需要密码。
- Funnel 拒绝启动，除非设置了 `gateway.auth.mode: "password"`。
- 可选：`gateway.tailscale.resetOnExit` 在关闭时撤销 Serve/Funnel。

详情：[Tailscale 指南](https://docs.molt.bot/gateway/tailscale) · [Web 界面](https://docs.molt.bot/web)

## 远程 Gateway（Linux 很棒）

在小型 Linux 实例上运行 Gateway 完全没问题。客户端（macOS 应用、CLI、WebChat）可以通过 **Tailscale Serve/Funnel** 或 **SSH 隧道**连接，你仍然可以配对设备 nodes（macOS/iOS/Android）以在需要时执行设备本地操作。

- **Gateway 主机**默认运行 exec 工具和频道连接。
- **设备 nodes** 通过 `node.invoke` 运行设备本地操作（`system.run`、相机、屏幕录制、通知）。

简而言之：exec 在 Gateway 所在位置运行；设备操作在设备所在位置运行。

详情：[远程访问](https://docs.molt.bot/gateway/remote) · [Nodes](https://docs.molt.bot/nodes) · [安全](https://docs.molt.bot/gateway/security)

## 通过 Gateway 协议的 macOS 权限

macOS 应用可以在 **node 模式**下运行，并通过 Gateway WebSocket 公布其功能 + 权限映射（`node.list` / `node.describe`）。然后客户端可以通过 `node.invoke` 执行本地操作：

- `system.run` 运行本地命令并返回 stdout/stderr/exit code；设置 `needsScreenRecording: true` 以要求屏幕录制权限（否则你会得到 `PERMISSION_MISSING`）。
- `system.notify` 发布用户通知，如果通知被拒绝则失败。
- `canvas.*`、`camera.*`、`screen.record` 和 `location.get` 也通过 `node.invoke` 路由，并遵循 TCC 权限状态。

提升的 bash（主机权限）与 macOS TCC 分开：

- 使用 `/elevated on|off` 在启用 + 允许列表时切换每个会话的提升访问。
- Gateway 通过 `sessions.patch`（WS 方法）持久化每个会话的切换，与 `thinkingLevel`、`verboseLevel`、`model`、`sendPolicy` 和 `groupActivation` 一起。

详情：[Nodes](https://docs.molt.bot/nodes) · [macOS 应用](https://docs.molt.bot/platforms/macos) · [Gateway 协议](https://docs.molt.bot/concepts/architecture)

## 代理到代理（sessions_* 工具）

- 使用这些工具在会话之间协调工作，无需在聊天界面之间跳转。
- `sessions_list` — 发现活动会话（代理）及其元数据。
- `sessions_history` — 获取会话的转录日志。
- `sessions_send` — 向另一个会话发送消息；可选的回复 ping-pong + 公告步骤（`REPLY_SKIP`、`ANNOUNCE_SKIP`）。

详情：[会话工具](https://docs.molt.bot/concepts/session-tool)

## 技能注册表（ClawdHub）

ClawdHub 是一个最小的技能注册表。启用 ClawdHub 后，代理可以自动搜索技能并根据需要引入新技能。

[ClawdHub](https://ClawdHub.com)

## 聊天命令

在 WhatsApp/Telegram/Slack/Google Chat/Microsoft Teams/WebChat 中发送这些命令（群组命令仅限所有者）：

- `/status` — 紧凑的会话状态（模型 + tokens，可用时显示成本）
- `/new` 或 `/reset` — 重置会话
- `/compact` — 压缩会话上下文（摘要）
- `/think <level>` — off|minimal|low|medium|high|xhigh（仅 GPT-5.2 + Codex 模型）
- `/verbose on|off`
- `/usage off|tokens|full` — 每个响应的使用页脚
- `/restart` — 重启 gateway（群组中仅限所有者）
- `/activ

## 应用（可选）

单独的 Gateway 就能提供出色的体验。所有应用都是可选的，并添加额外功能。

如果你计划构建/运行配套应用，请遵循下面的平台运行手册。

### macOS (Clawdbot.app)（可选）

- Gateway 和健康状态的菜单栏控制。
- Voice Wake + 按键通话覆盖层。
- WebChat + 调试工具。
- 通过 SSH 的远程 gateway 控制。

注意：需要签名构建才能使 macOS 权限在重建后保持（参见 `docs/mac/permissions.md`）。

### iOS node（可选）

- 通过 Bridge 配对为 node。
- 语音触发转发 + Canvas 界面。
- 通过 `clawdbot nodes …` 控制。

运行手册：[iOS 连接](https://docs.molt.bot/platforms/ios)。

### Android node（可选）

- 通过与 iOS 相同的 Bridge + 配对流程配对。
- 暴露 Canvas、Camera 和 Screen 捕获命令。
- 运行手册：[Android 连接](https://docs.molt.bot/platforms/android)。

## 代理工作区 + 技能

- 工作区根目录：`~/clawd`（可通过 `agents.defaults.workspace` 配置）。
- 注入的提示文件：`AGENTS.md`、`SOUL.md`、`TOOLS.md`。
- 技能：`~/clawd/skills/<skill>/SKILL.md`。

## 配置

最小的 `~/.clawdbot/clawdbot.json`（模型 + 默认值）：

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-5"
  }
}
```

[完整配置参考（所有键 + 示例）。](https://docs.molt.bot/gateway/configuration)

## 安全模型（重要）

- **默认：**工具在主机上为 **main** 会话运行，因此当只有你时，代理具有完全访问权限。
- **群组/频道安全：**设置 `agents.defaults.sandbox.mode: "non-main"` 以在每个会话的 Docker 沙箱中运行 **非 main 会话**（群组/频道）；然后 bash 在 Docker 中为这些会话运行。
- **沙箱默认值：**允许列表 `bash`、`process`、`read`、`write`、`edit`、`sessions_list`、`sessions_history`、`sessions_send`、`sessions_spawn`；拒绝列表 `browser`、`canvas`、`nodes`、`cron`、`discord`、`gateway`。

详情：[安全指南](https://docs.molt.bot/gateway/security) · [Docker + 沙箱](https://docs.molt.bot/install/docker) · [沙箱配置](https://docs.molt.bot/gateway/configuration)

### [WhatsApp](https://docs.molt.bot/channels/whatsapp)

- 链接设备：`pnpm clawdbot channels login`（将凭据存储在 `~/.clawdbot/credentials` 中）。
- 通过 `channels.whatsapp.allowFrom` 允许列表谁可以与助手对话。
- 如果设置了 `channels.whatsapp.groups`，它将成为群组允许列表；包含 `"*"` 以允许所有。

### [Telegram](https://docs.molt.bot/channels/telegram)

- 设置 `TELEGRAM_BOT_TOKEN` 或 `channels.telegram.botToken`（env 优先）。
- 可选：设置 `channels.telegram.groups`（带 `channels.telegram.groups."*".requireMention`）；设置后，它是群组允许列表（包含 `"*"` 以允许所有）。还可以根据需要设置 `channels.telegram.allowFrom` 或 `channels.telegram.webhookUrl`。

```json5
{
  channels: {
    telegram: {
      botToken: "123456:ABCDEF"
    }
  }
}
```

### [Slack](https://docs.molt.bot/channels/slack)

- 设置 `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN`（或 `channels.slack.botToken` + `channels.slack.appToken`）。

### [Discord](https://docs.molt.bot/channels/discord)

- 设置 `DISCORD_BOT_TOKEN` 或 `channels.discord.token`（env 优先）。
- 可选：根据需要设置 `commands.native`、`commands.text` 或 `commands.useAccessGroups`，以及 `channels.discord.dm.allowFrom`、`channels.discord.guilds` 或 `channels.discord.mediaMaxMb`。

```json5
{
  channels: {
    discord: {
      token: "1234abcd"
    }
  }
}
```

### [Signal](https://docs.molt.bot/channels/signal)

- 需要 `signal-cli` 和 `channels.signal` 配置部分。

### [iMessage](https://docs.molt.bot/channels/imessage)

- 仅限 macOS；必须登录 Messages。
- 如果设置了 `channels.imessage.groups`，它将成为群组允许列表；包含 `"*"` 以允许所有。

### [Microsoft Teams](https://docs.molt.bot/channels/msteams)

- 配置 Teams 应用 + Bot Framework，然后添加 `msteams` 配置部分。
- 通过 `msteams.allowFrom` 允许列表谁可以对话；通过 `msteams.groupAllowFrom` 或 `msteams.groupPolicy: "open"` 进行群组访问。

### [WebChat](https://docs.molt.bot/web/webchat)

- 使用 Gateway WebSocket；无需单独的 WebChat 端口/配置。

浏览器控制（可选）：

```json5
{
  browser: {
    enabled: true,
    color: "#FF4500"
  }
}
```

## 文档

当你完成入门流程并想要更深入的参考时，请使用这些文档。
- [从文档索引开始导航和了解"什么在哪里"。](https://docs.molt.bot)
- [阅读架构概述以了解 gateway + 协议模型。](https://docs.molt.bot/concepts/architecture)
- [当你需要每个键和示例时，使用完整配置参考。](https://docs.molt.bot/gateway/configuration)
- [按照手册运行 Gateway 的操作运行手册。](https://docs.molt.bot/gateway)
- [了解 Control UI/Web 界面的工作原理以及如何安全地暴露它们。](https://docs.molt.bot/web)
- [了解通过 SSH 隧道或 tailnets 的远程访问。](https://docs.molt.bot/gateway/remote)
- [遵循入门向导流程进行引导式设置。](https://docs.molt.bot/start/wizard)
- [通过 webhook 界面连接外部触发器。](https://docs.molt.bot/automation/webhook)
- [设置 Gmail Pub/Sub 触发器。](https://docs.molt.bot/automation/gmail-pubsub)
- [了解 macOS 菜单栏配套应用的详细信息。](https://docs.molt.bot/platforms/mac/menu-bar)
- [平台指南：Windows (WSL2)](https://docs.molt.bot/platforms/windows)、[Linux](https://docs.molt.bot/platforms/linux)、[macOS](https://docs.molt.bot/platforms/macos)、[iOS](https://docs.molt.bot/platforms/ios)、[Android](https://docs.molt.bot/platforms/android)
- [使用故障排除指南调试常见故障。](https://docs.molt.bot/channels/troubleshooting)
- [在暴露任何内容之前查看安全指南。](https://docs.molt.bot/gateway/security)

## 高级文档（发现 + 控制）

- [发现 + 传输](https://docs.molt.bot/gateway/discovery)
- [Bonjour/mDNS](https://docs.molt.bot/gateway/bonjour)
- [Gateway 配对](https://docs.molt.bot/gateway/pairing)
- [远程 gateway README](https://docs.molt.bot/gateway/remote-gateway-readme)
- [Control UI](https://docs.molt.bot/web/control-ui)
- [仪表板](https://docs.molt.bot/web/dashboard)

## 运维 & 故障排除

- [健康检查](https://docs.molt.bot/gateway/health)
- [Gateway 锁](https://docs.molt.bot/gateway/gateway-lock)
- [后台进程](https://docs.molt.bot/gateway/background-process)
- [浏览器故障排除（Linux）](https://docs.molt.bot/tools/browser-linux-troubleshooting)
- [日志](https://docs.molt.bot/logging)

## 深入探讨

- [代理循环](https://docs.molt.bot/concepts/agent-loop)
- [Presence](https://docs.molt.bot/concepts/presence)
- [TypeBox schemas](https://docs.molt.bot/concepts/typebox)
- [RPC 适配器](https://docs.molt.bot/reference/rpc)
- [队列](https://docs.molt.bot/concepts/queue)

## 工作区 & 技能

- [技能配置](https://docs.molt.bot/tools/skills-config)
- [默认 AGENTS](https://docs.molt.bot/reference/AGENTS.default)
- [模板：AGENTS](https://docs.molt.bot/reference/templates/AGENTS)
- [模板：BOOTSTRAP](https://docs.molt.bot/reference/templates/BOOTSTRAP)
- [模板：IDENTITY](https://docs.molt.bot/reference/templates/IDENTITY)
- [模板：SOUL](https://docs.molt.bot/reference/templates/SOUL)
- [模板：TOOLS](https://docs.molt.bot/reference/templates/TOOLS)
- [模板：USER](https://docs.molt.bot/reference/templates/USER)

## 平台内部

- [macOS 开发设置](https://docs.molt.bot/platforms/mac/dev-setup)
- [macOS 菜单栏](https://docs.molt.bot/platforms/mac/menu-bar)
- [macOS voice wake](https://docs.molt.bot/platforms/mac/voicewake)
- [iOS node](https://docs.molt.bot/platforms/ios)
- [Android node](https://docs.molt.bot/platforms/android)
- [Windows (WSL2)](https://docs.molt.bot/platforms/windows)
- [Linux 应用](https://docs.molt.bot/platforms/linux)

## 邮件钩子（Gmail）

- [docs.molt.bot/gmail-pubsub](https://docs.molt.bot/automation/gmail-pubsub)

## Clawd

Clawdbot 是为 **Clawd** 构建的，一个太空龙虾 AI 助手。🦞
由 Peter Steinberger 和社区创建。

- [clawd.me](https://clawd.me)
- [soul.md](https://soul.md)
- [steipete.me](https://steipete.me)

## 社区

参见 [CONTRIBUTING.md](CONTRIBUTING.md) 了解指南、维护者以及如何提交 PR。
欢迎 AI/vibe-coded PR！🤖

特别感谢 [Mario Zechner](https://mariozechner.at/) 的支持以及
[pi-mono](https://github.com/badlogic/pi-mono)。

感谢所有 clawtributors：

<p align="left">
  <a href="https://github.com/steipete"><img src="https://avatars.githubusercontent.com/u/58493?v=4&s=48" width="48" height="48" alt="steipete" title="steipete"/></a> <a href="https://github.com/plum-dawg"><img src="https://avatars.githubusercontent.com/u/5909950?v=4&s=48" width="48" height="48" alt="plum-dawg" title="plum-dawg"/></a> <a href="https://github.com/bohdanpodvirnyi"><img src="https://avatars.githubusercontent.com/u/31819391?v=4&s=48" width="48" height="48" alt="bohdanpodvirnyi" title="bohdanpodvirnyi"/></a> <a href="https://github.com/iHildy"><img src="https://avatars.githubusercontent.com/u/25069719?v=4&s=48" width="48" height="48" alt="iHildy" title="iHildy"/></a> <a href="https://github.com/jaydenfyi"><img src="https://avatars.githubusercontent.com/u/213395523?v=4&s=48" width="48" height="48" alt="jaydenfyi" title="jaydenfyi"/></a> <a href="https://github.com/joaohlisboa"><img src="https://avatars.githubusercontent.com/u/8200873?v=4&s=48" width="48" height="48" alt="joaohlisboa" title="joaohlisboa"/></a> <a href="https://github.com/mneves75"><img src="https://avatars.githubusercontent.com/u/2423436?v=4&s=48" width="48" height="48" alt="mneves75" title="mneves75"/></a> <a href="https://github.com/MatthieuBizien"><img src="https://avatars.githubusercontent.com/u/173090?v=4&s=48" width="48" height="48" alt="MatthieuBizien" title="MatthieuBizien"/></a> <a href="https://github.com/MaudeBot"><i
## 我们迄今为止构建的一切

### 核心平台
- [Gateway WS 控制平面](https://docs.molt.bot/gateway)，包含会话、在线状态、配置、定时任务、webhooks、[控制 UI](https://docs.molt.bot/web) 和 [Canvas 主机](https://docs.molt.bot/platforms/mac/canvas#canvas-a2ui)。
- [CLI 界面](https://docs.molt.bot/tools/agent-send)：gateway、agent、send、[向导](https://docs.molt.bot/start/wizard) 和 [doctor](https://docs.molt.bot/gateway/doctor)。
- [Pi agent 运行时](https://docs.molt.bot/concepts/agent)，RPC 模式下支持工具流和块流。
- [会话模型](https://docs.molt.bot/concepts/session)：`main` 用于直接聊天、群组隔离、激活模式、队列模式、回复返回。群组规则：[群组](https://docs.molt.bot/concepts/groups)。
- [媒体管道](https://docs.molt.bot/nodes/images)：图片/音频/视频、转录钩子、大小限制、临时文件生命周期。音频详情：[音频](https://docs.molt.bot/nodes/audio)。

### 频道
- [频道](https://docs.molt.bot/channels)：[WhatsApp](https://docs.molt.bot/channels/whatsapp)（Baileys）、[Telegram](https://docs.molt.bot/channels/telegram)（grammY）、[Slack](https://docs.molt.bot/channels/slack)（Bolt）、[Discord](https://docs.molt.bot/channels/discord)（discord.js）、[Google Chat](https://docs.molt.bot/channels/googlechat)（Chat API）、[Signal](https://docs.molt.bot/channels/signal)（signal-cli）、[iMessage](https://docs.molt.bot/channels/imessage)（imsg）、[BlueBubbles](https://docs.molt.bot/channels/bluebubbles)（扩展）、[Microsoft Teams](https://docs.molt.bot/channels/msteams)（扩展）、[Matrix](https://docs.molt.bot/channels/matrix)（扩展）、[Zalo](https://docs.molt.bot/channels/zalo)（扩展）、[Zalo Personal](https://docs.molt.bot/channels/zalouser)（扩展）、[WebChat](https://docs.molt.bot/web/webchat)。
- [群组路由](https://docs.molt.bot/concepts/group-messages)：提及门控、回复标签、每频道分块和路由。频道规则：[频道](https://docs.molt.bot/channels)。

### 应用 + 节点
- [macOS 应用](https://docs.molt.bot/platforms/macos)：菜单栏控制平面、[Voice Wake](https://docs.molt.bot/nodes/voicewake)/PTT、[Talk Mode](https://docs.molt.bot/nodes/talk) 覆盖层、[WebChat](https://docs.molt.bot/web/webchat)、调试工具、[远程 gateway](https://docs.molt.bot/gateway/remote) 控制。
- [iOS 节点](https://docs.molt.bot/platforms/ios)：[Canvas](https://docs.molt.bot/platforms/mac/canvas)、[Voice Wake](https://docs.molt.bot/nodes/voicewake)、[Talk Mode](https://docs.molt.bot/nodes/talk)、相机、屏幕录制、Bonjour 配对。
- [Android 节点](https://docs.molt.bot/platforms/android)：[Canvas](https://docs.molt.bot/platforms/mac/canvas)、[Talk Mode](https://docs.molt.bot/nodes/talk)、相机、屏幕录制、可选短信。
- [macOS 节点模式](https://docs.molt.bot/nodes)：system.run/notify + canvas/camera 暴露。

### 工具 + 自动化
- [浏览器控制](https://docs.molt.bot/tools/browser)：专用 clawd Chrome/Chromium、快照、操作、上传、配置文件。
- [Canvas](https://docs.molt.bot/platforms/mac/canvas)：[A2UI](https://docs.molt.bot/platforms/mac/canvas#canvas-a2ui) push/reset、eval、snapshot。
- [节点](https://docs.molt.bot/nodes)：相机快照/剪辑、屏幕录制、[location.get](https://docs.molt.bot/nodes/location-command)、通知。
- [定时任务 + 唤醒](https://docs.molt.bot/automation/cron-jobs)；[webhooks](https://docs.molt.bot/automation/webhook)；[Gmail Pub/Sub](https://docs.molt.bot/automation/gmail-pubsub)。
- [技能平台](https://docs.molt.bot/tools/skills)：捆绑、托管和工作区技能，带安装门控 + UI。

### 运行时 + 安全
- [频道路由](https://docs.molt.bot/concepts/channel-routing)、[重试策略](https://docs.molt.bot/concepts/retry) 和 [流式/分块](https://docs.molt.bot/concepts/streaming)。
- [在线状态](https://docs.molt.bot/concepts/presence)、[输入指示器](https://docs.molt.bot/concepts/typing-indicators) 和 [使用量跟踪](https://docs.molt.bot/concepts/usage-tracking)。
- [模型](https://docs.molt.bot/concepts/models)、[模型故障转移](https://docs.molt.bot/concepts/model-failover) 和 [会话修剪](https://docs.molt.bot/concepts/session-pruning)。
- [安全](https://docs.molt.bot/gateway/security) 和 [故障排除](https://docs.molt.bot/channels/troubleshooting)。

### 运维 + 打包
- [控制 UI](https://docs.molt.bot/web) + [WebChat](https://docs.molt.bot/web/webchat) 直接从 Gateway 提供服务。
- [Tailscale Serve/Funnel](https://docs.molt.bot/gateway/tailscale) 或 [SSH 隧道](https://docs.molt.bot/gateway/remote)，带令牌/密码认证。
- [Nix 模式](https://docs.molt.bot/install/nix) 用于声明式配置；[Docker](https://docs.molt.bot/install/docker) 安装。
- [Doctor](https://docs.molt.bot/gateway/doctor) 迁移、[日志](https://docs.molt.bot/logging)。

## 工作原理（简述）

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / Microsoft Teams / Matrix / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       （控制平面）             │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi agent (RPC)
               ├─ CLI (clawdbot …)
               ├─ WebChat UI
               ├─ macOS 应用
               └─ iOS / Android 节点
```

## 关键子系统

- **[Gateway WebSocket 网络](https://docs.molt.bot/concepts/architecture)** — 用于客户端、工具和事件的单一 WS 控制平面（运维：[Gateway 运行手册](https://docs.molt.bot/gateway)）。
- **[Tailscale 暴露](https://docs.molt.bot/gateway/tailscale)** — 用于 Gateway 仪表板 + WS 的 Serve/Funnel（远程访问：[远程](https://docs.molt.bot/gateway/remote)）。
- **[浏览器控制](https://docs.molt.bot/tools/browser)** — clawd 管理的 Chrome/Chromium，带 CDP 控制。
- **[Canvas + A2UI](https://docs.molt.bot/platforms/mac/canvas)** — 代理驱动的可视化工作区（A2UI 主机：[Canvas/A2UI](https://docs.molt.bot/platforms/mac/canvas#canvas-a2ui)）。
- **[Voice Wake](https://docs.molt.bot/nodes/voicewake) + [Talk Mode](https://docs.molt.bot/nodes/talk)** — 始终在线的语音和持续对话。
- **[节点](https://docs.molt.bot/nodes)** — Canvas、相机快照/剪辑、屏幕录制、`location.get`、通知，以及 macOS 专属的 `system.run`/`system.notify`。

## Tailscale 访问（Gateway 仪表板）

Clawdbot 可以自动配置 Tailscale **Serve**（仅限 tailnet）或 **Funnel**（公开），同时 Gateway 保持绑定到回环地址。配置 `gateway.tailscale.mode`：

- `off`：无 Tailscale 自动化（默认）。
- `serve`：通过 `tailscale serve` 的仅限 tailnet 的 HTTPS（默认使用 Tailscale 身份头）。
- `funnel`：通过 `tailscale funnel` 的公开 HTTPS（需要共享密码认证）。

注意：
- 启用 Serve/Funnel 时，`gateway.bind` 必须保持 `loopback`（Clawdbot 强制执行此规则）。
- 可以通过设置 `gateway.auth.mode: "password"` 或 `gateway.auth.allowTailscale: false` 强制 Serve 要求密码。
- 除非设置 `gateway.auth.mode: "password"`，否则 Funnel 拒绝启动。
- 可选：`gateway.tailscale.resetOnExit` 在关闭时撤销 Serve/Funnel。

详情：[Tailscale 指南](https://docs.molt.bot/gateway/tailscale) · [Web 界面](https://docs.molt.bot/web)

## 远程 Gateway（Linux 很棒）

在小型 Linux 实例上运行 Gateway 完全没问题。客户端（macOS 应用、CLI、WebChat）可以通过 **Tailscale Serve/Funnel** 或 **SSH 隧道** 连接，你仍然可以配对设备节点（macOS/iOS/Android）以在需要时执行设备本地操作。

- **Gateway 主机** 默认运行 exec 工具和频道连接。
- **设备节点** 通过 `node.invoke` 运行设备本地操作（`system.run`、相机、屏幕录制、通知）。
简而言之：exec 在 Gateway 所在位置运行；设备操作在设备所在位置运行。

详情：[远程访问](https://docs.molt.bot/gateway/remote) · [节点](https://docs.molt.bot/nodes) · [安全](https://docs.molt.bot/gateway/security)

## 通过 Gateway 协议的 macOS 权限

macOS 应用可以在**节点模式**下运行，并通过 Gateway WebSocket 广播其功能 + 权限映射（`node.list` / `node.describe`）。然后客户端可以通过 `node.invoke` 执行本地操作：

- `system.run` 运行本地命令并返回 stdout/stderr/exit code；设置 `needsScreenRecording: true` 以要求屏幕录制权限（否则你会得到 `PERMISSION_MISSING`）。
- `system.notify` 发布用户通知，如果通知被拒绝则失败。
- `canvas.*`、`camera.*`、`screen.record` 和 `location.get` 也通过 `node.invoke` 路由，并遵循 TCC 权限状态。

提升的 bash（主机权限）与 macOS TCC 是分开的：

- 使用 `/elevated on|off` 在启用 + 允许列表时切换每会话的提升访问。
- Gateway 通过 `sessions.patch`（WS 方法）持久化每会话切换，以及 `thinkingLevel`、`verboseLevel`、`model`、`sendPolicy` 和 `groupActivation`。

详情：[节点](https://docs.molt.bot/nodes) · [macOS 应用](https://docs.molt.bot/platforms/macos) · [Gateway 协议](https://docs.molt.bot/concepts/architecture)

## Agent 到 Agent（sessions_* 工具）

- 使用这些工具在会话之间协调工作，无需在聊天界面之间跳转。
- `sessions_list` — 发现活动会话（代理）及其元数据。
- `sessions_history` — 获取会话的转录日志。
- `sessions_send` — 向另一个会话发送消息；可选的回复返回乒乓 + 公告步骤（`REPLY_SKIP`、`ANNOUNCE_SKIP`）。

详情：[会话工具](https://docs.molt.bot/concepts/session-tool)

## 技能注册表（ClawdHub）

ClawdHub 是一个最小化的技能注册表。启用 ClawdHub 后，代理可以自动搜索技能并根据需要引入新技能。

[ClawdHub](https://ClawdHub.com)

## 聊天命令

在 WhatsApp/Telegram/Slack/Google Chat/Microsoft Teams/WebChat 中发送这些命令（群组命令仅限所有者）：

- `/status` — 紧凑的会话状态（模型 + 令牌，可用时显示成本）
- `/new` 或 `/reset` — 重置会话
- `/compact` — 压缩会话上下文（摘要）
- `/think <level>` — off|minimal|low|medium|high|xhigh（仅限 GPT-5.2 + Codex 模型）
- `/verbose on|off`
- `/usage off|tokens|full` — 每响应使用量页脚
- `/restart` — 重启 gateway（群组中仅限所有者）
- `/activation mention|always` — 群组激活切换（仅限群组）

## 应用（可选）

Gateway 本身就能提供出色的体验。所有应用都是可选的，添加额外功能。

如果你计划构建/运行配套应用，请遵循以下平台运行手册。

### macOS (Clawdbot.app)（可选）

- Gateway 和健康状态的菜单栏控制。
- Voice Wake + 按键说话覆盖层。
- WebChat + 调试工具。
- 通过 SSH 的远程 gateway 控制。

注意：需要签名构建才能使 macOS 权限在重建后保持（参见 `docs/mac/permissions.md`）。

### iOS 节点（可选）

- 通过 Bridge 配对为节点。
- 语音触发转发 + Canvas 界面。
- 通过 `clawdbot nodes …` 控制。

运行手册：[iOS 连接](https://docs.molt.bot/platforms/ios)。

### Android 节点（可选）

- 通过与 iOS 相同的 Bridge + 配对流程配对。
- 暴露 Canvas、相机和屏幕捕获命令。
- 运行手册：[Android 连接](https://docs.molt.bot/platforms/android)。

## Agent 工作区 + 技能

- 工作区根目录：`~/clawd`（可通过 `agents.defaults.workspace` 配置）。
- 注入的提示文件：`AGENTS.md`、`SOUL.md`、`TOOLS.md`。
- 技能：`~/clawd/skills/<skill>/SKILL.md`。

## 配置

最小 `~/.clawdbot/clawdbot.json`（模型 + 默认值）：

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-5"
  }
}
```

[完整配置参考（所有键 + 示例）。](https://docs.molt.bot/gateway/configuration)

## 安全模型（重要）

- **默认：** 工具在主机上为 **main** 会话运行，因此当只有你时，代理具有完全访问权限。
- **群组/频道安全：** 设置 `agents.defaults.sandbox.mode: "non-main"` 以在每会话 Docker 沙箱中运行 **非 main 会话**（群组/频道）；然后 bash 在 Docker 中为这些会话运行。
- **沙箱默认值：** 允许列表 `bash`、`process`、`read`、`write`、`edit`、`sessions_list`、`sessions_history`、`sessions_send`、`sessions_spawn`；拒绝列表 `browser`、`canvas`、`nodes`、`cron`、`discord`、`gateway`。

详情：[安全指南](https://docs.molt.bot/gateway/security) · [Docker + 沙箱](https://docs.molt.bot/install/docker) · [沙箱配置](https://docs.molt.bot/gateway/configuration)

### [WhatsApp](https://docs.molt.bot/channels/whatsapp)

- 链接设备：`pnpm clawdbot channels login`（凭据存储在 `~/.clawdbot/credentials`）。
- 通过 `channels.whatsapp.allowFrom` 允许列表谁可以与助手交谈。
- 如果设置了 `channels.whatsapp.groups`，它将成为群组允许列表；包含 `"*"` 以允许所有。

### [Telegram](https://docs.molt.bot/channels/telegram)

- 设置 `TELEGRAM_BOT_TOKEN` 或 `channels.telegram.botToken`（环境变量优先）。
- 可选：设置 `channels.telegram.groups`（带 `channels.telegram.groups."*".requireMention`）；设置后，它是群组允许列表（包含 `"*"` 以允许所有）。还有 `channels.telegram.allowFrom` 或 `channels.telegram.webhookUrl` 按需设置。

```json5
{
  channels: {
    telegram: {
      botToken: "123456:ABCDEF"
    }
  }
}
```

### [Slack](https://docs.molt.bot/channels/slack)

- 设置 `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN`（或 `channels.slack.botToken` + `channels.slack.appToken`）。

### [Discord](https://docs.molt.bot/channels/discord)

- 设置 `DISCORD_BOT_TOKEN` 或 `channels.discord.token`（环境变量优先）。
- 可选：设置 `commands.native`、`commands.text` 或 `commands.useAccessGroups`，以及 `channels.discord.dm.allowFrom`、`channels.discord.guilds` 或 `channels.discord.mediaMaxMb` 按需设置。

```json5
{
  channels: {
    discord: {
      token: "1234abcd"
    }
  }
}
```

### [Signal](https://docs.molt.bot/channels/signal)

- 需要 `signal-cli` 和 `channels.signal` 配置部分。

### [iMessage](https://docs.molt.bot/channels/imessage)

- 仅限 macOS；Messages 必须已登录。
- 如果设置了 `channels.imessage.groups`，它将成为群组允许列表；包含 `"*"` 以允许所有。

### [Microsoft Teams](https://docs.molt.bot/channels/msteams)

- 配置 Teams 应用 + Bot Framework，然后添加 `msteams` 配置部分。
- 通过 `msteams.allowFrom` 允许列表谁可以交谈；群组访问通过 `msteams.groupAllowFrom` 或 `msteams.groupPolicy: "open"`。

### [WebChat](https://docs.molt.bot/web/webchat)

- 使用 Gateway WebSocket；无需单独的 WebChat 端口/配置。

浏览器控制（可选）：

```json5
{
  browser: {
    enabled: true,
    color: "#FF4500"
  }
}
```

## 文档

当你完成入门流程并想要更深入的参考时使用这些。
- [从文档索引开始导航和"什么在哪里"。](https://docs.molt.bot)
- [阅读架构概述了解 gateway + 协议模型。](https://docs.molt.bot/concepts/architecture)
- [当你需要每个键和示例时使用完整配置参考。](https://docs.molt.bot/gateway/configuration)
- [按照运维手册运行 Gateway。](https://docs.molt.bot/gateway)
- [了解控制 UI/Web 界面如何工作以及如何安全地暴露它们。](https://docs.molt.bot/web)
- [了解通过 SSH 隧道或 tailnets 的远程访问。](https://docs.molt.bot/gateway/remote)
- [按照入门向导流程进行引导设置。](https://docs.molt.bot/start/wizard)
- [通过 webhook 界面连接外部触发器。](https://docs.molt.bot/automation/webhook)
- [设置 Gmail Pub/Sub 触发器。](https://docs.molt.bot/automation/gmail-pubsub)
- [了解 macOS 菜单栏配套应用详情。](https://docs.molt.bot/platforms/mac/menu-bar)
- [平台指南：Windows (WSL2)](https://docs.molt.bot/platforms/windows)、[Linux](https://docs.molt.bot/platforms/linux)、[macOS](https://docs.molt.bot/platforms/macos)、[iOS](https://docs.molt.bot/platforms/ios)、[Android](https://docs.molt.bot/platforms/android)
- [使用故障排除指南调试常见故障。](https://docs.molt.bot/channels/troubleshooting)
- [在暴露任何内容之前查看安全指南。](https://docs.molt.bot/gateway/security)

## 高级文档（发现 + 控制）

- [发现 + 传输](https://docs.molt.bot/gateway/discovery)
- [Bonjour/mDNS](https://docs.molt.bot/gateway/bonjour)
- [Gateway 配对](https://docs.molt.bot/gateway/pairing)
- [远程 gateway README](https://docs.molt.bot/gateway/remote-gateway-readme)
- [控制 UI](https://docs.molt.bot/web/control-ui)
- [仪表板](https://docs.molt.bot/web/dashboard)

## 运维 & 故障排除

- [健康检查](https://docs.molt.bot/gateway/health)
- [Gateway 锁](https://docs.molt.bot/gateway/gateway-lock)
- [后台进程](https://docs.molt.bot/gateway/background-process)
- [浏览器故障排除 (Linux)](https://docs.molt.bot/tools/browser-linux-troubleshooting)
- [日志](https://docs.molt.bot/logging)

## 深入探讨

- [Agent 循环](https://docs.molt.bot/concepts/agent-loop)
- [在线状态](https://docs.molt.bot/concepts/presence)
- [TypeBox schemas](https://docs.molt.bot/concepts/typebox)
- [RPC 适配器](https://docs.molt.bot/reference/rpc)
- [队列](https://docs.molt.bot/concepts/queue)

## 工作区 & 技能

- [技能配置](https://docs.molt.bot/tools/skills-config)
- [默认 AGENTS](https://docs.molt.bot/reference/AGENTS.default)
- [模板：AGENTS](https://docs.molt.bot/reference/templates/AGENTS)
- [模板：BOOTSTRAP](https://docs.molt.bot/reference/templates/BOOTSTRAP)
- [模板：IDENTITY](https://docs.molt.bot/reference/templates/IDENTITY)
- [模板：SOUL](https://docs.molt.bot/reference/templates/SOUL)
- [模板：TOOLS](https://docs.molt.bot/reference/templates/TOOLS)
- [模板：USER](https://docs.molt.bot/reference/templates/USER)

## 平台内部

- [macOS 开发设置](https://docs.molt.bot/platforms/mac/dev-setup)
- [macOS 菜单栏](https://docs.molt.bot/platforms/mac/menu-bar)
- [macOS voice wake](https://docs.molt.bot/platforms/mac/voicewake)
- [iOS 节点](https://docs.molt.bot/platforms/ios)
- [Android 节点](https://docs.molt.bot/platforms/android)
- [Windows (WSL2)](https://docs.molt.bot/platforms/windows)
- [Linux 应用](https://docs.molt.bot/platforms/linux)

## 邮件钩子 (Gmail)

- [docs.molt.bot/gmail-pubsub](https://docs.molt.bot/automation/gmail-pubsub)

## Clawd

Clawdbot 是为 **Clawd** 构建的，一个太空龙虾 AI 助手。🦞
由 Peter Steinberger 和社区开发。

- [clawd.me](https://clawd.me)
- [soul.md](https://soul.md)
- [steipete.me](https://steipete.me)

## 社区

参见 [CONTRIBUTING.md](CONTRIBUTING.md) 了解指南、维护者和如何提交 PR。
欢迎 AI/vibe-coded PR！🤖

特别感谢 [Mario Zechner](https://mariozechner.at/) 的支持以及 [pi-mono](https://github.com/badlogic/pi-mono)。

感谢所有 clawtributors！
