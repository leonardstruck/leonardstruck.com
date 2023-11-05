"use client";

import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }): React.ReactNode {
    const queryClient = useMemo(() => () => new QueryClient(
        {
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60 * 5,
                    refetchOnWindowFocus: false,
                    retry: false,
                },
            },
        }
    ), []);

    return (
        <QueryClientProvider client={queryClient()}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </QueryClientProvider>
    );
}