import React, { useState } from 'react'
import axios from 'axios'
import styles from '../styles/like-button.module.css'

type Props = {
  slug: string
  post: number
}

const LikeButton = (props: Props) => {
  const [active, setActive] = useState(false)
  const [like, setLike] = useState(props.post)

  const handleClick = () => {
    if (!active) {
      axios.put(`/api/like?slug=${props.slug}`, {})
      setActive(true)
      setLike((like) => like + 1)
    }
  }

  return (
    <button onClick={handleClick} className={styles.likeButton}>
      ♥ {like ?? 0}{' '}
    </button>
  )
}

export default LikeButton
