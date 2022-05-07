import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { useSortData } from '../hooks/useSortData'
import { selectAllPosts, fetchPosts } from './postsSlice'
import Spinner from '../spinner/Spinner'
import Pagination from '../pagination/Pagination'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as SortIcon } from '../../assets/iconForSorting.svg'
import styles from '../../styles/PostsTable.module.css'

let PageSize = 10

const PostsTable = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const navigate = useNavigate()

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  const [currentPage, setCurrentPage] = useState(1)

  const { sortPosts, requestSort, sortConfig } = useSortData(posts)

  const getStyling = (name) => {
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
      navigate('/')
    }
  }, [postStatus, dispatch, navigate])

  //кладем в переменную записи для текущей страницы
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    if (sortPosts.slice(firstPageIndex, lastPageIndex).length !== 0) {
      return sortPosts.slice(firstPageIndex, lastPageIndex)
    } else if (postStatus === 'succeeded') {
      setCurrentPage(Math.ceil(sortPosts.length / PageSize))
      return sortPosts
    } else {
      return sortPosts
    }
  }, [currentPage, sortPosts, postStatus])

  //обработчик для переключения страницы
  const changePage = (page) => {
    setCurrentPage(page)
  }

  //объявляем переменную под контент с таблицей постов
  let content

  //в зависимости от статуса запроса на сервер - loading, success, fail - будем возвращать разные данные (content)
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
                  style={getStyling('id')}
                  onClick={() => requestSort('id')}
                />
              </th>
              <th scope='col'>
                Заголовок
                <SortIcon
                  style={getStyling('title')}
                  onClick={() => requestSort('title')}
                />
              </th>
              <th scope='col'>
                Описание
                <SortIcon
                  style={getStyling('body')}
                  onClick={() => requestSort('body')}
                />
              </th>
            </tr>
          </thead>
          <tbody>{tableRowsPosts}</tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalCount={sortPosts.length}
          pageSize={PageSize}
          onPageChange={changePage}
        />
      </>
    )
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return content
}

export default PostsTable
