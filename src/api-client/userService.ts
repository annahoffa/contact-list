import axios, { AxiosResponse } from 'axios'
import User from '../@types/user'
import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'

const getUsersURL = process.env.NEXT_PUBLIC_TEACODE_URL
const getUsers = async (): Promise<AxiosResponse<User[]>> => {
  return await axios.get<User[]>(`${getUsersURL}/users.json`)
}

const useGetUsersQuery = (
  options: UseQueryOptions<
    AxiosResponse<User[]>,
    unknown,
    AxiosResponse<User[]>,
    'query-users'
  > = {}
) =>
  useQuery<AxiosResponse<User[]>, unknown, AxiosResponse<User[]>, 'query-users'>(
    'query-users',
    getUsers,
    options
  )

const userService = {
  getUsers,
  useGetUsersQuery
}

export default userService
