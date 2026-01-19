import apiClient from "./apiClient";
import errorMessages from '../data/errorMessages.json';
import { AxiosError, isAxiosError } from "axios";

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
        const response = await apiClient.post<RegisterResponse>(
            REGISTER_ENDPOINT,
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

        if (isAxiosError(error)) {
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
