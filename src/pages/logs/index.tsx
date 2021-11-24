import { GetServerSideProps } from "next"
import Head from "next/head"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { Container } from "../../styles/logs.styles"
import { SearchBar } from "../../components/SearchBar"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { api } from "../../services/api.service"

type Log = {
  id: string
  description: string
  action: "insert" | "update" | "disable" | "delete" | "sign_in_error"
  table: {
    name: "users"
  }
  referenceId: string
  user: {
    name: string
  }
  createdAt: string
}

const logAction = {
  insert: "Inserção",
  update: "Alteração",
  disable: "Desativação",
  delete: "Exclusão",
  sign_in_error: "Erro de autenticação (login)",
}

const logTable = {
  users: "Usuários",
  members: "Membros",
  general_tables: "Tabelas do Sistema",
  general_logs: "Logs do Sistema",
  permissions: "Permissões",
  states: "Estados",
  cities: "Cidades",
  members_plans: "Planos",
  members_addresses: "Endereços de Membros",
  members_documents: "Documentos de Membros",
  products_brands: "Marcas de Produtos",
  products_groups: "Grupos de Produtos",
  products: "Produtos",
  activities: "Atividades",
  activities_items: "Itens da Atividade",
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([])

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

  async function loadLogs() {
    try {
      const response = await api.get("/logs", {
        params: {
          search,
        },
      })

      toast.dismiss("error")
      setLogs(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar logs", { toastId: "error" })
    }
  }

  useEffect(() => {
    loadLogs()
  }, [reload])

  return (
    <Container>
      <Head>
        <title>Mark One | Logs do Sistema</title>
      </Head>

      <div className="header">
        <h1 className="title">Registro de Logs</h1>
      </div>

      <div className="scroll-div">
        <SearchBar placeholder="Descrição ou usuário" onChange={(event) => handleSearchFilter(event.target.value)} />

        <table className="styled-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Ação realizada</th>
              <th>Tabela</th>
              <th>Usuário</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.description}</td>
                <td>{logAction[log.action]}</td>
                <td>{logTable[log.table.name]}</td>
                <td>{log.user.name}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

  // const userHasPermission = await verifyUserPermissions("list_logs", [], ctx)
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
