import Person from "./people";

export default interface Household {
    blockNum: number;
    inhabitants: Person[];
}