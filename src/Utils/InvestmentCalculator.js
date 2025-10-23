/**
 * Calculadora de Investimentos
 * Calcula o montante final de investimentos mensais com juros compostos
 */

class InvestmentCalculator {
  /**
   * Calcula o valor futuro de investimentos mensais com juros compostos
   *
   * @param {number} monthlyInvestment - Valor investido mensalmente
   * @param {number} annualInterestRate - Taxa de juros anual (em decimal, ex: 0.10 para 10%)
   * @param {number} months - Número de meses do investimento
   * @returns {object} Resultado com montante final, total investido e rendimento
   */
  calculateFutureValue(monthlyInvestment, annualInterestRate, months) {
    if (monthlyInvestment <= 0 || months <= 0) {
      throw new Error('Valores de investimento e meses devem ser maiores que zero');
    }

    // Taxa mensal
    const monthlyRate = annualInterestRate / 12;

    let totalInvested = 0;
    let futureValue = 0;

    // Calcula mês a mês com juros compostos
    for (let month = 1; month <= months; month++) {
      totalInvested += monthlyInvestment;
      futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
    }

    const earnings = futureValue - totalInvested;

    return {
      futureValue: Math.round(futureValue * 100) / 100,
      totalInvested: Math.round(totalInvested * 100) / 100,
      earnings: Math.round(earnings * 100) / 100,
      months: months,
      monthlyInvestment: monthlyInvestment,
      annualInterestRate: annualInterestRate,
      effectiveReturn: Math.round((earnings / totalInvested) * 10000) / 100 // em porcentagem
    };
  }

  /**
   * Calcula investimento para criança desde nascimento até maioridade
   *
   * @param {number} currentAgeMonths - Idade atual da criança em meses
   * @param {number} monthlyInvestment - Valor investido mensalmente
   * @param {number} annualInterestRate - Taxa de juros anual (em decimal)
   * @param {number} targetAge - Idade alvo (padrão: 18 anos)
   * @returns {object} Resultado do investimento
   */
  calculateChildInvestment(currentAgeMonths, monthlyInvestment, annualInterestRate, targetAge = 18) {
    const targetAgeMonths = targetAge * 12;
    const monthsToInvest = targetAgeMonths - currentAgeMonths;

    if (monthsToInvest <= 0) {
      throw new Error('A criança já atingiu ou ultrapassou a idade alvo');
    }

    const result = this.calculateFutureValue(monthlyInvestment, annualInterestRate, monthsToInvest);

    return {
      ...result,
      currentAgeMonths: currentAgeMonths,
      targetAge: targetAge,
      yearsInvesting: Math.round((monthsToInvest / 12) * 10) / 10
    };
  }

  /**
   * Formata resultado para exibição
   *
   * @param {object} result - Resultado do cálculo
   * @param {string} currency - Símbolo da moeda (padrão: R$)
   * @returns {string} Resultado formatado
   */
  formatResult(result, currency = 'R$') {
    return `
╔════════════════════════════════════════════════════════════════╗
║           CALCULADORA DE INVESTIMENTOS                         ║
╚════════════════════════════════════════════════════════════════╝

📊 RESUMO DO INVESTIMENTO:
   └─ Investimento mensal: ${currency} ${result.monthlyInvestment.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
   └─ Período: ${result.months} meses (${result.yearsInvesting || (result.months/12).toFixed(1)} anos)
   └─ Taxa anual: ${(result.annualInterestRate * 100).toFixed(2)}%

💰 RESULTADOS:
   └─ Total investido: ${currency} ${result.totalInvested.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
   └─ Rendimento: ${currency} ${result.earnings.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
   └─ Valor final: ${currency} ${result.futureValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
   └─ Retorno efetivo: ${result.effectiveReturn.toFixed(2)}%

${result.currentAgeMonths !== undefined ? `🧒 Para criança com ${result.currentAgeMonths} meses até ${result.targetAge} anos` : ''}
    `.trim();
  }
}

module.exports = InvestmentCalculator;
