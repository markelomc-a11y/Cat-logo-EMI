export interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

export type ThemeMode = 'default' | 'high-contrast-dark' | 'high-contrast-light' | 'grayscale' | 'sepia';

export type FontSizeMode = 'normal' | 'large' | 'extra-large';

export interface AccessibilitySettings {
  theme: ThemeMode;
  fontSize: FontSizeMode;
  dyslexiaFont: boolean;
  voiceSpeed: number;
  screenReaderActive: boolean;
  language: 'pt' | 'en';
}
