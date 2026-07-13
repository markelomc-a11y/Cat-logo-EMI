import { useEffect, useState } from 'react';
import { Movie, AccessibilitySettings } from '../types';
import { ArrowLeft, Star, Volume2, VolumeX, Award, Calendar, Clock, Globe, Languages, Film, User, Tag } from 'lucide-react';

interface MovieDetailPageProps {
  movie: Movie;
  onBack: () => void;
  settings: AccessibilitySettings;
}

export default function MovieDetailPage({ movie, onBack, settings }: MovieDetailPageProps) {
  const [isNarrating, setIsNarrating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { language, voiceSpeed, theme } = settings;

  useEffect(() => {
    // Reset image error and cancel speech on movie change
    setImageError(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [movie]);

  const t = {
    pt: {
      backBtn: 'Voltar ao Catálogo',
      director: 'Diretor',
      writer: 'Roteiristas',
      actors: 'Elenco Principal',
      genre: 'Gênero',
      released: 'Data de Lançamento',
      runtime: 'Duração do Filme',
      language: 'Idiomas Disponíveis',
      country: 'País de Origem',
      awards: 'Prêmios & Indicações',
      boxOffice: 'Bilheteria Mundial',
      plot: 'Sinopse Oficial',
      ratings: 'Pontuações de Críticos',
      imdbScore: 'Avaliação da Crítica (IMDb)',
      votes: 'votos cadastrados',
      listenDesc: 'Narrar Detalhes (Acessibilidade)',
      stopListen: 'Parar Áudio de Narração',
      noPoster: 'Pôster oficial indisponível para este título',
      production: 'Estúdio de Produção',
      metascoreTitle: 'Pontuação Metascore',
      narrationText: 'Filme: {title}. Lançado em {year}, com duração de {runtime}. Classificação indicativa: {rated}. Gêneros: {genres}. Diretor: {director}. Elenco: {actors}. Premiações: {awards}. Sinopse do filme: {plot}'
    },
    en: {
      backBtn: 'Back to Catalog',
      director: 'Director',
      writer: 'Writers',
      actors: 'Main Cast',
      genre: 'Genre',
      released: 'Release Date',
      runtime: 'Movie Runtime',
      language: 'Available Languages',
      country: 'Country of Origin',
      awards: 'Awards & Nominations',
      boxOffice: 'Worldwide Box Office',
      plot: 'Official Synopsis',
      ratings: 'Critics Review Scores',
      imdbScore: 'Critic Rating (IMDb)',
      votes: 'registered votes',
      listenDesc: 'Narrate Movie Details (Accessibility)',
      stopListen: 'Stop Narration Audio',
      noPoster: 'Official poster not available for this title',
      production: 'Production Studio',
      metascoreTitle: 'Metascore Score',
      narrationText: 'Movie: {title}. Released in {year}, with a duration of {runtime}. Rating: {rated}. Genres: {genres}. Director: {director}. Cast: {actors}. Awards: {awards}. Plot summary: {plot}'
    }
  }[language];

  // Narration handler using SpeechSynthesis
  const handleToggleNarration = () => {
    if (!('speechSynthesis' in window)) return;

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      window.speechSynthesis.cancel();
      
      const textToSpeak = t.narrationText
        .replace('{title}', movie.Title)
        .replace('{year}', movie.Year)
        .replace('{runtime}', movie.Runtime)
        .replace('{rated}', movie.Rated !== 'N/A' ? movie.Rated : 'Livre')
        .replace('{genres}', movie.Genre)
        .replace('{director}', movie.Director)
        .replace('{actors}', movie.Actors)
        .replace('{awards}', movie.Awards !== 'N/A' ? movie.Awards : 'Nenhum listada')
        .replace('{plot}', movie.Plot);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'pt' ? 'pt-BR' : 'en-US';
      utterance.rate = voiceSpeed;
      
      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);
      
      setIsNarrating(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Styling maps based on selected theme for AA/AAA WCAG contrast compliance
  const pageThemeClasses = {
    default: 'bg-[#0D0D0D] text-[#F5F5F5]',
    'high-contrast-dark': 'bg-black text-yellow-400 font-bold',
    'high-contrast-light': 'bg-white text-black font-bold',
    grayscale: 'bg-slate-950 text-slate-100 grayscale',
    sepia: 'bg-amber-50 text-amber-950',
  }[theme];

  const cardThemeClasses = {
    default: 'bg-[#171717] border border-white/5 shadow-xl shadow-black/40',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400 text-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black text-black',
    grayscale: 'bg-slate-900 border border-slate-800 text-slate-100',
    sepia: 'bg-amber-100/50 border border-amber-200 text-amber-950',
  }[theme];

  const headerBorderClasses = {
    default: 'border-white/5',
    'high-contrast-dark': 'border-yellow-400',
    'high-contrast-light': 'border-black',
    grayscale: 'border-slate-800',
    sepia: 'border-amber-200',
  }[theme];

  const accentTextClasses = {
    default: 'text-[#3B82F6]',
    'high-contrast-dark': 'text-yellow-400 font-bold',
    'high-contrast-light': 'text-black font-extrabold',
    grayscale: 'text-slate-300',
    sepia: 'text-amber-700',
  }[theme];

  const badgeClasses = {
    default: 'bg-[#3B82F6]/10 text-[#3B82F6] border-blue-500/20',
    'high-contrast-dark': 'bg-black text-yellow-400 border-2 border-yellow-400',
    'high-contrast-light': 'bg-white text-black border-2 border-black',
    grayscale: 'bg-slate-800 text-slate-100 border border-slate-700',
    sepia: 'bg-amber-200 text-amber-950 border border-amber-300',
  }[theme];

  const focusRingClasses = {
    default: 'focus:ring-[#3B82F6]',
    'high-contrast-dark': 'focus:ring-yellow-400',
    'high-contrast-light': 'focus:ring-black',
    grayscale: 'focus:ring-slate-500',
    sepia: 'focus:ring-amber-700',
  }[theme];

  const ratingProgressClasses = {
    default: 'bg-gradient-to-r from-blue-600 to-blue-400',
    'high-contrast-dark': 'bg-yellow-400',
    'high-contrast-light': 'bg-black',
    grayscale: 'bg-slate-400',
    sepia: 'bg-amber-700',
  }[theme];

  const textMutedClasses = {
    default: 'text-[#A1A1A1]',
    'high-contrast-dark': 'text-yellow-400/90',
    'high-contrast-light': 'text-black/90',
    grayscale: 'text-slate-400',
    sepia: 'text-amber-900/90',
  }[theme];

  const backButtonClasses = {
    default: 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#F5F5F5] border border-white/10 hover:border-[#3B82F6]/30',
    'high-contrast-dark': 'bg-black text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400/20',
    'high-contrast-light': 'bg-white text-black border-2 border-black hover:bg-slate-200',
    grayscale: 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700',
    sepia: 'bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200',
  }[theme];

  const narrateBtnClasses = {
    default: isNarrating 
      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
      : 'bg-[#3B82F6] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20',
    'high-contrast-dark': isNarrating
      ? 'bg-red-500 text-white border-2 border-red-500 animate-pulse'
      : 'bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-yellow-400',
    'high-contrast-light': isNarrating
      ? 'bg-red-500 text-white border-2 border-red-500 animate-pulse'
      : 'bg-black hover:bg-slate-800 text-white border-2 border-black',
    grayscale: isNarrating
      ? 'bg-red-500 text-white animate-pulse'
      : 'bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500',
    sepia: isNarrating
      ? 'bg-red-500 text-white animate-pulse'
      : 'bg-amber-700 hover:bg-amber-600 text-amber-50 focus:ring-amber-700',
  }[theme];

  const genresList = movie.Genre.split(',').map(g => g.trim());

  return (
    <article className="animate-fade-in space-y-8" id="movie-detail-page">
      {/* 1. Header Navigation Toolbar */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${headerBorderClasses}`}>
        <button
          onClick={onBack}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-black transition-all duration-300 focus:outline-none focus:ring-4 ${focusRingClasses} ${backButtonClasses}`}
          aria-label={t.backBtn}
        >
          <ArrowLeft className="w-5 h-5 shrink-0" />
          <span>{t.backBtn}</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {/* Narration Accessibility Button */}
          <button
            onClick={handleToggleNarration}
            aria-label={isNarrating ? t.stopListen : t.listenDesc}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 focus:outline-none focus:ring-4 ${focusRingClasses} ${narrateBtnClasses}`}
          >
            {isNarrating ? (
              <>
                <VolumeX className="w-5 h-5" />
                <span>{t.stopListen}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                <span>{t.listenDesc}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Primary Page Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Poster & Critics Scorecards (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Big high-fidelity Movie Poster container */}
          <div className={`aspect-[3/4] w-full rounded-2xl overflow-hidden flex items-center justify-center transition-all ${cardThemeClasses}`}>
            {!imageError && movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} Poster`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center gap-4 p-8 text-center">
                <Film className="w-16 h-16 text-slate-500" />
                <span className={`text-sm font-bold ${textMutedClasses}`}>{t.noPoster}</span>
                <span className="text-lg font-black">{movie.Title}</span>
              </div>
            )}
          </div>

          {/* Detailed IMDb Statistics Score Card */}
          <div className={`p-6 rounded-2xl border ${cardThemeClasses}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-black uppercase tracking-wider ${textMutedClasses}`}>{t.imdbScore}</span>
              <span className={`text-xs font-semibold ${textMutedClasses}`}>{movie.imdbVotes} {t.votes}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <Star className={`w-8 h-8 ${theme === 'default' ? 'text-[#3B82F6] fill-[#3B82F6]' : 'text-amber-400 fill-amber-400'}`} />
              <span className="text-4xl font-black">{movie.imdbRating}</span>
              <span className={`font-bold text-lg ${textMutedClasses}`}>/10</span>
            </div>

            {/* WCAG compliant rating progress tracking bar */}
            <div className={`w-full h-3 rounded-full overflow-hidden mt-4 bg-black/30 ${theme === 'grayscale' ? 'bg-slate-800' : ''}`}>
              <div 
                className={`h-full rounded-full transition-all duration-500 ${ratingProgressClasses}`} 
                style={{ width: `${parseFloat(movie.imdbRating || '0') * 10}%` }}
              ></div>
            </div>

            {/* Metascore representation */}
            {movie.Metascore && movie.Metascore !== 'N/A' && (
              <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className={`text-xs font-black uppercase tracking-wider ${textMutedClasses}`}>{t.metascoreTitle}</span>
                  <p className="font-extrabold text-lg">{movie.Metascore} <span className="text-sm font-medium opacity-60">/100</span></p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-black text-lg ${
                  parseInt(movie.Metascore) >= 61 
                    ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                    : parseInt(movie.Metascore) >= 40 
                    ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                    : 'bg-red-500/20 text-red-500 border border-red-500/30'
                }`}>
                  {movie.Metascore}
                </div>
              </div>
            )}
          </div>

          {/* Render individual critics scores */}
          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className={`p-6 rounded-2xl border ${cardThemeClasses}`}>
              <h3 className={`text-xs font-black uppercase tracking-wider mb-4 ${textMutedClasses}`}>
                {t.ratings}
              </h3>
              <div className="space-y-4">
                {movie.Ratings.map((rating) => (
                  <div key={rating.Source} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 last:pb-0">
                    <span className={`text-sm font-semibold truncate pr-4 ${textMutedClasses}`}>
                      {rating.Source}
                    </span>
                    <span className="font-black text-sm px-3 py-1 bg-white/5 rounded-md border border-white/5 shrink-0">
                      {rating.Value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Title, Sub-details, Plots, Cast list & Production details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            {/* Rating Age and Runtime Tags Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-3 py-1.5 text-xs font-extrabold uppercase rounded-lg border ${badgeClasses}`}>
                {movie.Rated}
              </span>
              <span className={`px-3 py-1.5 text-xs font-extrabold uppercase rounded-lg border flex items-center gap-1 ${badgeClasses}`}>
                <Clock className="w-3.5 h-3.5" />
                {movie.Runtime}
              </span>
              {genresList.map((genre) => (
                <span
                  key={genre}
                  className="text-xs uppercase tracking-wider font-extrabold px-3 py-1 bg-white/5 rounded-lg border border-white/5"
                >
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {movie.Title}
            </h1>
            
            <p className={`text-sm font-bold flex items-center gap-2 flex-wrap ${accentTextClasses}`}>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {t.released}: {movie.Released}
              </span>
            </p>
          </div>

          {/* Official Movie Synopsis */}
          <div className={`p-6 rounded-2xl border ${cardThemeClasses} space-y-3`}>
            <h2 className={`text-xs font-black uppercase tracking-wider flex items-center gap-2 ${textMutedClasses}`}>
              <Tag className={`w-4 h-4 ${accentTextClasses}`} />
              {t.plot}
            </h2>
            <p className="leading-relaxed text-base md:text-lg font-medium">
              {movie.Plot}
            </p>
          </div>

          {/* Cast, Directors and Writers list */}
          <div className={`p-6 rounded-2xl border ${cardThemeClasses} space-y-6`}>
            {/* Directors Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start py-1">
              <div className="md:col-span-3">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${textMutedClasses}`}>
                  <User className={`w-4 h-4 ${accentTextClasses}`} />
                  {t.director}
                </span>
              </div>
              <div className="md:col-span-9">
                <p className="font-extrabold text-base">{movie.Director}</p>
              </div>
            </div>

            {/* Writers Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start py-1 border-t border-white/5 pt-4">
              <div className="md:col-span-3">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${textMutedClasses}`}>
                  <User className={`w-4 h-4 ${accentTextClasses}`} />
                  {t.writer}
                </span>
              </div>
              <div className="md:col-span-9">
                <p className="font-semibold text-base">{movie.Writer}</p>
              </div>
            </div>

            {/* Cast Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start py-1 border-t border-white/5 pt-4">
              <div className="md:col-span-3">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${textMutedClasses}`}>
                  <User className={`w-4 h-4 ${accentTextClasses}`} />
                  {t.actors}
                </span>
              </div>
              <div className="md:col-span-9">
                <p className="font-bold text-base leading-relaxed">{movie.Actors}</p>
              </div>
            </div>
          </div>

          {/* Geographic and Financial details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-2xl border ${cardThemeClasses} space-y-4`}>
              {/* Languages */}
              <div className="space-y-1">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${textMutedClasses}`}>
                  <Languages className={`w-4 h-4 ${accentTextClasses}`} />
                  {t.language}
                </span>
                <p className="font-extrabold text-sm">{movie.Language}</p>
              </div>

              {/* Country */}
              <div className="space-y-1 pt-3 border-t border-white/5">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${textMutedClasses}`}>
                  <Globe className={`w-4 h-4 ${accentTextClasses}`} />
                  {t.country}
                </span>
                <p className="font-extrabold text-sm">{movie.Country}</p>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border ${cardThemeClasses} space-y-4`}>
              {/* Box office */}
              <div className="space-y-1">
                <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${textMutedClasses}`}>
                  <Award className={`w-4 h-4 ${accentTextClasses}`} />
                  {t.boxOffice}
                </span>
                <p className="font-extrabold text-sm">{movie.BoxOffice || 'N/A'}</p>
              </div>

              {/* Production Studio */}
              {movie.Production && movie.Production !== 'N/A' && (
                <div className="space-y-1 pt-3 border-t border-white/5">
                  <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${textMutedClasses}`}>
                    <Film className={`w-4 h-4 ${accentTextClasses}`} />
                    {t.production}
                  </span>
                  <p className="font-extrabold text-sm">{movie.Production}</p>
                </div>
              )}
            </div>
          </div>

          {/* Awards details block */}
          {movie.Awards && movie.Awards !== 'N/A' && (
            <div className={`p-6 rounded-2xl border ${cardThemeClasses} space-y-2 flex items-center gap-4`}>
              <div className={`p-3.5 rounded-xl ${badgeClasses} shrink-0`}>
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className={`text-xs font-black uppercase tracking-wider ${textMutedClasses}`}>{t.awards}</span>
                <p className="font-black text-sm md:text-base">{movie.Awards}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Go Back Navigation */}
      <div className={`pt-8 border-t ${headerBorderClasses} flex justify-center`}>
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-black transition-all duration-300 focus:outline-none focus:ring-4 ${focusRingClasses} ${backButtonClasses}`}
        >
          <ArrowLeft className="w-5 h-5 shrink-0" />
          <span>{t.backBtn}</span>
        </button>
      </div>
    </article>
  );
}
