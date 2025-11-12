
import styles from './page.module.scss'

import HeroesList from "@/components/HeroList";
import { IHeroData } from "@/interfaces/heroes";

async function getHeroesData(): Promise<IHeroData[]> {
  const res = await fetch(process.env.API_URL as string);

  if (!res.ok) {
    throw new Error("Failed to request heroes list")
  };

  return await res.json()
}

export default async function Home() {
  const heroes = await getHeroesData();

  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes} />
    </main>
  )
}
