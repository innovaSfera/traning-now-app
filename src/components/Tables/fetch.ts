import * as logos from "@/assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getTableDataUnidade() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
    },
    {
      name: "Felipe",
    },
    {
      name: "Gustavo",
    },
    {
      name: "Vitoria",
    },
  ];
}

export async function getTableDataCargo() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
    },
    {
      name: "Felipe",
    },
    {
      name: "Gustavo",
    },
    {
      name: "Vitoria",
    },
  ];
}

export async function getTableDataServicos() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
    },
    {
      name: "Felipe",
    },
    {
      name: "Gustavo",
    },
    {
      name: "Vitoria",
    },
  ];
}

export async function getTableDataSubServicos() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
    },
    {
      name: "Felipe",
    },
    {
      name: "Gustavo",
    },
    {
      name: "Vitoria",
    },
  ];
}

export async function getTableDataFuncionarios() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
      status: "Fácil",
    },
    {
      name: "Felipe",
      status: "Fácil",
    },
    {
      name: "Gustavo",
      status: "Médio",
    },
    {
      name: "Vitoria",
      status: "Médio",
    },
  ];
}

export async function getTableDataFinanceiro() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
      status: "Fácil",
    },
    {
      name: "Felipe",
      status: "Fácil",
    },
    {
      name: "Gustavo",
      status: "Médio",
    },
    {
      name: "Vitoria",
      status: "Médio",
    },
  ];
}

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

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}
