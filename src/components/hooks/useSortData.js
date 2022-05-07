import { useState, useMemo } from 'react'

export const useSortData = (items) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'descending',
  })

  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  let sortPosts = useMemo(() => {
    let sortedPosts = [...items]

    if (sortConfig) {
      if (sortConfig.key !== 'id') {
        sortedPosts.sort((a, b) => {
          if (a[sortConfig.key].length < b[sortConfig.key].length) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if (a[sortConfig.key].length > b[sortConfig.key].length) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      } else {
        sortedPosts.sort((a, b) => {
          if (sortConfig.direction === 'ascending') {
            return -1
          } else {
            return 1
          }
        })
      }
    }
    return sortedPosts
  }, [sortConfig, items])

  return { sortPosts, requestSort, sortConfig }
}
