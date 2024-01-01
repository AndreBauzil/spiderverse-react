import styles from './heroesList.module.scss'

import { spidermanFont } from "@/fonts"
import { IHeroData } from "@/interfaces/heroes"

interface IProps {
  heroes: IHeroData[]
}

export default function HeroesList({ heroes }: IProps) {
  return (
    <>
      <h1 className={`${spidermanFont.className} ${styles.title}`}>PERSONAGENS</h1>
      {heroes.map(hero => (
        <p key={hero.id}>{hero.name}</p>
      ))}
    </>
  )
}