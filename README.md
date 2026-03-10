好，我已经全面分析完项目了。现在我来写 README 文件。

---

## README.md 内容

基于对代码的完整分析，以下是为 Jchat 项目编写的 README：

```markdown
# Jchat

一个基于 React 的 LLM 对话应用，支持会话管理、对话分支、临时对话等功能。针对移动端优化，同时支持桌面端双栏布局。

## 功能特性

### 核心功能

- **多会话管理**：创建、删除、搜索会话，会话列表支持虚拟滚动
- **流式对话**：支持 LLM 流式响应，实时显示模型输出
- **对话分支**：从任意对话节点创建分支，形成树状对话结构
- **临时对话模式**：在当前会话上下文中发起临时对话，可选择保存或丢弃
- **Markdown 渲染**：支持 Markdown 语法、代码高亮、LaTeX 公式（KaTeX）
- **消息操作**：复制、删除、重新生成、收藏、分享

### 界面特性

- **响应式布局**：移动端全屏，桌面端双栏（左侧分支树 + 右侧对话）
- **iOS 兼容**：处理 Safari 地址栏变化、禁用橡皮筋效果、安全区域适配
- **触摸优化**：长按触发操作菜单、滑动手势支持
- **自动滚动**：新消息自动滚动到底部，用户滚动时暂停自动滚动

## 技术栈

| 类别         | 技术                                   |
| ------------ | -------------------------------------- |
| **框架**     | React 19 + TypeScript 5.8              |
| **构建**     | Vite 7                                 |
| **样式**     | Tailwind CSS 4                         |
| **状态管理** | Zustand 5                              |
| **路由**     | React Router 7                         |
| **Markdown** | Marked + DOMPurify                     |
| **公式渲染** | KaTeX                                  |
| **虚拟列表** | @tanstack/react-virtual                |
| **测试**     | Vitest + Testing Library               |
| **代码规范** | ESLint + Prettier + Husky + Commitizen |
```

````

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8（推荐）

### 安装依赖

```bash
pnpm install
````

### 开发服务器

```bash
pnpm dev
```

应用将在 `http://localhost:5173` 启动，支持局域网访问（`0.0.0.0`）。

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 配置说明

### API 配置

编辑 `src/configs/api.config.ts` 或设置环境变量：

```typescript
// src/configs/api.config.ts
export const apiConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000',
	endpoints: {
		generate: '/api/generate',
		sessions: '/api/sessions',
		messages: '/api/messages'
	},
	timeout: 10000
};
```

或创建 `.env.local` 文件：

```env
VITE_API_BASE_URL=http://your-api-server.com
```

### API 接口格式

`/api/generate` 端点需要接受以下格式的请求：

**请求**：

```json
{
	"history": [
		{ "role": "user", "content": "Hello" },
		{ "role": "assistant", "content": "Hi there!" },
		{ "role": "user", "content": "How are you?" }
	]
}
```

**响应**：SSE 流式响应：

```
data: {"choices":[{"delta":{"content":"I"}}]}
data: {"choices":[{"delta":{"content":"'m"}}]}
data: {"choices":[{"delta":{"content":" good"}}]}
data: {"choices":[{"delta":{"content":null},"finish_reason":"stop"}]}
```

## 路由

| 路径           | 页面    | 说明        |
| -------------- | ------- | ----------- |
| `/session`     | Home    | 新建会话    |
| `/session/:id` | Home    | 指定会话    |
| `/history`     | History | 会话列表    |
| `/branch`      | Branch  | 分支树导航  |
| `/canvas`      | Canvas  | Canvas 实验 |

## 核心数据结构

### Message

```typescript
interface Message {
	id: string;
	content: string;
	role: 'user' | 'model' | 'system';
	timestamp: number;
	isLoading?: boolean;
	isError?: boolean;
}
```

### ChatSession

```typescript
interface ChatSession {
	id: string;
	title: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
	isBranched?: boolean; // 是否有子分支
	parentId?: string; // 父会话 ID
	children: ChatSession[]; // 子分支列表
	parentLastMessageId?: string; // 分支点的消息 ID
}
```

## 开发规范

### 代码提交

项目使用 Commitizen 规范提交信息：

```bash
pnpm commit
```

支持的提交类型：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码格式
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `build`: 构建工具

### 代码格式化

```bash
pnpm prettier    # 格式化代码
pnpm lint        # 检查 lint
pnpm lint:fix    # 自动修复 lint 问题
```
