export async function getInvoiceTableData() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Treino de pernas",
      status: "Médio",
      kg: "1",
      interval: "1",
      loop: "1",
    },
    {
      name: "Treino de pernas",
      status: "Difícil",
      kg: "1",
      interval: "1",
      loop: "1",
    },
    {
      name: "Treino de peitos",
      status: "Fácil",
      kg: "1",
      interval: "1",
      loop: "1",
    },
    {
      name: "Treino de peitos",
      status: "Médio",
      kg: "1",
      interval: "1",
      loop: "1",
    },
  ];
}
