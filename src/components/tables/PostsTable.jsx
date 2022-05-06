import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { useSortData } from '../hooks/useSortData'
import { selectAllPosts, fetchPosts } from './postsSlice'
import Spinner from '../spinner/Spinner'
import Pagination from '../pagination/Pagination'

import { ReactComponent as SortIcon } from '../../assets/iconForSorting.svg'
import styles from '../../styles/PostsTable.module.css'

let PageSize = 10

const PostsTable = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  const [currentPage, setCurrentPage] = useState(1)

  const { sortPosts, requestSort, sortConfig } = useSortData(posts)

  const getRotationFor = (name) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name
      ? {
          transform: `rotateX(${
            sortConfig.direction === 'descending' ? '0' : '180'
          }deg)`,
        }
      : undefined
  }

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
    console.log('useEffect ran....')
  }, [postStatus, dispatch])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return sortPosts.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, sortPosts])

  let content

  if (postStatus === 'loading') {
    content = <Spinner />
  } else if (postStatus === 'succeeded') {
    const tableRowsPosts = currentTableData.map((post) => (
      <tr key={nanoid()}>
        <td>
          <div>{post.id}</div>
        </td>
        <td>
          <div>{post.title}</div>
        </td>
        <td>
          <div>{post.body}</div>
        </td>
      </tr>
    ))

    content = (
      <>
        <table className={styles.postsTable}>
          <thead>
            <tr>
              <th scope='col'>
                ID{' '}
                <SortIcon
                  style={getRotationFor('id')}
                  onClick={() => requestSort('id')}
                />
              </th>
              <th scope='col'>
                Заголовок
                <SortIcon
                  style={getRotationFor('title')}
                  onClick={() => requestSort('title')}
                />
              </th>
              <th scope='col'>
                Описание
                <SortIcon
                  style={getRotationFor('body')}
                  onClick={() => requestSort('body')}
                />
              </th>
            </tr>
          </thead>
          <tbody>{tableRowsPosts}</tbody>
        </table>
        <Pagination
          className='pagination-bar'
          currentPage={currentPage}
          totalCount={sortPosts.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </>
    )
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return content
}

export default PostsTable
