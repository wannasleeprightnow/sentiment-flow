import MainStat from "../components/MainStat";
import CustomAccordion from "../components/CustomAccordion";
import ChartMain from "../components/ChartMain";
import DataFilters from "../components/DataFilters";
import { useState } from "react";
import type { DateT } from "../types/dashboards";
import FeedsBlock from "../components/FeedsBlock";
import TableBlock from "../components/TableBlock";

export function Main() {
	const [startDate, setStartDate] = useState<DateT | null>(null)
	const [endDate, setEndDate] = useState<DateT | null>(null)

	const handleChangeDate = (type: "start" | "end", value: DateT): void => {
		switch(type) {
			case ("start"): {
				setStartDate(value)
				break;
			}
			case ("end"): {
				setEndDate(value)
				break
			}
			default: break
		}
	}

	const handleSaveFilters = () => {}

	const accordionSections = [
    {
      id: "1",
      title: "Графики",
      subtitle: "Стаистика в графическом виде за выбранный период",
      content: <>
	  	<ChartMain />
	  </>
    },
	{
      id: "2",
      title: "Статистика в тексте",
      subtitle: "Какая то хуйня еще",
      content: <>
	  	<TableBlock />
	  </>
    },
	{
      id: "3",
      title: "Что надо сделать чтобы не быть ебланами",
      subtitle: "Открыть список",
      content: <FeedsBlock />
    }
  ];
  
	return <div className="flex flex-col gap-6">
		<MainStat />
		<DataFilters startDate={startDate} endDate={endDate} handleChangeDate={handleChangeDate} handleSaveFilters={handleSaveFilters} />
		<CustomAccordion sections={accordionSections} />
	</div>
}