# Mobilitas

Este arquivo se destina a desenvolvedores que venham a fazer edições no
tema para seus clientes.

Esse tema foi desenvolvido utilizando SASS (SCSS) e Autoprefixer, além
de um minificador de JS.

## O que isso significa?

Significa que se você quiser fazer edições de
CSS e JS, você não deve editar os arquivos compilados, como o
`theme.min.css` ou `theme.min.js`, pois se um desenvolvedor futuro vier
a recompilar esses arquivos, todas as suas alterações serão apagadas.

Por isso, é importante aprender a _utilizar o SCSS com Autoprefixer_ ou
então criar um arquivo à parte para fazer _overrides_ ao código original
sem alterá-lo. 

Seu cliente e o desenvolvedor futuro (que pode ser você!) agradecem.

## Icon Fonts

Este tema utiliza uma fonte de ícones para aplicar os ícones no layout.
Essa fonte foi gerada a partir de algumas bibliotecas usando o
[Icomoon](https://icomoon.io/).

Recomendamos que novos ícones sejam adicionados ao arquivo de fontes
original, o que pode ser feito importando o arquivo `selection.json` no
_webapp_ do Icomoon.

---

Equipe da Strongway Webstudio.
[mobilitas@strongway.com.br](mailto:mobilitas@strongway.com.br)
