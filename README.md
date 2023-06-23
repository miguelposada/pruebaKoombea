## Description para prueba Koombea
 - el repositorio es https://github.com/miguelposada/pruebaKoombea.git la rama es development
 - se hizo uso del framework NestJS, base de datos MongoDB y el ORM Mongoose.
 - se implemento un Middleware que da proteccion a las rutas.
 - se definio una coleccion en mongoDB llamada WebScrapingData para almacenar la informacion asi:
   ![Alt text](image-5.png)
 - el servicio de registro se hizo mediante username y password en el cuerpo de la peticion(valida usuarios existentes)
   ![Alt text](image-1.png)
 - el servicio de logueo se implemento recibiendo un JWT y username y password en el cuerpo
   ![Alt text](image-3.png)

  ## se definieron tres servicios para dar cumplimiento a los requerimientos de Scrape
 - para usar el servicio de scrape y los demas servicio es necesario usar autenticacion Bearer token en postman  
   ![Alt text](image-6.png)
 - este es el resultado despues de usarlo con el token
   ![Alt text](image-4.png)
 - un servicio de Listar con cantidad total
   ![Alt text](image-7.png)
 - un servicio de listar links por dominio
   ![Alt text](image-8.png)

   ## Installation for Koombea test

```bash
$ npm install
```
## Nota: no olvidar tener instalado mongoDB y si se desea el MongoDB Compass
## en el repositorio se adjunta la coleccion de postman para pruebas 
`koombeatest.postman_collection`

## algunas pruebas unitarias aun no estan corriendo exitosamente debido a la falta de tiempo pero si estan muy avanzadas



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# para probar desde postman se adjunta en el repositorio el archivo para importar en postman
$ npm run test:e2e