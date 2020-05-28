
# Crypto Dashboard Polymer 2 (:heavy_dollar_sign:)

Proyecto de Dashboard que muestra los precios de **Bitcoin**, **Etherum**, **Lite Coin** y **Bitcoin Cash**. Desarrollado en Polymer 2.

Los datos se obtienen de :moneybag:[Coinbase](https://www.coinbase.com) y de su [API](https://developers.coinbase.com) en formato `JSON` :sunglasses:.

![Frontal](https://github.com/OmarMJU/Polymer_Crypto-Dashboard/blob/master/img/01.png)

Cada componente muestra los datos de una crypto

![crypto-component](https://github.com/OmarMJU/Polymer_Crypto-Dashboard/blob/master/img/02.png)

Para especificar que datos va a mostrar el componente se le especifican en los atributos.

    <coin-component moneda="BITCOIN" color="f7b924" icono="btn" idmon="5b71fc48-3dd3-540c-809b-f8c94d0e68b5"></coin-component>

Muestra los precios de la crypto en un rango de una semana y solo es necesario poner el cursor en un un punto para saber los datos de ese día.

![crypto-grafica](https://github.com/OmarMJU/Polymer_Crypto-Dashboard/blob/master/img/03.png)

Solo basta mandar el vector de datos mediante _two way binding_ en los atributos `datosprecios` y `datosfechas`

    <grafica-component id="componentgrafic" datosprecios="{{datospreciomoneda}}" datosfechas="{{datosfechamoneda}}" colorgrafica="" nombregrafica=""></grafica-component>

> **NOTA:** Los vectores de datos deben ser tranformados a `String` mediante `JSON.stringify()` para que puedan ser mapeados de los atributos del componente a las dependencias del mismo.

## Dependencias

A pesar de que fue desarrollado con tecnología añeja se usaron herramientas no tan añejas.

* [NodeJS](https://nodejs.org/en/) :green_heart:
* [Polymer](https://www.polymer-project.org) :sparkles:
* [Bower](https://bower.io) :bird:
* [Chart.JS](https://www.chartjs.org) :chart_with_upwards_trend:
* [Moment.JS](https://momentjs.com) :clock9:
* [Font Awesome](https://fontawesome.com) :rocket:

### NodeJS

Para el proyecto va a ser muy importante ya que sus dependencias e instalaciones de los paquetes se realizan con `npm`. Por ello puedes descargar `NodeJS` [aquí](https://nodejs.org/en/) o si prefieres correrlo en un contenedor `Docker` puedes ejecutar el comando 

```
$ docker run node
```

### Polymer

Es el corazón de la app por ello es totalmente necesario, y para instalarlo solo basta ejecutar el siguiente comando en una terminal

```
$ npm install -g lit-element
```

### Bower

También es un instalador de paquetes y dependencias el cual se va a usar para cargar todas las dependencias que se especifican en el archivo `bower.json` sin que sea necesario instalar cada una de las dependencias que de forma manual. Bower se puede instalar así

```
$ npm install -g bower
```

### ChartJS

Ayuda a realizar las gráficas de los precios vs las fechas :chart_with_upwards_trend:.

### MomentJS

Facilita realizar la conversión del formato `epoch` a formato `ISO` sin realizar tanto código :relaxed:.

### Font Awesome

Propociona iconos increibles y de fácil manipulación ya que pueden sen tratados como `fonts` :muscle:. 

## Instalación de dependencias

No es necesario realizar una instalación como tal de todas las dependencias que se mencionan anteriormente ya que vienen especificadas en el archivo `bower.json`. Es suficiente con ejecutar el comando

```
$ bower install
```

## Run y Testing

Se puede realizar un test antes de realizar la ejecución del proyecto

```
$ polymer test
```

y para correr un servidor de forma local y montar la ejecución del proyecto

```
$ polymer serve
```

### Creditos

La idea para el desarrollo del proyecto se obtuvo del curso **_Learn and Build using Polymer LitElement (beyond Polymer 3)_** que puedes consultar [aquí](https://www.udemy.com/share/102mRqCUYaeFtQR3o=/).

Hecho con :blue_heart: para todos aquellos que aman aprender y tirar código.