# bettafish.site

BettaFish 官网。纯静态 HTML + Tailwind CSS，部署在 GitHub Pages。

```
index.html            中文首页
en/index.html         English homepage
assets/css/tailwind.css   构建产物（由 src/input.css 生成，已提交）
assets/js/site.js     移动端导航、联系表单
assets/favicon.svg
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

## 上线前必须替换

| 位置 | 内容 |
|---|---|
| `assets/js/site.js` | `FORM_ENDPOINT` — 换成 Formspree／Tally 的真实端点。未替换时表单自动降级为 `mailto:`，不会静默失败 |
| `assets/js/site.js` | `CONTACT_EMAIL` — 换成真实收件邮箱 |
| 两个 `index.html` | `[各模块单价待定]` / `[per-module pricing TBC]` |
| 两个 `index.html` | 模块 05、06 里 `[…待补充]` / `[…to be confirmed]` 四条要点 |
| 两个 `index.html` | 页脚 `[公司全称占位]`、`[ICP 备案号占位]` / `[legal entity placeholder]` |
| `index.html` 产品界面 | 目前是手绘示意图。产品界面成型后建议换成真实截图 |

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
