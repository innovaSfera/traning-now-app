import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCardsCarousel } from "./OverviewCardsCarousel";

export async function OverviewCardsGroup() {
  const { views, profit, products, users } = await getOverviewData();

  const formattedData = {
    views: { ...views, value: compactFormat(views.value) },
    profit: { ...profit, value: "$" + compactFormat(profit.value) },
    products: { ...products, value: compactFormat(products.value) },
    users: { ...users, value: compactFormat(users.value) },
  };

  return <OverviewCardsCarousel {...formattedData} />;
}
