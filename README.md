# bettafish.site

BettaFish 官网。纯静态 HTML + Tailwind CSS，部署在 GitHub Pages。

```
index.html            English homepage（默认语言，站点根路径）
zh/index.html         中文首页
en/index.html         旧路径，noindex + 重定向到 /
assets/css/tailwind.css   构建产物（由 src/input.css 生成，已提交）
assets/js/site.js     移动端导航、联系表单
assets/img/           logo 与产品截图（取自线上产品 betta-fish-ops.github.io）
src/input.css         Tailwind 入口与组件类
tailwind.config.js    品牌色与字体
design/               设计稿源文件（.dc.html）与本地预览
```

## 本地开发

```bash
npm install
npm run dev     # 监听 src/input.css，改动即重建 CSS
npm run serve   # 另开一个终端，http://localhost:4173
```

改完 HTML 直接提交推送；GitHub Actions 会重新构建 CSS 并部署。

**双语约定**：英文是默认语言，位于站点根路径 `/`；中文位于 `/zh/`。
两份 HTML 是各自独立维护的完整文件，改内容时**两边都要改**，并保持
`canonical` / `hreflang` / 语言切换链接一致（`x-default` 始终指向 `/`）。

## 已配置

| 位置 | 值 |
|---|---|
| `assets/js/site.js` | `FORM_ENDPOINT` = `https://formspree.io/f/xqpkqzly`（失败时降级为 `mailto:`，不会静默失败） |
| `assets/js/site.js` | `CONTACT_EMAIL` = `hyperturbedd@outlook.com` |
| 两个 `index.html` | 模块 02–04 每个 $10／人／月；模块 05、06 联系我们 |
| 两个 `index.html` | 页脚 `BETTAFISH PTE. LTD. · UEN 202220071M`（新加坡主体，不适用 ICP 备案） |

## 仍需留意

| 位置 | 内容 |
|---|---|
| 产品截图 | 三张截图取自线上产品，界面中出现了用户名 `tangdayu` 与头像（原本就公开在产品站上）。若不想露出，需要重新截图 |
| 会议表格 | 会议名称为真实会议，征稿状态是示意值，需要定期更新或改成动态数据 |

## 图片资源

`assets/img/` 下的 logo 与产品截图直接取自线上产品：

`assets/img/affiliations/` 下是「这些机构的研究者在用」一段的 13 个机构 logo，
顺序与线上产品 welcome 页一致：NTU、NUS、SMU、SZU、SUST、TJU、HKPU、ECNU、
UCAS、UNSW、Continental、NKU、NJU。

```
https://betta-fish-ops.github.io/static/media/fish-1k.719c40fe6a91b54a6550.png              logo.png
https://betta-fish-ops.github.io/static/media/fish-1k-white.377f3adad05c9f4eef3b.png        logo-white.png
https://betta-fish-ops.github.io/static/media/paper_reading_mode.76a79b5ce4ff9bcdafa6.png   paper-reading.png
https://betta-fish-ops.github.io/static/media/note_editing_mode_annotations.704d09357127b0f8aa48.png  annotations.png
https://betta-fish-ops.github.io/static/media/group_knowledge.f8359104d4a7d8b3150f.png      group-knowledge.png
```

线上还有另外几张可用截图（`group_detail`、`group_member`、`research_groups_card`、
`note_editing_mode_notes`），做「关于我们」页时可以按同样方式取。

## 部署

1. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
2. 域名解析：`bettafish.site` 与 `www` 指向 GitHub Pages。
   - `A` 记录 `@` → `185.199.108.153` `185.199.109.153` `185.199.110.153` `185.199.111.153`
   - `CNAME` 记录 `www` → `linxy29.github.io`
3. Settings → Pages → Custom domain 填 `bettafish.site`，勾选 Enforce HTTPS。仓库根目录的 `CNAME` 文件已经写好。

## 注意

现有产品 app 部署在 `bettafish.cc`，其 API 地址在前端按域名硬编码
（`bettafish.cc/api`、`bettafish.tech/api`），代码中没有 `bettafish.site`。
若要把 app 迁到 `app.bettafish.site`，需要同步改前端那段判断。
本站的「登录」按钮目前指向 `https://bettafish.cc/`。
