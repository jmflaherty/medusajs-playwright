<p align="center">
   <a href="https://www.medusajs.com">
      <img alt="Medusa" src="./static/medusa.png" width="100" />
   </a>
   <a href="https://playwright.dev">
      <img alt="Playwright" src="./static/playwright.png" width="100" />
   </a>
</p>
<p align="center">
   <a href="https://www.docker.com">
      <img alt="Docker" src="./static/docker.webp" width="100" />
   </a>  
</p>
<h1 align="center">
   MedusaJS Playwright
</h1>

<h2 align="center">
   <a href="#about">About</a> |
   <a href="#setup">Setup</a> |
   <a href="#run-validations">Run validations</a> |
   <a href="#open-reports">Open reports</a> |
   <a href="#license">License</a> |
   <a href="#author">Author</a>
</h3>

<p align="center">
   An e-commerce automation demo project.
</p>

<p align="center">
   <video controls width=66% autoplay="autoplay" loop="loop">
      <source src="./static/demo.mp4" type="video/webm">
   </video>
</p>

## 🙋 About<a id="about"></a>

Based on [MedusaJS](https://www.medusajs.com), a popular open-source Shopify alternative written with [JavaScript](https://www.javascript.com/) and [TypeScript](https://www.typescriptlang.org/), that runs on [NodeJS](https://nodejs.org/).

Validations are written in [TypeScript](https://www.typescriptlang.org/) with [Playwright](https://playwright.dev), a web automation tool that is leading and redefining the field.

Services are built and run with [Docker](https://www.docker.com), the technology that made containerized development and services popular.

## ⚙️ Setup<a id="setup"></a>

1. Free ports `5432`, `9000`, `7000`, and `8080`.

2. Install [Docker](https://www.docker.com/) or a compatible container runtime.

   > 💡 [Podman](https://podman.io/) should work just fine.

3. Install NodeJS 16.19.0 (LTS in maintenance).

   > 💡**RECOMMENDED** to use [NVM](https://github.com/nvm-sh/nvm) to manage NodeJS versions.
   >
   > Install and use the NodeJS version set in the [`.nvmrc`](.nvmrc) with NVM.
   >
   > ```bash
   > nvm use
   > ```

4. Install dependencies.

   ```bash
   npm install
   ```

5. Download browsers used by Playwright:<a id="setup-5"></a>

   ```bash
   npx playwright install --with-deps
   ```

   > ⚠️ Depending on your operating system and its compatibility with Playwright's dependencies, this step can fail or warn about them being incompatible while still installing them. If installed, they will likely work.
   >
   > 💡 If you get an error, or the dependencies do not work, you can run Playwright [On a container](#run-container).

Done! 👍

## ✅ Run validations<a id="run-validations"></a>

### 🐋 On a container<a id="run-container"></a>

> 📦 No browser window will be shown, as containerizing Playwright means that there will be no graphics server to use.
>
> Browsers will still run in headless mode.

Use:

```bash
npm run test
```

This will make use of the [docker-compose.yaml](./docker-compose.yaml) file, which describes the necessary services to recreate the containerized development environment, on which the Playwright validations will be executed.

After setting up the environment, the Playwright application will be packaged and run as a service of its own, according to [Dockerfile](./Dockerfile).

### 🦾 On metal

> ⚠️ Only applicable if there were no issues with the [setup's step #5](#setup-5).
>
> 💡 If that was the case, you will need to run Playwright [On a container](#run-container).

Recreate the development environment with:

```bash
npm run services:start
```

It uses the same [docker-compose.yaml](./docker-compose.yaml) file as before, but excludes the Playwright application so it can be run locally.

Once the services are initialized, run Playwright with:

```bash
npm run metal:test
```

## 📋 Open reports<a id="open-reports"></a>

Use:

```bash
npm run report
```

## ⚖️ License<a id="license"></a>

Licensed under [MIT's license](https://opensource.org/licenses/MIT).

A copy of the [project's license](./LICENSE) is available within it.

## 👨🏻‍💻 Author<a id="author"></a>

MedusaJS Playwright is written by Juan M. Flaherty.

[GitHub](https://github.com/jmflaherty) | [LinkedIn](https://www.linkedin.com/in/juanmflaherty/?locale=en_US)

<p align="center">
Enjoy! ❤️
</p>
