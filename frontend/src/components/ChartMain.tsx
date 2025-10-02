import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function ChartMain({data}: {data: any}) {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!chartRef.current || !data) return;

		const chart = echarts.init(chartRef.current);

		const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		
		const dates = [...new Set(sortedData.map(item => item.date))];
		
		const positive = dates.map(date => 
			sortedData.filter(item => item.date === date && item.sentiment === "положительно").length
		);
		const neutral = dates.map(date => 
			sortedData.filter(item => item.date === date && item.sentiment === "нейтрально").length
		);
		const negative = dates.map(date => 
			sortedData.filter(item => item.date === date && item.sentiment === "отрицательно").length
		);

		chart.setOption({
			legend: {},
			tooltip: {
				trigger: "axis",
				showContent: false,
			},
			dataset: {
				source: [
					["Дата", ...dates],
					["Положительные", ...positive],
					["Нейтральные", ...neutral],
					["Отрицательные", ...negative],
				],
			},
			xAxis: { type: "category" },
			yAxis: { gridIndex: 0 },
			grid: { top: "55%" },
			series: [
				{
					type: "line",
					smooth: true,
					seriesLayoutBy: "row",
					emphasis: { focus: "series" },
				},
				{
					type: "line",
					smooth: true,
					seriesLayoutBy: "row",
					emphasis: { focus: "series" },
				},
				{
					type: "line",
					smooth: true,
					seriesLayoutBy: "row",
					emphasis: { focus: "series" },
				},
				{
					type: "pie",
					id: "pie",
					radius: "30%",
					center: ["50%", "25%"],
					emphasis: {
						focus: "self",
					},
					label: {
						formatter: "{b}: {@2024-01-15} ({d}%)",
					},
					encode: {
						itemName: "Дата",
						value: "2024-01-15",
						tooltip: "2024-01-15",
					},
				},
			],
		});

		return () => {
			chart.dispose();
		};
	}, [data]);

	return (
		<div
			ref={chartRef}
			className="w-full h-96 lg:h-[480px] md:h-[400px] sm:h-[280px]"
		/>
	);
}

export default ChartMain;