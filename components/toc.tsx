'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'
import styles from '../styles/toc.module.css'

export default function Toc() {
  const addIdsToTitle = () => {
    const entryContainer = document.querySelector('.content')
    if (!entryContainer) {
      return
    }
    const headings = entryContainer.querySelectorAll('h4, h5, h6')

    ;[].forEach.call(headings, (heading: HTMLElement) => {
      const id = heading.textContent
      if (!heading.getAttribute('id')) {
        heading.setAttribute('id', id)
      }
    })
  }

  const isHeadingsExists = () => {
    const entryContainer = document.querySelector('.content')
    if (!entryContainer) {
      return
    }
    const headings = entryContainer.querySelectorAll('h4, h5, h6')
    if (headings.length === 0) {
      return false
    }
    return true
  }

  useEffect(() => {
    addIdsToTitle()
    const item = document.querySelector('.js-toc') as HTMLElement
    if (!item) {
      return
    }
    if (!isHeadingsExists()) {
      return
    }
    item.style.display = 'block'
    tocbot.init({
      tocSelector: '.js-toc',
      contentSelector: '.content',
      headingSelector: 'h4, h5, h6',
    })

    return () => tocbot.destroy()
  }, [])

  return (
    <div className={styles.tocbox}>
      <div className="js-toc"></div>
    </div>
  )
}
