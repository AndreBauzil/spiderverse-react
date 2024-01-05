import HeroDetails from "../HeroDetails";

import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  return (
    <>
      <h1>Componente Carousel: {activeId}</h1>
      <HeroDetails data={heroes[0]} />
    </>
  )

}