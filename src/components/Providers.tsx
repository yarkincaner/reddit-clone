"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

type Props = {
	children: ReactNode
}

const Providers = (props: Props) => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>{props.children}</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
