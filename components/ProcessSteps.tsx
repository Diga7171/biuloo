import { ORDER_STAGES, ORDER_STAGE_LABELS, ORDER_STAGE_DESCRIPTIONS } from "@/lib/orderStages";
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

export function ProcessSteps() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {ORDER_STAGES.map((stage, i) => {
        const Icon = ICONS[stage];
        return (
          <div
            key={stage}
            className="reveal flex flex-col gap-3 rounded-2xl border-2 border-secondary/10 bg-white p-5 transition-colors hover:border-primary/40"
            style={{ transitionDelay: `${(i % 5) * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold text-primary/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <h4 className="font-display text-sm font-bold leading-snug">
              {ORDER_STAGE_LABELS[stage]}
            </h4>
            <p className="text-xs leading-relaxed text-secondary/55">
              {ORDER_STAGE_DESCRIPTIONS[stage]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
