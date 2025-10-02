import { CheckCircleIcon } from "@heroicons/react/24/solid";
import classNames from "../helpers/classNames";

const steps = [
  {
    id: 1,
    type: "monitoring",
    person: { name: "Постоянный мониторинг" },
    description: "Ежедневный анализ новых отзывов со всех платформ",
  },
  {
    id: 2,
    type: "negative_detection",
    person: { name: "Выявление проблем" },
    description: "Автоматическое обнаружение всплесков негативных отзывов",
  },
  {
    id: 3,
    type: "categorization",
    person: { name: "Категоризация проблем" },
    description: "Распределение отзывов по продуктам и темам",
  },
  {
    id: 4,
    type: "commented",
    person: {
      name: "Анализ причин",
    },
    comment: "Глубокий разбор корневых причин негативных отзывов",
  },
  {
    id: 5,
    type: "improvement",
    person: { name: "Внедрение улучшений" },
    description: "Разработка и внедрение корректирующих мер",
  },
  {
    id: 6,
    type: "result_check",
    person: { name: "Контроль результата" },
    description: "Отслеживание изменения тональности после улучшений",
  },
];

export default function FeedsBlock() {
  return (
    <>
      <ul role="list" className="space-y-6">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="relative flex gap-x-4">
            <div
              className={classNames(
                stepIdx === steps.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center"
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            <>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                {step.type === "result_check" ? (
                  <CheckCircleIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                )}
              </div>
              <div className="flex-auto py-0.5">
                <p className="text-sm font-medium text-gray-900">
                  {step.person.name}
                </p>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </>
          </li>
        ))}
      </ul>
    </>
  );
}
