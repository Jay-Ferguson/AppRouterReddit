/* eslint-disable no-unused-vars */
import type { Session, User } from "next/auth";
import type { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
export interface JWT {
    id: UserId;
    userName?: string | null;
  }
}

declare module "next-auth" {
  export interface Session {
    id:UserId
    username?: string | null

    };

    export interface User {
      id: string | null;
      name: string;
      email: string;
      image: string;
      uid: string;
    }
  }

