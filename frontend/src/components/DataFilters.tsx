import { DatePicker } from "@heroui/date-picker";
import type { DateT } from "../types/dashboards";
import { Button } from "@heroui/button";

interface PropsI {
    startDate: DateT | null;
    endDate: DateT | null
    handleChangeDate: (type: "start" | "end", value: DateT) => void,
    handleSaveFilters: () => void
}


function DataFilters({startDate, endDate, handleChangeDate, handleSaveFilters}: PropsI) {
    return <div className="flex gap-6">
        <DatePicker className="w-46" value={startDate} onChange={(e: DateT) => handleChangeDate("start", e)}/>
        <DatePicker className="w-46" value={endDate} onChange={(e: DateT) => handleChangeDate("end", e)}/>
        <Button color="primary" className="w-32" onClick={handleSaveFilters}>Save</Button>
    </div>
}

export default DataFilters