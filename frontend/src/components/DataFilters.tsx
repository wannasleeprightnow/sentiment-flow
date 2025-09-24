import { DatePicker } from "@heroui/date-picker";
import type { DateT } from "../types/dashboards";
import { Button } from "@heroui/button";

interface PropsI {
  startDate: DateT | null;
  endDate: DateT | null;
  handleChangeDate: (type: "start" | "end", value: DateT) => void;
  handleSaveFilters: () => void;
}

function DataFilters({
  startDate,
  endDate,
  handleChangeDate,
  handleSaveFilters,
}: PropsI) {
  const handleDownloadStatment = () => {
    return true;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-6">
        <DatePicker
          className="w-46"
          value={startDate}
          onChange={(e: DateT) => handleChangeDate("start", e)}
        />
        <DatePicker
          className="w-46"
          value={endDate}
          onChange={(e: DateT) => handleChangeDate("end", e)}
        />
        <Button color="primary" className="w-32" onClick={handleSaveFilters}>
          Save
        </Button>
      </div>
      <Button color="secondary" className="w-48" onClick={handleDownloadStatment}>
        Download statement
      </Button>
    </div>
  );
}

export default DataFilters;
