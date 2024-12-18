import { PrismaClient } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authConfig = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, phone, password } = credentials as {
          email: string;
          phone: string;
          password: string;
        };

        if (!phone || !password) {
          throw new Error("Invalid Cretentials");
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            number: phone.toString(),
          },
        });

        if (existingUser) {
          if (existingUser.password === password)
            return {
              id: existingUser.id,
              number: existingUser.number,
              email: existingUser.email,
              name: existingUser.name,
            };
        }

        try {
          const newUser = await prisma.user.create({
            data: {
              number: phone.toString(),
              password: password,
              email: email,
            },
          });

          if (newUser)
            return {
              id: newUser.id,
              number: newUser.number,
              email: newUser.email,
              name: newUser.name,
            };

          return null;
          //
        } catch (error) {
          console.error(error);
          throw Error("Check your network try again!");
        }
      },
    }),
  ],

  secret: "thisisasecurepassword",

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, session }: any) {
      // console.log("session call", session);
      // console.log({
      //   ...token,
      //   id: user.id,
      //   name: user?.name,
      //   email: user?.email,
      // });

      if (user)
        return { ...token, id: user.id, name: user?.name, email: user.email };

      return token;
    },
  },
};
