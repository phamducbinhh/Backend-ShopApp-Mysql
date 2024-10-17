class ResponseUser {
  id: string
  email: string
  name: string
  role: number
  avatar: string
  phone: number
  constructor(user: any) {
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.role = user.role
    this.avatar = user.avatar
    this.phone = user.phone
  }
}

module.exports = ResponseUser
