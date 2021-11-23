import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaFilter, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { ProductBrandsModal } from "../../components/ProductBrandsModal"
import { Checkbox } from "../../components/Checkbox"
import { SearchBar } from "../../components/SearchBar"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "./styles"
import { FilterContainer } from "../../components/FilterContainer"

type ProductBrand = {
  id: string
  name: string
  disabled: boolean
}

export default function ProductBrands() {
  const { user } = useAuth()
  const userPermissions = user?.permissions || []

  const [brands, setBrands] = useState<ProductBrand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isProductBrandModalOpen, setIsProductBrandModalOpen] = useState(false)

  const [createProductBrandPermission, setCreateProductBrandPermission] = useState(false)
  const [editProductBrandPermission, setEditProductBrandPermission] = useState(false)

  const [search, setSearch] = useState("")
  const [reload, setReload] = useState(false)

  const timeoutRef = useRef<any>(0)

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadProductBrands() {
    const response = await api.get("/brands", {
      params: {
        onlyEnabled,
        search,
      },
    })

    setBrands(response.data)
  }

  function handleOpenProductBrandModal() {
    setIsProductBrandModalOpen(true)
  }

  function handleCloseProductBrandModal() {
    setIsProductBrandModalOpen(false)
  }

  function handleAddProductBrand() {
    setSelectedBrand(null)
    handleOpenProductBrandModal()
  }

  function handleEditProductBrand(brand: ProductBrand) {
    setSelectedBrand(brand.id)
    handleOpenProductBrandModal()
  }

  function handleToggleOnlyEnabled() {
    setOnlyEnabled(!onlyEnabled)
  }

  async function verifyPermissions() {
    const userHasCreateProductBrandPermission = await verifyUserPermissions("create_brands", userPermissions)
    setCreateProductBrandPermission(userHasCreateProductBrandPermission)

    const userHasEditProductBrandPermission = await verifyUserPermissions("edit_brands", userPermissions)
    setEditProductBrandPermission(userHasEditProductBrandPermission)
  }

  // TODO: bolar atualização de dados, para evitar muitas chamadas
  // useEffect(() => {
  //   loadUsers()

  //   const unsubscribe = window.addEventListener("focus", () => {
  //     setReload(!reload)
  //   })

  //   return unsubscribe
  // }, [reload, onlyEnabled])

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadProductBrands()
  }, [onlyEnabled, isProductBrandModalOpen, reload])

  return (
    <Container>
      <Head>
        <title>Mark One | Marcas</title>
      </Head>

      <div className="header">
        <h1 className="title">Marcas</h1>

        <button onClick={handleAddProductBrand} type="button" disabled={!createProductBrandPermission}>
          <FaPlus />
          Nova Marca
        </button>
      </div>

      {/* <div className="filterSection">
        <div className="headerOptions">
          <div className="ho cbActive">
            <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />
          </div>
          <div className="ho searchBar">
            <SearchBar placeholder="Nome" onChange={(event) => handleSearchFilter(event.target.value)} />
          </div>
          <div className="ho bttnFilters">
            <button className="filterBttn" type="button">
                  Filtrar
                  <FaChevronUp className="faChevronDownIcon"/>
              </button>
          </div>
        </div>
      </div> */}

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome da marca"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.name}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditProductBrand(brand)} disabled={!editProductBrandPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{brand.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductBrandsModal
        isOpen={isProductBrandModalOpen}
        onRequestClose={handleCloseProductBrandModal}
        brandId={selectedBrand || ""}
      />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = getAccessToken(ctx)

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const userHasPermission = await verifyUserPermissions("list_members", [], ctx)

  if (!userHasPermission) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
