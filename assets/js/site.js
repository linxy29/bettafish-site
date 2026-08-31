/* BettaFish site — bettafish.site
 *
 * ⚠️ 上线前必须替换：把 FORM_ENDPOINT 换成你的 Formspree / Tally 表单端点。
 *    在 https://formspree.io 建表单后会拿到形如 https://formspree.io/f/abcdwxyz 的地址。
 *    在替换之前，表单会自动降级成打开邮件客户端（mailto），不会静默失败。
 */
const FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_FORM_ID'
const CONTACT_EMAIL = 'hello@bettafish.site' // ⚠️ 换成真实收件邮箱

const isEN = document.documentElement.lang.startsWith('en')
const t = (zh, en) => (isEN ? en : zh)

/* ── mobile navigation ─────────────────────────────────── */
const navToggle = document.getElementById('navToggle')
const mobileNav = document.getElementById('mobileNav')
const iconOpen = document.getElementById('navIconOpen')
const iconClose = document.getElementById('navIconClose')

if (navToggle && mobileNav) {
  const setNav = (open) => {
    mobileNav.hidden = !open
    navToggle.setAttribute('aria-expanded', String(open))
    navToggle.setAttribute('aria-label', open ? t('关闭菜单', 'Close menu') : t('打开菜单', 'Open menu'))
    iconOpen.classList.toggle('hidden', open)
    iconClose.classList.toggle('hidden', !open)
  }
  navToggle.addEventListener('click', () => setNav(mobileNav.hidden))
  mobileNav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setNav(false)
  })
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileNav.hidden) setNav(false)
  })
  // a resize past the lg breakpoint leaves the panel stranded open
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches) setNav(false)
  })
}

/* ── footer year ───────────────────────────────────────── */
const year = document.getElementById('year')
if (year) year.textContent = String(new Date().getFullYear())

/* ── contact form ──────────────────────────────────────── */
const form = document.getElementById('contactForm')
const status = document.getElementById('cfStatus')
const submit = document.getElementById('cfSubmit')

if (form && status && submit) {
  const say = (msg, ok) => {
    status.textContent = msg
    status.classList.remove('hidden', 'text-ok', 'text-[#c6533e]')
    status.classList.add(ok ? 'text-ok' : 'text-[#c6533e]')
  }

  const mailtoFallback = (data) => {
    const subject = t('BettaFish 咨询', 'BettaFish enquiry') + ' — ' + (data.get('topic') || '')
    const body = [
      t('称呼', 'Name') + ': ' + (data.get('name') || ''),
      t('邮箱', 'Email') + ': ' + (data.get('email') || ''),
      t('单位／课题组', 'Organisation') + ': ' + (data.get('organisation') || ''),
      t('想了解什么', 'Interested in') + ': ' + (data.get('topic') || ''),
      '',
      data.get('message') || '',
    ].join('\n')
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    say(t('已为你打开邮件客户端，请点击发送。', 'Your mail client is open — press send to finish.'), true)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!form.reportValidity()) return

    const data = new FormData(form)
    if (data.get('_gotcha')) return // honeypot: silently drop bots

    if (FORM_ENDPOINT.includes('REPLACE_WITH')) {
      mailtoFallback(data)
      return
    }

    submit.disabled = true
    submit.classList.add('opacity-60')
    say(t('发送中……', 'Sending…'), true)

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      say(t('已收到，我们会尽快回复你。', "Got it — we'll get back to you shortly."), true)
    } catch {
      say(
        t(`发送失败，请直接写信到 ${CONTACT_EMAIL}。`, `Could not send — please email ${CONTACT_EMAIL} directly.`),
        false
      )
    } finally {
      submit.disabled = false
      submit.classList.remove('opacity-60')
    }
  })
}
