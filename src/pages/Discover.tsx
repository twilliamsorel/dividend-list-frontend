import MainNav from "../components/MainNav"
import Filters from "../components/Filters"
import Table from "../components/Table"
import { useRef, useEffect } from "react"
import { TableInterface } from "../interfaces/table"

export default function Discover() {
  const table = useRef(new TableInterface())

  // Write a test for these, somehow
  useEffect(() => {
    const scrollEvent = () => {
      const isScrolled = window.innerHeight - document.body.getBoundingClientRect().bottom >= 0
      const searchQuery = table.current.getSearchQuery()
      if (isScrolled && !searchQuery) {
        table.current.paginate()
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => window.removeEventListener('scroll', scrollEvent)
  }, [])

  return (
    <>
      <MainNav title="Discover" />
      <Filters table={table} />
      <Table data={table.current.getData()} filters={{ setPagination, sort: { activeSort, setActiveSort } }} />
    </>
  )
}