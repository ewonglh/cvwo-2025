import axios, { AxiosError } from "axios";
import errorMessages from '../data/errorMessages.json';

// @ts-ignore
const API_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";
const REGISTER_ENDPOINT = "/registerUser";

export interface RegisterResponse {
    accessToken: string;
    userId: string;
    [key: string]: unknown;
}

export interface RegisterError {
    message: string;
    status?: number;
}

export async function registerUser(
    username: string,
    password: string
): Promise<{ data?: RegisterResponse; error?: RegisterError }> {
    try {
        const response = await axios.post<RegisterResponse>(
            `${API_URL}${REGISTER_ENDPOINT}`,
            {
                username,
                password,
                isModerator : false,
                BanEnd : null
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return {
            data: response.data,
        };
    } catch (error) {
        console.error("Registration error:", error);

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message?: string }>;

            if (axiosError.response) {
                const message =
                    axiosError.response.data?.message ||
                    axiosError.response.statusText ||
                    errorMessages.Register.registrationFailed;

                return {
                    error: {
                        message,
                        status: axiosError.response.status,
                    },
                };
            } else if (axiosError.request) {
                return {
                    error: {
                        message: errorMessages.Register.noResponse,
                    },
                };
            } else {
                return {
                    error: {
                        message: axiosError.message || errorMessages.Register.general,
                    },
                };
            }
        }

        return {
            error: {
                message: errorMessages.Register.general,
            },
        };
    }
}
