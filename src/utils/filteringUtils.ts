import User from '../@types/user'

export const filterByFirstAndLastName = (users: User[], searchedValue: string) =>
  users?.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchedValue.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchedValue.toLowerCase())
  )
