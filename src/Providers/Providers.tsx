'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import React, { ReactNode } from 'react'

const Providers = ({ children, ...props }: { children: ReactNode } & React.ComponentProps<typeof NextThemesProvider>) => {
    return (
        <SessionProvider>
            <NextThemesProvider {...props}>
                {children}
            </NextThemesProvider>
        </SessionProvider>
    )
}

export default Providers