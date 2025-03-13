
export interface Movie {
    imdbId: number;
    title: string;
    imdbRating: number;
    plot: string;
    poster: string;
    released: string;
    budget: LowHigh;
    genres: string;
    year: LowHigh;
    runtime: LowHigh;
    // runtime: number;
    // budget: number;
    // year: number;
  }

export interface LowHigh {
  low: number,
  high: number
}