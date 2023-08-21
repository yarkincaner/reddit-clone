"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

type Props = {
	children: ReactNode
}

const Providers = (props: Props) => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	)
}

export default Providers
