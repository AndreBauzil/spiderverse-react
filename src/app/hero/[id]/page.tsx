import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  params: {
    id: string;
  }
}

async function getHeroesData(): Promise<IHeroData[]> {
  const res = await fetch(`${process.env.DOMAIN_ORIGIN}/api/heroes`)

  if (!res.ok) {
    throw new Error("Failed to request heroes list")
  }

  console.log(res.json());


  return res.json()
}

export default async function Hero({ params: { id }, heroesData }: { params: { id: string }, heroesData: IHeroData[] }) {
  const heroes = await getHeroesData();

  return <Carousel heroes={heroesData} activeId={id} />
}

export async function generateStaticParams(): Promise<GetStaticPathsResult> {
  const heroes = await getHeroesData()

  const paths = heroes.map(hero => ({
    params: { id: hero.id.toString() },
  }))

  console.log(paths);


  return {
    paths,
    fallback: false,
  };
}