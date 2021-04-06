export interface CategoryModel {
    slug: string;
    title: string;
};

export interface MovieModel {
    id: string;
    title: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    genres: string[]
}