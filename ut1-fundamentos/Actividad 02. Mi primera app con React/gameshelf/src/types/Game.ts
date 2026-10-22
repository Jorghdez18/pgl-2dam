export type Game ={
    id: number;
    name: string;
    genre? : string;
    releasedDates?: {
        Europe?: String;
        Japan?: String;
        NorthAmerica?: string;
        Australia?: string;
    };
}