import ty from "@xieyuheng/ty"

export type PermissionName = "read" | "write"

export type Token = {
  permissions: Record<string, Array<PermissionName>>
}

export const tokenSchema = ty.object({
  permissions: ty.dict(
    ty.array(ty.union(ty.const("read" as const), ty.const("write" as const))),
  ),
})
