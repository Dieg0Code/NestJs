# Apuntes

NestJs es un framework para el desarrollo de aplicaciones web backend. Es un framework con abstracciones basado en NodeJs.

¿Porque deberíamos usar NestJs?, cuando creamos una aplicación con Express, puede ser muy sencillo, pero cuando la aplicación crece esta simplicidad nos juega en contra, ahí es donde NestJs nos ayuda con patrones como los principios SOLID, Typescript, POO, programación funcional y programación reactiva.

NestJs ha crecido mucho desde su lanzamiento, esto debido a la arquitectura y estructura que nos brinda, basada en controladores, servicios, modelos de datos y acceso a ellos, todo esto para hacer aplicaciones más mantenibles y escalables.

## Instalación

Para instalar NestJs debemos tener instalado NodeJs, luego podemos instalarlo con el comando:

```
npm i -g @nestjs/cli
```

Se debe ejecutar la terminal como administrador en windows o con sudo en linux.

## Controladores

Los controladores se encargan de recibir los request de nuestra aplicación, estos tienen la responsabilidad de validar los datos, ver que los tipos sean correctos, ver que los permisos del usuario sean correctos, y si todo eso va bien entonces se conecta a la capa de servicios para obtener los datos.

Los request son las peticiones que se reciben desde el cliente mediante el protocolo HTTP, es decir utilizamos los verbos HTTP para realizar las peticiones, `Get`, `Post`, `Put`, `Delete`, `Patch`.

En Nest tenemos los decoradores para así indicar a las clases como deben comportarse en el framework.

Por ejemplo, para indicar que una clase es un controlador, podemos utilizar el decorador `@Controller` y el decorador `@Get` para indicar que una función es un endpoint para el verbo HTTP `Get`.

```TypeScript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  constructor() {}

  @Get('nuevo endpoint')
  getNewEndpoint(): string {
    return 'Soy un nuevo endpoint';
  }
}
```

## Recibir parámetros en un endpoint

En una API podemos tener varias rutas por ejemplo:

  - api.example.com/tasks/{id}/
  - api.example.com/people/{id}/
  - api.example.com/users/{id}/tasks/

*Como tipo, debemos nombras los endpoint en plural, por ejemplo: `tasks`, `people`, `users`.*

¿Como incorporamos los parámetros en NestJs?, para ello utilizamos el decorador `@Param()`.

Por ejemplo:

```TypeScript
@Get(':id')
findOne(@Param('id') id: string) {
  return `The #${id}`;
}
```

## Parámetros tipo `Query`

Este tipo de parámetros se usan para no enviar uno por uno un gran conjunto de parámetros a un endpoint, por ejemplo nos pueden servir para filtrar, "quiero todos los productos de una región en especifico, con una marca en especifico y en un orden en especifico".

  - api.example.com/products
  - api.example.com/products?page=1
  - api.example.com/products?limit=10&offset=0
  - api.example.com/products?region=USA
  - api.example.com/products?region=USA&brand=XYZ
  - api.example.com/products?region=USA&brand=XYZ&sort=asc

Los query params empiezan con un signo `?` y luego los podemos concatenar con `&`.

Para usarlos en Nest tenemos el decorador `@Query()`.

```TypeScript
@Get()
findAll(@Query() paginationQuery) {
  const { limit, offset } = paginationQuery;
  return `Limit: ${limit}, Offset: ${offset}`;
}
```

Hay un error que puede ocurrir cuando una ruta choca con otra, por ejemplo:

```TypeScript
@Get('products/:productId')
getProduct(@Param('productId') productId: string): string {
	return `product id: ${productId}`;
}
```

Tenemos este endpoint que recibe un parámetro `productId`, ¿Que pasa si quiero crear una ruta que sea del estilo `/products/filter`?

```TypeScript
@Get('products/filter')
getProductsFilter(): string {
  return 'products filter';
}
```

  - api.example.com/products/filter

Me devolvería `product id: filter`, esto es porque al tener declarada la ruta `/products/:productId` y `/products/filter`, toma `filter` como el parámetro `productId`, solucionar esto es sencillo, tan solo debemos declarar primero la ruta `/products/filter` y luego la ruta `/products/:productId`, las rutas dinámicas deben ir al final.

## Single Responsibility Principle

El principio de de responsabilidad única es una buena práctica de los patrones de arquitectura SOLID, esto significa que un método o una clase debe tener una sola y única responsabilidad.

Este principio se refiere, por ejemplo, a que si declaro un método llamado "suma", que haga solo eso, sumar, si dentro de ese método estoy dividiendo o restando, no estoy cumpliendo con el principio de responsabilidad única.

Este principio puede ser llevado a las clases, por ejemplo, la clase del controller de la aplicación tiene muchas responsabilidades, no está mal que tenga muchos métodos, pero si está mal que atienda muchos endpoint con responsabilidades diferentes, tenemos categories y products juntos, debería haber una clase para cada uno de ellos.

El CLI de NestJs nos ayuda a generar controladores desde la terminal, así podemos separar las responsabilidades de los controladores de mejor manera.

```
nest g controller controllers/controllerName --flat
```

De esta manera podemos generar todos los controladores en la carpeta `controllers`.

## Post: método para crear un nuevo elemento

Para poder usar el método `Post` debemos importar el decorador `@Post()`.

```TypeScript
@Controller()
export class AppController {

  constructor() {}

  @Post()
	create() {
		return {
			message: 'create product',
		};
	}
}
```

Con el método `Post` enviamos toda la data por el cuerpo de la petición, para poder recibir la data debemos utilizar el decorador `@Body()`.

```TypeScript
@Post()
create(@Body() payload: any) {
  return {
    message: 'create product',
    payload,
  }
}