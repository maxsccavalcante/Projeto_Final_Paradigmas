// Passo 3: o preço, no paradigma funcional.
// Só funções puras: o resultado depende só dos parâmetros e nada de fora é alterado.
import type { Ingresso, Pessoa, TipoIngresso } from "./tipos.ts";

// Taxa de serviço cobrada sobre a soma dos ingressos (10%).
const TAXA_DE_SERVICO = 0.1;

// Arredonda em 2 casas e devolve número (o toFixed devolveria texto).
const arredondar = (valor: number): number => Math.round(valor * 100) / 100;

// Fábrica: guarda o precoBase na closure e devolve uma função
// que recebe o tipo do ingresso e devolve o valor.
export function valorDoIngresso(precoBase: number): (tipo: TipoIngresso) => number {
  return (tipo) => (tipo === "meia" ? arredondar(precoBase / 2) : precoBase);
}

// Outra fábrica: guarda o percentual e devolve uma função que soma a taxa a um valor.
export function aplicarTaxa(percentual: number): (valor: number) => number {
  return (valor) => arredondar(valor * (1 + percentual));
}

// Um Ingresso por pessoa, na mesma ordem (map).
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

// Soma os valores (reduce, começando em 0) e aplica a taxa de serviço.
export function calcularTotal(ingressos: readonly Ingresso[]): number {
  const soma = ingressos.reduce((acumulado, ingresso) => acumulado + ingresso.valor, 0);
  return aplicarTaxa(TAXA_DE_SERVICO)(soma);
}
