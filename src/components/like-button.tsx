import React, { useState } from 'react';
import axios from 'axios'
import styles from '../styles/like-button.module.css'

type Props = {
  slug: string;
  post: number;
}

const LikeButton = (props: Props) => {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    if (!active) {
      axios.put(`/api/like?slug=${props.slug}`, {})
      setActive(true)
    }
  }

  return (
    <button onClick={handleClick} className={styles.likeButton}>♥ {props.post ?? 0} </button>
  )
}

export default LikeButton