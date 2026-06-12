# 考研经济学 · 学习进度地图（桌面版）

西方经济学（高鸿业）**微观经济学** 与 **宏观经济学** 两门，各自独立。
知识树骨架 + 按需细分、前置追溯、可配置多家 AI、历史例子、可导出复盘资料。

> 这是独立于"考研数学学习地图"的另一个软件，结构和功能一致，但只含经济学两门。

## 文件结构
- `template.html` —— 引擎模板（界面 + 逻辑，唯一源头，不直接打开）
- `build.js` —— 全部知识点内容（微观/宏观）；运行它生成下面的页面
- `index.html` —— 首页（两门入口）← 启动页
- `微观经济学.html` / `宏观经济学.html` —— 各科独立页面（build.js 生成）
- `main.js` / `preload.js` —— Electron 桌面壳（主进程代发 AI 请求，绕开 CORS）
- `build.bat` —— Windows 一键打包

> 加内容/加科目：编辑 build.js，再 node build.js 重新生成。引擎只在 template.html 一处。

## 出 exe（推荐）
1. 装 Node.js（https://nodejs.org，LTS）。
2. 双击 build.bat（自动：生成页面 → 装依赖 → 打包）。
3. 到 dist\ 找安装包（.exe，名为 EconStudyMap Setup）。
4. [📥 点击这里下载 exe 安装包](https://github.com/adeepbook/econ-study-app/releases/download/v1.0/KaoyanStudyMap.Setup.2.0.0.exe)

## 或用 Claude Code
VS Code 打开本文件夹，对 Claude Code 说：
> 这是一个 Electron 项目。先 node build.js 生成页面，再 npm install、npm run dist:win 打成 Windows 安装包，报错就修。

## 配置 AI（右上「⚙ 模型」）
DeepSeek / OpenAI / Gemini / 自定义；填自己的 key、选模型，顶部始终显示当前模型。
经济学不分数一数三，"数一/数三"筛选会自动隐藏。

## 学习功能
- 🔍 细分知识点：把当前点拆成更细的子点，一键加入树
- ⛏ 前置拆解：往下找更基础的前置知识
- 📜 历史例子：用真实历史事件把概念讲活
- 零基础开关：假设无背景、每个术语都解释
- /btw：问题外话，不影响当前对话上下文
- ⬇ 导出复盘：笔记 + 已存入的 AI 解析，排版成 PDF / Markdown

## 数据
进度与笔记保存在本机，不上传。内容靠 AI 即时生成 + 自己积累，结构是预置的。
