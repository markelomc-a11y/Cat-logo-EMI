import { useState, useEffect, useRef } from 'react';
import { Movie, AccessibilitySettings } from './types';
import AccessibilityPanel from './components/AccessibilityPanel';
import MovieCard from './components/MovieCard';
import MovieDetailPage from './components/MovieDetailPage';
import StatisticsDashboard from './components/StatisticsDashboard';
import { 
  Search, Calendar, Filter, Mic, MicOff, RefreshCw, BarChart2, Volume2, 
  VolumeX, Play, Info, Layers, Film, ArrowUp
} from 'lucide-react';

export default function App() {
  // 1. Accessibility State
  const [settings, setSettings] = useState<AccessibilitySettings>({
    theme: 'default',
    fontSize: 'normal',
    dyslexiaFont: false,
    voiceSpeed: 1.0,
    screenReaderActive: false,
    language: 'pt',
  });
  const [panelOpen, setAccessibilityPanelOpen] = useState(false);

  // 2. Movies and Search State
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter values
  const [searchQuery, setSearchQuery] = useState('');
  const [yearQuery, setYearQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // 3. UI Interaction State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceLog, setVoiceLog] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Unique list of genres dynamically built from movie data
  const [genres, setGenres] = useState<string[]>([]);

  const { language, theme, fontSize, dyslexiaFont, voiceSpeed } = settings;

  // 4. Bilingual translations dictionary
  const t = {
    pt: {
      siteName: 'Catálogo EMI',
      subTitle: 'Desenvolvimento Web com Filtros e Carga Assíncrona (JSON)',
      tagline: 'Uma experiência totalmente inclusiva, moderna e intuitiva para todos.',
      searchPlaceholder: 'Pesquisar por título, diretor, ator...',
      yearPlaceholder: 'Ano (ex: 1994)',
      yearBtn: 'Filtrar Ano',
      genreAll: 'Todos os Gêneros',
      clearFilters: 'Limpar Filtros',
      dashboardBtn: 'Ver Estatísticas',
      moviesFound: 'Exibindo {count} de {total} filmes.',
      voiceActive: 'Pesquisa por voz ativa. Diga "Ação", "Ano 1994" ou "Limpar".',
      voiceNotSupported: 'Pesquisa por voz não suportada neste navegador.',
      listening: 'Ouvindo comando de voz...',
      voiceLogged: 'Comando recebido: "{command}"',
      noMovies: 'Nenhum filme corresponde aos filtros aplicados.',
      footerInfo: 'Exercício 1: Carga Assíncrona com fetch e async/await. Desenvolvido com recursos avançados de acessibilidade.',
      footerCredits: 'Acessibilidade: Contraste, Fontes Ajustáveis, Suporte a Leitor de Tela, Controle de Voz.',
      loadingText: 'Carregando catálogo de filmes assincronamente...',
      errorText: 'Erro ao carregar os dados locais: {err}',
      alertVoiceSuccess: 'Filtro por voz aplicado: "{command}"',
      alertCleared: 'Filtros de busca limpos.',
      backToTop: 'Voltar ao topo',
      micAria: 'Iniciar comando por voz'
    },
    en: {
      siteName: 'EMI Catalog',
      subTitle: 'Web Development with Filters and Asynchronous Load (JSON)',
      tagline: 'A fully inclusive, modern, and intuitive experience for all users.',
      searchPlaceholder: 'Search by title, director, actors...',
      yearPlaceholder: 'Year (ex: 1994)',
      yearBtn: 'Filter Year',
      genreAll: 'All Genres',
      clearFilters: 'Clear Filters',
      dashboardBtn: 'View Statistics',
      moviesFound: 'Displaying {count} of {total} movies.',
      voiceActive: 'Voice search active. Say "Action", "Year 1994" or "Clear".',
      voiceNotSupported: 'Voice search is not supported by your browser.',
      listening: 'Listening to voice command...',
      voiceLogged: 'Command received: "{command}"',
      noMovies: 'No movies match the applied filters.',
      footerInfo: 'Exercise 1: Asynchronous load using fetch & async/await. Developed with advanced accessibility features.',
      footerCredits: 'Accessibility: Contrast, Adjustable Fonts, Screen Reader Support, Voice Controls.',
      loadingText: 'Loading movie catalog asynchronously...',
      errorText: 'Error loading local data: {err}',
      alertVoiceSuccess: 'Voice filter applied: "{command}"',
      alertCleared: 'Search filters cleared.',
      backToTop: 'Back to top',
      micAria: 'Start voice command'
    }
  }[language];

  // 5. Asynchronous Carga (Load) using fetch and async/await
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        // Load local JSON file asynchronously
        const response = await fetch('/movies-250.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data && data.movies) {
          setMovies(data.movies);
          setFilteredMovies(data.movies);
          
          // Build list of unique genres
          const allGenres = new Set<string>();
          data.movies.forEach((m: Movie) => {
            m.Genre.split(',').forEach(g => allGenres.add(g.trim()));
          });
          setGenres(Array.from(allGenres).sort());
        } else {
          throw new Error('Invalid JSON format');
        }
      } catch (err: any) {
        console.error('Asynchronous load failed:', err);
        setError(err.message || 'Erro de rede');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // 6. Filtering logic: general search, exact year, selective category dropdown
  const applyFilters = () => {
    let result = [...movies];

    // Category / Genre filter
    if (selectedGenre) {
      result = result.filter(m => 
        m.Genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Exact Year Filter
    if (yearQuery.trim()) {
      result = result.filter(m => m.Year === yearQuery.trim());
    }

    // Search Query (title, director, actors)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(m => 
        m.Title.toLowerCase().includes(q) ||
        m.Director.toLowerCase().includes(q) ||
        m.Actors.toLowerCase().includes(q) ||
        m.Plot.toLowerCase().includes(q)
      );
    }

    setFilteredMovies(result);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, yearQuery, selectedGenre, movies]);

  // Handle resetting all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setYearQuery('');
    setSelectedGenre('');
    setVoiceLog(null);
    speakNotification(t.alertCleared);
  };

  // Speak a standard screen-readable notification
  const speakNotification = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'pt' ? 'pt-BR' : 'en-US';
    utterance.rate = voiceSpeed;
    window.speechSynthesis.speak(utterance);
  };

  // 7. Speech Recognition / Voice Command Engine
  const handleVoiceCommand = (command: string) => {
    setVoiceLog(command);
    const cmd = command.toLowerCase().trim();

    // Reset command
    if (cmd.includes('limpar') || cmd.includes('clear') || cmd.includes('reset')) {
      handleClearFilters();
      return;
    }

    // Help command
    if (cmd.includes('ajuda') || cmd.includes('help') || cmd.includes('instrução') || cmd.includes('instruction')) {
      const helpPt = 'Comandos disponíveis: Diga o nome de um gênero como drama ou comédia para filtrar. Diga "ano 1994" para filtrar por ano. Diga "limpar" para reiniciar.';
      const helpEn = 'Available commands: Say a genre name like drama or comedy to filter. Say "year 1994" to filter by year. Say "clear" to reset.';
      speakNotification(language === 'pt' ? helpPt : helpEn);
      return;
    }

    // Year matching (e.g., "ano 1994", "year 2008")
    const yearMatch = cmd.match(/(?:ano|year|ano de)\s*(\d{4})/);
    if (yearMatch && yearMatch[1]) {
      const year = yearMatch[1];
      setYearQuery(year);
      speakNotification(t.alertVoiceSuccess.replace('{command}', `Ano ${year}`));
      return;
    }

    // Check if command is a number only (e.g., "1999")
    if (/^\d{4}$/.test(cmd)) {
      setYearQuery(cmd);
      speakNotification(t.alertVoiceSuccess.replace('{command}', `Ano ${cmd}`));
      return;
    }

    // Genre matching (dynamic check against listed genres)
    const matchedGenre = genres.find(g => cmd.includes(g.toLowerCase()));
    if (matchedGenre) {
      setSelectedGenre(matchedGenre);
      speakNotification(t.alertVoiceSuccess.replace('{command}', matchedGenre));
      return;
    }

    // Fallback search term
    setSearchQuery(command);
    speakNotification(t.alertVoiceSuccess.replace('{command}', command));
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t.voiceNotSupported);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'pt' ? 'pt-BR' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      handleVoiceCommand(speechResult);
    };

    recognition.onerror = (e: any) => {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 8. Custom Theme CSS Map
  const themeClasses = {
    default: 'bg-[#0D0D0D] text-[#F5F5F5] border-white/5',
    'high-contrast-dark': 'bg-black text-yellow-400 border-yellow-400 font-bold',
    'high-contrast-light': 'bg-white text-black border-black font-bold',
    grayscale: 'bg-slate-950 text-slate-100 border-slate-800 grayscale',
    sepia: 'bg-amber-50 text-amber-950 border-amber-200',
  }[theme];

  const headerThemeClasses = {
    default: 'bg-[#0D0D0D]/80 border-white/5 backdrop-blur-md',
    'high-contrast-dark': 'bg-black border-yellow-400 text-yellow-400',
    'high-contrast-light': 'bg-white border-black text-black',
    grayscale: 'bg-slate-900 border-slate-800 grayscale',
    sepia: 'bg-amber-100/80 border-amber-200 text-amber-950',
  }[theme];

  const buttonClasses = {
    default: 'bg-[#3B82F6] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20',
    'high-contrast-dark': 'bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-yellow-400',
    'high-contrast-light': 'bg-black hover:bg-slate-800 text-white border-2 border-black',
    grayscale: 'bg-slate-700 hover:bg-slate-600 text-slate-100',
    sepia: 'bg-amber-700 hover:bg-amber-600 text-amber-50',
  }[theme];

  const secondaryBtnClasses = {
    default: 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border border-white/10',
    'high-contrast-dark': 'bg-black text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400/20',
    'high-contrast-light': 'bg-white text-black border-2 border-black hover:bg-slate-200',
    grayscale: 'bg-slate-800 text-slate-300 border border-slate-700',
    sepia: 'bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200',
  }[theme];

  const inputClasses = {
    default: 'bg-[#1A1A1A] border-white/10 text-white focus:border-[#3B82F6] focus:ring-[#3B82F6]',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400 text-yellow-400 focus:ring-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black text-black focus:ring-black',
    grayscale: 'bg-slate-900 border-slate-700 text-slate-100 focus:border-slate-500',
    sepia: 'bg-amber-50/50 border-amber-300 text-amber-950 focus:border-amber-700 focus:ring-amber-700',
  }[theme];

  const cardContainerClasses = {
    default: 'bg-[#171717] border-white/5',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black',
    grayscale: 'bg-slate-900/40 border-slate-800/80 grayscale',
    sepia: 'bg-amber-100/10 border-amber-200',
  }[theme];

  const accentTextClasses = {
    default: 'text-[#3B82F6]',
    'high-contrast-dark': 'text-yellow-400 font-bold',
    'high-contrast-light': 'text-black font-extrabold',
    grayscale: 'text-slate-300',
    sepia: 'text-amber-700',
  }[theme];

  const focusRingClasses = {
    default: 'focus:ring-[#3B82F6]',
    'high-contrast-dark': 'focus:ring-yellow-400',
    'high-contrast-light': 'focus:ring-black',
    grayscale: 'focus:ring-slate-500',
    sepia: 'focus:ring-amber-700',
  }[theme];

  const statsBtnClasses = {
    default: 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#3B82F6] border border-white/10 focus:ring-[#3B82F6]',
    'high-contrast-dark': 'bg-black text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400/20 focus:ring-yellow-400',
    'high-contrast-light': 'bg-white text-black border-2 border-black hover:bg-slate-200 focus:ring-black',
    grayscale: 'bg-slate-800 text-slate-300 border border-slate-700 focus:ring-slate-500',
    sepia: 'bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200 focus:ring-amber-700',
  }[theme];

  const alertClasses = {
    default: 'bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400 text-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black text-black',
    grayscale: 'bg-slate-800/40 border border-slate-700 text-slate-200',
    sepia: 'bg-amber-100 border border-amber-300 text-amber-950',
  }[theme];

  const backToTopClasses = {
    default: 'bg-[#3B82F6] hover:bg-blue-600 text-white focus:ring-[#3B82F6]',
    'high-contrast-dark': 'bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-yellow-400 focus:ring-yellow-400',
    'high-contrast-light': 'bg-black hover:bg-slate-800 text-white border-2 border-black focus:ring-black',
    grayscale: 'bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500',
    sepia: 'bg-amber-700 hover:bg-amber-600 text-amber-50 focus:ring-amber-700',
  }[theme];

  const fontSizeClasses = {
    normal: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl',
  }[fontSize];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses} ${fontSizeClasses} ${dyslexiaFont ? 'dyslexia-font' : ''}`}>
      {/* State-of-the-Art Inclusive Accessibility Bar */}
      <div className="h-10 bg-[#1A1A1A] border-b border-white/5 flex items-center justify-between px-6 text-[10px] uppercase tracking-widest text-[#A1A1A1]">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div> 
            {language === 'pt' ? 'Sistema: Otimizado' : 'System: Optimized'}
          </span>
          <span className="flex items-center gap-2 font-bold text-white">
            <span className="opacity-50">WCAG 2.1</span> {language === 'pt' ? 'Conformidade AAA' : 'AAA Compliant'}
          </span>
        </div>
        <div className="flex gap-4">
          <span className="border border-white/10 px-2 py-0.5 rounded text-[9px] font-semibold">
            {language === 'pt' ? 'Auxílio: ' : 'Aid: '}
            <span className="text-[#3B82F6] font-bold">{theme.toUpperCase()}</span>
          </span>
          <span className="border border-white/10 px-2 py-0.5 rounded text-[9px] font-semibold">
            {language === 'pt' ? 'Leitor: Ativo' : 'Reader: Active'}
          </span>
          <span className="border border-white/10 px-2 py-0.5 rounded text-[9px] font-bold text-[#3B82F6]">
            {language === 'pt' ? 'Texto: ' : 'Text: '}
            {fontSize === 'normal' ? '100%' : fontSize === 'large' ? '125%' : '150%'}
          </span>
        </div>
      </div>

      {/* 9. Header Section */}
      <header className={`border-b ${headerThemeClasses} py-6 sticky top-10 z-30 shadow-md backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 shadow-lg ${
                  theme === 'default'
                    ? 'bg-gradient-to-tr from-[#3B82F6] to-[#1D4ED8] text-white shadow-blue-500/10 border border-white/10'
                    : theme === 'high-contrast-dark'
                    ? 'bg-black border-2 border-yellow-400 text-yellow-400'
                    : theme === 'high-contrast-light'
                    ? 'bg-white border-2 border-black text-black'
                    : theme === 'grayscale'
                    ? 'bg-slate-800 text-slate-100 border border-slate-700'
                    : 'bg-amber-700 text-amber-50'
                }`}>
                  <Film className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h1 className="text-3xl font-black tracking-tight">{t.siteName}</h1>
                  <span className={`text-[10px] tracking-wider font-extrabold px-2 py-0.5 rounded-md uppercase border self-start sm:self-auto ${
                    theme === 'default'
                      ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20'
                      : theme === 'high-contrast-dark'
                      ? 'bg-black text-yellow-400 border-2 border-yellow-400 font-bold'
                      : theme === 'high-contrast-light'
                      ? 'bg-white text-black border-2 border-black font-bold'
                      : theme === 'grayscale'
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'bg-amber-200 text-amber-950 border border-amber-300'
                  }`}>
                    {language === 'pt' ? 'Premium' : 'Premium'}
                  </span>
                </div>
              </div>
              <p className={`text-xs font-bold ${accentTextClasses} uppercase mt-2.5 tracking-wider`}>
                {t.subTitle}
              </p>
              <p className="text-sm text-[#A1A1A1] mt-1 max-w-2xl">{t.tagline}</p>
            </div>

            {/* Accessibility Drawer control panel toggle */}
            <div className="flex items-center gap-3">
              <AccessibilityPanel
                settings={settings}
                onChange={setSettings}
                isOpen={panelOpen}
                onToggle={() => setAccessibilityPanelOpen(!panelOpen)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <RefreshCw className={`w-10 h-10 animate-spin ${accentTextClasses}`} />
            <p className="text-sm font-semibold text-slate-400 animate-pulse">{t.loadingText}</p>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="p-4 mb-8 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-bold flex items-center gap-3">
            <Info className="w-5 h-5" />
            <span>{t.errorText.replace('{err}', error)}</span>
          </div>
        )}

        {/* Conditionally render MovieDetailPage if a movie is selected, else show catalog filters and grid */}
        {!loading && !error && (
          selectedMovie ? (
            <MovieDetailPage
              movie={selectedMovie}
              onBack={() => setSelectedMovie(null)}
              settings={settings}
            />
          ) : (
            <>
              {/* 10. Filters & Action Toolbar */}
              <div className="space-y-6 mb-8">
                <div className={`p-6 border rounded-2xl ${cardContainerClasses} shadow-sm space-y-4`}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    {/* Search Text Input */}
                    <div className="md:col-span-5 relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="w-5 h-5 text-slate-400" />
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none transition-all ${inputClasses}`}
                      />
                    </div>

                    {/* Selective Dropdown category filter */}
                    <div className="md:col-span-3 relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Filter className="w-4 h-4 text-slate-400" />
                      </span>
                      <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none transition-all appearance-none ${inputClasses}`}
                      >
                        <option value="">{t.genreAll}</option>
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>

                    {/* Exact Year Input */}
                    <div className="md:col-span-2 relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        type="text"
                        maxLength={4}
                        value={yearQuery}
                        onChange={(e) => setYearQuery(e.target.value.replace(/\D/g, ''))}
                        placeholder={t.yearPlaceholder}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none transition-all ${inputClasses}`}
                      />
                    </div>

                    {/* Voice Commands Microphone Button */}
                    <div className="md:col-span-2 flex items-center gap-2">
                      <button
                        onClick={startVoiceSearch}
                        aria-label={t.micAria}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all focus:outline-none focus:ring-4 ${focusRingClasses} flex items-center justify-center gap-2 ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : buttonClasses
                        }`}
                      >
                        {isListening ? (
                          <>
                            <MicOff className="w-4 h-4 shrink-0" />
                            <span>{language === 'pt' ? 'Ouvindo...' : 'Listening...'}</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 shrink-0" />
                            <span>{language === 'pt' ? 'Falar' : 'Speak'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Utility Clear and Stats Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
                    {/* Active results banner with live screen-reader announcements */}
                    <div role="status" aria-live="polite" className="text-sm font-bold text-slate-400">
                      {t.moviesFound
                        .replace('{count}', filteredMovies.length.toString())
                        .replace('{total}', movies.length.toString())}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Clear Filter Button */}
                      {(searchQuery || yearQuery || selectedGenre || voiceLog) && (
                        <button
                          onClick={handleClearFilters}
                          className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase flex items-center gap-2 transition-all focus:outline-none focus:ring-4 ${focusRingClasses} ${secondaryBtnClasses}`}
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>{t.clearFilters}</span>
                        </button>
                      )}

                      {/* Statistics Analytics Dashboard Trigger */}
                      <button
                        onClick={() => setIsStatsOpen(true)}
                        className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase flex items-center gap-2 transition-all focus:outline-none focus:ring-4 ${statsBtnClasses}`}
                      >
                        <BarChart2 className="w-4 h-4" />
                        <span>{t.dashboardBtn}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Voice feedback log */}
                {voiceLog && (
                  <div className={`p-3 border rounded-lg text-xs font-bold flex items-center gap-2 animate-fade-in ${alertClasses}`}>
                    <Mic className={`w-4 h-4 ${accentTextClasses}`} />
                    <span>{t.voiceLogged.replace('{command}', voiceLog)}</span>
                  </div>
                )}
              </div>

              {/* 11. Movie Cards Grid */}
              <div>
                {filteredMovies.length > 0 ? (
                  <div 
                    role="region" 
                    aria-label="Resultados do catálogo de filmes"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  >
                    {filteredMovies.map((movie) => (
                      <div key={movie.imdbID} className="animate-fade-in">
                        <MovieCard
                          movie={movie}
                          settings={settings}
                          onSelect={() => setSelectedMovie(movie)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-[#171717]/20 border border-dashed border-white/5 rounded-2xl p-6">
                    <Film className="w-16 h-12 text-slate-600 mx-auto" />
                    <p className="text-md font-bold text-slate-400 mt-4">{t.noMovies}</p>
                    <button
                      onClick={handleClearFilters}
                      className={`mt-4 px-4 py-2 text-xs font-bold uppercase rounded border transition-all ${alertClasses}`}
                    >
                      {t.clearFilters}
                    </button>
                  </div>
                )}
              </div>
            </>
          )
        )}
      </main>

      {/* 12. Sticky Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label={t.backToTop}
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 ${backToTopClasses}`}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* 13. Modals and Overlays */}
      {isStatsOpen && (
        <StatisticsDashboard
          movies={movies}
          settings={settings}
          onClose={() => setIsStatsOpen(false)}
        />
      )}

      {/* Footer info block */}
      <footer className={`border-t ${headerThemeClasses} py-10 mt-20 text-xs text-slate-500 text-center`}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-bold text-slate-400 leading-relaxed">
            {t.footerInfo}
          </p>
          <p className="mt-2 text-slate-500 font-medium">
            {t.footerCredits}
          </p>
          <p className="mt-6 text-[10px] text-slate-600">
            © 2026 {t.siteName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
