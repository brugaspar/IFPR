import Head from "next/head"
import { GetServerSideProps } from "next"
import { useEffect, useRef, useState } from "react"
import { FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { MembersModal } from "../../components/MembersModal"
import { PaginationBar } from "../../components/PaginationBar"
import { PaginationSelector } from "../../components/PaginationSelector"
import { FilterContainer } from "../../components/FilterContainer"

import { getAccessToken } from "../../helpers/token.helper"
import { cpfMask } from "../../helpers/mask"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/members.styles"

type Member = {
  id: string
  name: string
  rg: string
  issuingAuthority: string
  issuedAt: string
  cpf: string
  naturalityCityId: string
  motherName: string
  fatherName: string
  profession: string
  email: string
  phone: string
  cellPhone: string
  crNumber: string
  crValidity: string
  birthDate: string
  healthIssues: string
  gender: string
  maritalStatus: string
  bloodTyping: string
  disabled: boolean
  createdAt: string
  updatedAt: string
  planId: string
  disabledAt: string
  disabledByUser: string
}

export default function Members() {
  const { user } = useAuth()
  const userPermissions = user?.permissions || []

  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)

  const [createMemberPermission, setCreateMemberPermission] = useState(false)
  const [editMemberPermission, setEditMemberPermission] = useState(false)

  const [search, setSearch] = useState("")
  const [reload, setReload] = useState(false)

  const [sort, setSort] = useState({ name: "", sort: "asc" })

  const timeoutRef = useRef<any>(0)

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(members.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItens = members.slice(startIndex, endIndex)

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
      case "email": {
        if (sort.sort === "asc") {
          setSort({ name: "email", sort: "desc" })
        } else {
          setSort({ name: "email", sort: "asc" })
        }

        break
      }
      case "profession": {
        if (sort.sort === "asc") {
          setSort({ name: "profession", sort: "desc" })
        } else {
          setSort({ name: "profession", sort: "asc" })
        }

        break
      }

      case "cr_validity": {
        if (sort.sort === "asc") {
          setSort({ name: "cr_validity", sort: "desc" })
        } else {
          setSort({ name: "cr_validity", sort: "asc" })
        }

        break
      }
      case "birth_date": {
        if (sort.sort === "asc") {
          setSort({ name: "birth_date", sort: "desc" })
        } else {
          setSort({ name: "birth_date", sort: "asc" })
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

  async function loadMembers() {
    try {
      const response = await api.get("/members", {
        params: {
          onlyEnabled,
          search,
          sort,
        },
      })

      toast.dismiss("error")
      setMembers(response.data)
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Sem permissão para visualizar membros", {
            toastId: "error",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
            position: "bottom-center",
            className: "toastify-custom",
          })
        } else {
          toast.error("Problemas internos ao carregar membros", { toastId: "error" })
        }
      } else {
        toast.error("Problemas internos ao carregar membros", { toastId: "error" })
      }
    }
  }

  function handleOpenMemberModal() {
    setIsMemberModalOpen(true)
  }

  function handleCloseMemberModal() {
    setIsMemberModalOpen(false)
  }

  function handleAddMember() {
    setSelectedMember(null)
    handleOpenMemberModal()
  }

  function handleEditMember(member: Member) {
    setSelectedMember(member.id)
    handleOpenMemberModal()
  }

  function handleToggleOnlyEnabled() {
    setOnlyEnabled(!onlyEnabled)
  }

  async function verifyPermissions() {
    const userHasCreateMembersPermission = await verifyUserPermissions("create_members", userPermissions)
    setCreateMemberPermission(userHasCreateMembersPermission)

    const userHasEditMembersPermission = await verifyUserPermissions("edit_members", userPermissions)
    setEditMemberPermission(userHasEditMembersPermission)
  }

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadMembers()
  }, [onlyEnabled, isMemberModalOpen, reload, sort])

  useEffect(() => {
    setCurrentPage(0)
  }, [itemsPerPage])

  return (
    <Container>
      <Head>
        <title>Mark One | Membros</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de Membros</h1>

        <button onClick={handleAddMember} type="button" disabled={!createMemberPermission}>
          <FaPlus />
          Novo membro
        </button>
      </div>

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome ou e-mail"
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
              <th className={sort.name === "email" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("email")}>
                E-mail <FaChevronUp />
              </th>
              <th>RG</th>
              <th>CPF</th>
              <th
                className={sort.name === "profession" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("profession")}
              >
                Profissão <FaChevronUp />
              </th>
              <th>N° CR</th>
              <th
                className={sort.name === "cr_validity" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("cr_validity")}
              >
                Validade CR <FaChevronUp />
              </th>
              <th
                className={sort.name === "birth_date" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("birth_date")}
              >
                Nascimento <FaChevronUp />
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
                Cadastro <FaChevronUp />
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
            {currentItens.map((member) => (
              <tr key={member.name}>
                <td>
                  <button className="edit" onClick={() => handleEditMember(member)} disabled={!editMemberPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.rg}</td>
                <td>{cpfMask(member.cpf)}</td>
                <td>{member.profession}</td>
                <td>{member.crNumber}</td>
                <td>{new Date(member.crValidity).toLocaleDateString()}</td>
                <td>{new Date(member.birthDate).toLocaleDateString()}</td>
                <td>{member.disabled ? "Desativo" : "Ativo"}</td>
                <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                <td>{new Date(member.updatedAt).toLocaleString()}</td>
                <td>{member.disabledAt && new Date(member.disabledAt).toLocaleDateString()}</td>
                <td>{member.disabledByUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-div">
        <PaginationSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
        <PaginationBar pages={pages} setCurrentPage={setCurrentPage} />
      </div>

      <MembersModal isOpen={isMemberModalOpen} onRequestClose={handleCloseMemberModal} memberId={selectedMember || ""} />
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
