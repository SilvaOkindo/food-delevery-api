import bcrypt from "bcryptjs"

export const comparePassword = (plain, hashed) => {
    return bcrypt.compareSync(plain, hashed)
}

