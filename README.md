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
| Augusto Lustosa | [AugustoLustosaAF](https://github.com/AugustoLustosaAF) | `preco.ts` (funcional) |
| Bruno Dutra | [brunodutras](https://github.com/brunodutras) | `bilheteria.ts` (concorrente) |

### Decisões

1. **Concorrência.** Como vocês garantem que duas pessoas não ficam com a mesma poltrona? Onde estava o
   `await` perigoso?

   No `bilheteria.reservar`, as poltronas são marcadas com `evento.reservar(poltronas)` **antes** do `await` do pagamento. O Node roda o nosso código numa thread só, e um pedido só cede a vez para outro quando chega num `await`. Entre conferir se a poltrona está livre e marcá-la não existe nenhum `await`, então nenhum outro pedido roda no meio. Quem chega depois encontra a poltrona com dono e recebe `PoltronaOcupadaErro` (409) sem ser cobrado.

   O `await` perigoso é o do pagamento. Se a poltrona fosse marcada só depois dele, os 200 pedidos chegariam juntos ao `await`, todos seriam cobrados e só depois 150 descobririam que a poltrona já tinha dono. Mostramos isso no vídeo: o teste falha com "cobrou 200 pessoas por 50 poltronas".

   Se o pagamento falha ou passa de `limitePagamentoMs` (`comTempoLimite`, com `Promise.race`), o `catch` devolve as poltronas com `evento.liberar` e lança `PagamentoErro` (502).

   Limite: o `race` não cancela a cobrança atrasada. Se a operadora aprovar depois do tempo esgotado, o cliente pode ter pago sem levar a poltrona. Num sistema real, isso pediria consultar a operadora ou estornar a cobrança.

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

As funções do `preco.ts` dependem só dos parâmetros e não alteram nada fora delas: não usam `let`, `for` ou `push`, e o `map` e o `reduce` produzem valores novos. Com a mesma entrada, a saída é sempre a mesma, então um pedido não interfere no cálculo de outro. As fábricas `valorDoIngresso` e `aplicarTaxa` devolvem funções reutilizáveis, e o `montarIngressos` recebe a regra da meia por parâmetro, então dá para trocar a regra sem mexer no cálculo.

Para testar, basta importar e chamar, sem servidor ou operadora. Por exemplo, `calcularTotal(montarIngressos(100, [ana, beto], direitoAMeia))` deve dar `165` quando só Ana tem direito à meia.

4. **Se fosse em outro paradigma.** Escolham uma das partes e expliquem como ficaria em outro
   paradigma, e se ficaria melhor ou pior.

Em orientação a objetos, o preço poderia ser uma classe `CalculadoraDePreco`, com um campo `total` e um método `adicionarIngresso()` que vai somando nele. Ficaria pior: o resultado passaria a depender do estado guardado e da ordem das chamadas, uma instância compartilhada entre pedidos poderia misturar os totais, e testar exigiria montar o objeto e conferir seu estado. No funcional, o cálculo é um `map` seguido de um `reduce`, e cada chamada é independente.

5. **Concorrente × paralelo.** O Node roda o JavaScript numa linha só: os pedidos de vocês são
   concorrentes, não paralelos. O que mudaria se a venda rodasse em vários núcleos ao mesmo tempo?

   A nossa garantia vem de não haver `await` entre conferir e marcar a poltrona, porque numa thread só nada roda no meio desse trecho. Com vários núcleos ao mesmo tempo (por exemplo, threads com memória compartilhada, como em Java), dois pedidos poderiam conferir a mesma poltrona no mesmo instante, ver que está livre e os dois marcarem. Isso venderia a poltrona duas vezes, mesmo sem nenhum `await`. Seria preciso tornar o "confere e marca" uma operação atômica: uma trava (lock) em volta do `reservar`, uma operação atômica ou uma transação no banco de dados. Se cada núcleo tivesse a própria cópia do `Evento`, seria preciso também um lugar único com o estado das poltronas.

### Resultados do bench

| Cenário | Pedidos | Tempo (ms) | Vendidos | Poltrona ocupada | Falha de pagamento |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Padrão (`main.ts`) | 200 | 482 | 95 | 100 | 5 |

O bench ocupa as poltronas do evento 1: para rodar de novo, parem o `npm start` (Ctrl+C) e subam outra
vez.

O que os números mostram:

- **Ninguém levou poltrona repetida.** O evento 1 tem 100 poltronas e o bench manda dois pedidos para
  cada uma. Os 100 segundos pedidos receberam 409 (poltrona ocupada) sem ser cobrados, porque a
  poltrona é marcada antes do `await` do pagamento.
- **5 pagamentos falharam (502).** A operadora falsa recusa cerca de 10% das cobranças ao acaso, então
  esse número muda a cada execução. As poltronas desses pedidos foram devolvidas com `liberar`: o
  evento 1 terminou com `disponivel: 5`, e vendidos + falhas de pagamento = 95 + 5 = 100.
- **Os pedidos não esperam uns pelos outros.** Cada cobrança demora 80 ms. Um pedido por vez levaria
  cerca de 200 × 80 ms = 16 s, e os 200 terminaram em 482 ms, porque enquanto um pedido espera a
  operadora o Node atende os outros.