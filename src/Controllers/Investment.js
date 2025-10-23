const InvestmentCalculator = require('../Utils/InvestmentCalculator');

class InvestmentController {
  constructor() {
    this.calculator = new InvestmentCalculator();
  }

  /**
   * Endpoint para calcular investimento geral
   * POST /api/v1/investment/calculate
   * Body: { monthlyInvestment, annualInterestRate, months }
   */
  calculate(req, res) {
    try {
      const { monthlyInvestment, annualInterestRate, months } = req.body;

      if (!monthlyInvestment || !annualInterestRate || !months) {
        return res.status(400).json({
          error: 'Parâmetros obrigatórios: monthlyInvestment, annualInterestRate, months'
        });
      }

      const result = this.calculator.calculateFutureValue(
        parseFloat(monthlyInvestment),
        parseFloat(annualInterestRate),
        parseInt(months)
      );

      res.json({
        success: true,
        result: result,
        formatted: this.calculator.formatResult(result)
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Endpoint para calcular investimento para criança
   * POST /api/v1/investment/child
   * Body: { currentAgeMonths, monthlyInvestment, annualInterestRate, targetAge }
   */
  calculateChild(req, res) {
    try {
      const { currentAgeMonths, monthlyInvestment, annualInterestRate, targetAge } = req.body;

      if (!currentAgeMonths || !monthlyInvestment || !annualInterestRate) {
        return res.status(400).json({
          error: 'Parâmetros obrigatórios: currentAgeMonths, monthlyInvestment, annualInterestRate'
        });
      }

      const result = this.calculator.calculateChildInvestment(
        parseInt(currentAgeMonths),
        parseFloat(monthlyInvestment),
        parseFloat(annualInterestRate),
        targetAge ? parseInt(targetAge) : 18
      );

      res.json({
        success: true,
        result: result,
        formatted: this.calculator.formatResult(result)
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = InvestmentController;
