/*
 * Copyright (C) 2020 Wellington Rocha
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */
import * as Core from "../lib";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const iqOptionApi = new Core.IQOptionApi(
    "liie.m@excelbangkok.com",
    "Code11054"
);

const candles: {
    /**
     * Open.
     */
    open: number[];
    /**
     * Close.
     */
    close: number[];
    /**
     * High.
     */
    high: number[];
    /**
     * Low.
     */
    low: number[];
} = {
    open: [],
    close: [],
    high: [],
    low: [],
} as any;

export const findUserBalanceFiat = (
    balances: Core.IQOptionBalance[],
    currency: Core.IQOptionCurrency,
    test: boolean = false
): Core.IQOptionBalance => {
    if (test) {
        return balances.filter(
            (f) => f.type === Core.IQOptionCurrencyType.TEST
        )[0];
    }
    return balances.filter(
        (f) =>
            f.currency === currency && f.type === Core.IQOptionCurrencyType.FIAT
    )[0];
};

iqOptionApi
    .connectAsync()
    .then(async (profile) => {
        // OPTIONS
        const currency = Core.IQOptionCurrency.USD;
        // const profitPercent = 87;
        const market = Core.IQOptionMarket.EURUSD;

        const tradersSentiment = new Core.IQOptionStreamOptionTradersSentiment(
            iqOptionApi.getIQOptionWs(),
            market
        );
        await tradersSentiment.startStream();
        tradersSentiment.on("data", async (data) => {
            console.log(data);
            if (data.value > 0.8) {
                // console.log(data.value)
                console.log("buy");
                // await exec('cd ~/projects/iq.option.bot && pm2 stop all && pm2 start ecosystem.config.js --no-autorestart >> /dev/null 2>&1');
                // process.exit();
            }

            if (data.value < 0.22) {
                console.log("sell");
                // console.log(data.value)
                // await exec('cd ~/projects/iq.option.bot && cp config.sample.sell.json config.sample.json && pm2 stop all && pm2 start ecosystem.config.js --no-autorestart >> /dev/null 2>&1');
                process.exit();
            }
        });
        //
        // await iqOptionApi.getIQOptionWs().send(Core.IQOptionName.SEND_MESSAGE, {"name":"get-traders-mood","version":"1.0","body":{"instrument":"turbo-option","asset_id":1}});
        // await iqOptionApi.getIQOptionWs().socket().send(JSON.stringify({"name":"sendMessage","request_id":"30","local_time":7747,"msg":{"name":"get-traders-mood","version":"1.0","body":{"instrument":"turbo-option","asset_id":1}}}));
        // await iqOptionApi.getIQOptionWs().socket().send(JSON.stringify({"name":"subscribeMessage","request_id":"s_114","local_time":8897,"msg":{"name":"traders-mood-changed","params":{"routingFilters":{"instrument":"turbo-option","asset_id":"1"}}}}));

        // const time = Core.IQOptionTime.ONE_MINUTE;
        // const responseData = await iqOptionApi.getInitializationData();
        // console.log(responseData.turbo.actives["76"]);

        // const responseData2 = await iqOptionApi.getInitializationData();
        // console.log(responseData2);
        // const candleStream = new Core.IQOptionStreamCandleGenerated(
        //     iqOptionApi.getIQOptionWs(),
        //     market,
        //     time
        // );

        // const balance = findUserBalanceFiat(profile.balances, currency, true);
        // iqOptionApi.getIQOptionWs().socket().on("message", data => console.log(data));
        // await Core.sleepHelper(2000)
        // await iqOptionApi.getIQOptionWs().send(Core.IQOptionName.SEND_MESSAGE, {"name":"get-commissions","version":"1.0","body":{"instrument_type":"digital-option","user_group_id":193}});
        // await iqOptionApi.getIQOptionWs().send(Core.IQOptionName.SEND_MESSAGE, {"name":"get-active-schedule","version":"1.0","body":{"instrument_type":"digital-option","period":7}});
        // await iqOptionApi.getIQOptionWs().send(Core.IQOptionName.SEND_MESSAGE, );

        // START STREAM
        // await candleStream.startStream();
        // candleStream.on("data", (data: Core.IQOptionCandle) => {
        //     candles.open.unshift(data.open);
        //     candles.close.unshift(data.close);
        //     candles.high.unshift(data.max);
        //     candles.low.unshift(data.min);
        //     candles.open = candles.open.slice(0, 100);
        //     candles.close = candles.close.slice(0, 100);
        //     candles.open = candles.open.slice(0, 100);
        //     candles.low = candles.low.slice(0, 100);
        //     if (candles.close.length > 50) {
        //         Core.logger().silly(`RSI: ${talib.RSI(candles.close, 17)[0]}`);
        //         // Core.logger().silly(`MACD: ${talib.MACD(candles.close, 12, 26, 9).macd}`)
        //     }
        // });
        const time = 5;

        // SEND ORDER
        // await iqOptionApi.sendOrderDigital(
        //     Core.IQOptionMarket.EURUSD,
        //     Core.IQOptionModel.SELL,
        //     time,
        //     balance.id,
        //     10
        // );

        // await iqOptionApi.sendOrderBinary(
        //     Core.IQOptionMarket.EURUSD,
        //     Core.IQOptionModel.BUY,
        //     time,
        //     balance.id,
        //     profitPercent,
        //     100
        // );
        // console.log('REQUEST ORDER 2')
        // await iqOptionApi.sendOrderBinary(
        //     Core.IQOptionMarket.EURUSD,
        //     Core.IQOptionModel.BUY,
        //     time,
        //     balance.id,
        //     profitPercent,
        //     100
        // );
        // const ordersCreated = await Promise.all([
        //     iqOptionApi.sendOrderBinary(
        //         Core.IQOptionMarket.EURUSD_OTC,
        //         Core.IQOptionModel.BUY,
        //         time,
        //         balance.id,
        //         profitPercent,
        //         100
        //     )
        // ]);
        // const optionCloseStream = new Core.IQOptionStreamOptionClose(
        //     iqOptionApi.getIQOptionWs(),
        //     market
        // );
        // await optionCloseStream.startStream();
        // optionCloseStream.on("data", data => console.log(data));
        // console.log(console.log(ordersCreated));
        // console.log(requestId);
        // iqOptionApi.getInstruments(market, Core.IQOptionInstrumentType.BINARY)
        // let data;
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // data = await iqOptionApi.getInitializationData();
        // iqOptionApi
        //     .getIQOptionWs()
        //     .socket()
        //     .on("message", (data) => console.log(data));
    })
    .catch((e: any) => {
        Core.logger().error(JSON.stringify(e));
    });
