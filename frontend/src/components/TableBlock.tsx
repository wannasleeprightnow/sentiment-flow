import { Fragment } from "react";
import classNames from "../helpers/classNames";

const locations = [
    {
        title: "Положительные стороны",
        list: [
            {
                title: "Высокая скорость обработки отзывов в реальном времени",
            },
            {
                title: "Точность определения тональности отзывов - 89%",
            },
            {
                title: "Автоматическое выявление основных тем в отзывах",
            },
            {
                title: "Возможность анализа нескольких продуктов в одном отзыве",
            },
            {
                title: "Простота фильтрации отзывов по периодам и продуктам",
            },
        ],
    },
    {
        title: "Отрицательные стороны",
        list: [
            {
                title: "Ограниченный охват источников отзывов на старте",
            },
            {
                title: "Сложности с анализом коротких и неформальных отзывов",
            },
            {
                title: "Нет анализа изображений и скриншотов в отзывах",
            },
        ]
    }
]

export default function TableBlock() {
	return (
		<div className="flow-root">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<table className="min-w-full">
						<tbody className="bg-white">
							{locations.map((location) => (
								<Fragment key={location.title}>
									<tr className="border-t border-gray-200">
										<th
											colSpan={5}
											scope="colgroup"
											className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
										>
											{location.title}
										</th>
									</tr>
									{location.list.map((person, personIdx) => (
										<tr
											key={person.title}
											className={classNames(
												personIdx === 0 ? "border-gray-300" : "border-gray-200",
												"border-t"
											)}
										>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
												{person.title}
											</td>
										</tr>
									))}
								</Fragment>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
