import {
	CalendarIcon,
	ChartBarIcon,
	DocumentChartBarIcon,
	EyeIcon,
} from "@heroicons/react/24/outline";

const features = [
	{
		name: "Просмотр статистики отзывов",
		description:
			"Анализируйте общую картину отзывов с наглядными графиками и диаграммами. Отслеживайте динамику оценок и выявляйте тенденции.",
		icon: ChartBarIcon,
	},
	{
		name: "Фильтрация по датам",
		description:
			"Изучайте отзывы за конкретные периоды времени. Сравнивайте показатели за разные недели, месяцы или годы для глубокого анализа.",
		icon: CalendarIcon,
	},
	{
		name: "Выгрузка отчетности",
		description:
			"Экспортируйте данные в удобных форматах (PDF, Excel, CSV). Создавайте детальные отчеты для презентаций и аналитических исследований.",
		icon: DocumentChartBarIcon,
	},
	{
		name: "Детальный просмотр отзывов",
		description:
			"Получайте полную информацию по каждому отзыву с возможностью сортировки и поиска. Анализируйте содержание и sentiment отзывов.",
		icon: EyeIcon,
	},
];

export function Main() {
	return (
		<div className="bg-white py-6 sm:py-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-600">
						Аналитика отзывов
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Комплексная платформа для анализа отзывов
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Мощные инструменты для сбора, анализа и визуализации отзывов.
						Получайте ценную информацию из обратной связи клиентов для улучшения
						вашего сервиса.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map(feature => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base font-semibold leading-7 text-gray-900">
									<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
										<feature.icon
											className="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</div>
									{feature.name}
								</dt>
								<dd className="mt-2 text-base leading-7 text-gray-600">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
