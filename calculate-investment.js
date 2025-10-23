#!/usr/bin/env node

/**
 * Script para calcular investimento para criança
 * Exemplo: node calculate-investment.js
 */

const InvestmentCalculator = require('./src/Utils/InvestmentCalculator');

const calculator = new InvestmentCalculator();

// Cenário: Criança de 2 meses, investindo 300 reais por mês até 18 anos
const currentAgeMonths = 2;
const monthlyInvestment = 300;
const targetAge = 18;

console.log('\n🎯 CALCULANDO INVESTIMENTO PARA SEU FILHO\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Diferentes cenários de taxas de retorno
const scenarios = [
  { rate: 0.06, name: 'Conservador (Poupança/Tesouro Selic)', description: '6% ao ano' },
  { rate: 0.10, name: 'Moderado (CDI/Tesouro IPCA+)', description: '10% ao ano' },
  { rate: 0.12, name: 'Intermediário (Fundos multimercado)', description: '12% ao ano' },
  { rate: 0.15, name: 'Arrojado (Ações/Fundos imobiliários)', description: '15% ao ano' }
];

console.log(`📋 Dados do investimento:`);
console.log(`   • Idade atual da criança: ${currentAgeMonths} meses`);
console.log(`   • Valor mensal: R$ ${monthlyInvestment.toFixed(2)}`);
console.log(`   • Objetivo: ${targetAge} anos\n`);
console.log('═══════════════════════════════════════════════════════════════\n');

scenarios.forEach((scenario, index) => {
  try {
    const result = calculator.calculateChildInvestment(
      currentAgeMonths,
      monthlyInvestment,
      scenario.rate,
      targetAge
    );

    console.log(`\n${index + 1}. ${scenario.name}`);
    console.log(`   Taxa: ${scenario.description}`);
    console.log(`   ─────────────────────────────────────────────────────────`);
    console.log(`   💵 Total investido:  R$ ${result.totalInvested.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
    console.log(`   📈 Rendimento:       R$ ${result.earnings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
    console.log(`   💰 Valor final:      R$ ${result.futureValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
    console.log(`   📊 Retorno:          ${result.effectiveReturn.toFixed(2)}%`);
    console.log(`   ⏱️  Período:          ${result.yearsInvesting} anos (${result.months} meses)`);

  } catch (error) {
    console.error(`Erro ao calcular cenário ${scenario.name}:`, error.message);
  }
});

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('\n💡 DICAS IMPORTANTES:\n');
console.log('   • A consistência é fundamental: invista TODO mês!');
console.log('   • Considere reajustar o valor conforme sua renda aumenta');
console.log('   • Diversifique: não coloque tudo em um único investimento');
console.log('   • Consulte um planejador financeiro para estratégias personalizadas');
console.log('   • Os valores são estimativas e não consideram inflação ou impostos');
console.log('\n═══════════════════════════════════════════════════════════════\n');
