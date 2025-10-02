import { useQuery } from "react-query";
import { getInfoByTopicsId, type ErrorI } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import type { AxiosError } from "axios";

export function useInfoByTopicId() {
  const { categoryId } = useParams() as { categoryId: string };
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["info", categoryId],
    queryFn: async () =>
      await getInfoByTopicsId({
        id: categoryId,
        options: {
          from_date: null,
          to_date: null,
        },
      }),
    select: (result) => {
      console.log(result);
      return result;
    },
    onError: (error: AxiosError<ErrorI>) => {
      if (error.status == 401) {
        return navigate("/auth");
      }
    },
    placeholderData: null,
  });
}
