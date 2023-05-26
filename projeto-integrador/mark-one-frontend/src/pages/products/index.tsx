import Head from "next/head"
import { GetServerSideProps } from "next"
import { useEffect, useRef, useState } from "react"
import { FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { ProductsModal } from "../../components/ProductsModal"
import { FilterContainer } from "../../components/FilterContainer"
import { PaginationBar } from "../../components/PaginationBar"
import { PaginationSelector } from "../../components/PaginationSelector"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/products.styles"

type Product = {
  id: string
  name: string
  quantity: number
  minimumQuantity: number
  price: number
  brand: {
    id: string
    name: string
  }
  group: {
    id: string
    name: string
  }
  disabled: boolean
  isService: boolean
  createdAt: string
  updatedAt: string
  disabledAt: string
  disabledByUser: string
}

export default function Products() {
  const { user } = useAuth()
  const userPermissions = user?.permissions || []

  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const [createProductPermission, setCreateProductPermission] = useState(false)
  const [editProductPermission, setEditProductPermission] = useState(false)

  const [search, setSearch] = useState("")
  const [reload, setReload] = useState(false)

  const [sort, setSort] = useState({ name: "", sort: "asc" })

  const timeoutRef = useRef<any>(0)

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(products.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItens = products.slice(startIndex, endIndex)

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
      case "brand": {
        if (sort.sort === "asc") {
          setSort({ name: "brand", sort: "desc" })
        } else {
          setSort({ name: "brand", sort: "asc" })
        }

        break
      }
      case "group": {
        if (sort.sort === "asc") {
          setSort({ name: "group", sort: "desc" })
        } else {
          setSort({ name: "group", sort: "asc" })
        }

        break
      }
      case "is_service": {
        if (sort.sort === "asc") {
          setSort({ name: "is_service", sort: "desc" })
        } else {
          setSort({ name: "is_service", sort: "asc" })
        }

        break
      }
      case "quantity": {
        if (sort.sort === "asc") {
          setSort({ name: "quantity", sort: "desc" })
        } else {
          setSort({ name: "quantity", sort: "asc" })
        }

        break
      }
      case "minimum_quantity": {
        if (sort.sort === "asc") {
          setSort({ name: "minimum_quantity", sort: "desc" })
        } else {
          setSort({ name: "minimum_quantity", sort: "asc" })
        }

        break
      }
      case "price": {
        if (sort.sort === "asc") {
          setSort({ name: "price", sort: "desc" })
        } else {
          setSort({ name: "price", sort: "asc" })
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

  async function loadProducts() {
    try {
      const response = await api.get("/products", {
        params: {
          onlyEnabled,
          search,
          sort,
        },
      })

      toast.dismiss("error")
      setProducts(response.data)
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Sem permissão para visualizar produtos", {
            toastId: "error",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
            position: "bottom-center",
            className: "toastify-custom",
          })
        } else {
          toast.error("Problemas internos ao carregar produtos", { toastId: "error" })
        }
      } else {
        toast.error("Problemas internos ao carregar produtos", { toastId: "error" })
      }
    }
  }

  function handleOpenProductModal() {
    setIsProductModalOpen(true)
  }

  function handleCloseProductModal() {
    setIsProductModalOpen(false)
  }

  function handleAddProduct() {
    setSelectedProduct(null)
    handleOpenProductModal()
  }

  function handleEditProduct(product: Product) {
    setSelectedProduct(product.id)
    handleOpenProductModal()
  }

  function handleToggleOnlyEnabled() {
    setOnlyEnabled(!onlyEnabled)
  }

  async function verifyPermissions() {
    const userHasCreateProductPermission = await verifyUserPermissions("create_products", userPermissions)
    setCreateProductPermission(userHasCreateProductPermission)

    const userHasEditProductPermission = await verifyUserPermissions("edit_products", userPermissions)
    setEditProductPermission(userHasEditProductPermission)
  }

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [onlyEnabled, isProductModalOpen, reload, sort])

  useEffect(() => {
    setCurrentPage(0)
  }, [itemsPerPage])

  return (
    <Container>
      <Head>
        <title>Mark One | Produtos</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de Produtos</h1>

        <button onClick={handleAddProduct} type="button" disabled={!createProductPermission}>
          <FaPlus />
          Novo Produto
        </button>
      </div>

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome, marca ou grupo"
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
              <th className={sort.name === "brand" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("brand")}>
                Marca <FaChevronUp />
              </th>
              <th className={sort.name === "group" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("group")}>
                Grupo <FaChevronUp />
              </th>
              <th
                className={sort.name === "is_service" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("is_service")}
              >
                Tipo <FaChevronUp />
              </th>
              <th
                className={sort.name === "quantity" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("quantity")}
              >
                Estoque atual <FaChevronUp />
              </th>
              <th
                className={sort.name === "minimum_quantity" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("minimum_quantity")}
              >
                Estoque mínimo <FaChevronUp />
              </th>
              <th className={sort.name === "price" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("price")}>
                Preço <FaChevronUp />
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
            {currentItens.map((product) => (
              <tr key={product.name}>
                <td>
                  <button className="edit" onClick={() => handleEditProduct(product)} disabled={!editProductPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{product.name}</td>
                <td>{product.disabled ? "Inativo" : "Ativo"}</td>
                <td>{product.brand.name}</td>
                <td>{product.group.name}</td>
                <td>{product.isService ? "Serviço" : "Produto"}</td>
                <td>{product.quantity}</td>
                <td>{product.minimumQuantity}</td>
                <td>{product.price ? product.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) : 0}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>{new Date(product.updatedAt).toLocaleString()}</td>
                <td>{product.disabledAt && new Date(product.disabledAt).toLocaleDateString()}</td>
                <td>{product.disabledByUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-div">
        <PaginationSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
        <PaginationBar pages={pages} setCurrentPage={setCurrentPage} />
      </div>

      <ProductsModal isOpen={isProductModalOpen} onRequestClose={handleCloseProductModal} productId={selectedProduct || ""} />
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
