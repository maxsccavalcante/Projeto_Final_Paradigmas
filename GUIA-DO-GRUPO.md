# Bilheteria concorrente: guia do grupo

Este guia diz o que cada integrante faz, em que ordem e o que mostrar no vídeo. O código já foi
testado no repositório modelo do professor: **16 de 16** no `npm test` e o typecheck sem erros.

> **Regra que zera a nota:** quem não tiver commit **com a própria conta** fica com 0 no projeto
> (código e vídeo). Cada um faz o seu commit no próprio computador, logado no próprio GitHub.

## Resumo

A divisão segue a ordem dos nomes: Max → 1, Vitor → 2, Augusto → 3 e Bruno → 4. Para trocar quem faz o quê, basta trocar os nomes.

| Integrante | Arquivos | Pontos que o commit traz | Seção do README |
|---|---|---|---|
| **1 · Max Cavalcante** | repositório, `src/regras.ts`, `src/main.ts` | 1 (regras) | link do vídeo, integrantes, tabela do bench |
| **2 · Vitor Nóbrega** | `src/dominio.ts` | 3 | pergunta 2 (OO) |
| **3 · Augusto Lustosa** | `src/preco.ts` | 3 | perguntas 3 (funcional) e 4 (outro paradigma) |
| **4 · Bruno Dutra** | `src/bilheteria.ts`, em 3 commits | 7 + 2 do servidor | perguntas 1 (concorrência) e 5 (paralelo) |

Pontos medidos commit a commit, nesta ordem:

| Depois do commit | `npm test` |
|---|---|
| modelo do professor | 0 de 16 |
| 1 · `regras.ts` | 1 de 16 |
| 3 · `preco.ts` | 4 de 16 |
| 2 · `dominio.ts` | 7 de 16 |
| 4 · `bilheteria.ts` parte A | 14 de 16 |
| 4 · `bilheteria.ts` parte B | 15 de 16 |
| 4 · `bilheteria.ts` parte C | **16 de 16** |

> **Diferença com o enunciado:** a tabela dele diz 12, 13 e 14 para as partes A, B e C. Na prática
> dá 14, 15 e 16, porque o teste do servidor (2 pontos) já passa na parte A. É o que o próprio
> enunciado diz: "eles aparecem quando a bilheteria funciona". O total final é o mesmo.

**Ordem:** o Max começa e avisa o grupo quando o repositório estiver no ar. Os integrantes 2 e 3 podem fazer em paralelo. O integrante 4 só
começa depois dos commits de 1, 2 e 3, porque a `bilheteria.ts` usa os três arquivos. O `main.ts`
e o README vêm por último.

---

## Antes de tudo (todos)

Precisam do **Node.js 22 ou mais novo** (`node -v`) e do **Git** (`git --version`).

**Repositório do grupo:** https://github.com/maxsccavalcante/Projeto_Final_Paradigmas
(já tem o `regras.ts` e a tabela de integrantes; `npm test` dá 1 de 16). Aceitem o convite de
colaborador que chega por e-mail e, uma vez só:

```bash
git clone https://github.com/maxsccavalcante/Projeto_Final_Paradigmas.git
cd Projeto_Final_Paradigmas
npm install
npm test        # tem que mostrar 1 de 16
```

Confiram também se o Git está com o **seu** nome e o e-mail da **sua** conta do GitHub
(`git config user.email`). Se o e-mail não estiver cadastrado na sua conta, o commit não conta
como seu.

Rotina de cada commit:

```bash
git pull                              # pega o que os colegas já enviaram
# cola o código no arquivo indicado
npm test                              # confere os pontos
git add src/ARQUIVO.ts
git commit -m "MENSAGEM INDICADA"
git push
```

Se o `git push` recusar, rodem `git pull` e depois `git push` de novo. Ninguém mexe no arquivo de
outro, então não há conflito.

**Não alterem** `src/tipos.ts`, `src/servidor.ts`, `src/pagamento.ts`, `src/bench.ts` nem
`testes/`. A correção usa os originais.

---

## Integrante 1 (Max Cavalcante) · Repositório, `regras.ts` e `main.ts`

> 1.1 e 1.2 já foram feitos e enviados: commits `Passo 2: direitoAMeia (regras.ts)` e
> `README: integrantes`. Falta adicionar os colaboradores (passo 3 do 1.1).

### 1.1 Criar o repositório do grupo

1. No GitHub, criem um repositório **público e vazio**, sem README.
2. No terminal, troquem `usuario/repositorio-do-grupo` pelo endereço do repositório criado:

   ```bash
   git clone https://github.com/douglasmeneses/bilheteria-projeto-final.git
   cd bilheteria-projeto-final
   git remote set-url origin https://github.com/usuario/repositorio-do-grupo.git
   git push -u origin main
   npm install
   npm test        # tem que mostrar 0 de 16
   ```
3. No GitHub, abram **Settings → Collaborators** e adicionem os 3 colegas.
4. Mandem o link para o grupo. Cada um faz `git clone <link>`, `cd` na pasta e `npm install`.

> O push do modelo leva os commits do **professor**, que não contam como seus. Por isso o próximo
> passo é obrigatório.

### 1.2 Commit: `src/regras.ts` → 1 de 16

Mensagem: `Passo 2: direitoAMeia (regras.ts)`

```ts
// Passo 2: quem paga meia-entrada.
import type { Pessoa } from "./tipos.ts";

// Estudante, pessoa com deficiência (PcD) ou quem tem 60 anos ou mais paga meia.
export function direitoAMeia(pessoa: Pessoa): boolean {
  return pessoa.estudante || pessoa.pcd || pessoa.idade >= 60;
}
```

### 1.3 Commit: `src/main.ts`, depois que o integrante 4 terminar

Mensagem: `Passo 6: main.ts liga a bilheteria ao servidor`

Os eventos 2 e 3 ficam **à escolha do grupo**: os nomes, preços e capacidades abaixo são só uma
sugestão. O enunciado só exige o evento de id 1 com 100 poltronas.

```ts
// Passo 6: liga as peças e sobe o servidor em http://localhost:3000.
import { criarBilheteria } from "./bilheteria.ts";
import { Evento } from "./dominio.ts";
import { criarPagamentoFalso } from "./pagamento.ts";
import { criarServidor } from "./servidor.ts";

// O evento de id 1, com 100 poltronas, é o que o bench usa.
// Os eventos 2 e 3 são à escolha do grupo.
const eventos = [
  new Evento(1, "Show de abertura", 120, 100),
  new Evento(2, "Peça de teatro", 60, 50),
  new Evento(3, "Stand-up", 40, 30),
];

// Operadora falsa: cada cobrança demora 80 ms e 10% falham.
const pagar = criarPagamentoFalso({ latenciaMs: 80, taxaDeFalha: 0.1 });

const bilheteria = criarBilheteria({ eventos, pagar, limitePagamentoMs: 500 });

criarServidor(bilheteria).listen(3000, () => {
  console.log("Bilheteria no ar em http://localhost:3000");
});
```

Confiram com `npm start` num terminal e `npm run bench` em outro.

### 1.4 Commit: README, o seu trecho

A tabela de integrantes já subiu no commit `README: integrantes`, com os nomes e as partes. Cada
colega completa o próprio usuário do GitHub no commit de README dele.

Mensagem do commit final: `README: link do vídeo e bench`

Preencham no `README.md`:
- o link do vídeo, depois de `**Link do vídeo:**`;
- a tabela do bench, com os números do bench **de vocês** (veja abaixo).

### 1.5 Entrega no Blackboard

Só o integrante 1 envia, pelo grupo todo:
- o nome do grupo;
- o link do repositório;
- o link do vídeo;
- o nome completo e o RGM de cada integrante.

**Antes de enviar,** abram os dois links numa **janela anônima** (Ctrl+Shift+N). Se pedir login,
a correção também não consegue abrir.

---

## Integrante 2 (Vitor Nóbrega) · `src/dominio.ts` (orientado a objetos) → +3 pontos

Mensagem: `Passo 4: Evento e hierarquia de erros (dominio.ts)`

```ts
// Passo 4: o evento e os erros, no paradigma orientado a objetos.
import type { EventoInfo } from "./tipos.ts";

// ---------------------------------------------------------------- Erros de negócio
// Classe abstrata: ninguém cria um ErroDeNegocio "genérico", só as filhas.
// Cada erro guarda o próprio status HTTP; o servidor só lê erro.status.
export abstract class ErroDeNegocio extends Error {
  readonly status: number;

  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.name = new.target.name;
    this.status = status;
  }
}

// Pedido ou poltrona inválidos.
export class DadosInvalidosErro extends ErroDeNegocio {
  constructor(mensagem: string) {
    super(mensagem, 400);
  }
}

// O evento não existe.
export class NaoEncontradoErro extends ErroDeNegocio {
  constructor(mensagem: string) {
    super(mensagem, 404);
  }
}

// A poltrona já foi vendida.
export class PoltronaOcupadaErro extends ErroDeNegocio {
  constructor(mensagem: string) {
    super(mensagem, 409);
  }
}

// A operadora não aprovou o pagamento.
export class PagamentoErro extends ErroDeNegocio {
  constructor(mensagem: string) {
    super(mensagem, 502);
  }
}

// ---------------------------------------------------------------- Evento
export class Evento {
  readonly id: number;
  readonly nome: string;
  readonly preco: number;
  readonly capacidade: number;

  // Privado (#): só os métodos da classe mexem nas poltronas vendidas.
  #vendidas: number[] = [];

  constructor(id: number, nome: string, preco: number, capacidade: number) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.capacidade = capacidade;
  }

  // Só leitura: não tem set, então `evento.disponivel = 999` não muda nada.
  get disponivel(): number {
    return this.capacidade - this.#vendidas.length;
  }

  // Tudo ou nada: confere a lista inteira primeiro e só depois marca.
  reservar(poltronas: number[]): void {
    if (poltronas.length === 0) {
      throw new DadosInvalidosErro("o pedido não tem poltronas");
    }
    if (new Set(poltronas).size !== poltronas.length) {
      throw new DadosInvalidosErro("a mesma poltrona aparece duas vezes no pedido");
    }
    const inexistente = poltronas.find((poltrona) => !this.#existe(poltrona));
    if (inexistente !== undefined) {
      throw new DadosInvalidosErro(`a poltrona ${inexistente} não existe`);
    }
    const ocupada = poltronas.find((poltrona) => this.#vendidas.includes(poltrona));
    if (ocupada !== undefined) {
      throw new PoltronaOcupadaErro(`a poltrona ${ocupada} já foi vendida`);
    }
    // Chegou aqui: todas são válidas e livres. Agora marca.
    this.#vendidas.push(...poltronas);
  }

  // Devolve as poltronas para a venda (usado quando o pagamento falha).
  liberar(poltronas: number[]): void {
    const naoVendida = poltronas.find((poltrona) => !this.#vendidas.includes(poltrona));
    if (naoVendida !== undefined) {
      throw new DadosInvalidosErro(`a poltrona ${naoVendida} não estava vendida`);
    }
    this.#vendidas = this.#vendidas.filter((poltrona) => !poltronas.includes(poltrona));
  }

  info(): EventoInfo {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      capacidade: this.capacidade,
      disponivel: this.disponivel,
    };
  }

  // A poltrona existe se for um número inteiro de 1 até a capacidade.
  #existe(poltrona: number): boolean {
    return Number.isInteger(poltrona) && poltrona >= 1 && poltrona <= this.capacidade;
  }
}
```

Sozinho, este arquivo já faz os 3 testes de OO passarem.

**README:** escrevam a resposta da **pergunta 2 (OO)**. Mensagem: `README: pergunta 2 (OO)`.

---

## Integrante 3 (Augusto Lustosa) · `src/preco.ts` (funcional) → +3 pontos

Mensagem: `Passo 3: preço funcional com fábricas, map e reduce (preco.ts)`

```ts
// Passo 3: o preço, no paradigma funcional.
// Só funções puras: o resultado depende só dos parâmetros e nada de fora é alterado.
import type { Ingresso, Pessoa, TipoIngresso } from "./tipos.ts";

// Arredonda em 2 casas e devolve número (o toFixed devolveria texto).
const arredondar = (valor: number): number => Math.round(valor * 100) / 100;

// Fábrica, como o criarMultiplicador: guarda o precoBase na closure
// e devolve uma função que recebe o tipo e devolve o valor.
export function valorDoIngresso(precoBase: number): (tipo: TipoIngresso) => number {
  return (tipo) => (tipo === "meia" ? arredondar(precoBase / 2) : precoBase);
}

// Outra fábrica: guarda o percentual e devolve uma função que soma a taxa a um valor.
export function aplicarTaxa(percentual: number): (valor: number) => number {
  return (valor) => arredondar(valor * (1 + percentual));
}

// Um Ingresso por pessoa, na mesma ordem, com o map.
// Quem decide se é meia é a função recebida por parâmetro.
export function montarIngressos(
  precoBase: number,
  pessoas: readonly Pessoa[],
  temDireitoAMeia: (pessoa: Pessoa) => boolean,
): Ingresso[] {
  const valorPorTipo = valorDoIngresso(precoBase);
  return pessoas.map((pessoa) => {
    const tipo: TipoIngresso = temDireitoAMeia(pessoa) ? "meia" : "inteira";
    return { nome: pessoa.nome, poltrona: pessoa.poltrona, tipo, valor: valorPorTipo(tipo) };
  });
}

// Soma os valores com o reduce (valor inicial 0) e aplica a taxa de serviço de 10%.
export function calcularTotal(ingressos: readonly Ingresso[]): number {
  const soma = ingressos.reduce((acumulado, ingresso) => acumulado + ingresso.valor, 0);
  return aplicarTaxa(0.1)(soma);
}
```

Neste arquivo **não pode** aparecer `let`, `var`, `for`, `while`, `forEach`, `push` nem `class`.
O teste lê o arquivo e tira o ponto se aparecer.

**README:** escrevam as respostas das **perguntas 3 e 4**. Mensagem: `README: perguntas 3 e 4 (funcional)`.

---

## Integrante 4 (Bruno Dutra) · `src/bilheteria.ts` (concorrente) → +9 pontos, em 3 commits

Comecem só depois que `regras.ts`, `preco.ts` e `dominio.ts` estiverem no repositório (`git pull`).

### Commit A: os 5 passos → 14 de 16

Mensagem: `Passo 5A: reservar em 5 passos, marcando antes do await (bilheteria.ts)`

```ts
// Passo 5: a venda, onde a concorrência aparece.
import { DadosInvalidosErro, NaoEncontradoErro, type Evento } from "./dominio.ts";
import type { Pagamento } from "./pagamento.ts";
import { calcularTotal, montarIngressos } from "./preco.ts";
import { direitoAMeia } from "./regras.ts";
import type { Comprovante, ConfigBilheteria, EventoInfo, Pedido } from "./tipos.ts";

export class Bilheteria {
  // Campos # : ninguém de fora troca os eventos, a operadora, o limite ou o contador.
  #eventos: Evento[];
  #pagar: Pagamento;
  #limitePagamentoMs: number;
  #ultimoReservaId = 0;

  constructor(config: ConfigBilheteria) {
    this.#eventos = config.eventos;
    this.#pagar = config.pagar;
    this.#limitePagamentoMs = config.limitePagamentoMs;
  }

  listarEventos(): EventoInfo[] {
    return this.#eventos.map((evento) => evento.info());
  }

  async reservar(pedido: Pedido): Promise<Comprovante> {
    // 1. Confere o pedido e procura o evento.
    if (!Array.isArray(pedido?.ingressos) || pedido.ingressos.length === 0) {
      throw new DadosInvalidosErro("o pedido precisa de pelo menos um ingresso");
    }
    const evento = this.#eventos.find((e) => e.id === pedido.eventoId);
    if (evento === undefined) {
      throw new NaoEncontradoErro(`o evento ${pedido.eventoId} não existe`);
    }

    // 2. Marca as poltronas ANTES do await: entre ler e gravar não há espera,
    //    então nenhum outro pedido roda no meio. Os erros de poltrona saem daqui, antes de cobrar.
    const poltronas = pedido.ingressos.map((pessoa) => pessoa.poltrona);
    evento.reservar(poltronas);

    // 3. Ingressos e total (funções puras do preco.ts).
    const ingressos = montarIngressos(evento.preco, pedido.ingressos, direitoAMeia);
    const total = calcularTotal(ingressos);

    // 4. Cobra: o único await da venda. Enquanto espera, o Node atende os outros pedidos.
    await this.#pagar(total);

    // 5. Devolve o comprovante, com um reservaId novo a cada compra.
    this.#ultimoReservaId += 1;
    return { reservaId: this.#ultimoReservaId, eventoId: evento.id, ingressos, total };
  }
}

export function criarBilheteria(config: ConfigBilheteria): Bilheteria {
  return new Bilheteria(config);
}
```

### Commit B: pagamento recusado devolve as poltronas → 15 de 16

Mensagem: `Passo 5B: pagamento recusado libera as poltronas (bilheteria.ts)`

```ts
// Passo 5: a venda, onde a concorrência aparece.
import { DadosInvalidosErro, NaoEncontradoErro, PagamentoErro, type Evento } from "./dominio.ts";
import type { Pagamento } from "./pagamento.ts";
import { calcularTotal, montarIngressos } from "./preco.ts";
import { direitoAMeia } from "./regras.ts";
import type { Comprovante, ConfigBilheteria, EventoInfo, Pedido } from "./tipos.ts";

export class Bilheteria {
  // Campos # : ninguém de fora troca os eventos, a operadora, o limite ou o contador.
  #eventos: Evento[];
  #pagar: Pagamento;
  #limitePagamentoMs: number;
  #ultimoReservaId = 0;

  constructor(config: ConfigBilheteria) {
    this.#eventos = config.eventos;
    this.#pagar = config.pagar;
    this.#limitePagamentoMs = config.limitePagamentoMs;
  }

  listarEventos(): EventoInfo[] {
    return this.#eventos.map((evento) => evento.info());
  }

  async reservar(pedido: Pedido): Promise<Comprovante> {
    // 1. Confere o pedido e procura o evento.
    if (!Array.isArray(pedido?.ingressos) || pedido.ingressos.length === 0) {
      throw new DadosInvalidosErro("o pedido precisa de pelo menos um ingresso");
    }
    const evento = this.#eventos.find((e) => e.id === pedido.eventoId);
    if (evento === undefined) {
      throw new NaoEncontradoErro(`o evento ${pedido.eventoId} não existe`);
    }

    // 2. Marca as poltronas ANTES do await: entre ler e gravar não há espera,
    //    então nenhum outro pedido roda no meio. Os erros de poltrona saem daqui, antes de cobrar.
    const poltronas = pedido.ingressos.map((pessoa) => pessoa.poltrona);
    evento.reservar(poltronas);

    // 3. Ingressos e total (funções puras do preco.ts).
    const ingressos = montarIngressos(evento.preco, pedido.ingressos, direitoAMeia);
    const total = calcularTotal(ingressos);

    // 4. Cobra: o único await da venda. Enquanto espera, o Node atende os outros pedidos.
    try {
      await this.#pagar(total);
    } catch {
      // Parte B: as poltronas já estavam marcadas (passo 2). Sem devolver,
      // ficariam com dono sem ninguém ter pago.
      evento.liberar(poltronas);
      throw new PagamentoErro("a operadora não aprovou o pagamento");
    }

    // 5. Devolve o comprovante, com um reservaId novo a cada compra.
    this.#ultimoReservaId += 1;
    return { reservaId: this.#ultimoReservaId, eventoId: evento.id, ingressos, total };
  }
}

export function criarBilheteria(config: ConfigBilheteria): Bilheteria {
  return new Bilheteria(config);
}
```

### Commit C: tempo limite com `Promise.race` → 16 de 16

Mensagem: `Passo 5C: tempo limite na operadora com comTempoLimite (bilheteria.ts)`

```ts
// Passo 5: a venda, onde a concorrência aparece.
import { DadosInvalidosErro, NaoEncontradoErro, PagamentoErro, type Evento } from "./dominio.ts";
import type { Pagamento } from "./pagamento.ts";
import { calcularTotal, montarIngressos } from "./preco.ts";
import { direitoAMeia } from "./regras.ts";
import type { Comprovante, ConfigBilheteria, EventoInfo, Pedido } from "./tipos.ts";

// Parte C: tempo limite. O Promise.race fica com quem terminar primeiro:
// a cobrança ou o relógio, que rejeita depois de `ms` milissegundos.
function comTempoLimite<T>(promessa: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const limite = new Promise<never>((_, rejeitar) => {
    timer = setTimeout(() => rejeitar(new Error("tempo esgotado")), ms);
  });
  // O finally desliga o relógio quando a cobrança termina antes.
  return Promise.race([promessa, limite]).finally(() => clearTimeout(timer));
}

export class Bilheteria {
  // Campos # : ninguém de fora troca os eventos, a operadora, o limite ou o contador.
  #eventos: Evento[];
  #pagar: Pagamento;
  #limitePagamentoMs: number;
  #ultimoReservaId = 0;

  constructor(config: ConfigBilheteria) {
    this.#eventos = config.eventos;
    this.#pagar = config.pagar;
    this.#limitePagamentoMs = config.limitePagamentoMs;
  }

  listarEventos(): EventoInfo[] {
    return this.#eventos.map((evento) => evento.info());
  }

  async reservar(pedido: Pedido): Promise<Comprovante> {
    // 1. Confere o pedido e procura o evento.
    if (!Array.isArray(pedido?.ingressos) || pedido.ingressos.length === 0) {
      throw new DadosInvalidosErro("o pedido precisa de pelo menos um ingresso");
    }
    const evento = this.#eventos.find((e) => e.id === pedido.eventoId);
    if (evento === undefined) {
      throw new NaoEncontradoErro(`o evento ${pedido.eventoId} não existe`);
    }

    // 2. Marca as poltronas ANTES do await: entre ler e gravar não há espera,
    //    então nenhum outro pedido roda no meio. Os erros de poltrona saem daqui, antes de cobrar.
    const poltronas = pedido.ingressos.map((pessoa) => pessoa.poltrona);
    evento.reservar(poltronas);

    // 3. Ingressos e total (funções puras do preco.ts).
    const ingressos = montarIngressos(evento.preco, pedido.ingressos, direitoAMeia);
    const total = calcularTotal(ingressos);

    // 4. Cobra: o único await da venda. Enquanto espera, o Node atende os outros pedidos.
    try {
      // Parte C: não espera para sempre uma operadora travada.
      await comTempoLimite(this.#pagar(total), this.#limitePagamentoMs);
    } catch {
      // Parte B: recusa ou tempo esgotado têm a mesma resposta. As poltronas já
      // estavam marcadas (passo 2): sem devolver, ficariam com dono sem ninguém ter pago.
      evento.liberar(poltronas);
      throw new PagamentoErro("a operadora não aprovou o pagamento");
    }

    // 5. Devolve o comprovante, com um reservaId novo a cada compra.
    this.#ultimoReservaId += 1;
    return { reservaId: this.#ultimoReservaId, eventoId: evento.id, ingressos, total };
  }
}

export function criarBilheteria(config: ConfigBilheteria): Bilheteria {
  return new Bilheteria(config);
}
```

**README:** escrevam as respostas das **perguntas 1 e 5**. Mensagem: `README: perguntas 1 e 5 (concorrência)`.

---

## README: as respostas já redigidas

As 5 respostas estão logo abaixo. No `README.md` do repositório, em **Decisões**, cada integrante
cola a **sua** resposta embaixo da pergunta (o texto já vem com o recuo de 3 espaços da lista) e
faz o próprio commit. No mesmo commit, coloquem o seu usuário do GitHub na tabela de integrantes.
Leiam e ajustem com as palavras de vocês: o README vale 0,25 e é avaliado no vídeo.

| Pergunta | Quem cola | Mensagem do commit |
| :--- | :--- | :--- |
| 2 (OO) | Vitor | `README: pergunta 2 (OO)` |
| 3 e 4 (funcional) | Augusto | `README: perguntas 3 e 4 (funcional)` |
| 1 e 5 (concorrência) | Bruno | `README: perguntas 1 e 5 (concorrência)` |
| Link do vídeo e bench | Max | `README: link do vídeo e bench` |

**Pergunta 1 (Bruno)**, embaixo de "Onde estava o `await` perigoso?":

```markdown
   No `bilheteria.reservar`, as poltronas são marcadas com `evento.reservar(poltronas)` **antes** do
   `await` do pagamento. O Node roda o nosso código numa thread só, e um pedido só cede a vez para outro
   quando chega num `await`. Entre conferir se a poltrona está livre e marcá-la não existe nenhum
   `await`, então nenhum outro pedido roda no meio. Quem chega depois encontra a poltrona com dono e
   recebe `PoltronaOcupadaErro` (409) sem ser cobrado.

   O `await` perigoso é o do pagamento. Se a poltrona fosse marcada só depois dele, os 200 pedidos
   chegariam juntos ao `await`, todos seriam cobrados e só depois 150 descobririam que a poltrona já
   tinha dono. Mostramos isso no vídeo: o teste falha com "cobrou 200 pessoas por 50 poltronas".

   Se o pagamento falha ou passa de `limitePagamentoMs` (`comTempoLimite`, com `Promise.race`), o
   `catch` devolve as poltronas com `evento.liberar` e lança `PagamentoErro` (502).

   Limite: o `race` não cancela a cobrança atrasada. Se a operadora aprovar depois do tempo esgotado,
   o cliente pode ter pago sem levar a poltrona. Num sistema real, isso pediria consultar a operadora
   ou estornar a cobrança.
```

**Pergunta 2 (Vitor)**, embaixo de "Por que os erros são uma hierarquia de classes?":

```markdown
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
```

**Pergunta 3 (Augusto)**, embaixo de "Como vocês testariam ele sem subir o servidor?":

```markdown
   As funções do `preco.ts` dependem só dos parâmetros e não alteram nada fora delas: sem `let`,
   `for` ou `push`, e com `map` e `reduce` criando valores novos. Com a mesma entrada, sempre dão a
   mesma saída, então o cálculo é previsível e não depende da ordem dos pedidos concorrentes. As
   fábricas `valorDoIngresso(precoBase)` e `aplicarTaxa(percentual)` devolvem funções prontas para
   reutilizar. E o `montarIngressos` recebe a regra da meia por parâmetro, então dá para trocar a
   regra sem mexer no cálculo.

   Para testar, basta importar e chamar, sem servidor, banco ou operadora. Por exemplo:
   `calcularTotal(montarIngressos(100, [ana, beto], direitoAMeia))` tem que dar `165` quando Ana é
   estudante. É o que os testes de `testes/projeto.ts` fazem, inclusive com listas congeladas
   (`Object.freeze`) para provar que a entrada não é alterada.
```

**Pergunta 4 (Augusto)**, embaixo de "e se ficaria melhor ou pior.":

```markdown
   O preço em orientação a objetos seria uma classe `CalculadoraDePreco` com campos como
   `precoBase` e `total`, e métodos `adicionarIngresso()` que vão somando no `total`. Ficaria pior:
   o resultado passaria a depender do estado guardado e da ordem das chamadas. Uma mesma instância
   usada por dois pedidos concorrentes misturaria os totais, e para testar seria preciso montar o
   objeto e conferir o estado depois de cada chamada. No funcional, o cálculo é uma transformação
   de lista (`map`) seguida de uma soma (`reduce`), e cada chamada é independente.
```

**Pergunta 5 (Bruno)**, embaixo de "O que mudaria se a venda rodasse em vários núcleos ao mesmo tempo?":

```markdown
   A nossa garantia vem de não haver `await` entre conferir e marcar a poltrona, porque numa thread
   só nada roda no meio desse trecho. Com vários núcleos ao mesmo tempo (por exemplo, threads com
   memória compartilhada, como em Java), dois pedidos poderiam conferir a mesma poltrona no mesmo
   instante, ver que está livre e os dois marcarem. Isso venderia a poltrona duas vezes, mesmo sem
   nenhum `await`. Seria preciso tornar o "confere e marca" uma operação atômica: uma trava (lock)
   em volta do `reservar`, uma operação atômica ou uma transação no banco de dados. Se cada núcleo
   tivesse a própria cópia do `Evento`, seria preciso também um lugar único com o estado das
   poltronas.
```

**Bench (Max)**: a linha da tabela e o texto que vai embaixo de "O que os números mostram:".
Troquem os números pelos do bench de vocês.

```markdown
| Padrão (`main.ts`) | 200 | 328 | 91 | 100 | 9 |
```

```markdown
- **Ninguém levou poltrona repetida.** O evento 1 tem 100 poltronas e o bench manda dois pedidos para
  cada uma. Os 100 segundos pedidos receberam 409 (poltrona ocupada) sem ser cobrados, porque a
  poltrona é marcada antes do `await` do pagamento.
- **9 pagamentos falharam (502)**, perto dos 10% de falha da operadora falsa. As poltronas desses
  pedidos foram devolvidas com `liberar`, então vendidos + falhas de pagamento = 100.
- **Os pedidos não esperam uns pelos outros.** Cada cobrança demora 80 ms. Um pedido por vez levaria
  cerca de 200 × 80 ms = 16 s, e os 200 terminaram em 328 ms, porque enquanto um pedido espera a
  operadora o Node atende os outros.
```

**A tabela do bench** tem os números de uma execução de teste: 200 pedidos, 328 ms, 91 vendidos,
100 com poltrona ocupada e 9 falhas de pagamento. Os números **mudam a cada execução**, porque a
operadora falha ao acaso em 10% das vezes. Rodem o bench na máquina de vocês, de preferência
durante a gravação, e coloquem na tabela os números que aparecerem. Se mudarem, ajustem também o
texto "O que os números mostram".

---

## Vídeo (1,0): roteiro obrigatório, nesta ordem

**Regras:**
- Um vídeo só, de 20 a 40 minutos, com a tela compartilhada. **Basta um integrante falar.**
- O código fica na tela o tempo todo em que é explicado, com fonte grande. Slide não conta.
- Explicar é dizer o que o trecho faz **e por quê**. Ler o código ou um texto pronto não conta.
- Gravem com o código da entrega.
- O link vai no YouTube como **não listado** ou no Drive como **qualquer pessoa com o link**. Link que
  não abre vale 0.

| # | Parte | O que fazer na tela | Critério (0,25 cada) |
|---|---|---|---|
| 1 | Abertura | Nome de cada integrante e o que cada um fez. Rodar `git log -1`. | a |
| 2 | Projeto rodando | `npm test` (16 de 16), `npm start`, um GET e um POST (comandos abaixo) | a |
| 3 | OO: `dominio.ts` | A hierarquia de erros e por que cada um guarda o `status`; o `#vendidas` e o `get disponivel` (mostrar a tentativa de mudar por fora, abaixo); o tudo ou nada do `reservar` | b |
| 4 | Funcional: `preco.ts` | As duas fábricas e o que devolvem; o `map` em `montarIngressos` e o `reduce` em `calcularTotal`; por que são puras e o que isso facilita | b |
| 5 | Concorrente: `bilheteria.ts` | Os 5 passos; o único `await` e por que marcar antes dele; o `comTempoLimite` com `race` e `finally`; o `catch` que chama `liberar` | c |
| 6 | Demonstração do erro | Trocar a ordem, rodar `npm test`, mostrar as falhas, explicar e desfazer (abaixo) | c |
| 7 | Servidor: `servidor.ts` | As rotas `GET /eventos` e `POST /reservas`; o tratador de erro com 4 parâmetros e o `erro instanceof ErroDeNegocio` → `res.status(erro.status)` | b |
| 8 | Bench | `npm run bench` com o servidor recém-ligado e o que os números mostram | a |

O critério **d** (0,25) é o README completo: perguntas respondidas e tabela do bench preenchida.

### Parte 2: comandos

Com `npm start` rodando num terminal, usem outro terminal. No **Git Bash**:

```bash
curl localhost:3000/eventos

curl -X POST localhost:3000/reservas -H 'Content-Type: application/json' \
  -d '{"eventoId":2,"ingressos":[{"nome":"Ana","idade":20,"estudante":true,"pcd":false,"poltrona":7},{"nome":"Beto","idade":30,"estudante":false,"pcd":false,"poltrona":8}]}'
```

Resultado medido: **201**, com Ana `meia` 30, Beto `inteira` 60 e `total` 99 (90 + 10%).
Repetindo a poltrona 7, sai **409** `{"mensagem":"a poltrona 7 já foi vendida"}`. Com
`"eventoId":9`, sai **404**. Os valores são estes se o evento 2 custar 60, como no `main.ts`
sugerido.

> No PowerShell, o `curl` é outro comando. Usem o Git Bash, ou `curl.exe` com as aspas ajustadas.

### Parte 3: tentar mudar as poltronas por fora

Criem um arquivo temporário `demo.ts` na raiz do projeto. Ele **não vai para o commit**: apaguem
depois de gravar.

```ts
import { Evento } from "./src/dominio.ts";
const evento = new Evento(1, "Show", 50, 3);
evento.reservar([1]);
try {
  (evento as any).disponivel = 999;
} catch (erro) {
  console.log("erro:", (erro as Error).message);
}
console.log("disponivel:", evento.disponivel);
```

Rodem `npx tsx demo.ts`. Saída medida:

```
erro: Cannot set property disponivel of #<Evento> which has only a getter
disponivel: 2
```

Mostrem também que escrever `evento.#vendidas` fora da classe nem compila: o campo `#` só existe
dentro da classe.

### Parte 6: demonstração do erro

Em `src/bilheteria.ts`, **recortem** a linha `evento.reservar(poltronas);` do passo 2 e colem logo
depois do bloco `try/catch` do passo 4, antes do passo 5. Assim a poltrona só é marcada depois da
cobrança. Rodem `npm test`. Saída medida:

```
✘ [1] Concorrente: pedido inválido e evento inexistente
      cobrou um pedido inválido 1 !== 0
✘ [2] Concorrente: 200 pedidos simultâneos disputando 50 poltronas
      cobrou 200 pessoas por 50 poltronas 200 !== 50
✘ [1] Concorrente: pagamento recusado devolve as poltronas
✘ [1] Concorrente: tempo limite na operadora
Pontos: 11 de 16
```

**O que explicar:**
- Os 200 pedidos chegam juntos ao `await` e todos são cobrados. Só depois, 150 descobrem que a
  poltrona já tinha dono.
- A poltrona 11 de um evento de 10 também foi cobrada antes de dar erro.
- E o `liberar` do `catch` falha, porque a poltrona ainda nem tinha sido marcada.

Depois, **desfaçam** (Ctrl+Z) e rodem `npm test` de novo: **16 de 16**. Não façam commit da versão
quebrada.

### Parte 8: bench

O bench precisa do servidor **recém-ligado**: as poltronas vendidas continuam vendidas enquanto ele
está no ar. Parem com Ctrl+C, rodem `npm start` de novo e, noutro terminal, `npm run bench`.
Execução de teste:

```
200 pedidos em 328 ms (609 pedidos/s)
por status HTTP: { '201': 91, '409': 100, '502': 9 }
```

**O que explicar:**
- São 2 pedidos por poltrona. Os 100 segundos pedidos recebem 409 sem pagar.
- Cerca de 10% dos pagamentos falham (502) e as poltronas voltam para a venda.
- Vendidos + 502 = 100.
- Os 200 pedidos terminam em cerca de 300 ms. Um por vez levaria cerca de 16 s (200 × 80 ms).

### Perguntas que o professor sugeriu responder (Aula 09)

- **Onde estava o `await` perigoso?** O do pagamento. Marcamos antes dele.
- **Por que o `reservar` do evento é tudo ou nada?** Ele confere tudo antes de marcar, então um
  pedido recusado não deixa poltrona marcada pela metade.
- **O pagamento estourou o tempo e vocês devolveram a poltrona. E se a operadora cobrou mesmo
  assim?** O `race` não cancela a cobrança. O cliente pagaria sem levar a poltrona. Num sistema
  real, seria preciso estornar ou consultar a operadora. Isso está no README, pergunta 1.
- **O que o bench mostrou?** Os números da parte 8.
