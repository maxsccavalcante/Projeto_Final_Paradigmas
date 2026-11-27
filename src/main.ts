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
