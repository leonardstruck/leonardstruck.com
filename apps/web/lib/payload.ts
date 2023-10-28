import "server-only";
import { stringify } from "qs";
import env from "./env";

interface PayloadArgs {
    endpoint: string;
    query?: object,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    next?: NextFetchRequestConfig;
    body?: unknown;
    headers?: Record<string, string>;
    options?: Omit<RequestInit, "body" | "method" | "headers">;
}

export interface PaginatedDocs<T = unknown> {
    docs: T[]
    totalDocs: number
    limit: number
    totalPages: number
    page?: number | undefined
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage?: number | null | undefined
    nextPage?: number | null | undefined
}


const payload = async<T>({ endpoint, query, method = "GET", next, body, headers, options }: PayloadArgs): Promise<T> => {
    const queryparams = query ? stringify(query, { addQueryPrefix: true }) : "";
    const url = `${env.PAYLOAD_URL}/api/${endpoint}${queryparams}`;

    const response = await fetch(url, {
        method,
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        next,
        ...options,
    });

    if (response.ok) {
        return response.json() as Promise<T>;
    }

    throw new Error(await response.text());
};

export default payload;

export const getAdminAuthHeaders = (): Record<string, string> => ({
    "Authorization": `users API-Key ${env.PAYLOAD_TOKEN}`,
});

