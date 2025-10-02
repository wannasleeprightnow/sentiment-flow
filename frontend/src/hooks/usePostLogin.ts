import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/api";

export function usePostLogin() {
	const navigate = useNavigate();

	return useMutation(
		async ({ email, pass }: { email: string; pass: string }) => {
			return await postLogin(email, pass);
		},
		{
			onSuccess: () => {
				navigate("/");
			},
			onError: () => {
				navigate("/auth");
			},
		}
	);
}
