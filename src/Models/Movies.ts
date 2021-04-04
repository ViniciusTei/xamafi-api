export interface Category {
    slug: string;
    title: string;
};

export interface Movie {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    genres: string[]
}