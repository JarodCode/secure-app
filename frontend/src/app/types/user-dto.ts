export interface UserDto {
    id: string | number
    login: string
    email?: string
    role: 'admin' | 'user'
}
