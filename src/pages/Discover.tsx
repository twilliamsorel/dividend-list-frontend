import MainNav from "../components/MainNav"
import Filters from "../components/Filters"
import Table from "../components/Table"
import { useRef, useEffect } from "react"
import { useThrottle } from "../utils"
import { getRequest } from "../utils"
import { useTableStore } from "../interfaces/stores"


export default function Discover() {
  const { searchQuery, setPage, setData, page, sort, sortDirection, data } = useTableStore((state) => state)
  const queryRef = useRef(searchQuery)
  const dataRef = useRef(data)
  const throttle = useThrottle()

  useEffect(() => {
    queryRef.current = searchQuery

    if (queryRef.current.length > 0) {
      throttle(async () => {
        const response = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/search/${searchQuery}`)

        if (queryRef.current.length < 1) return
        setPage(0)
        setData(JSON.parse(response))
      }, 400)
    } else {
      (async function () {
        const response = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/paginate/${page}?sort_by=${sort}&direction=${sortDirection}`)
        const result = page === 0 ? JSON.parse(response) : dataRef.current = dataRef.current.concat(JSON.parse(response))
        setData(result)
      }())
    }

    const scrollEvent = () => {
      if (window.innerHeight - document.body.getBoundingClientRect().bottom >= 0 && searchQuery.length === 0) {
        setPage(page + 1)
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => window.removeEventListener('scroll', scrollEvent)
  }, [page, searchQuery, sort, sortDirection, setData, setPage, throttle])

  return (
    <>
      <MainNav title="Discover" />
      <Filters />
      <Table />
    </>
  )
}