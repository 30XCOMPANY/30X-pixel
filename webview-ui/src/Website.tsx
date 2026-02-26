/**
 * [INPUT]: 依赖 react-router-dom 的路由能力，依赖 App 的像素办公室渲染能力
 * [OUTPUT]: 对外提供 30X.company 官网路由与页面结构
 * [POS]: webview-ui 的网站入口壳层，承载导航、页面布局和内容编排
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import App from './App.js'
import './site.css'

const NAV_ITEMS = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于我们' },
  { to: '/services', label: '产品服务' },
  { to: '/contact', label: '联系方式' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function SiteHeader() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="site-wrap">
        <div className="site-header-inner">
          <Link className="site-logo" to="/" onClick={closeMenu}>
            30X.company
          </Link>
          <button className="site-menu-btn" onClick={() => setOpen((v) => !v)} aria-label="切换导航">
            菜单
          </button>
          <nav className={`site-nav ${open ? 'site-nav-open' : ''}`}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `site-nav-link ${isActive ? 'site-nav-link-active' : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <div className="site-wrap">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Pixel-native product studio</p>
          <h1>30X.company 把复杂系统做成清晰、可运行、可增长的产品。</h1>
          <p className="hero-subtitle">
            我们把设计、工程与 AI 自动化融合在一个像素办公室里，把点子变成上线可验证的真实产品。
          </p>
          <div className="hero-actions">
            <Link to="/services" className="site-btn site-btn-primary">查看产品服务</Link>
            <Link to="/contact" className="site-btn site-btn-secondary">联系我们</Link>
          </div>
        </div>
        <div className="office-stage">
          <App mode="website" />
        </div>
      </section>

      <section className="site-section">
        <h2>我们做什么</h2>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>产品孵化</h3>
            <p>从 0 到 1 定义 MVP，快速落地并验证市场信号。</p>
          </article>
          <article className="feature-card">
            <h3>增长工程</h3>
            <p>把实验、追踪、内容和转化流程接成可复用的增长系统。</p>
          </article>
          <article className="feature-card">
            <h3>AI 工作流</h3>
            <p>将 AI agent 接入研发和运营主链路，减少重复性工作。</p>
          </article>
        </div>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="site-wrap">
      <section className="site-section">
        <p className="eyebrow">About 30X</p>
        <h1>我们是一支偏工程驱动的产品团队。</h1>
        <p>
          30X.company 专注把创意变成可持续运行的业务系统。我们坚持小步快跑、快速验证、持续迭代，
          用简单直接的方案解决真实问题。
        </p>
      </section>
      <section className="site-section">
        <h2>合作方式</h2>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>Discovery Sprint</h3>
            <p>1-2 周明确产品定位、目标用户、优先级路线图。</p>
          </article>
          <article className="feature-card">
            <h3>Build Sprint</h3>
            <p>4-8 周交付可上线版本，包含埋点、监控和基础运营能力。</p>
          </article>
          <article className="feature-card">
            <h3>Growth Sprint</h3>
            <p>持续优化获客和留存，把数据反馈接入产品迭代闭环。</p>
          </article>
        </div>
      </section>
    </div>
  )
}

function ServicesPage() {
  return (
    <div className="site-wrap">
      <section className="site-section">
        <p className="eyebrow">Products & Services</p>
        <h1>面向产品化增长的完整服务栈。</h1>
        <div className="services-list">
          <article className="service-item">
            <h3>产品策略与原型</h3>
            <p>用户研究、信息架构、交互原型与可落地规格。</p>
          </article>
          <article className="service-item">
            <h3>Web 应用开发</h3>
            <p>React + TypeScript 全栈落地，注重性能和维护成本。</p>
          </article>
          <article className="service-item">
            <h3>增长与自动化</h3>
            <p>埋点、实验、内容系统与 AI agent 自动化流程集成。</p>
          </article>
          <article className="service-item">
            <h3>部署与运维</h3>
            <p>Vercel 部署、监控告警、发布流程与可观测性建设。</p>
          </article>
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="site-wrap">
      <section className="site-section">
        <p className="eyebrow">Contact</p>
        <h1>把你的项目发给我们。</h1>
        <p>我们会在 1-2 个工作日内回复，给出清晰的下一步建议。</p>
        <div className="contact-grid">
          <article className="feature-card">
            <h3>Email</h3>
            <p><a href="mailto:hello@30x.company">hello@30x.company</a></p>
          </article>
          <article className="feature-card">
            <h3>Business Hours</h3>
            <p>Mon - Fri 10:00 - 19:00 (UTC+8)</p>
          </article>
          <article className="feature-card">
            <h3>Location</h3>
            <p>Remote-first, serving teams globally</p>
          </article>
        </div>
      </section>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-wrap">
        <p>© {new Date().getFullYear()} 30X.company. Built with pixel precision.</p>
      </div>
    </footer>
  )
}

function WebsiteRoutes() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}

export default function Website() {
  return (
    <BrowserRouter>
      <WebsiteRoutes />
    </BrowserRouter>
  )
}
