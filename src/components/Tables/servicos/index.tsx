"use client";

import { TableServicos } from "./table";

type Props = {
  data: {
    name: string;
  }[];
};

export function TableFilterServicos({ data }: Props) {
  return (
    <div>
      <TableServicos data={data} />
    </div>
  );
}
