#!/usr/bin/env python3
"""把 .dc.html 画板导出成可以直接双击打开的本地网页，输出到 preview/。"""
import re, pathlib

base = pathlib.Path(__file__).parent
out = base / 'preview'
out.mkdir(exist_ok=True)

PAGES = [
    ('Main.dc.html',       'main.html',    'BettaFish 首页 · 中文'),
    ('MainEN.dc.html',     'main-en.html', 'BettaFish Homepage · English'),
    ('DirectionA.dc.html', 'alt-a.html',   '备选 A · 科研数据感（未采用）'),
    ('DirectionB.dc.html', 'alt-b.html',   '备选 B · 企业可信感（未采用）'),
]

NAV = ('<a href="index.html">← 目录</a>'
       '<a href="main.html">中文首页</a>'
       '<a href="main-en.html">English</a>'
       '<a href="alt-a.html">备选 A</a>'
       '<a href="alt-b.html">备选 B</a>')

for src, dst, title in PAGES:
    s = (base / src).read_text(encoding='utf-8')
    helmet = re.search(r'<helmet>(.*?)</helmet>', s, re.S).group(1)
    body = re.search(r'</helmet>(.*?)</x-dc>', s, re.S).group(1)
    (out / dst).write_text(f"""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BettaFish · {title}</title>
{helmet}
<style>
  html {{ overflow-x: auto; }}
  .bf-bar {{ position: sticky; top: 0; z-index: 99; display: flex; gap: 18px; align-items: center;
            padding: 10px 18px; background: #101318; color: #cfd6e2;
            font: 13px/1.4 system-ui, sans-serif; }}
  .bf-bar a {{ color: #9fb4ff; text-decoration: none; }}
  .bf-bar a:hover {{ text-decoration: underline; }}
  .bf-bar strong {{ color: #fff; font-weight: 600; margin-right: 6px; }}
</style>
</head>
<body>
<div class="bf-bar"><strong>{title}</strong>{NAV}</div>
{body}
</body>
</html>""", encoding='utf-8')
    print('wrote', out / dst)

(out / 'index.html').write_text("""<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BettaFish 官网设计稿</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&amp;display=swap">
<style>
  :root { color-scheme: light; }
  body { margin: 0; background: #f2f3f6; color: #16191f;
         font-family: "Noto Sans SC", "PingFang SC", sans-serif; }
  header { padding: 44px 48px 32px; background: #fff; border-bottom: 1px solid #e2e5ea; }
  h1 { margin: 0 0 10px; font-size: 26px; }
  header p { margin: 0; color: #5a616c; font-size: 15px; line-height: 1.8; max-width: 820px; }
  section > h2 { margin: 0; padding: 32px 48px 16px; font-size: 15px; color: #6a707a;
                 font-weight: 500; letter-spacing: 0.04em; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; padding: 0 48px 24px; }
  .grid.alt { opacity: 0.82; padding-bottom: 56px; }
  .card { background: #fff; border: 1px solid #e2e5ea; border-radius: 10px; overflow: hidden;
          display: flex; flex-direction: column; }
  .card .shot { height: 420px; overflow: hidden; border-bottom: 1px solid #e2e5ea; background: #fff; }
  .card iframe { width: 1440px; height: 5300px; border: 0; transform: scale(0.46); transform-origin: 0 0; }
  .grid.alt .card .shot { height: 260px; }
  .grid.alt .card iframe { height: 3600px; transform: scale(0.3); }
  .meta { padding: 20px 22px 24px; display: flex; flex-direction: column; gap: 10px; }
  .meta h3 { margin: 0; font-size: 19px; }
  .meta p { margin: 0; font-size: 13.5px; line-height: 1.85; color: #5a616c; }
  .tag { align-self: flex-start; font-size: 12px; padding: 4px 10px; border-radius: 12px;
         background: #e9f3ff; color: #1890ff; }
  .tag.mute { background: #eceef2; color: #767d8a; }
  .open { margin-top: 6px; align-self: flex-start; padding: 10px 18px; border-radius: 6px;
          background: #16191f; color: #fff; text-decoration: none; font-size: 14px; }
  ul { margin: 4px 0 0; padding-left: 18px; font-size: 13.5px; line-height: 1.9; color: #5a616c; }
  @media (max-width: 1180px) { .grid { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<header>
  <h1>BettaFish 官网设计稿</h1>
  <p>定位：科研协作平台（co-research）。六个模块可单独订阅，也可打包成整条工作流。模块 01 的功能与三档价格取自线上产品代码，属实；模块 05／06 的具体能力和各模块单价还需你补。产品界面为示意，非真实截图。</p>
</header>

<section><h2>首版上线页面</h2></section>
<div class="grid">
  <div class="card">
    <div class="shot"><iframe src="main.html" scrolling="no"></iframe></div>
    <div class="meta">
      <span class="tag">中文 · index.html</span>
      <h3>BettaFish 首页（中文）</h3>
      <p>首屏 → 产品界面 → 六个模块 → 协作能力三段 → 学科不限 → 价格 → 申请邀请码。</p>
      <ul>
        <li>待补：模块 05 数据库、模块 06 分析流程的具体能力</li>
        <li>待补：各模块单价、联系邮箱、公司全称、ICP 备案号</li>
      </ul>
      <a class="open" href="main.html">打开完整首页 →</a>
    </div>
  </div>
  <div class="card">
    <div class="shot"><iframe src="main-en.html" scrolling="no"></iframe></div>
    <div class="meta">
      <span class="tag">English · /en/index.html</span>
      <h3>BettaFish Homepage (English)</h3>
      <p>Same structure as the Chinese page. Module 01 copy is lifted from the live app's own wording.</p>
      <ul>
        <li>TBC: module 05 / 06 capability bullets</li>
        <li>TBC: per-module pricing, contact email, legal entity</li>
      </ul>
      <a class="open" href="main-en.html">Open full page →</a>
    </div>
  </div>
</div>

<section><h2>备选草图（未采用，仅留视觉参考；文案基于早期错误的产品假设）</h2></section>
<div class="grid alt">
  <div class="card">
    <div class="shot"><iframe src="alt-a.html" scrolling="no" loading="lazy"></iframe></div>
    <div class="meta">
      <span class="tag mute">未采用</span>
      <h3>备选 A · 科研数据感</h3>
      <p>深色界面 + 数据图形 + 等宽字体。</p>
      <a class="open" href="alt-a.html">打开 →</a>
    </div>
  </div>
  <div class="card">
    <div class="shot"><iframe src="alt-b.html" scrolling="no" loading="lazy"></iframe></div>
    <div class="meta">
      <span class="tag mute">未采用</span>
      <h3>备选 B · 企业可信感</h3>
      <p>浅色宋体 + 案例与合规。做定制版落地页时可以复用这两段。</p>
      <a class="open" href="alt-b.html">打开 →</a>
    </div>
  </div>
</div>
</body>
</html>""", encoding='utf-8')
print('wrote', out / 'index.html')
