import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../api/api";

export function usePostLogout() {
	const navigate = useNavigate();

	return useMutation(
		async () => {
			return await postLogout();
		},
		{
			onSuccess: () => {
				navigate("/auth");
			},
			onError: () => {
				navigate("/")
			},
		}
	);
}
