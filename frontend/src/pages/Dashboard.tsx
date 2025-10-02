import { useEffect, useState } from "react";
import ChartMain from "../components/ChartMain";
import CustomAccordion from "../components/CustomAccordion";
import DataFilters from "../components/DataFilters";
import FeedsBlock from "../components/FeedsBlock";
import LoadingBlock from "../components/LoadingBlock";
import MainStat from "../components/MainStat";
import TableBlock from "../components/TableBlock";
import { useInfoByTopicId } from "../hooks/useInfoByTopicId";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export function Dashboard() {
	const { data, isLoading } = useInfoByTopicId();

	const location = useLocation()
	const nav = useNavigate()
	const [startDate, setStartDate] = useState<string | null>(null);
	const [endDate, setEndDate] = useState<string | null>(null);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const startParam = searchParams.get("start");
		const endParam = searchParams.get("end");
		
		if (startParam) {
			setStartDate(startParam);
		}
		
		if (endParam) {
			setEndDate(endParam);
		}
	}, [location.search])

	const handleChangeDate = (type: "start" | "end", value: string): void => {
    switch (type) {
        case "start": {
            setStartDate(value || null);
            break;
        }
        case "end": {
            setEndDate(value || null);
            break;
        }
        default:
            toast.error("Недоступная дата")
            break;
    }
};

	const handleSaveFilters = () => {
		const searchParams = new URLSearchParams(location.search);

		searchParams.delete("start");
		searchParams.delete("end");

		if(startDate) {
			searchParams.set("start", startDate);
		}
		if(endDate) {
			searchParams.set("end", endDate);
		}
		
		nav(`?${searchParams.toString()}`, { replace: true });
		toast.success("Фильтры сохранены");
	};

	const accordionSections = [
		{
			id: "1",
			title: "Статистика",
			subtitle: "Стаистика в графическом виде за выбранный период",
			content: (
				<>
					<ChartMain data={data?.data.reviews} />
				</>
			),
		},
		{
			id: "2",
			title: "Особенности",
			subtitle: "Положительные и отрицательные стороны продукта",
			content: (
				<>
					<TableBlock />
				</>
			),
		},
		{
			id: "3",
			title: "Возможные улучшения",
			subtitle: "Список возможных улучшений, предложенных пользователями",
			content: <FeedsBlock />,
		},
	];
	
	if (isLoading) return <LoadingBlock />;
	return (
		<div className="flex flex-col gap-6">
			<MainStat total={data?.data.total_count} reviews={data?.data.reviews} />
			<DataFilters
				startDate={startDate}
				endDate={endDate}
				handleChangeDate={handleChangeDate}
				handleSaveFilters={handleSaveFilters}
			/>
			<CustomAccordion sections={accordionSections} />
		</div>
	);
}