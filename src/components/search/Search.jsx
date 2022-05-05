import React, { useRef } from 'react'
import styles from '../../styles/Search.module.css'
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'

const Search = () => {
  const inputRef = useRef(null)

  const handleClick = (e) => {
    inputRef.current.focus()
  }

  return (
    <div className={styles.searchField}>
      <input
        type='search'
        placeholder='Поиск'
        className={styles.searchInput}
        ref={inputRef}
      />
      <SearchIcon style={styleForSvg} onClick={() => handleClick()} />
    </div>
  )
}

const styleForSvg = {
  position: 'absolute',
  right: '25px',
}

export default Search
