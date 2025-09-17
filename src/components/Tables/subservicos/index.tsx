"use client";

import { TableSubServicos } from "./table";

type Props = {
  data: {
    name: string;
  }[];
};

export function TableFilterSubServicos({ data }: Props) {
  return (
    <div>
      <TableSubServicos data={data} />
    </div>
  );
}
