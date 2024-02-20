import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export interface LoginCredentials {
    username: string,
    password: string,
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMsg = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMsg);
        } else if (response.status === 409) {
            throw new ConflictError(errorMsg);
        } else {
            throw Error("Request failed with status: " + errorMsg.status + "message: " + errorMsg.message);
        }
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

export async function signUp(signUpCredentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpCredentials)
    });
    return response.json();
}

export async function login(loginCredentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials)
    });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}
