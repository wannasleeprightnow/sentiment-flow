import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { parseDate, type CalendarDate, type CalendarDateTime, type ZonedDateTime } from "@internationalized/date";
import toast from "react-hot-toast"

interface PropsI {
	startDate: string | null;
	endDate: string | null;
	handleChangeDate: (type: "start" | "end", value: string) => void;
	handleSaveFilters: () => void;
}

function DataFilters({
	startDate,
	endDate,
	handleChangeDate,
	handleSaveFilters,
}: PropsI) {
	
	// Функция для преобразования строки в DateValue
	const parseDateString = (dateString: string | null): CalendarDate | null => {
		if (!dateString) return null;
		try {
			const [day, month, year] = dateString.split('.').map(Number);
			// Создаем дату в формате, который понимает DatePicker
			return parseDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
		} catch (error) {
			return null;
		}
	};

	// Функция для обработки изменения даты
	const handleDateChange = (type: "start" | "end") => (value: CalendarDate | CalendarDateTime | ZonedDateTime | null) => {
		if (value) {
			const dateString = `${value.day}.${value.month}.${value.year}`;
			handleChangeDate(type, dateString);
		} else {
			// Если значение null, очищаем дату
			handleChangeDate(type, "");
		}
	};

	const handleDownloadStatment = () => {
		return toast.error("Функция в разработке");
	};

	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-6">
				<DatePicker
					className="w-46"
					label="Начальная дата"
					value={parseDateString(startDate)}
					onChange={handleDateChange("start")}
				/>
				<DatePicker
					className="w-46"
					label="Конечная дата"
					value={parseDateString(endDate)}
					onChange={handleDateChange("end")}
				/>
				<Button color="primary" className="w-32" onClick={handleSaveFilters}>
					Применить
				</Button>
			</div>
			<Button
				color="secondary"
				className="w-48"
				onClick={handleDownloadStatment}
			>
				Скачать статистику
			</Button>
		</div>
	);
}

export default DataFilters;