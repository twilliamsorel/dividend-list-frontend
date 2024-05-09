import MainNav from "../components/MainNav"
import Filters from "../components/Filters"
import Table from "../components/Table"
import { useRef, useEffect } from "react"
import { useThrottle } from "../utils"
import { getRequest } from "../utils"
import { useTableStore } from "../interfaces/stores"


export default function Discover() {
  const table = useTableStore((state) => state)
  const queryRef = useRef(table.searchQuery)
  const throttle = useThrottle()

  useEffect(() => {
    queryRef.current = table.searchQuery

    if (queryRef.current.length > 0) {
      throttle(async () => {
        const res = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/search/${table.searchQuery}`)

        if (queryRef.current.length < 1) return
        table.setPage(0)
        table.setData(JSON.parse(res))
      }, 400)
    } else {
      (async function () {
        const res = await getRequest(`${import.meta.env.VITE_SERVER_URL}/stocks/paginate/${table.page}?sort_by=${table.sort}&direction=${table.sortDirection}`)
        const data = table.page === 0 ? JSON.parse(res) : table.data.concat(JSON.parse(res))
        table.setData(data)
      }())
    }

    const scrollEvent = () => {
      if (window.innerHeight - document.body.getBoundingClientRect().bottom >= 0 && table.searchQuery.length === 0) {
        table.setPage(table.page + 1)
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => window.removeEventListener('scroll', scrollEvent)
  }, [table, throttle])

  return (
    <>
      <MainNav title="Discover" />
      <Filters />
      <Table />
    </>
  )
}