import MainNav from "../components/MainNav"
import Filters from "../components/Filters"
import Table from "../components/Table"
import { useState } from "react"

export default function Discover () {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <MainNav title="Discover" />
      <Filters searchState={{ searchQuery, setSearchQuery }} />
      <Table searchQuery={searchQuery} />
    </>
  )
}