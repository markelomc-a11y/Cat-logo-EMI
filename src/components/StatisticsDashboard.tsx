import { useState } from 'react';
import { Movie, AccessibilitySettings } from '../types';
import { BarChart3, TrendingUp, Award, Award as StarIcon, Film, X, BookOpen, Calendar } from 'lucide-react';

interface StatisticsDashboardProps {
  movies: Movie[];
  settings: AccessibilitySettings;
  onClose: () => void;
}

export default function StatisticsDashboard({ movies, settings, onClose }: StatisticsDashboardProps) {
  const { language, voiceSpeed, theme } = settings;
  const [activeBar, setActiveBar] = useState<string | null>(null);

  const dashboardThemeClasses = {
    default: 'bg-[#171717] border border-white/5 text-[#F5F5F5]',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400 text-yellow-400 font-bold',
    'high-contrast-light': 'bg-white border-2 border-black text-black font-bold',
    grayscale: 'bg-slate-900 border border-slate-800 text-slate-100 grayscale',
    sepia: 'bg-amber-100 border border-amber-200 text-amber-950',
  }[theme];

  const borderThemeClasses = {
    default: 'border-white/5',
    'high-contrast-dark': 'border-yellow-400',
    'high-contrast-light': 'border-black',
    grayscale: 'border-slate-800',
    sepia: 'border-amber-200',
  }[theme];

  const badgeBgClasses = {
    default: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    'high-contrast-dark': 'bg-black text-yellow-400 border-2 border-yellow-400',
    'high-contrast-light': 'bg-white text-black border-2 border-black',
    grayscale: 'bg-slate-800 text-slate-100',
    sepia: 'bg-amber-200 text-amber-950',
  }[theme];

  const cardThemeClasses = {
    default: 'bg-[#0D0D0D] border border-white/5',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black',
    grayscale: 'bg-slate-800 border border-slate-700',
    sepia: 'bg-amber-50 border border-amber-200',
  }[theme];

  const textMutedClasses = {
    default: 'text-[#A1A1A1]',
    'high-contrast-dark': 'text-yellow-400/90',
    'high-contrast-light': 'text-black/95',
    grayscale: 'text-slate-400',
    sepia: 'text-amber-900/90',
  }[theme];

  const accentTextClasses = {
    default: 'text-[#3B82F6]',
    'high-contrast-dark': 'text-yellow-400 font-bold',
    'high-contrast-light': 'text-black font-extrabold',
    grayscale: 'text-slate-200',
    sepia: 'text-amber-700',
  }[theme];

  const focusRingClasses = {
    default: 'focus:ring-[#3B82F6]',
    'high-contrast-dark': 'focus:ring-yellow-400',
    'high-contrast-light': 'focus:ring-black',
    grayscale: 'focus:ring-slate-500',
    sepia: 'focus:ring-amber-700',
  }[theme];

  const tooltipBgClasses = {
    default: 'bg-[#0D0D0D] text-[#3B82F6] border border-white/5',
    'high-contrast-dark': 'bg-black text-yellow-400 border-2 border-yellow-400',
    'high-contrast-light': 'bg-white text-black border-2 border-black',
    grayscale: 'bg-slate-900 text-slate-100 border border-slate-700',
    sepia: 'bg-amber-50 text-amber-950 border border-amber-200',
  }[theme];

  const alertClasses = {
    default: 'bg-[#3B82F6]/5 border border-[#3B82F6]/15 text-[#3B82F6]',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400 text-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black text-black',
    grayscale: 'bg-slate-800/40 border border-slate-700 text-slate-200',
    sepia: 'bg-amber-100 border border-amber-300 text-amber-950',
  }[theme];

  const t = {
    pt: {
      title: 'Painel Estatístico do Catálogo',
      desc: 'Informações analíticas e distribuição dos filmes.',
      close: 'Fechar Painel',
      totalMovies: 'Total de Filmes',
      avgRating: 'Média de Nota IMDb',
      mostCommonGenre: 'Gênero Mais Popular',
      oldestMovie: 'Filme Mais Antigo',
      chartGenreTitle: 'Distribuição de Filmes por Gênero',
      chartDecadeTitle: 'Nota Média IMDb por Década de Lançamento',
      accessibleHint: 'Dica de Acessibilidade: Passe o mouse ou use o teclado sobre as barras para ouvir a estatística ou exibir o balão explicativo.',
      barAria: 'Barra para {label}, valor: {value}',
      genreSpeech: 'Gênero {genre} possui {count} filmes no catálogo.',
      decadeSpeech: 'A década de {decade} possui nota média de {rating} no IMDb.',
      statsSpeech: 'O catálogo possui um total de {total} filmes, com uma média de nota IMDb geral de {avg}.'
    },
    en: {
      title: 'Catalog Analytics Dashboard',
      desc: 'Analytical insights and movie distributions.',
      close: 'Close Dashboard',
      totalMovies: 'Total Movies',
      avgRating: 'Average IMDb Rating',
      mostCommonGenre: 'Most Popular Genre',
      oldestMovie: 'Oldest Movie',
      chartGenreTitle: 'Distribution of Movies by Genre',
      chartDecadeTitle: 'Average IMDb Rating by Launch Decade',
      accessibleHint: 'Accessibility Hint: Hover or use keyboard tab over bars to listen to statistics or display tooltip.',
      barAria: 'Bar for {label}, value: {value}',
      genreSpeech: 'Genre {genre} has {count} movies in the catalog.',
      decadeSpeech: 'Decade {decade} has an average IMDb score of {rating}.',
      statsSpeech: 'The catalog contains a total of {total} movies, with an overall average IMDb score of {avg}.'
    }
  }[language];

  // Calculate statistics
  const totalCount = movies.length;
  const avgRating = (movies.reduce((sum, m) => sum + parseFloat(m.imdbRating), 0) / (totalCount || 1)).toFixed(2);

  // Genre distribution
  const genresMap: Record<string, number> = {};
  movies.forEach(m => {
    m.Genre.split(',').forEach(g => {
      const genre = g.trim();
      genresMap[genre] = (genresMap[genre] || 0) + 1;
    });
  });

  const sortedGenres = Object.entries(genresMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7); // Top 7 genres

  // Decade averages
  const decadesMap: Record<string, { sum: number; count: number }> = {};
  movies.forEach(m => {
    const year = parseInt(m.Year);
    if (!isNaN(year)) {
      const decade = `${Math.floor(year / 10) * 10}s`;
      const rating = parseFloat(m.imdbRating);
      if (!decadesMap[decade]) {
        decadesMap[decade] = { sum: 0, count: 0 };
      }
      decadesMap[decade].sum += rating;
      decadesMap[decade].count += 1;
    }
  });

  const sortedDecades = Object.entries(decadesMap)
    .map(([decade, data]) => ({
      decade,
      avg: (data.sum / data.count).toFixed(2),
      count: data.count
    }))
    .sort((a, b) => a.decade.localeCompare(b.decade));

  // Find oldest movie
  const years = movies.map(m => parseInt(m.Year)).filter(y => !isNaN(y));
  const oldestYear = years.length > 0 ? Math.min(...years) : 'N/A';

  // Find most popular genre
  const topGenre = sortedGenres.length > 0 ? sortedGenres[0][0] : 'N/A';

  // Speak stats helper
  const handleSpeakStats = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'pt' ? 'pt-BR' : 'en-US';
    utterance.rate = voiceSpeed;
    window.speechSynthesis.speak(utterance);
  };

  const speakOverview = () => {
    const overviewText = t.statsSpeech
      .replace('{total}', totalCount.toString())
      .replace('{avg}', avgRating);
    handleSpeakStats(overviewText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className={`relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl flex flex-col p-6 md:p-8 ${dashboardThemeClasses}`}>
        {/* Header toolbar */}
        <div className={`flex items-center justify-between border-b pb-4 mb-6 ${borderThemeClasses}`}>
          <div>
            <h2 className="text-2xl font-black flex items-center gap-2">
              <BarChart3 className={`w-7 h-7 ${accentTextClasses}`} />
              {t.title}
            </h2>
            <p className={`text-sm mt-1 ${textMutedClasses}`}>{t.desc}</p>
          </div>

          <button
            onClick={onClose}
            aria-label={t.close}
            className={`p-2 hover:bg-white/5 rounded-full focus:outline-none focus:ring-4 transition-colors ${focusRingClasses} ${textMutedClasses}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Accessibility Announcement Banner */}
        <div 
          onClick={speakOverview}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && speakOverview()}
          className={`mb-6 p-3 border text-xs font-bold rounded-lg flex items-center gap-2 cursor-pointer transition-all focus:outline-none focus:ring-2 ${focusRingClasses} ${alertClasses}`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>{t.accessibleHint}</span>
        </div>

        {/* Top KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-xl flex items-center gap-4 ${cardThemeClasses}`}>
            <div className={`p-3 rounded-lg ${badgeBgClasses}`}>
              <Film className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-xs font-bold uppercase ${textMutedClasses}`}>{t.totalMovies}</span>
              <p className="text-2xl font-black mt-0.5">{totalCount}</p>
            </div>
          </div>

          <div className={`p-4 rounded-xl flex items-center gap-4 ${cardThemeClasses}`}>
            <div className={`p-3 rounded-lg ${badgeBgClasses}`}>
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-xs font-bold uppercase ${textMutedClasses}`}>{t.avgRating}</span>
              <p className="text-2xl font-black mt-0.5">{avgRating} / 10</p>
            </div>
          </div>

          <div className={`p-4 rounded-xl flex items-center gap-4 ${cardThemeClasses}`}>
            <div className={`p-3 rounded-lg ${badgeBgClasses}`}>
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-xs font-bold uppercase ${textMutedClasses}`}>{t.mostCommonGenre}</span>
              <p className="text-xl font-black mt-0.5 truncate max-w-[150px]">{topGenre}</p>
            </div>
          </div>

          <div className={`p-4 rounded-xl flex items-center gap-4 ${cardThemeClasses}`}>
            <div className={`p-3 rounded-lg ${badgeBgClasses}`}>
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-xs font-bold uppercase ${textMutedClasses}`}>{t.oldestMovie}</span>
              <p className="text-2xl font-black mt-0.5">{oldestYear}</p>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Genres distribution */}
          <div className={`p-6 rounded-xl flex flex-col ${theme === 'default' ? 'bg-[#0D0D0D] border border-white/5' : 'bg-slate-855/20 border border-slate-800'}`}>
            <h3 className="text-md font-bold mb-6 flex items-center gap-2">
              <Film className={`w-5 h-5 ${accentTextClasses}`} />
              {t.chartGenreTitle}
            </h3>

            {/* Custom SVG Bar Chart */}
            <div className="relative flex-1 min-h-[250px] flex items-end justify-between gap-2 pt-6">
              {sortedGenres.map(([genre, count]) => {
                const maxCount = Math.max(...sortedGenres.map(x => x[1]));
                const pct = (count / maxCount) * 100;
                
                const label = genre;
                const speakText = t.genreSpeech.replace('{genre}', genre).replace('{count}', count.toString());

                return (
                  <div key={genre} className="flex-1 flex flex-col items-center group relative">
                    {/* Tooltip bar */}
                    <div className={`absolute -top-8 px-2 py-1 text-xs font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${tooltipBgClasses}`}>
                      {count}
                    </div>

                    {/* Bar */}
                    <button
                      onClick={() => handleSpeakStats(speakText)}
                      onFocus={() => {
                        setActiveBar(genre);
                        handleSpeakStats(speakText);
                      }}
                      onBlur={() => setActiveBar(null)}
                      aria-label={t.barAria.replace('{label}', label).replace('{value}', count.toString())}
                      className={`w-full rounded-t-md transition-all duration-300 relative focus:outline-none focus:ring-2 focus:border-transparent ${focusRingClasses} ${
                        theme === 'default'
                          ? 'bg-white/5 border border-white/10 hover:border-[#3B82F6]'
                          : 'bg-slate-800 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400'
                      }`}
                      style={{ height: `${pct * 1.8}px` }}
                    >
                      <div className={`absolute inset-x-0 bottom-0 h-full rounded-t-[5px] ${
                        theme === 'default'
                          ? 'bg-gradient-to-t from-[#3B82F6]/20 to-[#3B82F6]/40 group-hover:from-[#3B82F6]/40 group-hover:to-[#3B82F6]/60'
                          : 'bg-gradient-to-t from-amber-500/20 to-amber-500/40 group-hover:from-amber-400/40 group-hover:to-amber-400/60'
                      }`}></div>
                    </button>

                    {/* X Axis Label */}
                    <span 
                      aria-hidden="true"
                      className={`text-[10px] font-extrabold uppercase mt-3 truncate max-w-full text-center ${textMutedClasses}`}
                    >
                      {genre}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 2: Decades score */}
          <div className={`p-6 rounded-xl flex flex-col ${theme === 'default' ? 'bg-[#0D0D0D] border border-white/5' : 'bg-slate-855/20 border border-slate-800'}`}>
            <h3 className="text-md font-bold mb-6 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 ${accentTextClasses}`} />
              {t.chartDecadeTitle}
            </h3>

            {/* Custom SVG Bar Chart for Decades */}
            <div className="relative flex-1 min-h-[250px] flex items-end justify-between gap-2 pt-6">
              {sortedDecades.map(({ decade, avg, count }) => {
                const maxVal = 10; // Max IMDb score is 10
                const pct = (parseFloat(avg) / maxVal) * 100;
                
                const label = decade;
                const speakText = t.decadeSpeech.replace('{decade}', decade).replace('{rating}', avg);

                return (
                  <div key={decade} className="flex-1 flex flex-col items-center group relative">
                    {/* Tooltip bar */}
                    <div className={`absolute -top-8 px-2 py-1 text-xs font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ${tooltipBgClasses}`}>
                      {avg} IMDb ({count})
                    </div>

                    {/* Bar */}
                    <button
                      onClick={() => handleSpeakStats(speakText)}
                      onFocus={() => {
                        setActiveBar(decade);
                        handleSpeakStats(speakText);
                      }}
                      onBlur={() => setActiveBar(null)}
                      aria-label={t.barAria.replace('{label}', label).replace('{value}', `${avg} IMDb`)}
                      className={`w-full rounded-t-md transition-all duration-300 relative focus:outline-none focus:ring-2 focus:border-transparent ${focusRingClasses} ${
                        theme === 'default'
                          ? 'bg-white/5 border border-white/10 hover:border-[#3B82F6]'
                          : 'bg-slate-800 hover:bg-amber-500/20 border border-slate-700 hover:border-amber-400'
                      }`}
                      style={{ height: `${pct * 1.8}px` }}
                    >
                      <div className={`absolute inset-x-0 bottom-0 h-full rounded-t-[5px] ${
                        theme === 'default'
                          ? 'bg-gradient-to-t from-[#3B82F6]/25 to-[#3B82F6]/50 group-hover:from-[#3B82F6]/45 group-hover:to-[#3B82F6]/75'
                          : 'bg-gradient-to-t from-emerald-500/20 to-emerald-500/40 group-hover:from-emerald-400/40 group-hover:to-emerald-400/60'
                      }`}></div>
                    </button>

                    {/* X Axis Label */}
                    <span 
                      aria-hidden="true"
                      className={`text-[10px] font-extrabold uppercase mt-3 truncate max-w-full text-center ${textMutedClasses}`}
                    >
                      {decade}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
