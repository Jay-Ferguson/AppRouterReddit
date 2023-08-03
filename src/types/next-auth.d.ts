/* eslint-disable no-unused-vars */
import type {Session, User} from "next/auth"
import type {JWT} from "next-auth/jwt"
import NextAuth,{DefaultSession} from "next-auth"



type UserId = string

declare module "next-auth/jwt" {
     interface JWT {
          id: UserId
          userName?: string | null
     }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: UserId;
      username?: string | null;
    };
  }

  interface User {
    id: string;
    role: number;
    name:string;
    email:string;
    image:string;
  }
}