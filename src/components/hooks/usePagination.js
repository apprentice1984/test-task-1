import { useMemo } from 'react'

export const DOTS = '...'

//определяем функцию, возвращающую массив из номеров страниц
export const range = (start, end) => {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

//определяем хук, который вычисляет количество страниц на основе входных данных из компонента Pagination
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    //определяем количество записей на одну страницу
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const totalPageNumbers = siblingCount + 5

    /*
      Случай 1:
      Если количество страниц меньше, чем сколько мы хотим показать
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    // Определяем номера соседних страниц
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    //Определяем "нужность" точек справа или слева
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    //определяем начальный и конечный номера страниц
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
    	Случай 2: Слева "точек" нет, справа показываем "точки"
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
    	Случай 3: Наоборот от случая 2
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
    	Случай 4: "Точки" и справа, и слева
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
