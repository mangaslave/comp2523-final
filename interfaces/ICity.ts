import Clinic from "./clinic";
import Household from "./household";

export default interface ICity {
    [cityName: string]: {
        households: Household[];
        clinics: Clinic[];
    };
}