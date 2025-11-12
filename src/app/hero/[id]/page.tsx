import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  params: {
    id: string;
  }
}

async function getHeroesData(): Promise<IHeroData[]> {
  const res = await fetch(process.env.API_URL as string);

  if (!res.ok) {
    throw new Error("Failed to request heroes list")
  };

  return await res.json()
}

export default async function Hero({ params }: IProps) {
  const { id } = params;

  const heroes = await getHeroesData();

  return <Carousel heroes={heroes} activeId={id} />
}