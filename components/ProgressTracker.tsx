import {
  ORDER_STAGES,
  ORDER_STAGE_LABELS,
  ORDER_STAGE_DESCRIPTIONS,
  stageIndex,
  type OrderStage,
} from "@/lib/orderStages";
import {
  DocumentIcon,
  CheckIcon,
  CardIcon,
  FactoryIcon,
  ShipIcon,
  CustomsIcon,
  WarehouseIcon,
  CarFrontIcon,
  FlagIcon,
} from "./Icons";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  NEW: DocumentIcon,
  CONTRACT_DRAFT: DocumentIcon,
  CONTRACT_SIGNED: CheckIcon,
  PAYMENT: CardIcon,
  PURCHASING: FactoryIcon,
  SHIPPING: ShipIcon,
  CUSTOMS: CustomsIcon,
  ARRIVED: WarehouseIcon,
  READY: CarFrontIcon,
  COMPLETED: FlagIcon,
};

export function ProgressTracker({
  currentStage,
  history,
}: {
  currentStage: string;
  history: { stage: string; changedAt: Date; comment?: string | null }[];
}) {
  const currentIdx = stageIndex(currentStage);
  const dates = new Map(history.map((h) => [h.stage, h.changedAt]));
  const comments = new Map(
    history.filter((h) => h.comment).map((h) => [h.stage, h.comment as string])
  );

  return (
    <div className="flex flex-col">
      {ORDER_STAGES.map((stage, i) => {
        const Icon = ICONS[stage];
        const isDone = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isLast = i === ORDER_STAGES.length - 1;
        const date = dates.get(stage);

        return (
          <div key={stage} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  isDone || isCurrent
                    ? "bg-primary text-white"
                    : "bg-secondary/5 text-secondary/30"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {!isLast && (
                <span
                  className={`my-1 w-0.5 flex-1 ${
                    isDone ? "bg-primary" : "bg-secondary/10"
                  }`}
                  style={{ minHeight: "2.25rem" }}
                />
              )}
            </div>
            <div className={`pb-9 ${isLast ? "pb-0" : ""}`}>
              <div className="flex flex-wrap items-center gap-2 pt-1.5">
                <h3
                  className={`font-display text-base font-bold ${
                    isCurrent ? "text-primary" : isDone ? "text-secondary" : "text-secondary/40"
                  }`}
                >
                  {ORDER_STAGE_LABELS[stage as OrderStage]}
                </h3>
                {isCurrent && (
                  <span className="rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
                    Текущий этап
                  </span>
                )}
                {date && (
                  <span className="text-xs font-semibold text-secondary/40">
                    {new Intl.DateTimeFormat("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(date)}
                  </span>
                )}
              </div>
              <p
                className={`mt-1 max-w-md text-sm leading-relaxed ${
                  isDone || isCurrent ? "text-secondary/55" : "text-secondary/30"
                }`}
              >
                {ORDER_STAGE_DESCRIPTIONS[stage as OrderStage]}
              </p>
              {comments.get(stage) && (
                <p className="mt-2 max-w-md rounded-2xl bg-primary-light px-4 py-2.5 text-sm leading-relaxed text-secondary">
                  {comments.get(stage)}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
