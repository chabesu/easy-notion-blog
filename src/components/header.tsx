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
    { label: 'Contact', path: 'https://www.noway-form.com/f/41b1d91e-7601-40a7-86df-b2c7208f4666' },
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
