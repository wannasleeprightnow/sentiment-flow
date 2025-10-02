import { useQuery } from "react-query";
import { getTopics, type ErrorI } from "../api/api";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export function useTpoics() {
	const navigate = useNavigate()

	return useQuery({
		queryKey: ["topics"],
		queryFn: async () => await getTopics(),
		select: (result) => {
			console.log(result)
			return result;
		},
		onError: (error: AxiosError<ErrorI>) => {
			console.log(error)
			if(error.status == 401) {
				return navigate("/auth")
			}
		},
		placeholderData: null,
	});
}
