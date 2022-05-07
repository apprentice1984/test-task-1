import React from 'react'
import classnames from 'classnames'
import { usePagination, DOTS } from '../hooks/usePagination'
import { nanoid } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

import './pagination.scss'

const Pagination = (props) => {
  const navigate = useNavigate()

  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props

  // хук usePagination возвращает нам массив с номерами страниц
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  // определяем функции перехода на след страницу
  const onNext = () => {
    onPageChange(currentPage + 1)
    navigate(`page/${currentPage + 1}`)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
    navigate(`page/${currentPage - 1}`)
  }

  //обработчик клика по номеру страницы
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber)
    navigate(`page/${pageNumber}`)
  }

  // кладем в переменную номер последней страницы
  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={classnames('pagination-container')}>
      {/* Кнопка навигации влево */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <span className='arrow'>Назад</span>
      </li>
      {paginationRange.map((pageNumber) => {
        // Если у нас "точки", то показываем точки (юникод значение)
        if (pageNumber === DOTS) {
          return (
            <li className='pagination-item dots' key={nanoid()}>
              &#8230;
            </li>
          )
        }

        // Показать номера страниц
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => handlePageClick(pageNumber)}
            key={nanoid()}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Кнопка навигации вправо */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <span className='arrow'>Далее</span>
      </li>
    </ul>
  )
}

export default Pagination
