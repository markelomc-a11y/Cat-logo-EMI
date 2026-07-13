import { AccessibilitySettings, ThemeMode, FontSizeMode } from '../types';
import { Settings, Eye, Type, Volume2, HelpCircle, Check, Info } from 'lucide-react';

interface AccessibilityPanelProps {
  settings: AccessibilitySettings;
  onChange: (settings: AccessibilitySettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccessibilityPanel({ settings, onChange, isOpen, onToggle }: AccessibilityPanelProps) {
  const { theme, fontSize, dyslexiaFont, voiceSpeed, language } = settings;

  const btnClasses = {
    default: 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#3B82F6] border-white/5',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400 text-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black text-black',
    grayscale: 'bg-slate-800 text-slate-100 border border-slate-700',
    sepia: 'bg-amber-100 text-amber-950 border border-amber-200',
  }[theme];

  const toggleBtnClasses = {
    default: 'bg-[#3B82F6] text-white',
    'high-contrast-dark': 'bg-yellow-400 text-black',
    'high-contrast-light': 'bg-black text-white',
    grayscale: 'bg-slate-700 text-white',
    sepia: 'bg-amber-700 text-white',
  }[theme];

  const panelThemeClasses = {
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

  const containerBgClasses = {
    default: 'bg-[#0D0D0D] border border-white/5',
    'high-contrast-dark': 'bg-black border-2 border-yellow-400',
    'high-contrast-light': 'bg-white border-2 border-black',
    grayscale: 'bg-slate-800 border border-slate-700',
    sepia: 'bg-amber-50 border border-amber-200',
  }[theme];

  const sliderClasses = {
    default: 'accent-[#3B82F6]',
    'high-contrast-dark': 'accent-yellow-400',
    'high-contrast-light': 'accent-black',
    grayscale: 'accent-slate-400',
    sepia: 'accent-amber-700',
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
      title: 'Painel de Acessibilidade',
      desc: 'Personalize sua experiência visual e auditiva.',
      themeLabel: 'Tema de Contraste',
      themes: {
        default: 'Padrão Escuro',
        'high-contrast-dark': 'Alto Contraste Escuro (Amarelo/Preto)',
        'high-contrast-light': 'Alto Contraste Claro (Preto/Branco)',
        grayscale: 'Monocromático (Daltonismo)',
        sepia: 'Sépia (Conforto Visual)'
      },
      fontSizeLabel: 'Tamanho do Texto',
      fontSizes: {
        normal: 'Normal (16px)',
        large: 'Grande (20px)',
        'extra-large': 'Extra Grande (24px)'
      },
      dyslexiaLabel: 'Espaçamento Legível (Dislexia)',
      dyslexiaDesc: 'Aumenta o espaçamento entre letras, palavras e linhas para facilitar a leitura.',
      speechLabel: 'Configurações de Áudio / Voz',
      speedLabel: 'Velocidade da Narração:',
      speedSlow: 'Lenta',
      speedNormal: 'Normal',
      speedFast: 'Rápida',
      commandsTitle: 'Controle por Voz Ativo (Microfone)',
      commandsDesc: 'Clique no ícone de microfone e diga comandos como:',
      commandsList: [
        '"Drama" ou "Ação" — filtra por gênero',
        '"Ano 1994" — filtra por ano específico',
        '"Limpar" — remove todos os filtros',
        '"Ajudar" ou "Help" — fala as instruções'
      ],
      skipBtn: 'Pular para o conteúdo principal',
      statusTheme: 'Tema alterado para',
      statusFont: 'Tamanho da fonte alterado para'
    },
    en: {
      title: 'Accessibility Panel',
      desc: 'Customize your visual and auditory experience.',
      themeLabel: 'Contrast Theme',
      themes: {
        default: 'Standard Dark',
        'high-contrast-dark': 'High Contrast Dark (Yellow/Black)',
        'high-contrast-light': 'High Contrast Light (Black/White)',
        grayscale: 'Monochrome (Colorblind Friendly)',
        sepia: 'Sepia (Eye Comfort)'
      },
      fontSizeLabel: 'Text Size',
      fontSizes: {
        normal: 'Normal (16px)',
        large: 'Large (20px)',
        'extra-large': 'Extra Large (24px)'
      },
      dyslexiaLabel: 'Dyslexia-friendly Spacing',
      dyslexiaDesc: 'Increases spacing between letters, words, and lines to assist reading.',
      speechLabel: 'Voice & Speech Settings',
      speedLabel: 'Narration Speed:',
      speedSlow: 'Slow',
      speedNormal: 'Normal',
      speedFast: 'Fast',
      commandsTitle: 'Active Voice Control (Microphone)',
      commandsDesc: 'Click the microphone icon and speak commands such as:',
      commandsList: [
        '"Drama" or "Action" — filters by genre',
        '"Year 1994" — filters by specific year',
        '"Clear" — clears all active filters',
        '"Help" — reads out instructions'
      ],
      skipBtn: 'Skip to main content',
      statusTheme: 'Theme changed to',
      statusFont: 'Font size changed to'
    }
  }[language];

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    const updated = { ...settings, [key]: value };
    onChange(updated);

    // Announce to screen reader
    const speechText = key === 'theme' 
      ? `${t.statusTheme} ${t.themes[value as ThemeMode]}` 
      : key === 'fontSize' 
      ? `${t.statusFont} ${t.fontSizes[value as FontSizeMode]}` 
      : '';
    
    if (speechText && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = language === 'pt' ? 'pt-BR' : 'en-US';
      utterance.rate = voiceSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSkipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
    }
  };

  return (
    <div className="w-full">
      {/* Skip to content link */}
      <button
        onClick={handleSkipToContent}
        className={`sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:font-bold focus:rounded-md focus:outline-none focus:ring-4 ${toggleBtnClasses}`}
      >
        {t.skipBtn}
      </button>

      {/* Toggle Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls="accessibility-drawer"
          id="accessibility-toggle-btn"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border focus:outline-none focus:ring-4 font-medium transition-all ${btnClasses} ${focusRingClasses}`}
        >
          <Settings className={`w-5 h-5 animate-spin-slow ${theme === 'default' ? 'text-[#3B82F6]' : 'text-amber-400'}`} />
          <span>{t.title}</span>
          <span className="sr-only">({isOpen ? 'Expandido' : 'Recolhido'})</span>
        </button>
      </div>

      {/* Drawer Panel */}
      {isOpen && (
        <div
          id="accessibility-drawer"
          aria-labelledby="accessibility-toggle-btn"
          className={`p-6 rounded-2xl shadow-2xl mb-6 transition-all duration-300 ${panelThemeClasses}`}
        >
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 mb-6 ${borderThemeClasses}`}>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Settings className={`w-6 h-6 ${accentTextClasses}`} />
                {t.title}
              </h2>
              <p className={`text-sm mt-1 ${textMutedClasses}`}>{t.desc}</p>
            </div>
            
            {/* Language Selection */}
            <div className={`flex items-center gap-2 p-1.5 rounded-lg border ${containerBgClasses}`}>
              <button
                onClick={() => updateSetting('language', 'pt')}
                aria-pressed={language === 'pt'}
                className={`px-3 py-1 text-sm font-semibold rounded focus:outline-none focus:ring-2 ${focusRingClasses} ${
                  language === 'pt'
                    ? toggleBtnClasses
                    : `hover:bg-white/5 ${textMutedClasses}`
                } transition-all`}
              >
                Português
              </button>
              <button
                onClick={() => updateSetting('language', 'en')}
                aria-pressed={language === 'en'}
                className={`px-3 py-1 text-sm font-semibold rounded focus:outline-none focus:ring-2 ${focusRingClasses} ${
                  language === 'en'
                    ? toggleBtnClasses
                    : `hover:bg-white/5 ${textMutedClasses}`
                } transition-all`}
              >
                English
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Visual Theme and Font Size */}
            <div className="space-y-6">
              {/* Theme Settings */}
              <div>
                <h3 className="text-md font-bold mb-3 flex items-center gap-2">
                  <Eye className={`w-5 h-5 ${accentTextClasses}`} />
                  {t.themeLabel}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(t.themes) as ThemeMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateSetting('theme', mode)}
                      aria-pressed={theme === mode}
                      className={`flex items-center justify-between w-full p-3 rounded-lg text-left border text-sm font-medium focus:outline-none focus:ring-2 ${focusRingClasses} transition-all ${
                        theme === mode
                          ? theme === 'default'
                            ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]'
                            : 'bg-yellow-400/10 text-yellow-400 border-yellow-400'
                          : `hover:bg-white/5 border-transparent ${containerBgClasses}`
                      }`}
                    >
                      <span>{t.themes[mode]}</span>
                      {theme === mode && <Check className={`w-4 h-4 ${accentTextClasses}`} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Settings */}
              <div>
                <h3 className="text-md font-bold mb-3 flex items-center gap-2">
                  <Type className={`w-5 h-5 ${accentTextClasses}`} />
                  {t.fontSizeLabel}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(t.fontSizes) as FontSizeMode[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateSetting('fontSize', size)}
                      aria-pressed={fontSize === size}
                      className={`p-3 rounded-lg text-center border text-sm font-bold focus:outline-none focus:ring-2 ${focusRingClasses} transition-all ${
                        fontSize === size
                          ? toggleBtnClasses
                          : `hover:bg-white/5 border-transparent ${containerBgClasses}`
                      }`}
                    >
                      <span className={
                        size === 'normal' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-lg'
                      }>A</span>
                      <span className="sr-only"> - {t.fontSizes[size]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Dyslexia Mode and Voice commands */}
            <div className="space-y-6">
              {/* Dyslexia Toggle */}
              <div className={`p-4 rounded-xl ${containerBgClasses}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="dyslexia-toggle" className="text-md font-bold flex items-center gap-2">
                      <Type className={`w-5 h-5 ${accentTextClasses}`} />
                      {t.dyslexiaLabel}
                    </label>
                    <p className={`text-xs mt-1 ${textMutedClasses}`}>{t.dyslexiaDesc}</p>
                  </div>
                  <div className="relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer">
                    <input
                      type="checkbox"
                      id="dyslexia-toggle"
                      checked={dyslexiaFont}
                      onChange={(e) => updateSetting('dyslexiaFont', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === 'default'
                        ? 'bg-white/5 peer-checked:bg-[#3B82F6]'
                        : 'bg-slate-700 peer-checked:bg-yellow-400'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Voice Speed adjustment */}
              <div>
                <h3 className="text-md font-bold mb-3 flex items-center gap-2">
                  <Volume2 className={`w-5 h-5 ${accentTextClasses}`} />
                  {t.speechLabel}
                </h3>
                <div className={`p-4 rounded-xl ${containerBgClasses}`}>
                  <label htmlFor="voice-speed-range" className="text-sm font-semibold flex justify-between">
                    <span>{t.speedLabel}</span>
                    <span className={`font-bold ${accentTextClasses}`}>{voiceSpeed}x</span>
                  </label>
                  <input
                    type="range"
                    id="voice-speed-range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={voiceSpeed}
                    onChange={(e) => updateSetting('voiceSpeed', parseFloat(e.target.value))}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer mt-3 ${sliderClasses}`}
                  />
                  <div className={`flex justify-between text-xs mt-1.5 ${textMutedClasses}`}>
                    <span>{t.speedSlow} (0.5x)</span>
                    <span>{t.speedNormal} (1.0x)</span>
                    <span>{t.speedFast} (2.0x)</span>
                  </div>
                </div>
              </div>

              {/* Voice recognition tips */}
              <div className={`p-4 rounded-xl ${alertClasses}`}>
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  {t.commandsTitle}
                </h4>
                <p className="text-xs mt-1">{t.commandsDesc}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                  {t.commandsList.map((cmd, i) => (
                    <li key={i}>{cmd}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
