import Person from "./people";

export default interface Household {
    blockNum: string;
    inhabitants: Person[];
}