//　この関数で各社毎のtagの違いを吸収する。

export const calcEdgarData = (edgarData) => {
  // データを古い順にソート
  let resultRes = edgarData.sort(function (a, b) {
    return a.period < b.period ? -1 : 1;
  });

  const edgarRes = resultRes.map((res) => {
    const netIncomeData = () => {
      if (res.NetIncomeLoss_1_Q1_USD) {
        return res.NetIncomeLoss_1_Q1_USD;
      } else if (res.NetIncomeLoss_1_Q2_USD) {
        return res.NetIncomeLoss_1_Q2_USD;
      } else if (res.NetIncomeLoss_1_Q3_USD) {
        return res.NetIncomeLoss_1_Q3_USD;
      } else if (res.NetIncomeLoss_4_FY_USD) {
        return res.NetIncomeLoss_4_FY_USD;
      } else {
        return;
      }
    };
    const netIncomeDataAccum = () => {
      if (res.NetIncomeLoss_1_Q1_USD) {
        return res.NetIncomeLoss_1_Q1_USD;
      } else if (res.NetIncomeLoss_2_Q2_USD) {
        return res.NetIncomeLoss_2_Q2_USD;
      } else if (res.NetIncomeLoss_3_Q3_USD) {
        return res.NetIncomeLoss_3_Q3_USD;
      } else if (res.NetIncomeLoss_4_FY_USD) {
        return res.NetIncomeLoss_4_FY_USD;
      } else {
        return;
      }
    };

    // operatingCashFlow (CFデータは単四半期のデータはない模様)
    // operatingCashFlow Accum
    const operatingCashFlowAccum = () => {
      if (res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD;
      } else if (res.NetCashProvidedByUsedInOperatingActivities_2_Q2_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_2_Q2_USD;
      } else if (res.NetCashProvidedByUsedInOperatingActivities_3_Q3_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_3_Q3_USD;
      } else if (res.NetCashProvidedByUsedInOperatingActivities_4_FY_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_4_FY_USD;
      } else {
        return;
      }
    };

    // 総資産
    const assets = () => {
      if (res.Assets_0_Q1_USD) {
        return res.Assets_0_Q1_USD;
      } else if (res.Assets_0_Q2_USD) {
        return res.Assets_0_Q2_USD;
      } else if (res.Assets_0_Q3_USD) {
        return res.Assets_0_Q3_USD;
      } else if (res.Assets_0_FY_USD) {
        return res.Assets_0_FY_USD;
      } else {
        return;
      }
    };
    // 株主資本
    const stockholdersEquity = () => {
      if (res.StockholdersEquity_0_Q1_USD) {
        return res.StockholdersEquity_0_Q1_USD;
      } else if (res.StockholdersEquity_0_Q2_USD) {
        return res.StockholdersEquity_0_Q2_USD;
      } else if (res.StockholdersEquity_0_Q3_USD) {
        return res.StockholdersEquity_0_Q3_USD;
      } else if (res.StockholdersEquity_0_FY_USD) {
        return res.StockholdersEquity_0_FY_USD;
      } else {
        return;
      }
    };

    // 流通株式
    const commonStockSharesOutstanding = () => {
      if (res.CommonStockSharesOutstanding_0_Q1_shares) {
        return res.CommonStockSharesOutstanding_0_Q1_shares;
      } else if (res.CommonStockSharesOutstanding_0_Q2_shares) {
        return res.CommonStockSharesOutstanding_0_Q2_shares;
      } else if (res.CommonStockSharesOutstanding_0_Q3_shares) {
        return res.CommonStockSharesOutstanding_0_Q3_shares;
      } else if (res.CommonStockSharesOutstanding_0_FY_shares) {
        return res.CommonStockSharesOutstanding_0_FY_shares;
        // 名称が違う場合
      } else if (res.WeightedAverageNumberOfSharesOutstandingBasic_1_Q1_shares) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_1_Q1_shares;
      } else if (res.WeightedAverageNumberOfSharesOutstandingBasic_2_Q2_shares) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_2_Q2_shares;
      } else if (
        res.WeightedAverageNumberOfSharesOutstandingBasic_3_Q3_shares
      ) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_3_Q3_shares;
      } else if (
        res.WeightedAverageNumberOfSharesOutstandingBasic_4_FY_shares
      ) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_4_FY_shares;
      } else {
        return;
      }
    };
    // EPS
    const earningsPerShareBasic = () => {
      if (res.EarningsPerShareBasic_1_Q1_USD) {
        return res.EarningsPerShareBasic_1_Q1_USD;
      } else if (res.EarningsPerShareBasic_1_Q2_USD) {
        return res.EarningsPerShareBasic_1_Q2_USD;
      } else if (res.EarningsPerShareBasic_1_Q3_USD) {
        return res.EarningsPerShareBasic_1_Q3_USD;
      } else if (res.EarningsPerShareBasic_4_FY_USD) {
        return res.EarningsPerShareBasic_4_FY_USD;
      } else {
        return;
      }
    };
    // EPS Accum

    const FinancialData = {
      date: res.period.slice(0, 4) + "/" + res.period.slice(4, 6),
      NetIncomeLossAccum: netIncomeDataAccum(),
      NetIncomeLoss: netIncomeData(),
      operatingCashFlowAccum: operatingCashFlowAccum(),
      assets: assets(),
      stockHoldersEquity: stockholdersEquity(),
      commonStockSharesOutstanding: commonStockSharesOutstanding(),
      eps: earningsPerShareBasic(),
    };
    return FinancialData;
  });

  return edgarRes;
};
