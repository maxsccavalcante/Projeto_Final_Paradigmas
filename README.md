# Bilheteria concorrente

Projeto final de Paradigmas de Linguagens de Programação. Enunciado completo no Blackboard.

Os arquivos de `src/` que vocês escrevem já existem, vazios; o `tipos.ts` e o `servidor.ts` vêm prontos. O que vai em cada um está no passo
indicado do enunciado:

| Arquivo | Passo do enunciado |
| :--- | :--- |
| `src/tipos.ts` (pronto) | 1: os tipos |
| `src/regras.ts` | 2: meia-entrada |
| `src/preco.ts` | 3: preço (funcional) |
| `src/dominio.ts` | 4: evento e erros (orientado a objetos) |
| `src/bilheteria.ts` | 5: a venda, onde a concorrência aparece |
| `src/servidor.ts` (pronto) e `src/main.ts` | 6: ligar o servidor |

Não alterem `src/pagamento.ts`, `src/servidor.ts`, `src/bench.ts` nem `testes/`: a correção usa os originais.

Para começar, sigam o `GUIA.md`. Depois dele, os comandos são:

```bash
npm install
npm test          # correção automática: mostra os pontos
npm start         # serviço em http://localhost:3000
npm run bench     # com o serviço no ar: 200 pedidos simultâneos no evento 1, dois por poltrona
```

Exemplo de pedido:

```bash
curl -X POST localhost:3000/reservas -H 'Content-Type: application/json' \
  -d '{"eventoId":1,"ingressos":[{"nome":"Ana","idade":20,"estudante":true,"pcd":false,"poltrona":7}]}'
```

---

## Preencham (avaliado no vídeo)

**Link do vídeo:** 

### Integrantes

| Nome | Usuário do GitHub | Parte principal |
| :--- | :--- | :--- |
| Max Cavalcante | [maxsccavalcante](https://github.com/maxsccavalcante) | Repositório, `regras.ts`, `main.ts`, resultados do bench |
| Vitor Nóbrega | [Vitornspb](https://github.com/Vitornspb) | `dominio.ts` (orientado a objetos) |
| Augusto Lustosa | | `preco.ts` (funcional) |
| Bruno Dutra | | `bilheteria.ts` (concorrente) |

### Decisões

1. **Concorrência.** Como vocês garantem que duas pessoas não ficam com a mesma poltrona? Onde estava o
   `await` perigoso?
2. **OO.** O que o `Evento` esconde e por quê? Por que o `reservar` é tudo ou nada? Por que os erros são uma hierarquia de classes?

   O `Evento` esconde a lista de poltronas vendidas num campo privado `#vendidas`. De fora só dá
   para ler `disponivel`, um `get` sem `set`: `evento.disponivel = 999` não muda nada (em módulo,
   lança `TypeError`). Assim, a única forma de mudar as poltronas é pelos métodos `reservar` e
   `liberar`, que conferem as regras. Ninguém de fora consegue vender a mesma poltrona duas vezes.

   O `reservar` é tudo ou nada porque um pedido é de uma família que compra junto. O método confere
   a lista inteira primeiro (lista vazia, poltrona inexistente, repetida ou já vendida) e só marca
   no fim. Se der erro, nenhuma poltrona fica marcada pela metade.

   Os erros são uma hierarquia (`ErroDeNegocio` abstrata e quatro filhas) porque cada filha guarda
   o próprio `status` HTTP. O servidor só testa `erro instanceof ErroDeNegocio` e responde
   `erro.status`, sem `if` ou `switch` para cada tipo de erro. Um erro novo de negócio não muda o
   servidor.

3. **Funcional.** O que ganhamos com `preco.ts` puro? Como vocês testariam ele sem subir o servidor?
4. **Se fosse em outro paradigma.** Escolham uma das partes e expliquem como ficaria em outro
   paradigma, e se ficaria melhor ou pior.
5. **Concorrente × paralelo.** O Node roda o JavaScript numa linha só: os pedidos de vocês são
   concorrentes, não paralelos. O que mudaria se a venda rodasse em vários núcleos ao mesmo tempo?

### Resultados do bench

| Cenário | Pedidos | Tempo (ms) | Vendidos | Poltrona ocupada | Falha de pagamento |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Padrão (`main.ts`) | 200 | | | | |

O bench ocupa as poltronas do evento 1: para rodar de novo, parem o `npm start` (Ctrl+C) e subam outra
vez.

O que os números mostram: