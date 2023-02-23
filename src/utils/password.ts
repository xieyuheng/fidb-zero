import bcrypt from "bcrypt"

async function passwordHash(password: string): string {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

async function passwordCheck(password: string, hash: string): boolean {
  return await bcrypt.compare(password, hash)
}
