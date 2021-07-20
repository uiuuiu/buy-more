export default class PairModel {
    constructor(
        id, name
    ) {
        this.id = id;
        this.name = name;
    }

    toTableData() {
        return {
            id: this.id,
            name: this.name,
        }
    }
}
