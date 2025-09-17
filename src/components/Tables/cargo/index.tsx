"use client";

import { TableCargo } from "./table";

type Props = {
  data: {
    name: string;
  }[];
};

export function TableFilterCargo({ data }: Props) {
  return (
    <div>
      <TableCargo data={data} />
    </div>
  );
}
