//　この関数で各社毎のtagの違いを吸収する。

export const calcEdgarData = (edgarData) => {
  // データを古い順にソート
  let resultRes = edgarData.sort(function (a, b) {
    return a.period < b.period ? -1 : 1;
  });

  // 各勘定科目データの加工
  const edgarRes = resultRes.map((res, i) => {

    // -------------　PL関連　-------------
    // 単四半期のPL売上データ
    const revenueDataDeducted = () => {
      if (i===0) {
        return 0
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD;
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q2_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q2_USD;
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q3_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q3_USD;
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD) {
        // FY年間累計から、ひとつ前のレコードの第三四半期累計をマイナスする。
        return (
          resultRes[i].RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD -
          resultRes[i-1].RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD
        );
      } else {
        return;
      }
    };
    // 累計四半期のPL売上データ
    const revenueDataAccum = () => {
      if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD;
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_2_Q2_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_2_Q2_USD;
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD;
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD;
      } else {
        return;
      }
    };

    // 単四半期のPL当期利益データ
    const netIncomeDataDeducted = () => {
      if (i===0) {
        return 0
      } else if (res.NetIncomeLoss_1_Q1_USD) {
        return res.NetIncomeLoss_1_Q1_USD;
      } else if (res.NetIncomeLoss_1_Q2_USD) {
        return res.NetIncomeLoss_1_Q2_USD;
      } else if (res.NetIncomeLoss_1_Q3_USD) {
        return res.NetIncomeLoss_1_Q3_USD;
      } else if (res.NetIncomeLoss_4_FY_USD) {
        // FY年間累計から、ひとつ前のレコードの第三四半期累計をマイナスする。
        return (
          resultRes[i].NetIncomeLoss_4_FY_USD -
          resultRes[i-1].NetIncomeLoss_3_Q3_USD
        );
      } else {
        return;
      }
    };
    // 累計四半期のPL当期利益データ
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

    // -------------　CFS関連　-------------
    // operatingCashFlow (CFデータは単四半期のデータはない)
    const operatingCashFlowDeducted = () => {
      if (i === 0) {
        return 0;
      } else if (res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD;
      } else if (res.NetCashProvidedByUsedInOperatingActivities_2_Q2_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivities_2_Q2_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivities_1_Q1_USD
        );
      } else if (res.NetCashProvidedByUsedInOperatingActivities_3_Q3_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivities_3_Q3_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivities_2_Q2_USD
        );
      } else if (res.NetCashProvidedByUsedInOperatingActivities_4_FY_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivities_4_FY_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivities_3_Q3_USD
        );
      } else {
        return;
      }
    };


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

    // -------------　BS関連　-------------
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
    // -------------　株価指標関連　-------------
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
    // EPS 単四半期
    const earningsPerShareBasic = () => {
      if (i <= 3) {
        return ;
      } else if (res.EarningsPerShareBasic_1_Q1_USD) {
        return res.EarningsPerShareBasic_1_Q1_USD;
      } else if (res.EarningsPerShareBasic_1_Q2_USD) {
        return res.EarningsPerShareBasic_1_Q2_USD;
      } else if (res.EarningsPerShareBasic_1_Q3_USD) {
        return res.EarningsPerShareBasic_1_Q3_USD;
      // 第四単四半期データ  
      } else if (res.EarningsPerShareBasic_4_FY_USD) {
        return (
          resultRes[i].EarningsPerShareBasic_4_FY_USD - (
            resultRes[i - 1].EarningsPerShareBasic_1_Q3_USD + 
            resultRes[i - 2].EarningsPerShareBasic_1_Q2_USD +  
            resultRes[i - 3].EarningsPerShareBasic_1_Q1_USD 
          )
        )
      } else {
        return;
      }
    };
    // EPS Accum
    const earningsPerShareBasicAccum = () => {
      if (i <= 3) {
        return ;
      } else if (res.EarningsPerShareBasic_1_Q1_USD) {
        return res.EarningsPerShareBasic_1_Q1_USD;
       //第二四半期累計 
      } else if (res.EarningsPerShareBasic_1_Q2_USD) {
        return (
          resultRes[i].EarningsPerShareBasic_1_Q2_USD +
          resultRes[i - 1].EarningsPerShareBasic_1_Q1_USD
        )
       //第三四半期累計 
      } else if (res.EarningsPerShareBasic_1_Q3_USD) {
        return (
          resultRes[i].EarningsPerShareBasic_1_Q3_USD + 
          resultRes[i-1].EarningsPerShareBasic_1_Q2_USD + 
          resultRes[i-2].EarningsPerShareBasic_1_Q1_USD
        )
      } else if (res.EarningsPerShareBasic_4_FY_USD) {
        return res.EarningsPerShareBasic_4_FY_USD;
      } else {
        return;
      }
    };



　　// ------------- Return Statement --------------------
    const FinancialData = {
      date: res.period.slice(0, 4) + "/" + res.period.slice(4, 6),
      fp: res.fp,
      revenue: revenueDataDeducted(),
      revenueAccum: revenueDataAccum(),
      NetIncomeLoss: netIncomeDataDeducted(),
      NetIncomeLossAccum: netIncomeDataAccum(),
      operatingCashFlow: operatingCashFlowDeducted(),
      operatingCashFlowAccum: operatingCashFlowAccum(),
      assets: assets(),
      stockHoldersEquity: stockholdersEquity(),
      commonStockSharesOutstanding: commonStockSharesOutstanding(),
      eps: earningsPerShareBasic(),
      epsAccum: earningsPerShareBasicAccum(),
    };
    return FinancialData;
  });

  return edgarRes;
};
