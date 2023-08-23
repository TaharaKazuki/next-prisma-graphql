import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth/next'
import EmailProvider from 'next-auth/providers/email'

const prisma = new PrismaClient()

const EMAIL_SERVER = process.env.EMAIL_SERVER
const EMAIL_FROM = process.env.EMAIL_FROM
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

if (!EMAIL_SERVER || !EMAIL_FROM || !NEXTAUTH_SECRET) {
  throw new Error('EMAIL_SERVER, EMAIL_FROM, NEXTAUTH_SECRET not found')
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: EMAIL_SERVER,
      from: EMAIL_FROM,
    }),
  ],
  secret: NEXTAUTH_SECRET,
})
