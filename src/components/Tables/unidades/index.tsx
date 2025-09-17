"use client";

import { TableUnidade } from "./table";

type Props = {
  data: {
    name: string;
  }[];
};

export function TableFilterUnidade({ data }: Props) {
  return (
    <div>
      <TableUnidade data={data} />
    </div>
  );
}
