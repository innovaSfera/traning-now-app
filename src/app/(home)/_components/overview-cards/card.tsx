import type { JSX, SVGProps } from "react";

type PropsType = {
  label: string;
  data: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  isActive?: boolean;
};

export function OverviewCard({ data, Icon, isActive = false }: PropsType) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[10px] p-4 shadow-1 transition-all ${
        isActive
          ? "border bg-white text-[#5750F1] dark:border-primary dark:bg-[#101727]"
          : "bg-white text-dark hover:border-primary hover:text-primary dark:bg-gray-dark dark:text-white"
      } `}
    >
      <Icon className="size-6" />

      <div className="mt-5">
        <dl>
          <dt className="text-md mb-1 font-medium">{data}</dt>
        </dl>
      </div>
    </div>
  );
}
