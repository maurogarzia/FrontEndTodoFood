export const Rol = {
    admin: "ADMIN",
    user: "CUSTOMER"
} as const

export type Rol = (typeof Rol)[keyof typeof Rol];
