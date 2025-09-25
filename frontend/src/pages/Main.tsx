import { useState } from "react";
import ChartMain from "../components/ChartMain";
import CustomAccordion from "../components/CustomAccordion";
import DataFilters from "../components/DataFilters";
import FeedsBlock from "../components/FeedsBlock";
import MainStat from "../components/MainStat";
import TableBlock from "../components/TableBlock";
import type { DateT } from "../types/dashboards";

export function Main() {
	const [startDate, setStartDate] = useState<DateT | null>(null);
	const [endDate, setEndDate] = useState<DateT | null>(null);

	const handleChangeDate = (type: "start" | "end", value: DateT): void => {
		switch (type) {
			case "start": {
				setStartDate(value);
				break;
			}
			case "end": {
				setEndDate(value);
				break;
			}
			default:
				break;
		}
	};

	const handleSaveFilters = () => {};

	const accordionSections = [
		{
			id: "1",
			title: "Статистика",
			subtitle: "Стаистика в графическом виде за выбранный период",
			content: (
				<>
					<ChartMain />
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

	return (
		<div className="flex flex-col gap-6">
			<MainStat />
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
