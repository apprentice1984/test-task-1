import React, { useRef } from 'react'
import styles from '../../styles/Search.module.css'
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'
import { useDispatch } from 'react-redux'
import { filterPosts } from '../tables/postsSlice'

const Search = () => {
  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(filterPosts(e.target.value))
  }

  const handleClick = (e) => {
    inputRef.current.focus()
  }

  return (
    <div className={styles.searchField}>
      <input
        type='search'
        placeholder='Поиск'
        className={styles.searchInput}
        onChange={handleChange}
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
