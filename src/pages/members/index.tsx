import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaFilter, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { MembersModal } from "../../components/MembersModal"
import { Checkbox } from "../../components/Checkbox"
import { SearchBar } from "../../components/SearchBar"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "./styles"
import { FilterContainer } from "../../components/FilterContainer"

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
  planId: string
  disabledAt: string
  disabledByUser: string
}

export default function Members() {
  // const [reload, setReload] = useState(false)
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

  const timeoutRef = useRef<any>(0)

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadMembers() {
    const response = await api.get("/members", {
      params: {
        onlyEnabled,
        search,
      },
    })

    setMembers(response.data)
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
    loadMembers()
  }, [onlyEnabled, isMemberModalOpen, reload])

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

      {/* <div className="filterSection">
        <div className="headerOptions">
          <div className="ho cbActive">
            <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />
          </div>
          <div className="ho searchBar">
            <SearchBar placeholder="Nome ou e-mail" onChange={(event) => handleSearchFilter(event.target.value)} />
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
        placeholder="Nome ou e-mail"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>RG</th>
              <th>CPF</th>
              <th>Profissão</th>
              <th>N° CR</th>
              <th>Validade CR</th>
              <th>Nascimento</th>
              <th>Status</th>
              <th>Cadastro</th>
              <th>Última edição</th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.name}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditMember(member)} disabled={!editMemberPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.rg}</td>
                <td>{member.cpf}</td>
                <td>{member.profession}</td>
                <td>{member.crNumber}</td>
                <td>{new Date(member.crValidity).toLocaleDateString()}</td>
                <td>{new Date(member.birthDate).toLocaleDateString()}</td>
                <td>{member.disabled ? "Desativo" : "Ativo"}</td>
                <td>{new Date(member.crValidity).toLocaleDateString()}</td>
                <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                <td>{member.disabledAt && new Date(member.disabledAt).toLocaleDateString()}</td>
                <td>{member.disabledByUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
