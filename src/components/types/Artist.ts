export interface Artist {
  id: number;
  image_url: string;
  name_th: string;
  name_en: string;
  born_day?: number;
  born_month?: string;
  born_year?: string;
  dead_day?: string;
  dead_month?: string;
  dead_year?: string;
  birth_place?: string;
  address?: string;
  telephone?: string;
  Email?: string;
  education?: {
    year: string;
    year_end?: string;
    education_th?: string;
    education_en: string;
  }[];
  slug: string;
  exhibitions?: {
    year: string;
    year_end?: string;
    exhibitions_th?: string;
    exhibitions_en?: string;
  }[];
  solo_exhibitions?: {
    year: string;
    year_end?: string;
    exhibitions_th?: string;
    exhibitions_en?: string;
  }[];
  group_exhibitions?: {
    year: string;
    year_end?: string;
    exhibitions_th?: string;
    exhibitions_en?: string;
  }[];
  awards?: {
    year: string;
    year_end?: string;
    awards_th?: string;
    awards_en?: string;
  }[];
  collections?: {
    year: string;
    year_end?: string;
    collections_th?: string;
    collections_en?: string;
  }[];
}

export interface ComponentArtistProps {
  artist: Artist;
}