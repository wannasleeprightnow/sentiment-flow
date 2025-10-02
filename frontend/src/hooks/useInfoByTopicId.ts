import { useQuery } from "react-query";
import { getInfoByTopicsId, type ErrorI } from "../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { AxiosError } from "axios";

export function useInfoByTopicId() {
  const { categoryId } = useParams() as { categoryId: string };
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search);
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const navigate = useNavigate();

  return useQuery({
    queryKey: ["info", categoryId],
    queryFn: async () =>
      await getInfoByTopicsId({
        id: categoryId,
        options: {
          from_date: startParam,
          to_date: endParam,
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
