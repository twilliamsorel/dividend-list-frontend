import MainNav from "../components/MainNav"
import Filters from "../components/Filters"
import Table from "../components/Table"
import { useState, useRef, useCallback, useEffect } from "react"
import { getRequest } from "../utils"

export default function Discover () {
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState(0)
  const [activeSort, setActiveSort] = useState({category: 0, direction: 'asc'})
  const [data, setData] = useState([])
  const lock = useRef(false)
  const queryRef = useRef(searchQuery)

  // Write a test for this
  const throttle = useCallback((cb: () => void, timer: number) => {
    if (!lock.current) { 
      lock.current = true

      setTimeout(() => {
        cb()
        lock.current = false
      }, timer )
    }
  }, [])

  // Write a test for these, somehow
  useEffect(() => {
    queryRef.current = searchQuery

    if (queryRef.current.length > 0) {
      throttle(async () => {
        const res = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/search/${searchQuery}`)
        
        if (queryRef.current.length < 1) return 
        setPagination(0)
        setData(JSON.parse(res))
      }, 400)
    } else {
      (async function () {
        const res = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/paginate/${pagination}?sort_by=${activeSort.category}&direction=${activeSort.direction}`)
        
        setData((data) => pagination === 0 ? JSON.parse(res) : data.concat(JSON.parse(res)))
      }())
    }

    const scrollEvent = () => {
      if (window.innerHeight - document.body.getBoundingClientRect().bottom >= 0 && searchQuery.length === 0) {
        setPagination(pagination + 1)
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => window.removeEventListener('scroll', scrollEvent)
  }, [pagination, searchQuery, throttle, activeSort])

  return (
    <>
      <MainNav title="Discover" />
      <Filters searchState={{ searchQuery, setSearchQuery }} />
      <Table data={data} filters={{setPagination, sort: { activeSort, setActiveSort}}} />
    </>
  )
}