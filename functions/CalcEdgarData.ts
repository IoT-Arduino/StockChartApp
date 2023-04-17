//　この関数で各社毎のtagの違いを吸収する。

export const calcEdgarData = (edgarData: any) => {
  // データを古い順にソート
  let resultRes = edgarData.sort(function (a: any, b: any) {
    return a.period < b.period ? -1 : 1
  })

  // 各勘定科目データの加工
  const edgarRes = resultRes.map((res: any, i: number) => {
    // -------------　PL関連　-------------
    // 単四半期のPL売上データ
    const revenueDataDeducted = () => {
      if (i === 0) {
        return 0
      } else if (res.RevenuesConverted_1_Q1_USD) {
        return res.RevenuesConverted_1_Q1_USD
      } else if (res.RevenuesConverted_1_Q2_USD) {
        return res.RevenuesConverted_1_Q2_USD
      } else if (res.RevenuesConverted_1_Q3_USD) {
        return res.RevenuesConverted_1_Q3_USD
      } else if (res.RevenuesConverted_1_FY_USD) {
        return res.RevenuesConverted_1_FY_USD
      } else if (res.RevenuesConverted_4_FY_USD) {
        // 第四単四半期がなければ、FY年間累計から、ひとつ前のレコードの第三四半期累計をマイナスする。
        return resultRes[i].RevenuesConverted_4_FY_USD - resultRes[i - 1].RevenuesConverted_3_Q3_USD

        // 名称違い対応
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q2_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q2_USD
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q3_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q3_USD
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_FY_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_FY_USD
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD) {
        // 第四単四半期がなければ、FY年間累計から、ひとつ前のレコードの第三四半期累計をマイナスする。
        return (
          resultRes[i].RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD -
          resultRes[i - 1].RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD
        )
        // 名称違い対応
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q1_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q1_USD
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q2_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q2_USD
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q3_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q3_USD
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_1_FY_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_1_FY_USD
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_4_FY_USD) {
        //第四単四半期がなければ、 FY年間累計から、ひとつ前のレコードの第三四半期累計をマイナスする。
        return (
          resultRes[i].RevenueFromContractWithCustomerIncludingAssessedTax_4_FY_USD -
          resultRes[i - 1].RevenueFromContractWithCustomerIncludingAssessedTax_3_Q3_USD
        )

        // 名称違い対応
      } else if (res.Revenues_1_Q1_USD) {
        return res.Revenues_1_Q1_USD
      } else if (res.Revenues_1_Q2_USD) {
        return res.Revenues_1_Q2_USD
      } else if (res.Revenues_1_Q3_USD) {
        return res.Revenues_1_Q3_USD
      } else if (res.Revenues_1_FY_USD) {
        return res.Revenues_1_FY_USD
      } else if (res.Revenues_4_FY_USD) {
        // 第四単四半期がなければ、FY年間累計から、ひとつ前のレコードの第三四半期累計をマイナスする。
        // 第三四半期と第四四半期の売上科目が違う場合の特殊対応（GOOGL等該当、検証中）
        if (resultRes[i - 1].Revenues_3_Q3_USD) {
          resultRes[i].Revenues_4_FY_USD - resultRes[i - 1].Revenues_3_Q3_USD
        } else if (resultRes[i - 1].RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD) {
          return (
            resultRes[i].Revenues_4_FY_USD -
            resultRes[i - 1].RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD
          )
        } else {
          return resultRes[i].Revenues_4_FY_USD - resultRes[i - 1].RevenuesConverted_3_Q3_USD
        }
      } else {
        return
      }
    }

    // 累計四半期のPL売上データ
    const revenueDataAccum = () => {
      if (res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_1_Q1_USD
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_2_Q2_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_2_Q2_USD
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_3_Q3_USD
      } else if (res.RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD) {
        return res.RevenueFromContractWithCustomerExcludingAssessedTax_4_FY_USD
        // 名称違い対応
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q1_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_1_Q1_USD
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_2_Q2_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_2_Q2_USD
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_3_Q3_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_3_Q3_USD
      } else if (res.RevenueFromContractWithCustomerIncludingAssessedTax_4_FY_USD) {
        return res.RevenueFromContractWithCustomerIncludingAssessedTax_4_FY_USD
        // 名称違い対応
      } else if (res.Revenues_1_Q1_USD) {
        return res.Revenues_1_Q1_USD
      } else if (res.Revenues_2_Q2_USD) {
        return res.Revenues_2_Q2_USD
      } else if (res.Revenues_3_Q3_USD) {
        return res.Revenues_3_Q3_USD
      } else if (res.Revenues_4_FY_USD) {
        return res.Revenues_4_FY_USD
        // 名称違い対応
      } else if (res.RevenuesConverted_1_Q1_USD) {
        return res.RevenuesConverted_1_Q1_USD
      } else if (res.RevenuesConverted_2_Q2_USD) {
        return res.RevenuesConverted_2_Q2_USD
      } else if (res.RevenuesConverted_3_Q3_USD) {
        return res.RevenuesConverted_3_Q3_USD
      } else if (res.RevenuesConverted_4_FY_USD) {
        return res.RevenuesConverted_4_FY_USD
      } else {
        return
      }
    }

    // 単四半期のPL当期利益データ -------------
    const netIncomeDataDeducted = () => {
      if (i === 0) {
        return 0
        // NetIncomeLoss の対応。
      } else if (res.NetIncomeLoss_1_Q1_USD) {
        return res.NetIncomeLoss_1_Q1_USD
      } else if (res.NetIncomeLoss_1_Q2_USD) {
        return res.NetIncomeLoss_1_Q2_USD
      } else if (res.NetIncomeLoss_1_Q3_USD) {
        return res.NetIncomeLoss_1_Q3_USD
      } else if (res.NetIncomeLoss_1_FY_USD) {
        return res.NetIncomeLoss_1_FY_USD
        // FY単四半期がない場合、FY年間累計から、ひとつ前のレコードの第三四半期累計をマイナスする。
        // さらに、第三四半期と第四四半期（FY）の科目が違う場合の差し引き対応。FYがNetIncomeLossで3QにNetIncomeLossがない場合の対応。
      } else if (res.NetIncomeLoss_4_FY_USD) {
        if (resultRes[i - 1].NetIncomeLoss_3_Q3_USD) {
          return resultRes[i].NetIncomeLoss_4_FY_USD - resultRes[i - 1].NetIncomeLoss_3_Q3_USD
        } else if (resultRes[i - 1].ProfitLoss_3_Q3_USD) {
          return resultRes[i - 1].MinorityInterest_3_FY_USD
            ? resultRes[i].NetIncomeLoss_4_FY_USD -
                (resultRes[i - 1].ProfitLoss_3_Q3_USD - resultRes[i - 1].MinorityInterest_3_FY_USD)
            : resultRes[i].NetIncomeLoss_4_FY_USD - resultRes[i - 1].ProfitLoss_3_Q3_USD
        } else if (resultRes[i - 1].NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD) {
          return resultRes[i - 1].DividendsPreferredStockCash_3_FY_USD
            ? resultRes[i].NetIncomeLoss_4_FY_USD -
                (resultRes[i - 1].NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD -
                  resultRes[i - 1].DividendsPreferredStockCash_3_FY_USD)
            : resultRes[i].NetIncomeLoss_4_FY_USD -
                resultRes[i - 1].NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD
        } else {
          return
        }

        // ProfitLoss - MinorityInterest の対応。
      } else if (res.ProfitLoss_1_Q1_USD) {
        return resultRes[i].MinorityInterest_1_Q1_USD
          ? resultRes[i].ProfitLoss_1_Q1_USD - resultRes[i].MinorityInterest_1_Q1_USD
          : resultRes[i].ProfitLoss_1_Q1_USD
      } else if (res.ProfitLoss_1_Q2_USD) {
        return resultRes[i].MinorityInterest_1_Q2_USD
          ? resultRes[i].ProfitLoss_1_Q2_USD - resultRes[i].MinorityInterest_1_Q2_USD
          : resultRes[i].ProfitLoss_1_Q2_USD
      } else if (res.ProfitLoss_1_Q3_USD) {
        return resultRes[i].MinorityInterest_1_Q3_USD
          ? resultRes[i].ProfitLoss_1_Q3_USD - resultRes[i].MinorityInterest_1_Q3_USD
          : resultRes[i].ProfitLoss_1_Q3_USD
      } else if (res.ProfitLoss_1_FY_USD) {
        return resultRes[i].MinorityInterest_1_FY_USD
          ? resultRes[i].ProfitLoss_1_FY_USD - resultRes[i].MinorityInterest_1_FY_USD
          : resultRes[i].ProfitLoss_1_FY_USD
      } else if (res.ProfitLoss_4_FY_USD) {
        return resultRes[i].MinorityInterest_4_FY_USD
          ? resultRes[i].ProfitLoss_4_FY_USD -
              resultRes[i].MinorityInterest_4_FY_USD -
              (resultRes[i - 1].ProfitLoss_3_Q3_USD - resultRes[i - 1].MinorityInterest_3_Q3_USD)
          : resultRes[i].ProfitLoss_4_FY_USD - resultRes[i - 1].ProfitLoss_3_Q3_USD
        // NetIncomeLossAvailableToCommonStockholdersBasic +  DividendsPreferredStockCash の対応
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_1_Q1_USD) {
        return resultRes[i].DividendsPreferredStockCash_1_Q1_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q1_USD -
              resultRes[i].DividendsPreferredStockCash_1_Q1_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q1_USD
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_1_Q2_USD) {
        return resultRes[i].DividendsPreferredStockCash_1_Q2_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q2_USD -
              resultRes[i].DividendsPreferredStockCash_1_Q2_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q2_USD
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_1_Q3_USD) {
        return resultRes[i].DividendsPreferredStockCash_1_Q3_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q3_USD -
              resultRes[i].DividendsPreferredStockCash_1_Q3_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q3_USD
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_1_FY_USD) {
        return resultRes[i].DividendsPreferredStockCash_1_FY_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_FY_USD -
              resultRes[i].DividendsPreferredStockCash_1_FY_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_FY_USD
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_4_FY_USD) {
        return resultRes[i].DividendsPreferredStockCash_4_FY_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_4_FY_USD -
              resultRes[i].DividendsPreferredStockCash_4_FY_USD -
              (resultRes[i - 1].NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD -
                resultRes[i - 1].DividendsPreferredStockCash_3_Q3_USD)
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_4_FY_USD -
              resultRes[i - 1].NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD
      } else {
        return
      }
    }
    // 累計四半期のPL当期利益データ
    const netIncomeDataAccum = () => {
      if (res.NetIncomeLoss_1_Q1_USD) {
        return res.NetIncomeLoss_1_Q1_USD
      } else if (res.NetIncomeLoss_2_Q2_USD) {
        return res.NetIncomeLoss_2_Q2_USD
      } else if (res.NetIncomeLoss_3_Q3_USD) {
        return res.NetIncomeLoss_3_Q3_USD
      } else if (res.NetIncomeLoss_4_FY_USD) {
        return res.NetIncomeLoss_4_FY_USD
        // ProfitLoss - MinorityInterest の対応。
      } else if (res.ProfitLoss_1_Q1_USD) {
        return resultRes[i].MinorityInterest_1_Q1_USD
          ? resultRes[i].ProfitLoss_1_Q1_USD - resultRes[i].MinorityInterest_1_Q1_USD
          : resultRes[i].ProfitLoss_1_Q1_USD
      } else if (res.ProfitLoss_2_Q2_USD) {
        return resultRes[i].MinorityInterest_2_Q2_USD
          ? resultRes[i].ProfitLoss_2_Q2_USD - resultRes[i].MinorityInterest_2_Q2_USD
          : resultRes[i].ProfitLoss_2_Q2_USD
      } else if (res.ProfitLoss_3_Q3_USD) {
        return resultRes[i].MinorityInterest_3_Q3_USD
          ? resultRes[i].ProfitLoss_3_Q3_USD - resultRes[i].MinorityInterest_3_Q3_USD
          : resultRes[i].ProfitLoss_3_Q3_USD
      } else if (res.ProfitLoss_4_FY_USD) {
        return resultRes[i].MinorityInterest_4_FY_USD
          ? resultRes[i].ProfitLoss_4_FY_USD - resultRes[i].MinorityInterest_4_FY_USD
          : resultRes[i].ProfitLoss_4_FY_USD
        // NetIncomeLossAvailableToCommonStockholdersBasic +  DividendsPreferredStockCash の対応
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_1_Q1_USD) {
        return resultRes[i].DividendsPreferredStockCash_1_Q1_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q1_USD -
              resultRes[i].DividendsPreferredStockCash_1_Q1_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_1_Q1_USD
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_2_Q2_USD) {
        return resultRes[i].DividendsPreferredStockCash_2_Q2_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_2_Q2_USD -
              resultRes[i].DividendsPreferredStockCash_2_Q2_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_2_Q2_USD
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD) {
        return resultRes[i].DividendsPreferredStockCash_3_Q3_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD -
              resultRes[i].DividendsPreferredStockCash_3_Q3_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_3_Q3_USD
      } else if (res.NetIncomeLossAvailableToCommonStockholdersBasic_4_FY_USD) {
        return resultRes[i].DividendsPreferredStockCash_4_FY_USD
          ? resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_4_FY_USD -
              resultRes[i].DividendsPreferredStockCash_4_FY_USD
          : resultRes[i].NetIncomeLossAvailableToCommonStockholdersBasic_4_FY_USD
      } else {
        return
      }
    }

    // -------------　CFS関連　-------------
    // operatingCashFlow (CFデータは単四半期のデータはない)
    //　全ての科目をConvertedに寄せる方針。
    const operatingCashFlowDeducted = () => {
      if (i === 0) {
        return 0
      } else if (res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivities_2_Q2_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivities_2_Q2_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivities_1_Q1_USD
        )
      } else if (res.NetCashProvidedByUsedInOperatingActivities_3_Q3_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivities_3_Q3_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivities_2_Q2_USD
        )
      } else if (res.NetCashProvidedByUsedInOperatingActivities_4_FY_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivities_4_FY_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivities_3_Q3_USD
        )
        // 名称違い対応
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_1_Q1_USD) {
        return res.NetCashProvidedByUsedInOperatingActivitiesConverted_1_Q1_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_2_Q2_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivitiesConverted_2_Q2_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivitiesConverted_1_Q1_USD
        )
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_3_Q3_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivitiesConverted_3_Q3_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivitiesConverted_2_Q2_USD
        )
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_4_FY_USD) {
        return (
          resultRes[i].NetCashProvidedByUsedInOperatingActivitiesConverted_4_FY_USD -
          resultRes[i - 1].NetCashProvidedByUsedInOperatingActivitiesConverted_3_Q3_USD
        )
      } else {
        return
      }
    }

    // operatingCashFlow Accum
    const operatingCashFlowAccum = () => {
      if (res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_1_Q1_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivities_2_Q2_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_2_Q2_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivities_3_Q3_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_3_Q3_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivities_4_FY_USD) {
        return res.NetCashProvidedByUsedInOperatingActivities_4_FY_USD
        // 名称違い対応
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_1_Q1_USD) {
        return res.NetCashProvidedByUsedInOperatingActivitiesConverted_1_Q1_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_2_Q2_USD) {
        return res.NetCashProvidedByUsedInOperatingActivitiesConverted_2_Q2_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_3_Q3_USD) {
        return res.NetCashProvidedByUsedInOperatingActivitiesConverted_3_Q3_USD
      } else if (res.NetCashProvidedByUsedInOperatingActivitiesConverted_4_FY_USD) {
        return res.NetCashProvidedByUsedInOperatingActivitiesConverted_4_FY_USD
      } else {
        return
      }
    }

    // -------------　BS関連　-------------
    // 総資産
    const assets = () => {
      if (res.Assets_0_Q1_USD) {
        return res.Assets_0_Q1_USD
      } else if (res.Assets_0_Q2_USD) {
        return res.Assets_0_Q2_USD
      } else if (res.Assets_0_Q3_USD) {
        return res.Assets_0_Q3_USD
      } else if (res.Assets_0_FY_USD) {
        return res.Assets_0_FY_USD
      } else {
        return
      }
    }
    // 株主資本
    const stockholdersEquity = () => {
      // 少数株主持分含まない
      if (res.StockholdersEquity_0_Q1_USD) {
        return res.StockholdersEquity_0_Q1_USD
      } else if (res.StockholdersEquity_0_Q2_USD) {
        return res.StockholdersEquity_0_Q2_USD
      } else if (res.StockholdersEquity_0_Q3_USD) {
        return res.StockholdersEquity_0_Q3_USD
      } else if (res.StockholdersEquity_0_FY_USD) {
        return res.StockholdersEquity_0_FY_USD

        // StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest - MinorityInterest
      } else if (
        res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q1_USD
      ) {
        return res.MinorityInterest_0_Q1_USD
          ? res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q1_USD -
              res.MinorityInterest_0_Q1_USD
          : res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q1_USD
      } else if (
        res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q2_USD
      ) {
        return res.MinorityInterest_0_Q2_USD
          ? res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q2_USD -
              res.MinorityInterest_0_Q2_USD
          : res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q2_USD
      } else if (
        res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q3_USD
      ) {
        return res.MinorityInterest_0_Q3_USD
          ? res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q3_USD -
              res.MinorityInterest_0_Q3_USD
          : res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_Q3_USD
      } else if (
        res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_FY_USD
      ) {
        return res.MinorityInterest_0_FY_USD
          ? res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_FY_USD -
              res.MinorityInterest_0_FY_USD
          : res.StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest_0_FY_USD
      } else {
        return
      }
    }
    // -------------　株価指標関連　-------------
    // 流通株式 Basic CommonStockSharesOutstanding_0_Q1_shares
    const commonStockSharesOutstanding = () => {
      if (res.CommonStockSharesOutstanding_0_Q1_shares) {
        return res.CommonStockSharesOutstanding_0_Q1_shares
      } else if (res.CommonStockSharesOutstanding_0_Q2_shares) {
        return res.CommonStockSharesOutstanding_0_Q2_shares
      } else if (res.CommonStockSharesOutstanding_0_Q3_shares) {
        return res.CommonStockSharesOutstanding_0_Q3_shares
      } else if (res.CommonStockSharesOutstanding_0_FY_shares) {
        return res.CommonStockSharesOutstanding_0_FY_shares
        // 名称が違う場合
      } else if (res.WeightedAverageNumberOfSharesOutstandingBasic_1_Q1_shares) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_1_Q1_shares
      } else if (res.WeightedAverageNumberOfSharesOutstandingBasic_2_Q2_shares) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_2_Q2_shares
      } else if (res.WeightedAverageNumberOfSharesOutstandingBasic_3_Q3_shares) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_3_Q3_shares
      } else if (res.WeightedAverageNumberOfSharesOutstandingBasic_4_FY_shares) {
        return res.WeightedAverageNumberOfSharesOutstandingBasic_4_FY_shares
        // 名称が違う場合
      } else if (res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_1_Q1_shares) {
        return res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_1_Q1_shares
      } else if (res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_2_Q2_shares) {
        return res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_2_Q2_shares
      } else if (res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_3_Q3_shares) {
        return res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_3_Q3_shares
      } else if (res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_4_FY_shares) {
        return res.WeightedAverageNumberOfShareOutstandingBasicAndDiluted_4_FY_shares
        // 名称が違う場合　:　CommonStockSharesIssued - TreasuryStockSharesConverted
      } else if (res.CommonStockSharesIssued_0_Q1_shares) {
        return res.TreasuryStockSharesConverted_0_Q1_shares
          ? res.CommonStockSharesIssued_0_Q1_shares - res.TreasuryStockSharesConverted_0_Q1_shares
          : res.CommonStockSharesIssued_0_Q1_shares
      } else if (res.CommonStockSharesIssued_0_Q2_shares) {
        return res.TreasuryStockSharesConverted_0_Q2_shares
          ? res.CommonStockSharesIssued_0_Q2_shares - res.TreasuryStockSharesConverted_0_Q2_shares
          : res.CommonStockSharesIssued_0_Q2_shares
      } else if (res.CommonStockSharesIssued_0_Q3_shares) {
        return res.TreasuryStockSharesConverted_0_Q3_shares
          ? res.CommonStockSharesIssued_0_Q3_shares - res.TreasuryStockSharesConverted_0_Q3_shares
          : res.CommonStockSharesIssued_0_Q3_shares
      } else if (res.CommonStockSharesIssued_0_FY_shares) {
        return res.TreasuryStockSharesConverted_0_FY_shares
          ? res.CommonStockSharesIssued_0_FY_shares - res.TreasuryStockSharesConverted_0_FY_shares
          : res.CommonStockSharesIssued_0_FY_shares
      } else {
        return
      }
    }

    // 流通株式 Diluted　（基本的には使わない）
    const weightedAverageNumberOfDilutedSharesOutstanding = () => {
      if (res.WeightedAverageNumberOfDilutedSharesOutstanding_1_Q1_shares) {
        return res.WeightedAverageNumberOfDilutedSharesOutstanding_1_Q1_shares
      } else if (res.WeightedAverageNumberOfDilutedSharesOutstanding_2_Q2_shares) {
        return res.WeightedAverageNumberOfDilutedSharesOutstanding_2_Q2_shares
      } else if (res.WeightedAverageNumberOfDilutedSharesOutstanding_3_Q3_shares) {
        return res.WeightedAverageNumberOfDilutedSharesOutstanding_3_Q3_shares
      } else if (res.WeightedAverageNumberOfDilutedSharesOutstanding_4_FY_shares) {
        return res.WeightedAverageNumberOfDilutedSharesOutstanding_4_FY_shares
      } else {
        return
      }
    }

    // EPS-Basic 単四半期
    const earningsPerShareBasic = () => {
      if (i == 0) {
        return
      } else if (res.EarningsPerShareBasic_1_Q1_USD) {
        return res.EarningsPerShareBasic_1_Q1_USD
      } else if (res.EarningsPerShareBasic_1_Q2_USD) {
        return res.EarningsPerShareBasic_1_Q2_USD
      } else if (res.EarningsPerShareBasic_1_Q3_USD) {
        return res.EarningsPerShareBasic_1_Q3_USD
      } else if (res.EarningsPerShareBasic_1_FY_USD) {
        return res.EarningsPerShareBasic_1_FY_USD
        // 第四単四半期データ
      } else if (res.EarningsPerShareBasic_4_FY_USD) {
        return (
          resultRes[i].EarningsPerShareBasic_4_FY_USD -
          resultRes[i - 1].EarningsPerShareBasic_3_Q3_USD
        )
      } else {
        return
      }
    }
    // EPS-Basic Accum
    const earningsPerShareBasicAccum = () => {
      if (res.EarningsPerShareBasic_1_Q1_USD) {
        return res.EarningsPerShareBasic_1_Q1_USD
      } else if (res.EarningsPerShareBasic_2_Q2_USD) {
        return res.EarningsPerShareBasic_2_Q2_USD
      } else if (res.EarningsPerShareBasic_3_Q3_USD) {
        return res.EarningsPerShareBasic_3_Q3_USD
      } else if (res.EarningsPerShareBasic_4_FY_USD) {
        return res.EarningsPerShareBasic_4_FY_USD
      } else {
        return
      }
    }

    // EPS-Diluted 単四半期
    const earningsPerShareDiluted = () => {
      if (i == 0) {
        return
      } else if (res.EarningsPerShareDiluted_1_Q1_USD) {
        return res.EarningsPerShareDiluted_1_Q1_USD
      } else if (res.EarningsPerShareDiluted_1_Q2_USD) {
        return res.EarningsPerShareDiluted_1_Q2_USD
      } else if (res.EarningsPerShareDiluted_1_Q3_USD) {
        return res.EarningsPerShareDiluted_1_Q3_USD
      } else if (res.EarningsPerShareDiluted_1_FY_USD) {
        return res.EarningsPerShareDiluted_1_FY_USD
        // 第四単四半期データ
      } else if (res.EarningsPerShareDiluted_4_FY_USD) {
        return (
          resultRes[i].EarningsPerShareDiluted_4_FY_USD -
          resultRes[i - 1].EarningsPerShareDiluted_3_Q3_USD
        )
      } else {
        return
      }
    }

    // EPS-Diluted Accum
    const earningsPerShareAccumDiluted = () => {
      if (res.EarningsPerShareDiluted_1_Q1_USD) {
        return res.EarningsPerShareDiluted_1_Q1_USD
      } else if (res.EarningsPerShareDiluted_2_Q2_USD) {
        return res.EarningsPerShareDiluted_2_Q2_USD
      } else if (res.EarningsPerShareDiluted_3_Q3_USD) {
        return res.EarningsPerShareDiluted_3_Q3_USD
      } else if (res.EarningsPerShareDiluted_4_FY_USD) {
        return res.EarningsPerShareDiluted_4_FY_USD
      } else {
        return
      }
    }

    // -------------　配当関係　-------------
    // 単四半期配当 Pershare
    // CommonStockDividendsPerShareDeclared
    // CommonStockDividendsPerShareCashPaid

    const commonStockDividendsPerShareDeclaredDeducted = () => {
      if (i === 0) {
        return 0
      } else if (res.CommonStockDividendsPerShareDeclared_1_Q1_USD) {
        return res.CommonStockDividendsPerShareDeclared_1_Q1_USD
      } else if (res.CommonStockDividendsPerShareDeclared_1_Q2_USD) {
        return res.CommonStockDividendsPerShareDeclared_1_Q2_USD
      } else if (res.CommonStockDividendsPerShareDeclared_1_Q3_USD) {
        return res.CommonStockDividendsPerShareDeclared_1_Q3_USD
      } else if (res.CommonStockDividendsPerShareDeclared_4_FY_USD) {
        return (
          resultRes[i].CommonStockDividendsPerShareDeclared_4_FY_USD -
          resultRes[i - 1].CommonStockDividendsPerShareDeclared_3_Q3_USD
        )
        // 名称が違う場合
      } else if (res.CommonStockDividendsPerShareCashPaid_1_Q1_USD) {
        return res.CommonStockDividendsPerShareCashPaid_1_Q1_USD
      } else if (res.CommonStockDividendsPerShareCashPaid_1_Q2_USD) {
        return res.CommonStockDividendsPerShareCashPaid_1_Q2_USD
      } else if (res.CommonStockDividendsPerShareCashPaid_1_Q3_USD) {
        return res.CommonStockDividendsPerShareCashPaid_1_Q3_USD
      } else if (res.CommonStockDividendsPerShareCashPaid_4_FY_USD) {
        return (
          resultRes[i].CommonStockDividendsPerShareCashPaid_4_FY_USD -
          resultRes[i - 1].CommonStockDividendsPerShareCashPaid_3_Q3_USD
        )
      } else {
        return
      }
    }

    // 年間累計配当 pershare
    const commonStockDividendsPerShareDeclaredYear = () => {
      if (res.CommonStockDividendsPerShareDeclared_4_FY_USD) {
        return res.CommonStockDividendsPerShareDeclared_4_FY_USD
      } else if (res.CommonStockDividendsPerShareCashPaid_4_FY_USD) {
        return res.CommonStockDividendsPerShareCashPaid_4_FY_USD
      } else {
        return
      }
    }

    //// ----配当 pershare ではない、後工程で流通株式で割り、一株当たりを出す。年間のみ単四半期は使用していない-----------
    const commonStockDividendsCashPaidYear = () => {
      if (res.DividendsCash_4_FY_USD) {
        return res.DividendsCash_4_FY_USD
      } else if (res.PaymentsOfDividends_4_FY_USD) {
        return res.PaymentsOfDividends_4_FY_USD
      } else if (res.PaymentsOfDividendsCommonStock_4_FY_USD) {
        return res.PaymentsOfDividendsCommonStock_4_FY_USD
      } else {
        return
      }
    }

    // ------------- Return Statement --------------------

    const FinancialData = {
      date: res.period.slice(0, 4) + '/' + res.period.slice(4, 6),
      fp: res.fp,
      revenue: Number(revenueDataDeducted()),
      revenueAccum: Number(revenueDataAccum()),
      NetIncomeLoss: Number(netIncomeDataDeducted()),
      NetIncomeLossAccum: Number(netIncomeDataAccum()),
      operatingCashFlow: Number(operatingCashFlowDeducted()),
      operatingCashFlowAccum: Number(operatingCashFlowAccum()),
      assets: Number(assets()),
      stockHoldersEquity: Number(stockholdersEquity()),
      commonStockSharesOutstanding: Number(commonStockSharesOutstanding()),
      weightedAverageNumberOfDilutedSharesOutstanding: Number(
        weightedAverageNumberOfDilutedSharesOutstanding()
      ),
      eps: Number(earningsPerShareBasic()),
      epsAccum: Number(earningsPerShareBasicAccum()),
      epsDiluted: Number(earningsPerShareDiluted()),
      epsAccumDiluted: Number(earningsPerShareAccumDiluted()),
      commonStockDividendsPerShareDeclaredDeducted: Number(
        commonStockDividendsPerShareDeclaredDeducted()
      ),
      commonStockDividendsPerShareDeclaredYear: Number(commonStockDividendsPerShareDeclaredYear()),
      commonStockDividendsCashPaidYear: Number(commonStockDividendsCashPaidYear()),
    }
    return FinancialData
  })

  return edgarRes
}
