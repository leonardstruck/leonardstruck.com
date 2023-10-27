import "server-only";
import qs, { type ParsedUrlQueryInput } from "node:querystring";
import env from "./env";

interface PayloadArgs {
    endpoint: string;
    query?: ParsedUrlQueryInput;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    next?: NextFetchRequestConfig;
    body?: unknown;
    headers?: Record<string, string>;
    options?: Omit<RequestInit, "body" | "method" | "headers">;
}

const payload = async<T>({ endpoint, query, method = "GET", next, body, headers, options }: PayloadArgs): Promise<T> => {
    const queryparams = query ? `?${qs.stringify(query)}` : "";
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
