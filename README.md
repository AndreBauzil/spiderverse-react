![Cover (2)](https://github.com/AndreBauzil/spiderverse-react/assets/89871705/62f4263a-1543-4433-b3f6-f3c00e4ab9d7)


# Spider-Verse Project

The project is an interactive application inspired by the Spider-Man universe, using the main front-end stacks: React, Next.js 13, Framer Motion library, Sass, and TypeScript to create an incredible visual project with high performance.

[Project Demo.webm](https://github.com/AndreBauzil/spiderverse-react/assets/89871705/953d29a2-d103-4b7c-ae8a-59c858824e36)


## 💻 Technologies used in the project

- [React.js](https://reactjs.org) (v18)
- [Next.js](https://nextjs.org) (v13)
- [TypeScript](https://www.typescriptlang.org) (v5)
- [ESLint](https://eslint.org)
- [Framer Motion](https://www.framer.com/api/motion)
- [SASS](https://sass-lang.com)

## 🎨 Project Prototype

[Click here](https://www.figma.com/file/rgHS7o5MyTAxk9vCRH5YhL/Landpage-%2B-Mobile---SpiderVerse?type=design&node-id=0%3A1&mode=design&t=5SFRyEJyIbhD90Sl-1) to view the project prototype on Figma.

## 🗄️ Folder structure

The project is structured as follows:

- 📁 `public`
  - 📁 `icons`
  - 📁 `songs`
  - 📁 `spiders`
- 📁 `src`
  - 📁 `app`
    - 📁 `api`
      - 📁 `heroes`
    - 📁 `hero`
      - 📁 `[id]`
  - 📁 `components`
    - 📁 `Carousel`
    - 📁 `HeroDetails`
    - 📁 `HeroesList`
    - 📁 `HeroPicture`
  - 📁 `fonts`
  - 📁 `interfaces`

## 🛠️ Execution instructions

Follow the instructions below to run the project on your local environment:

1. Ensure that you have Node.js installed on your computer. You can download the latest version of Node.js at https://nodejs.org.

2. Clone this repository to your computer or download the source code.

3. Open the terminal and navigate to the project's root directory.

4. Install project dependencies by running the following commands in the terminal:

    ```bash
    yarn install
    ```

5. After the dependencies installation is complete, start the local development server with the command:

    ```bash
    yarn dev
    ```

6. The local server will start, and you can access the project in your browser at the following address:

    ```bash
    http://localhost:3000
    ```

If port 3000 is in use, Next.js will automatically use the next available port on your machine.

If you want to change the default port the application will attempt to use, you can modify the port in the `next.config.js` file.

Now you're ready to explore the project in your local environment!
