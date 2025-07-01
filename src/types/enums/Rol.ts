export const Rol = {
    admin: "admin",
    user: "user"
} as const

export type Rol = (typeof Rol)[keyof typeof Rol];
