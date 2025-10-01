import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function ChartMain() {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!chartRef.current) return;

		const chart = echarts.init(chartRef.current);

		chart.setOption({
			legend: {},
			tooltip: {
				trigger: "axis",
				showContent: false,
			},
			dataset: {
				source: [
					["Отзывы", "2020", "2021", "2022", "2023", "2024", "2025"],
					["Положительные", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
					["Нейтральные", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
					["Отрицательные", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
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
						formatter: "{b}: {@2025} ({d}%)",
					},
					encode: {
						itemName: "Отзывы",
						value: "2025",
						tooltip: "2025",
					},
				},
			],
		});

		return () => {
			chart.dispose();
		};
	}, []);

	return (
		<div
			ref={chartRef}
			className="w-full h-96 lg:h-[480px] md:h-[400px] sm:h-[280px]"
		/>
	);
}

export default ChartMain;
