import City from "./city";

const {readFile} = require("node:fs/promises");
const EOL = require("node:os")

export default class Map {
	//private _mapData: string;
  // constructors, methods, etc

    grid: string[][];
    width: number;
    height: number;
    private _mapdata: object;

    constructor (width: number, height: number, data: object) {
        this.width = width;
        this.height = height;
        this._mapdata = data;
        this.grid = Array.from({length: height}, () => Array.from({length: width}, () => 'X'))
    }

    setMap(city: City) {
        if () {
            this.grid[][] = `H`;
        }
        
    }

}