/* eslint-disable no-unused-vars */
export interface Book {
    id: number;
    media_id: string;
    title : BookTitleInterface
    images: imagesI;
    scanlator: string;
    upload_date: number;
    tags: tagInterface[];
    num_pages: number;
    num_favorites: number;
}

export interface ListInterface {
    numResults: number;
    num_pages: number;
    results: Result[];
}

export interface Result {
    id: string;
    title: string;
    language: Language;
    thumbnail: Thumbnail;
}

export enum Language {
    Chinese = "chinese",
    English = "english",
    Japanese = "japanese",
}

export interface Thumbnail {
    s: string;
    w: number;
    h: number;
}


export interface BookTitleInterface {
    english:string;
    japanese:string;
    pretty:string;
}

export interface tagInterface {
    id: number;
    type: string;
    name: string;
    url: string;
    count: number;
}
export interface imagesI {
    pages: PageInterface[];
    cover: CoverInterface;
    thumbnail: ThumbnailInterface;
}

export interface PageInterface {
    t: Typeimage;
    w: number;
    h: number;
}

export interface CoverInterface {
    t: Typeimage;
    w:number;
    h:number;
}


export interface ThumbnailInterface {
    t: Typeimage;
    w:number;
    h:number;
}

export type Typeimage = "j" | "p" | "g"
// const TYPE = {
// j: "jpg",
// p: "png",
// g: "gif"
//   };
