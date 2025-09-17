import type { JSX, SVGProps } from "react";

type PropsType = {
  label: string;
  data: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  isActive?: boolean;
};

export function OverviewCard2({ data, Icon, isActive = false }: PropsType) {
  return (
    <div
      className={`flex items-center justify-center flex-col rounded-[10px] p-6 shadow-1 transition-all
        ${
          isActive
            ? "bg-[rgba(87,80,241,0.07)] border border-primary text-primary"
            : "bg-white dark:bg-gray-dark text-dark dark:text-white hover:border-primary hover:text-primary"
        }
      `}
    >
      <Icon className="size-6" />

      <div className="mt-6">
        <dl>
          <dt className="mb-1.5 font-medium text-lg">{data}</dt>
        </dl>
      </div>
    </div>
  );
}
