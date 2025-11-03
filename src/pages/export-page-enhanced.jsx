import React, { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  User,
  FolderOpen,
  Music,
  Volume2,
  Play,
  Download,
  Folder,
  CheckCircle,
  RefreshCw,
  Info,
  Scissors,
  RotateCw,
  Settings2
} from 'lucide-react';

// Design Tokens - Light Glassmorphic (matching existing system)
const theme = {
  // Backgrounds
  bgGradient: 'linear-gradient(135deg, #FDE8F4 0%, #E0E7FF 25%, #DBEAFE 50%, #E0F2FE 75%, #F0FDFA 100%)',
  
  // Glass surfaces
  glassLight: 'rgba(255, 255, 255, 0.4)',
  glassMedium: 'rgba(255, 255, 255, 0.5)',
  glassStrong: 'rgba(255, 255, 255, 0.6)',
  glassBlur: 'blur(20px)',
  
  // Colors
  accentGradient: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
  accentPurple: '#A78BFA',
  accentPurpleLight: '#C4B5FD',
  textPrimary: '#4C1D95',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  goldAccent: '#F59E0B',
  successText: '#15803D',
  successBg: 'rgba(34, 197, 94, 0.1)',
  
  // Borders
  borderSubtle: 'rgba(156, 163, 175, 0.15)',
  borderPurple: 'rgba(167, 139, 250, 0.4)',
  borderStrong: 'rgba(156, 163, 175, 0.25)',
  
  // Shadows
  shadowPurple: '0 4px 16px rgba(167, 139, 250, 0.25)',
  shadowLight: '0 2px 8px rgba(167, 139, 250, 0.08)',
  shadowMedium: '0 4px 12px rgba(0, 0, 0, 0.05)',
  
  // Radii
  radiusSmall: '10px',
  radiusMedium: '14px',
  radiusLarge: '20px',
  
  // Font sizes
  fontXs: '11px',
  fontSm: '13px',
  fontBase: '14px',
  fontLg: '16px',
  fontXl: '20px',
};

export default function ExportPageEnhanced() {
  const [selectedFramerate, setSelectedFramerate] = useState('30');
  const [selectedResolution, setSelectedResolution] = useState('4k');
  const [hasMusic, setHasMusic] = useState(false);
  const [musicFile, setMusicFile] = useState('');
  const [autoSync, setAutoSync] = useState(true);
  const [trimToMatch, setTrimToMatch] = useState(true);
  const [fadeInOut, setFadeInOut] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [saveLocation, setSaveLocation] = useState('C:\\Users\\Videos\\Timelapses');
  const [waveformPosition, setWaveformPosition] = useState(2); // seconds
  
  // Simulate export process
  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handlePreview = () => {
    setIsPreviewing(true);
    setTimeout(() => setIsPreviewing(false), 3000);
  };

  const handleAddMusic = () => {
    // Simulate file selection
    setHasMusic(true);
    setMusicFile('sunset-vibes.mp3');
  };

  const handleRemoveMusic = () => {
    setHasMusic(false);
    setMusicFile('');
  };

  const handlePlayVideo = () => {
    console.log('Playing video...');
  };

  const handleOpenFolder = () => {
    console.log('Opening folder...');
  };

  const handleExportAnother = () => {
    setExportComplete(false);
    setExportProgress(0);
  };

  const framerates = [
    { id: '24', label: 'Smooth', value: '24 fps', icon: '🐢', desc: 'Cinematic feel' },
    { id: '30', label: 'Natural', value: '30 fps', icon: '🎬', desc: 'Recommended', recommended: true },
    { id: '60', label: 'Crisp', value: '60 fps', icon: '⚡', desc: 'Fluid motion' },
    { id: '120', label: 'Ultra', value: '120 fps', icon: '🚀', desc: 'Super smooth' },
    { id: 'custom', label: 'Custom', value: 'Custom...', icon: '⚙️', desc: 'Set your own' }
  ];

  const resolutions = [
    { id: '1080p', label: 'Full HD', value: '1080p', desc: '1920×1080' },
    { id: '4k', label: '4K UHD', value: '4K', desc: '3840×2160', recommended: true },
    { id: '8k', label: '8K', value: '8K', desc: '7680×4320' },
    { id: 'custom', label: 'Custom', value: 'Custom...', desc: 'Set size' }
  ];

  // Get file size estimate based on resolution and framerate
  const getFileSize = () => {
    const base = selectedResolution === '8k' ? 800 : selectedResolution === '4k' ? 240 : 120;
    const multiplier = selectedFramerate === '120' ? 2 : selectedFramerate === '60' ? 1.5 : 1;
    return Math.round(base * multiplier);
  };

  // Calculate time remaining
  const timeRemaining = isExporting 
    ? Math.ceil((100 - exportProgress) * 0.3) + 's remaining'
    : '';

  // Generate waveform data
  const generateWaveform = () => {
    const bars = [];
    for (let i = 0; i < 60; i++) {
      bars.push(Math.random() * 60 + 20);
    }
    return bars;
  };

  const waveformBars = generateWaveform();

  const styles = {
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      background: theme.bgGradient,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      color: theme.textPrimary,
    },
    
    backgroundGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.bgGradient,
      zIndex: 0,
    },

    // Top Navigation
    topNav: {
      position: 'relative',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderBottom: `1px solid ${theme.borderSubtle}`,
      zIndex: 10,
    },

    navLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      flex: '1',
    },

    navCenter: {
      display: 'flex',
      gap: '8px',
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusMedium,
      padding: '4px',
    },

    navRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: '1',
      justifyContent: 'flex-end',
    },

    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },

    logoIcon: {
      width: '40px',
      height: '40px',
      borderRadius: theme.radiusSmall,
      background: theme.accentGradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: theme.fontLg,
      boxShadow: theme.shadowPurple,
    },

    logoTextContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    logoText: {
      fontSize: theme.fontLg,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    logoSubtitle: {
      fontSize: theme.fontXs,
      color: theme.textMuted,
    },

    tab: {
      padding: '10px 20px',
      background: 'transparent',
      border: 'none',
      color: theme.textSecondary,
      fontSize: theme.fontBase,
      fontWeight: '500',
      cursor: 'pointer',
      borderRadius: theme.radiusSmall,
      transition: 'all 0.2s',
    },

    tabActive: {
      background: theme.glassStrong,
      color: theme.textPrimary,
      fontWeight: '600',
    },

    iconButton: {
      width: '36px',
      height: '36px',
      borderRadius: theme.radiusSmall,
      background: theme.glassLight,
      border: `1px solid ${theme.borderSubtle}`,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.textSecondary,
      transition: 'all 0.2s',
    },

    // Main Content Area - Better defined 3 columns
    mainContent: {
      position: 'relative',
      display: 'flex',
      gap: '20px',
      padding: '20px',
      height: 'calc(100vh - 72px)',
      zIndex: 1,
    },

    // Left Column - Well defined
    leftColumn: {
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      flexShrink: 0,
    },

    // Center Column - Well defined
    centerColumn: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minWidth: 0,
      maxWidth: '900px',
      margin: '0 auto',
    },

    // Right Column - Well defined
    rightColumn: {
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      flexShrink: 0,
    },

    // Cards
    card: {
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusMedium,
      padding: '20px',
      border: `1px solid ${theme.borderSubtle}`,
      boxShadow: theme.shadowLight,
    },

    cardTitle: {
      fontSize: theme.fontBase,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },

    // Preview Section
    previewCard: {
      width: '100%',
      aspectRatio: '16 / 9',
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusLarge,
      border: `1px solid ${theme.borderSubtle}`,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: theme.shadowMedium,
    },

    previewImage: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, #F59E0B 0%, #DC2626 50%, #7C3AED 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },

    previewOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    frameIndicator: {
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      fontSize: '48px',
      fontWeight: '300',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },

    // Waveform Section
    waveformContainer: {
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusMedium,
      padding: '16px',
      border: `1px solid ${theme.borderSubtle}`,
      position: 'relative',
    },

    waveformVisualizer: {
      height: '60px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '2px',
      marginBottom: '12px',
      position: 'relative',
    },

    waveformBar: {
      flex: 1,
      background: theme.accentGradient,
      borderRadius: '2px',
      transition: 'all 0.3s',
      minHeight: '4px',
    },

    waveformPlayhead: {
      position: 'absolute',
      left: `${waveformPosition * 10}%`,
      top: 0,
      bottom: 0,
      width: '2px',
      background: theme.goldAccent,
      boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)',
      cursor: 'ew-resize',
    },

    waveformTime: {
      position: 'absolute',
      left: `${waveformPosition * 10}%`,
      top: '-20px',
      transform: 'translateX(-50%)',
      fontSize: theme.fontXs,
      color: theme.goldAccent,
      fontWeight: '600',
    },

    // Music Toolbar
    musicToolbar: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px',
      background: theme.glassLight,
      borderRadius: theme.radiusSmall,
      border: `1px solid ${theme.borderSubtle}`,
    },

    musicButton: {
      padding: '8px 16px',
      background: theme.glassStrong,
      border: `1px solid ${theme.borderPurple}`,
      borderRadius: theme.radiusSmall,
      color: theme.accentPurple,
      fontSize: theme.fontSm,
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s',
    },

    musicToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: theme.fontSm,
      color: theme.textSecondary,
    },

    volumeSlider: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flex: 1,
    },

    slider: {
      flex: 1,
      height: '4px',
      background: theme.borderSubtle,
      borderRadius: '2px',
      position: 'relative',
      cursor: 'pointer',
    },

    sliderFill: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      background: theme.accentGradient,
      borderRadius: '2px',
      width: `${volume}%`,
    },

    sliderThumb: {
      position: 'absolute',
      left: `${volume}%`,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '12px',
      height: '12px',
      background: 'white',
      border: `2px solid ${theme.accentPurple}`,
      borderRadius: '50%',
      boxShadow: theme.shadowLight,
    },

    // Speed & Resolution Cards
    selectorSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    selectorLabel: {
      fontSize: theme.fontBase,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    selectorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '12px',
    },

    selectorCard: {
      padding: '16px',
      background: theme.glassLight,
      border: `2px solid ${theme.borderSubtle}`,
      borderRadius: theme.radiusMedium,
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'center',
      position: 'relative',
    },

    selectorCardActive: {
      border: `2px solid ${theme.accentPurple}`,
      background: theme.glassStrong,
      boxShadow: theme.shadowPurple,
    },

    selectorIcon: {
      fontSize: '24px',
      marginBottom: '4px',
    },

    selectorValue: {
      fontSize: theme.fontBase,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: '2px',
    },

    selectorDesc: {
      fontSize: theme.fontXs,
      color: theme.textMuted,
    },

    recommendedBadge: {
      position: 'absolute',
      top: '4px',
      right: '4px',
      padding: '2px 6px',
      background: theme.accentGradient,
      color: 'white',
      fontSize: '10px',
      fontWeight: '600',
      borderRadius: theme.radiusSmall,
    },

    // Action Buttons
    actionButtons: {
      display: 'flex',
      gap: '16px',
      marginTop: '8px',
    },

    primaryButton: {
      flex: 1,
      padding: '18px 32px',
      background: theme.accentGradient,
      border: 'none',
      borderRadius: theme.radiusMedium,
      color: 'white',
      fontSize: theme.fontLg,
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: theme.shadowPurple,
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },

    secondaryButton: {
      flex: 1,
      padding: '18px 32px',
      background: theme.glassStrong,
      border: `2px solid ${theme.borderPurple}`,
      borderRadius: theme.radiusMedium,
      color: theme.accentPurple,
      fontSize: theme.fontLg,
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },

    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    progressBar: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      background: theme.accentGradient,
      transition: 'width 0.3s',
      borderRadius: theme.radiusMedium,
    },

    progressText: {
      position: 'relative',
      zIndex: 1,
    },

    // Success Screen
    successContainer: {
      padding: '32px',
      background: theme.glassStrong,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusLarge,
      border: `2px solid ${theme.successBg}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
    },

    successIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: theme.successBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.successText,
    },

    successTitle: {
      fontSize: theme.fontXl,
      fontWeight: '600',
      color: theme.textPrimary,
      textAlign: 'center',
    },

    successActions: {
      display: 'flex',
      gap: '12px',
      width: '100%',
    },

    // Summary Items
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: `1px solid ${theme.borderSubtle}`,
    },

    summaryItemLast: {
      borderBottom: 'none',
    },

    summaryLabel: {
      fontSize: theme.fontSm,
      color: theme.textSecondary,
    },

    summaryValue: {
      fontSize: theme.fontSm,
      color: theme.textPrimary,
      fontWeight: '500',
    },

    // Music Controls in Left Panel
    musicControl: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 0',
    },

    checkbox: {
      width: '16px',
      height: '16px',
      accentColor: theme.accentPurple,
    },

    musicFileName: {
      padding: '8px',
      background: theme.glassLight,
      borderRadius: theme.radiusSmall,
      fontSize: theme.fontSm,
      color: theme.textPrimary,
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    removeButton: {
      color: theme.textMuted,
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'all 0.2s',
    },

    saveLocationPath: {
      padding: '12px',
      background: theme.glassLight,
      borderRadius: theme.radiusSmall,
      border: `1px solid ${theme.borderSubtle}`,
      fontSize: theme.fontSm,
      color: theme.textSecondary,
      fontFamily: 'monospace',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      marginBottom: '12px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Background Gradient */}
      <div style={styles.backgroundGradient} />

      {/* Top Navigation Bar */}
      <div style={styles.topNav}>
        <div style={styles.navLeft}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>EZ</div>
            <div style={styles.logoTextContainer}>
              <span style={styles.logoText}>Ez Timelapse</span>
              <span style={styles.logoSubtitle}>AI-Powered Creator</span>
            </div>
          </div>
        </div>

        <div style={styles.navCenter}>
          <button style={styles.tab}>Review</button>
          <button style={styles.tab}>Adjustments</button>
          <button style={{...styles.tab, ...styles.tabActive}}>Export</button>
        </div>

        <div style={styles.navRight}>
          <button style={styles.iconButton}>
            <HelpCircle size={18} />
          </button>
          <button style={styles.iconButton}>
            <Settings size={18} />
          </button>
          <button style={styles.iconButton}>
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Main Content - 3 Well-Defined Columns */}
      <div style={styles.mainContent}>
        
        {/* LEFT COLUMN */}
        <div style={styles.leftColumn}>
          {/* Save Location */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <FolderOpen size={18} />
              Save Location
            </div>
            <div style={styles.saveLocationPath}>
              {saveLocation}
            </div>
            <button style={styles.musicButton}>
              <Folder size={16} />
              Change Location
            </button>
          </div>

          {/* Music Controls */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <Music size={18} />
              Music Controls
            </div>
            
            {!hasMusic ? (
              <button style={styles.musicButton} onClick={handleAddMusic}>
                <Music size={16} />
                Add Music
              </button>
            ) : (
              <>
                <div style={styles.musicFileName}>
                  <span>🎵 {musicFile}</span>
                  <span style={styles.removeButton} onClick={handleRemoveMusic}>✕</span>
                </div>
                <div style={{fontSize: theme.fontXs, color: theme.textMuted, marginTop: '4px'}}>
                  Duration: 3:24
                </div>
              </>
            )}

            <div style={{marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <div style={styles.musicControl}>
                <label style={styles.musicToggle}>
                  <input type="checkbox" checked={autoSync} onChange={(e) => setAutoSync(e.target.checked)} style={styles.checkbox} />
                  Align Automatically
                </label>
              </div>
              <div style={styles.musicControl}>
                <label style={styles.musicToggle}>
                  <input type="checkbox" checked={trimToMatch} onChange={(e) => setTrimToMatch(e.target.checked)} style={styles.checkbox} />
                  Trim to match clip
                </label>
              </div>
              <div style={styles.musicControl}>
                <label style={styles.musicToggle}>
                  <input type="checkbox" checked={fadeInOut} onChange={(e) => setFadeInOut(e.target.checked)} style={styles.checkbox} />
                  Fade in/out
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div style={styles.centerColumn}>
          {!exportComplete ? (
            <>
              {/* Preview Window */}
              <div style={styles.previewCard}>
                <div style={styles.previewImage}>
                  <div style={styles.previewOverlay}>
                    <div style={styles.frameIndicator}>Frame 123</div>
                  </div>
                </div>
              </div>

              {/* Framerate Selection */}
              <div style={styles.selectorSection}>
                <div style={styles.selectorLabel}>Playback Feel</div>
                <div style={styles.selectorGrid}>
                  {framerates.map(rate => (
                    <div 
                      key={rate.id}
                      style={{
                        ...styles.selectorCard,
                        ...(selectedFramerate === rate.id ? styles.selectorCardActive : {})
                      }}
                      onClick={() => setSelectedFramerate(rate.id)}
                    >
                      {rate.recommended && <div style={styles.recommendedBadge}>Recommended</div>}
                      <div style={styles.selectorIcon}>{rate.icon}</div>
                      <div style={styles.selectorValue}>{rate.label}</div>
                      <div style={styles.selectorDesc}>{rate.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution Selection */}
              <div style={styles.selectorSection}>
                <div style={styles.selectorLabel}>Output Size</div>
                <div style={styles.selectorGrid}>
                  {resolutions.map(res => (
                    <div 
                      key={res.id}
                      style={{
                        ...styles.selectorCard,
                        ...(selectedResolution === res.id ? styles.selectorCardActive : {})
                      }}
                      onClick={() => setSelectedResolution(res.id)}
                    >
                      {res.recommended && <div style={styles.recommendedBadge}>Recommended</div>}
                      <div style={styles.selectorValue}>{res.label}</div>
                      <div style={styles.selectorDesc}>{res.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Waveform & Music Controls */}
              {hasMusic && (
                <>
                  <div style={styles.waveformContainer}>
                    <div style={styles.waveformTime}>00:{waveformPosition < 10 ? '0' : ''}{waveformPosition}s</div>
                    <div style={styles.waveformVisualizer}>
                      {waveformBars.map((height, i) => (
                        <div 
                          key={i} 
                          style={{...styles.waveformBar, height: `${height}%`}}
                        />
                      ))}
                      <div style={styles.waveformPlayhead} />
                    </div>
                    <div style={{fontSize: theme.fontXs, color: theme.textMuted, display: 'flex', justifyContent: 'space-between'}}>
                      <span>0:00</span>
                      <span>Music synced at 00:02s</span>
                      <span>3:24</span>
                    </div>
                  </div>

                  <div style={styles.musicToolbar}>
                    <button style={styles.musicButton}>
                      <Music size={14} />
                      Add Music
                    </button>
                    <label style={styles.musicToggle}>
                      <input type="checkbox" checked={autoSync} onChange={(e) => setAutoSync(e.target.checked)} />
                      <span>Auto-Sync</span>
                    </label>
                    <button style={styles.musicButton}>
                      <Scissors size={14} />
                      Trim Music
                    </button>
                    <div style={styles.volumeSlider}>
                      <Volume2 size={16} color={theme.textSecondary} />
                      <div style={styles.slider}>
                        <div style={styles.sliderFill} />
                        <div style={styles.sliderThumb} />
                      </div>
                      <span style={{fontSize: theme.fontXs, color: theme.textSecondary}}>{volume}%</span>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button 
                  style={{
                    ...styles.secondaryButton,
                    ...(isPreviewing ? styles.buttonDisabled : {})
                  }} 
                  onClick={handlePreview}
                  disabled={isPreviewing}
                >
                  <Play size={20} />
                  {isPreviewing ? 'Playing...' : 'Preview Video'}
                </button>
                {!isExporting ? (
                  <button style={styles.primaryButton} onClick={handleExport}>
                    <Download size={20} />
                    Export My Timelapse
                  </button>
                ) : (
                  <button style={{...styles.primaryButton, ...styles.buttonDisabled}} disabled>
                    <div style={{...styles.progressBar, width: `${exportProgress}%`}} />
                    <span style={styles.progressText}>
                      Rendering {exportProgress}% • {timeRemaining}
                    </span>
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Success Screen */
            <div style={styles.successContainer}>
              <div style={styles.successIcon}>
                <CheckCircle size={32} />
              </div>
              <div style={styles.successTitle}>
                ✨ Your timelapse is ready!
              </div>
              <div style={styles.successActions}>
                <button 
                  style={styles.primaryButton}
                  onClick={handlePlayVideo}
                >
                  <Play size={18} />
                  Play Video
                </button>
                <button 
                  style={styles.secondaryButton}
                  onClick={handleOpenFolder}
                >
                  <Folder size={18} />
                  Open Folder
                </button>
              </div>
              <button 
                style={{
                  ...styles.secondaryButton,
                  width: '100%'
                }}
                onClick={handleExportAnother}
              >
                <RefreshCw size={18} />
                Export Another
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.rightColumn}>
          {/* Export Summary */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              Export Summary
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Resolution</span>
              <span style={styles.summaryValue}>
                {resolutions.find(r => r.id === selectedResolution)?.value}
              </span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Frame Rate</span>
              <span style={styles.summaryValue}>
                {framerates.find(f => f.id === selectedFramerate)?.value}
              </span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Duration</span>
              <span style={styles.summaryValue}>29 seconds</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Format</span>
              <span style={styles.summaryValue}>MP4 (H.264)</span>
            </div>
            <div style={{...styles.summaryItem, ...styles.summaryItemLast}}>
              <span style={styles.summaryLabel}>Est. File Size</span>
              <span style={styles.summaryValue}>~{getFileSize()} MB</span>
            </div>
          </div>

          {/* Applied Effects */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              Applied Effects
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>AI Deflicker</span>
              <span style={styles.summaryValue}>✓ Applied</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Exposure Balance</span>
              <span style={styles.summaryValue}>✓ Applied</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Color LUT</span>
              <span style={styles.summaryValue}>Warm Sunset</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Framing</span>
              <span style={styles.summaryValue}>Cinematic 2.00:1</span>
            </div>
            {hasMusic && (
              <div style={{...styles.summaryItem, ...styles.summaryItemLast}}>
                <span style={styles.summaryLabel}>Music</span>
                <span style={styles.summaryValue}>{musicFile}</span>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>
              <Info size={18} />
              Project
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Total Frames</span>
              <span style={styles.summaryValue}>800</span>
            </div>
            <div style={{...styles.summaryItem, ...styles.summaryItemLast}}>
              <span style={styles.summaryLabel}>Rejected</span>
              <span style={styles.summaryValue}>4</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}