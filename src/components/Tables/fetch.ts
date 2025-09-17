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
      status: "Ativo",
    },
    {
      name: "Felipe",
      status: "Ativo",
    },
    {
      name: "Gustavo",
      status: "Excluido",
    },
    {
      name: "Vitoria",
      status: "Desativo",
    },
  ];
}

export async function getTableDataFinanceiro() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
      status: "Ativo",
    },
    {
      name: "Felipe",
      status: "Ativo",
    },
    {
      name: "Gustavo",
      status: "Excluido",
    },
    {
      name: "Vitoria",
      status: "Desativo",
    },
  ];
}

export async function getInvoiceTableData() {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Iuri",
      status: "Ativo",
      price: 12,
      date: "2025-09-09",
    },
    {
      name: "Felipe",
      status: "Desativo",
      price: 12,
      date: "2025-09-09",
    },
    {
      name: "Gustavo",
      status: "Excluido",
      price: 12,
      date: "2025-09-09",
    },
    {
      name: "Vitoria",
      status: "Ativo",
      price: 12,
      date: "2025-09-09",
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
