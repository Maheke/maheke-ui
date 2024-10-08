export default class FetchDataError extends Error {
    constructor(status: number) {
        super();
        if (status === 404) {
            this.message = `${status} Data not found`;
        } else {
            this.message = `There was an error fetching the data. Status: ${status}`;
        }
    }
}
