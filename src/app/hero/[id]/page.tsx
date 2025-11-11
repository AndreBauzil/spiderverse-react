import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  params: {
    id: string;
  }
}

async function getHeroesData(): Promise<{ data: IHeroData[] }> {
  const res = await fetch('/api/heroes');

  if (!res.ok) {
    throw new Error("Failed to request heroes list")
  }

  return res.json()
}

export default async function Hero({ params: { id } }: IProps) {
  const heroes = await getHeroesData();

  return <Carousel heroes={heroes.data} activeId={id} />
}