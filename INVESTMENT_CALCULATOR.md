# Calculadora de Investimentos

## Descrição

Ferramenta para calcular o valor futuro de investimentos mensais com juros compostos. Especialmente útil para planejar investimentos de longo prazo, como poupança para educação dos filhos.

## Arquivos Criados

- `src/Utils/InvestmentCalculator.js` - Classe utilitária com lógica de cálculo
- `src/Controllers/Investment.js` - Controller para endpoints REST
- `calculate-investment.js` - Script CLI para cálculos rápidos

## Como Usar

### 1. Script CLI

Execute diretamente do terminal:

```bash
node calculate-investment.js
```

O script calcula automaticamente o cenário de investir R$ 300/mês para uma criança de 2 meses até 18 anos, mostrando 4 cenários diferentes de rentabilidade.

### 2. API REST

#### Endpoint: Cálculo Geral
```
POST /api/v1/investment/calculate
Content-Type: application/json

{
  "monthlyInvestment": 300,
  "annualInterestRate": 0.10,
  "months": 214
}
```

#### Endpoint: Cálculo para Criança
```
POST /api/v1/investment/child
Content-Type: application/json

{
  "currentAgeMonths": 2,
  "monthlyInvestment": 300,
  "annualInterestRate": 0.10,
  "targetAge": 18
}
```

### 3. Uso Programático

```javascript
const InvestmentCalculator = require('./src/Utils/InvestmentCalculator');

const calculator = new InvestmentCalculator();

// Cálculo simples
const result = calculator.calculateFutureValue(300, 0.10, 214);
console.log(result);

// Cálculo para criança
const childResult = calculator.calculateChildInvestment(2, 300, 0.10, 18);
console.log(calculator.formatResult(childResult));
```

## Exemplo de Resposta

```json
{
  "success": true,
  "result": {
    "futureValue": 178082.44,
    "totalInvested": 64200.00,
    "earnings": 113882.44,
    "months": 214,
    "monthlyInvestment": 300,
    "annualInterestRate": 0.10,
    "effectiveReturn": 177.39,
    "currentAgeMonths": 2,
    "targetAge": 18,
    "yearsInvesting": 17.8
  }
}
```

## Cenários Calculados

O script CLI mostra 4 cenários diferentes:

1. **Conservador (6% a.a.)**: Poupança/Tesouro Selic → ~R$ 115.029
2. **Moderado (10% a.a.)**: CDI/Tesouro IPCA+ → ~R$ 178.082
3. **Intermediário (12% a.a.)**: Fundos multimercado → ~R$ 224.510
4. **Arrojado (15% a.a.)**: Ações/Fundos imobiliários → ~R$ 322.551

## Fórmula Utilizada

A calculadora usa juros compostos mês a mês:

```
FV = Σ(PMT × (1 + r)^(n-i))
```

Onde:
- FV = Valor Futuro
- PMT = Pagamento mensal
- r = Taxa mensal (taxa anual / 12)
- n = Número total de meses
- i = Mês atual

## Observações Importantes

⚠️ **Disclaimer**:
- Os valores são estimativas e não consideram inflação
- Não consideram impostos (como IR sobre rendimentos)
- Rentabilidades passadas não garantem resultados futuros
- Consulte um planejador financeiro para decisões de investimento

## Integração com a Aplicação

Os endpoints foram integrados no arquivo `src/api.js` e estão disponíveis assim que o servidor iniciar:

```bash
npm start
```

Os endpoints estarão disponíveis em: `http://localhost:8089/api/v1/investment/`
