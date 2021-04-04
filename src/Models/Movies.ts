export interface Category {
    id: string;
    title: string;
    movies: Movies[];
};

export interface Movies {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
}