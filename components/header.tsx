<<<<<<< HEAD
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SITE_TITLE } from './document-head'
import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const { asPath } = useRouter()

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Portfolio', path: 'https://notion-portfolio-site.vercel.app/' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/" passHref>
          <a>{SITE_TITLE}</a>
        </Link>
      </h1>

      <ul>
        {navItems.map(({ label, path }) => (
          <li key={label}>
            <Link href={path} passHref>
              <a className={asPath === path ? 'active' : null}>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
=======
import Link from 'next/link'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_SITE_TITLE } from '../lib/notion/server-constants'
import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const { asPath } = useRouter()

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
  ]

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/" passHref>
          <a>{NEXT_PUBLIC_SITE_TITLE}</a>
        </Link>
      </h1>

      <ul>
        {navItems.map(({ label, path }) => (
          <li key={label}>
            <Link href={path} passHref>
              <a className={asPath === path ? 'active' : null}>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
>>>>>>> e5669f8 (Replace SITE_TITLE and SITE_DESCRIPTION with NEXT_PUBLIC_)
