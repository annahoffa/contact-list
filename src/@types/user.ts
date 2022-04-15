enum UserGender {
  FEMALE = 'Female',
  MALE = 'Male'
}

export default interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  gender?: UserGender
  avatar?: string
}
