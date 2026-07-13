import React, { useState } from 'react';
import { Movie, AccessibilitySettings } from '../types';
import { Film, User, Star, Eye, Volume2, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  settings: AccessibilitySettings;
  onSelect: () => void;
}

export default function MovieCard({ movie, settings, onSelect }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const { language, voiceSpeed } = settings;

  const t = {
    pt: {
      imdbRating: 'Nota IMDb',
      director: 'Diretor',
      actors: 'Elenco',
      detailsBtn: 'Ver Detalhes',
      listenBtn: 'Ouvir Resumo',
      genreLabel: 'Gênero',
      noPoster: 'Pôster indisponível',
      narrationIntro: 'Filme: {title}, de {year}. Diretor: {director}. Nota IMDb: {rating}. Gêneros: {genres}. Sinopse: {plot}'
    },
    en: {
      imdbRating: 'IMDb Score',
      director: 'Director',
      actors: 'Actors',
      detailsBtn: 'View Details',
      listenBtn: 'Listen Summary',
      genreLabel: 'Genre',
      noPoster: 'Poster not available',
      narrationIntro: 'Movie: {title}, from {year}. Director: {director}. IMDb Rating: {rating}. Genres: {genres}. Synopsis: {plot}'
    }
  }[language];

  // Voice narration of card contents
  const handleNarrate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card selection click
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    
    const introText = t.narrationIntro
      .replace('{title}', movie.Title)
      .replace('{year}', movie.Year)
      .replace('{director}', movie.Director)
      .replace('{rating}', movie.imdbRating)
      .replace('{genres}', movie.Genre)
      .replace('{plot}', movie.Plot);

    const utterance = new SpeechSynthesisUtterance(introText);
    utterance.lang = language === 'pt' ? 'pt-BR' : 'en-US';
    utterance.rate = voiceSpeed;
    window.speechSynthesis.speak(utterance);
  };

  const { theme } = settings;

  const cardThemeClasses = {
    default: 'bg-[#171717] border border-white/5 hover:border-[#3B82F6]/50 focus:ring-[#3B82F6] text-[#F5F5F5]',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400 focus:ring-yellow-400 text-yellow-400 font-bold',
    'high-contrast-light': 'bg-white border-2 border-black focus:ring-black text-black font-bold',
    grayscale: 'bg-slate-900 border border-slate-800 focus:ring-slate-500 grayscale text-slate-100',
    sepia: 'bg-amber-100/50 border border-amber-200 focus:ring-amber-700 text-amber-950',
  }[theme];

  const ratingBadgeClasses = {
    default: 'bg-[#0D0D0D]/90 text-[#3B82F6] border border-white/10 backdrop-blur-sm',
    'high-contrast-dark': 'bg-black text-yellow-400 border-2 border-yellow-400',
    'high-contrast-light': 'bg-white text-black border-2 border-black',
    grayscale: 'bg-slate-950 text-slate-100 border border-slate-800',
    sepia: 'bg-amber-50 text-amber-950 border border-amber-200',
  }[theme];

  const accentTextClasses = {
    default: 'text-[#3B82F6]',
    'high-contrast-dark': 'text-yellow-400 font-bold',
    'high-contrast-light': 'text-black font-extrabold',
    grayscale: 'text-slate-300',
    sepia: 'text-amber-700',
  }[theme];

  const narrateBtnClasses = {
    default: 'bg-[#3B82F6] hover:bg-blue-600 text-white focus:ring-[#3B82F6]',
    'high-contrast-dark': 'bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-yellow-400 focus:ring-yellow-400',
    'high-contrast-light': 'bg-black hover:bg-slate-800 text-white border-2 border-black focus:ring-black',
    grayscale: 'bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500',
    sepia: 'bg-amber-700 hover:bg-amber-600 text-amber-50 focus:ring-amber-700',
  }[theme];

  const tagClasses = {
    default: 'bg-white/5 text-[#A1A1A1]',
    'high-contrast-dark': 'bg-black border border-yellow-400 text-yellow-400',
    'high-contrast-light': 'bg-white border border-black text-black',
    grayscale: 'bg-slate-800 text-slate-300',
    sepia: 'bg-amber-100 text-amber-950',
  }[theme];

  const textMutedClasses = {
    default: 'text-[#A1A1A1]',
    'high-contrast-dark': 'text-yellow-400/90',
    'high-contrast-light': 'text-black/95',
    grayscale: 'text-slate-400',
    sepia: 'text-amber-900/90',
  }[theme];

  const genresList = movie.Genre.split(',').map(g => g.trim());

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`${movie.Title}, ${movie.Year}. ${t.imdbRating}: ${movie.imdbRating}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative flex flex-col h-full rounded-xl overflow-hidden shadow-md focus:outline-none focus:ring-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${cardThemeClasses}`}
    >
      {/* Movie Poster & Rating Badge */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0D0D0D] flex items-center justify-center">
        {!imageError && movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={`Pôster de ${movie.Title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 p-4 text-center">
            <Film className="w-12 h-12 text-slate-600" />
            <span className={`text-xs font-semibold ${textMutedClasses}`}>{t.noPoster}</span>
            <span className="text-sm font-bold px-3">{movie.Title}</span>
          </div>
        )}

        {/* Rating Badge */}
        <div 
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border ${ratingBadgeClasses}`}
          aria-label={`${t.imdbRating}: ${movie.imdbRating}`}
        >
          <Star className={`w-3.5 h-3.5 ${theme === 'default' ? 'fill-[#3B82F6]' : 'fill-amber-400'}`} />
          <span>{movie.imdbRating}</span>
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={handleNarrate}
            aria-label={`${t.listenBtn} - ${movie.Title}`}
            className={`flex items-center justify-center w-12 h-12 rounded-full hover:scale-110 active:scale-95 transition-transform ${narrateBtnClasses}`}
          >
            <Volume2 className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#F5F5F5] text-black rounded-full font-bold text-sm hover:bg-white transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <Eye className="w-4 h-4" />
            <span>{t.detailsBtn}</span>
          </button>
        </div>
      </div>

      {/* Card Info Area */}
      <div className="flex flex-col flex-1 p-5">
        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1 mb-2.5" aria-label={t.genreLabel}>
          {genresList.map((genre) => (
            <span
              key={genre}
              className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${tagClasses}`}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className={`text-base font-black line-clamp-1 group-hover:${accentTextClasses} transition-colors`}>
          {movie.Title}
        </h3>

        {/* Director and Year metadata */}
        <div className={`flex flex-col gap-1.5 mt-3 text-xs ${textMutedClasses}`}>
          <div className="flex items-center gap-2">
            <Calendar className={`w-3.5 h-3.5 ${accentTextClasses}`} />
            <span>{movie.Year}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className={`w-3.5 h-3.5 ${accentTextClasses}`} />
            <span className="truncate">{movie.Director}</span>
          </div>
        </div>

        {/* Mini Description/Synopsis */}
        <p className={`text-xs line-clamp-2 mt-3 leading-relaxed border-t border-white/5 pt-2.5 ${textMutedClasses}`}>
          {movie.Plot}
        </p>

        {/* Footer info visible in high contrast */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
          <span className={`text-[10px] font-bold uppercase ${textMutedClasses}`}>{movie.Rated}</span>
          <span className="text-xs font-semibold">{movie.Runtime}</span>
        </div>
      </div>
    </div>
  );
}
