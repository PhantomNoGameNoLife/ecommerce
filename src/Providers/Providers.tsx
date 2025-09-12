'use client'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import React, { ReactNode } from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

const Providers = ({ children, ...props }: { children: ReactNode } & React.ComponentProps<typeof NextThemesProvider>) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                <NextThemesProvider {...props}>
                    {children}
                </NextThemesProvider>
            </Provider>
        </SessionProvider>
    )
}

export default Providers