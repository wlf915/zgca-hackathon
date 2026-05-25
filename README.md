# GrowOS

GrowOS 是一个面向黑客松展示的“企业资源自动发现与行动系统”。它把传统的企业主动搜索政策、园区和融资通道，改造成 BP / 官网 / 团队描述输入后的自动画像、自动匹配和自动行动规划。

## Demo 能力

- 企业输入：支持公司名、官网链接、团队 / BP 摘要和 BP 文件上传。
- 企业画像：自动识别行业标签、技术标签、企业阶段、技术壁垒和阶段性短板。
- 资源匹配：基于模拟中关村公共服务资源库，匹配政策、园区和 Funding Navigator。
- Funding Navigator：覆盖基金、创投、创业赛事、无息贷款四类资金通道。
- 推荐解释：每张资源卡片展示匹配分、命中原因、申请 / 对接缺口和下一步动作。
- 行动路线：生成未来 7 天、30 天、90 天的资源推进计划。

## 技术栈

- Frontend：React + Vite
- Backend：Node.js + Express
- Upload：Multer
- UI Icons：lucide-react
- 数据：本地模拟资源库，内置在 `server/index.js`

## 快速启动

```bash
npm install
npm run dev
```

启动后访问：

- 前端页面：`http://localhost:5173`
- 后端健康检查：`http://localhost:4173/api/health`
- 分析接口：`POST http://localhost:4173/api/analyze`

## 使用方式

1. 打开 `http://localhost:5173`。
2. 保留默认的 AI 医疗企业样例，或输入自己的企业描述。
3. 可选上传 BP 文件。
4. 点击“开始发现资源”。
5. 查看企业画像、政策 / 园区 / Funding Navigator 匹配和行动路线。

## 项目结构

```text
.
├── server/
│   └── index.js          # Express API、企业画像、资源库和匹配逻辑
├── src/
│   ├── App.jsx           # 前端主界面
│   ├── App.css           # 页面样式
│   ├── index.css         # 全局样式
│   └── main.jsx          # React 入口
├── package.json
└── vite.config.js
```

## API 返回内容

`/api/analyze` 会返回：

- `profile`：企业画像
- `matches`：政策、园区、Funding Navigator 三类资源匹配结果
- `actionPlan`：7 / 30 / 90 天行动计划
- `agents`：Multi-Agent 执行状态

## 黑客松展示话术

GrowOS 的核心价值不是“查政策”，而是先理解企业，再把政策、园区、基金、创投、创业赛事和无息贷款组织成一条可执行的成长路径。Demo 中用户输入一段 BP 摘要后，系统会完成从 `Search` 到 `Match & Action` 的闭环展示。
