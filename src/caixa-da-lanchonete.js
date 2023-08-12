class CaixaDaLanchonete {

  calcularValorDaCompra(formaDePagamento, itens) {
    const valores = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50,
    };

    const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];

    if (!formasDePagamentoValidas.includes(formaDePagamento)) {
        return 'Forma de pagamento inválida!';
    }

    const extras = {
        chantily: 'cafe',
        queijo: 'sanduiche',
    };

    const itensPrincipais = new Set(itens.map(item => item.split(',')[0]));

    for (const item of itens) {
        const [codigo, quantidade] = item.split(',');
        const valorItem = valores[codigo];

        if (valorItem === undefined) {
            return 'Item inválido!';
        }

        if (extras[codigo] && !itensPrincipais.has(extras[codigo])) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        if (quantidade === '0') {
            return 'Quantidade inválida!';
        }
    }

    if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
    }

    let total = 0;

    for (const item of itens) {
        const [codigo, quantidade] = item.split(',');
        total += valores[codigo] * parseInt(quantidade);
    }

    const descontoDinheiro = formaDePagamento === 'dinheiro' ? 0.05 : 0;
    const acrescimoCredito = formaDePagamento === 'credito' ? 0.03 : 0;
    total *= (1 + acrescimoCredito) * (1 - descontoDinheiro);

    return 'R$ ' + total.toFixed(2).replace('.', ',');
  }
} 

export { CaixaDaLanchonete };
