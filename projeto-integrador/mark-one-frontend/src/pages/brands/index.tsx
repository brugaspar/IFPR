import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { ProductBrandsModal } from "../../components/ProductBrandsModal"
import { FilterContainer } from "../../components/FilterContainer"
import { PaginationBar } from "../../components/PaginationBar"
import { PaginationSelector } from "../../components/PaginationSelector"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/brands.styles"

type ProductBrand = {
  id: string
  name: string
  disabled: boolean
  createdAt: string
  updatedAt: string
  disabledAt: string
  disabledByUser: string
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

  const [sort, setSort] = useState({ name: "", sort: "asc" })

  const timeoutRef = useRef<any>(0)

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(brands.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItens = brands.slice(startIndex, endIndex)

  function sortTable(field: string) {
    switch (field) {
      case "name": {
        if (sort.sort === "asc") {
          setSort({ name: "name", sort: "desc" })
        } else {
          setSort({ name: "name", sort: "asc" })
        }

        break
      }
      case "created_at": {
        if (sort.sort === "asc") {
          setSort({ name: "created_at", sort: "desc" })
        } else {
          setSort({ name: "created_at", sort: "asc" })
        }

        break
      }
      case "updated_at": {
        if (sort.sort === "asc") {
          setSort({ name: "updated_at", sort: "desc" })
        } else {
          setSort({ name: "updated_at", sort: "asc" })
        }

        break
      }
      case "disabled": {
        if (sort.sort === "asc") {
          setSort({ name: "disabled", sort: "desc" })
        } else {
          setSort({ name: "disabled", sort: "asc" })
        }

        break
      }
    }
  }

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadProductBrands() {
    try {
      const response = await api.get("/brands", {
        params: {
          onlyEnabled,
          search,
          sort,
        },
      })

      toast.dismiss("error")
      setBrands(response.data)
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Sem permissão para visualizar marcas", {
            toastId: "error",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
            position: "bottom-center",
            className: "toastify-custom",
          })
        } else {
          toast.error("Problemas internos ao carregar marcas", { toastId: "error" })
        }
      } else {
        toast.error("Problemas internos ao carregar marcas", { toastId: "error" })
      }
    }
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

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadProductBrands()
  }, [onlyEnabled, isProductBrandModalOpen, reload, sort])

  useEffect(() => {
    setCurrentPage(0)
  }, [itemsPerPage])

  return (
    <Container>
      <Head>
        <title>Mark One | Marcas</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de Marcas</h1>

        <button onClick={handleAddProductBrand} type="button" disabled={!createProductBrandPermission}>
          <FaPlus />
          Nova Marca
        </button>
      </div>

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
              <th className={sort.name === "name" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("name")}>
                Nome <FaChevronUp />
              </th>
              <th
                className={sort.name === "disabled" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("disabled")}
              >
                Status <FaChevronUp />
              </th>
              <th
                className={sort.name === "created_at" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("created_at")}
              >
                Cadastrado em <FaChevronUp />
              </th>
              <th
                className={sort.name === "updated_at" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("updated_at")}
              >
                Última edição <FaChevronUp />
              </th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {currentItens.map((brand) => (
              <tr key={brand.name}>
                <td>
                  <button className="edit" onClick={() => handleEditProductBrand(brand)} disabled={!editProductBrandPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{brand.name}</td>
                <td>{brand.disabled ? "Inativo" : "Ativo"}</td>
                <td>{new Date(brand.createdAt).toLocaleDateString()}</td>
                <td>{new Date(brand.updatedAt).toLocaleString()}</td>
                <td>{brand.disabledAt && new Date(brand.disabledAt).toLocaleDateString()}</td>
                <td>{brand.disabledByUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-div">
        <PaginationSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
        <PaginationBar pages={pages} setCurrentPage={setCurrentPage} />
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

  const userHasPermission = true

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
