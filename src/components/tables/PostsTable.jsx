import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../styles/PostsTable.module.css'
import Spinner from '../spinner/Spinner'
import Pagination from '../pagination/Pagination'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'

let PageSize = 10

const PostsTable = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
      console.log('i fire once')
    }
  }, [postStatus, dispatch])

  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return posts.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, posts])

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
              <th scope='col'>ID</th>
              <th scope='col'>Заголовок</th>
              <th scope='col'>Описание</th>
            </tr>
          </thead>
          <tbody>{tableRowsPosts}</tbody>
        </table>
        <Pagination
          className='pagination-bar'
          currentPage={currentPage}
          totalCount={posts.length}
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
