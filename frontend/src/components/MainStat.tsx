import type { ReviewI } from "../api/api";
import LoadingBlock from "./LoadingBlock";

function StatItem(stat: { name: string; value: number; unit?: string }) {
	return (
		<div
			key={stat.name}
			className="border-gray-200 border-1 rounded-xl px-4 py-6 sm:px-6 lg:px-8"
		>
			<p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
			<p className="mt-2 flex items-baseline gap-x-2">
				<span className="text-4xl font-semibold tracking-tight text-black">
					{stat.value}
				</span>
				{stat.unit ? (
					<span className="text-sm text-gray-800">{stat.unit}</span>
				) : null}
			</p>
		</div>
	);
}

function MainStat({total, reviews} : {total?: number, reviews?: ReviewI[]}): React.ReactElement {

	if(!reviews) return <LoadingBlock />

	const stats = [
		{ name: "Всего отзывов", value: total || 0 },
		{ name: "Положительных отзывов", value: (reviews ? reviews.filter(rew => rew.sentiment == "положительно").length : 0) },
		{ name: "Нейтральных отзывов", value: (reviews ? reviews.filter(rew => rew.sentiment == "нейтрально").length : 0)  },
		{ name: "Отрицательных отзывов", value: (reviews ? reviews.filter(rew => rew.sentiment == "отрицательно").length : 0)  },
	];

	return (
		<>
			<div>
				<div className="mx-auto max-w-7xl">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{reviews != null && stats.map((stat, index) => (
							<StatItem key={index} {...stat} />
						))}
					</div>
				</div>
			</div>
			{/*<ChartForAllTime />*/}
		</>
	);
}

export default MainStat;
