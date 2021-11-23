import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaFilter, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { ProductsModal } from "../../components/ProductsModal"
import { Checkbox } from "../../components/Checkbox"
import { SearchBar } from "../../components/SearchBar"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/products.styles"
import { FilterContainer } from "../../components/FilterContainer"

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

  const timeoutRef = useRef<any>(0)

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadProducts() {
    const response = await api.get("/products", {
      params: {
        onlyEnabled,
        search,
      },
    })

    setProducts(response.data)
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
    loadProducts()
  }, [onlyEnabled, isProductModalOpen, reload])

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
        placeholder="Nome, marca ou grupo"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Grupo</th>
              <th>Tipo</th>
              <th>Estoque atual</th>
              <th>Estoque mínimo</th>
              <th>Preço</th>
              <th>Cadastrado em</th>
              <th>Última edição</th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditProduct(product)} disabled={!editProductPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{product.name}</td>
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
