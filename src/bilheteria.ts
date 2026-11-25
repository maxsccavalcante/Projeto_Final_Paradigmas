// Passo 5: a venda, onde a concorrência aparece.
import {
  DadosInvalidosErro,
  NaoEncontradoErro,
  PagamentoErro,
  type Evento,
} from "./dominio.ts";
import type { Pagamento } from "./pagamento.ts";
import { calcularTotal, montarIngressos } from "./preco.ts";
import { direitoAMeia } from "./regras.ts";
import type { Comprovante, ConfigBilheteria, EventoInfo, Pedido } from "./tipos.ts";

// Controla o tempo máximo de espera da operadora.
function comTempoLimite<T>(
  promessa: Promise<T>,
  ms: number,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const limite = new Promise<never>((_, rejeitar) => {
    timer = setTimeout(
      () => rejeitar(new Error("tempo esgotado")),
      ms,
    );
  });

  return Promise.race([promessa, limite]).finally(() => {
    clearTimeout(timer);
  });
}

export class Bilheteria {
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

    // 2. Marca as poltronas ANTES do await.
    const poltronas = pedido.ingressos.map((pessoa) => pessoa.poltrona);
    evento.reservar(poltronas);

    // 3. Monta os ingressos e calcula o total.
    const ingressos = montarIngressos(
      evento.preco,
      pedido.ingressos,
      direitoAMeia,
    );

    const total = calcularTotal(ingressos);

    // 4. Cobra o pagamento.
    try {
      await comTempoLimite(
        this.#pagar(total),
        this.#limitePagamentoMs,
      );
    } catch {
      // Devolve as poltronas se o pagamento falhar.
      evento.liberar(poltronas);

      throw new PagamentoErro("a operadora não aprovou o pagamento");
    }

    // 5. Gera o comprovante.
    this.#ultimoReservaId += 1;

    return {
      reservaId: this.#ultimoReservaId,
      eventoId: evento.id,
      ingressos,
      total,
    };
  }
}

export function criarBilheteria(config: ConfigBilheteria): Bilheteria {
  return new Bilheteria(config);
}
