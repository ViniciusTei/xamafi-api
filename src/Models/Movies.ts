export interface CategoryModel {
    slug: string;
    title: string;
};

export interface MovieModel extends BaseMovie {
    id: string;
}

export interface BaseMovie {
    title: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    genres: string[]
}