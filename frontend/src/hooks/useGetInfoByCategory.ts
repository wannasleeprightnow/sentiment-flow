import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getInfo } from "../api/api";

export function useGetInfoByCategory() {
	const { categoryId } = useParams() as { categoryId: string };

	return useQuery({
		queryKey: ["info", categoryId],
		queryFn: async () => await getInfo(categoryId),
		select: result => {
			return result;
		},
		placeholderData: null,
	});
}
