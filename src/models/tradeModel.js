export default class TradeModel {
    constructor(
        id, pair, type, position,
        volume, takeProfit, stopLoss,
        matchPrice, matchVolume, profit,
        createdAt, chartImage, matchConditions
    ) {
        this.id = id;
        this.pair = pair;
        this.type = type;
        this.position = parseFloat(position);
        this.volume = parseFloat(volume);
        this.takeProfit = parseFloat(takeProfit);
        this.stopLoss = parseFloat(stopLoss);
        this.matchPrice = parseFloat(matchPrice);
        this.matchVolume = parseFloat(matchVolume);
        this.profit = parseFloat(profit);
        this.createdAt = createdAt;
        this.chartImage = chartImage;
        this.matchConditions = matchConditions;
    }

    toTableData() {
        return {
            id: this.id,
            pair: this.pair,
            type: this.type,
            position: this.position,
            volume: this.volume
        }
    }

    toSheetData() {
        return [
            this.id,
            this.pair,
            this.type,
            this.position,
            this.volume,
            this.takeProfit,
            this.stopLoss,
            this.matchPrice,
            this.matchVolume,
            this.profit,
            this.createdAt
        ]
    }
}
