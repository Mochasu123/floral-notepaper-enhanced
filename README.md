# 花笺 Floral Notepaper - Personal Enhanced Build

这是一个基于 [Achilng/floral-notepaper](https://github.com/Achilng/floral-notepaper) 的个人增强版本。原项目采用 MIT License，本仓库继续保留原项目许可与来源说明。

这个版本不是官方版本，主要是为个人本地使用做的体验增强：侧栏笔记多了文件夹管理，编辑器交互更接近常规桌面软件，并补了一些自己使用时遇到的细节问题。

## 为什么做这个版本

原版已经足够轻量、好用，但在笔记数量变多以后，侧栏平铺列表不太方便管理；另外正文右键复制粘贴、窗口边界、默认字号、更新检查、文件命名等细节，更适合按照自己的使用习惯调一下。

所以这个仓库的目标不是重写花笺，而是在尽量保留官方代码结构的前提下，维护一组本地需求，方便之后继续合并官方更新。

## 相比原版的主要变化

- 侧栏笔记支持文件夹/分组。
- 文件夹支持折叠、展开、重命名、删除。
- 笔记可以拖拽移动到文件夹。
- 侧栏支持显式开启多选模式，批量移动或删除笔记。
- 文件夹里可以从未分类笔记中批量选择并加入当前文件夹。
- 正文编辑区支持常规右键菜单：复制、粘贴、剪切、全选。
- 增加关于页面和手动检查更新。
- 更新检查改为读取 GitHub Releases 页面，避免部分网络环境下 GitHub API 403。
- UI 对比度、默认字号、窗口边框和阴影做了增强。
- 设置里新增界面功能字号，用于调整按钮、列表、状态栏、工具栏等小字号。
- `.md` 文件名会跟随笔记标题，格式类似 `标题__uuid.md`，兼顾可读性和 metadata 损坏后的恢复能力。

## 本地安装方式

当前本机使用的是便携式安装：

```text
C:\Tools\花笺\floral-notepaper.exe
```

笔记数据仍然保存在用户文档目录下，不和程序目录混放。

## 开发与构建

需要：

- Node.js
- Rust
- Tauri 2

常用命令：

```powershell
npm install
npm test
npm run build
cargo test --manifest-path src-tauri\Cargo.toml
npx tauri build --no-bundle
```

构建出的主程序在：

```text
src-tauri\target\release\floral-notepaper.exe
```

## 与官方同步

本仓库保留官方远端为 `upstream`：

```powershell
git remote -v
```

以后官方更新时，可以在本地分支上拉取并合并官方改动，再重新构建。仓库里也保留了辅助脚本：

```powershell
.\tools\update-from-official.ps1
```

## 致谢

感谢原项目作者 [Achilng](https://github.com/Achilng) 开源 [floral-notepaper](https://github.com/Achilng/floral-notepaper)。本项目只是基于原项目做的个人需求增强。

## License

MIT License。详见 [LICENSE](LICENSE)。
