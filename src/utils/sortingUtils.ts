import User from '../@types/user'

export const sortUsersByLastName = (a: User, b: User) => a.last_name.localeCompare(b.last_name)
