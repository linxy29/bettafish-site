/* BettaFish site — bettafish.site
 *
 * 联系表单走 Formspree；若端点不可用会自动降级成 mailto，不会静默失败。
 */
const FORM_ENDPOINT = 'https://formspree.io/f/xqpkqzly'
const CONTACT_EMAIL = 'hyperturbedd@outlook.com'

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

  const mailtoFallback = (data, note) => {
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
    say(note || t('已为你打开邮件客户端，请点击发送。', 'Your mail client is open — press send to finish.'), true)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!form.reportValidity()) return

    const data = new FormData(form)
    if (data.get('_gotcha')) return // honeypot: silently drop bots

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
      mailtoFallback(
        data,
        t('发送失败，已为你打开邮件客户端，请点击发送。',
          'Could not send — your mail client is open, press send to finish.')
      )
    } finally {
      submit.disabled = false
      submit.classList.remove('opacity-60')
    }
  })
}
