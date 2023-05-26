import { PrismaClient } from ".prisma/client"

import { getDisabledInfo } from "../helpers/disabled.helper"

type Address = {
  street: string
  neighbourhood: string
  number: string
  complement: string
  zipcode: string
  cityId: number
  memberId: string
}

type UpdateAddressProps = {
  address: Address
  requestUserId: string
  addressId: string
}

const prisma = new PrismaClient()

class AddressesRepository {
  async store(address: Address, requestUserId: string) {
    const { lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(false, requestUserId)

    const { id } = await prisma.membersAddresses.create({
      data: {
        ...address,
        createdBy,
        lastUpdatedBy,
      },
      select: {
        id: true,
      },
    })

    return id
  }

  async update({ address, requestUserId, addressId }: UpdateAddressProps) {
    const { lastUpdatedBy, logUserId } = getDisabledInfo(false, requestUserId)

    const { id } = await prisma.membersAddresses.update({
      data: {
        ...address,
        lastUpdatedBy,
      },
      where: {
        id: addressId,
      },
      select: {
        id: true,
      },
    })

    return id
  }

  async delete(id: string, requestUserId: string) {
    const { logUserId } = getDisabledInfo(false, requestUserId)

    await prisma.membersAddresses.delete({
      where: {
        id,
      },
    })
  }

  async deleteByUser(memberId: string) {
    await prisma.membersAddresses.deleteMany({
      where: {
        memberId,
      },
    })
  }

  async findByZipcode(zipcode: string, memberId: string) {
    const addresses = await prisma.membersAddresses.findMany({
      where: {
        zipcode,
        memberId,
      },
    })

    return addresses
  }
}

export default new AddressesRepository()
