"use client";

import { SessionProvider } from "next-auth/react";


export const NextauthProvider = ({children}) => {
    return (
        <SessionProvider>{children}</SessionProvider>
        );
}