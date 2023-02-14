import ty from "@xieyuheng/ty"

export type Permission = "readonly" | "readwrite"

export type Token = {
  permissions: Record<string, Permission>
}

export const tokenSchema = ty.object({
  permissions: ty.dict(
    ty.union(ty.const("read" as const), ty.const("write" as const)),
  ),
})

export const adminToken: Token = {
  permissions: {
    "**/*": "readwrite",
  },
}
