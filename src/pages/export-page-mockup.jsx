import React, { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  User,
  Sparkles,
  FolderOpen,
  Film,
  Moon,
  Sun,
  Download,
  CheckCircle,
  Play,
  Folder,
  RefreshCw,
  Info
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
  
  // Shadows
  shadowPurple: '0 4px 16px rgba(167, 139, 250, 0.25)',
  shadowLight: '0 2px 8px rgba(167, 139, 250, 0.08)',
  
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

export default function ExportPage() {
  const [selectedPreset, setSelectedPreset] = useState('cinematic');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [saveLocation, setSaveLocation] = useState('C:\\Users\\Videos\\Timelapses');
  
  // Simulate export process
  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate progress
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

  const handlePlayVideo = () => {
    // Handle play video
    console.log('Playing video...');
  };

  const handleOpenFolder = () => {
    // Handle open folder
    console.log('Opening folder...');
  };

  const handleExportAnother = () => {
    setExportComplete(false);
    setExportProgress(0);
  };

  const exportPresets = [
    {
      id: 'cinematic',
      name: 'Cinematic',
      badge: 'Recommended',
      description: 'Professional color grading with letterbox',
      icon: Film,
      specs: '4K • ProRes • 30fps',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)'
    },
    {
      id: 'social',
      name: 'Social',
      description: 'Optimized for Instagram & YouTube',
      icon: Sun,
      specs: '1080p • H.264 • 30fps',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)'
    },
    {
      id: 'nightmotion',
      name: 'Night Motion',
      description: 'Enhanced for low-light scenes',
      icon: Moon,
      specs: '4K • H.265 • 24fps',
      gradient: 'linear-gradient(135deg, #1E293B 0%, #3B82F6 100%)'
    },
    {
      id: 'longexposure',
      name: 'Long Exposure Look',
      description: 'Dreamy motion blur effect',
      icon: Sparkles,
      specs: '4K • ProRes • 24fps',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)'
    }
  ];

  const selectedPresetData = exportPresets.find(p => p.id === selectedPreset);

  // Calculate time remaining
  const timeRemaining = isExporting 
    ? Math.ceil((100 - exportProgress) * 0.3) + 's remaining'
    : '';

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

    // Main Content Area
    mainContent: {
      position: 'relative',
      display: 'flex',
      gap: '24px',
      padding: '24px',
      height: 'calc(100vh - 72px)',
      zIndex: 1,
    },

    // Left Sidebar
    leftSidebar: {
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },

    sidebarCard: {
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusMedium,
      padding: '20px',
      border: `1px solid ${theme.borderSubtle}`,
    },

    sidebarTitle: {
      fontSize: theme.fontBase,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },

    saveLocationContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
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
    },

    changeLocationButton: {
      padding: '10px 16px',
      background: theme.glassStrong,
      border: `1px solid ${theme.borderPurple}`,
      borderRadius: theme.radiusSmall,
      color: theme.accentPurple,
      fontSize: theme.fontSm,
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },

    // Center Content
    centerContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      alignItems: 'center',
    },

    // Preview Card
    previewCard: {
      width: '100%',
      maxWidth: '900px',
      aspectRatio: '16 / 9',
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusLarge,
      border: `1px solid ${theme.borderSubtle}`,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: theme.shadowLight,
    },

    previewImage: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
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
      background: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    previewPlayButton: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },

    // Export Presets Section
    presetsContainer: {
      width: '100%',
      maxWidth: '900px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
    },

    presetCard: {
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusMedium,
      padding: '20px',
      border: `2px solid ${theme.borderSubtle}`,
      cursor: 'pointer',
      transition: 'all 0.2s',
      position: 'relative',
      overflow: 'hidden',
    },

    presetCardActive: {
      border: `2px solid ${theme.accentPurple}`,
      boxShadow: theme.shadowPurple,
    },

    presetIconContainer: {
      width: '48px',
      height: '48px',
      borderRadius: theme.radiusSmall,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '12px',
      color: 'white',
    },

    presetName: {
      fontSize: theme.fontLg,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: '4px',
    },

    presetDescription: {
      fontSize: theme.fontSm,
      color: theme.textSecondary,
      marginBottom: '8px',
    },

    presetSpecs: {
      fontSize: theme.fontXs,
      color: theme.textMuted,
      fontFamily: 'monospace',
    },

    presetBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      padding: '4px 8px',
      background: theme.accentGradient,
      color: 'white',
      fontSize: theme.fontXs,
      fontWeight: '600',
      borderRadius: theme.radiusSmall,
    },

    // Summary Line
    summaryLine: {
      fontSize: theme.fontBase,
      color: theme.textSecondary,
      textAlign: 'center',
      padding: '8px',
      background: theme.glassLight,
      borderRadius: theme.radiusSmall,
      backdropFilter: theme.glassBlur,
    },

    // Export Button Section
    exportButtonContainer: {
      width: '100%',
      maxWidth: '400px',
      marginTop: '8px',
    },

    exportButton: {
      width: '100%',
      padding: '20px 32px',
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
      gap: '12px',
      position: 'relative',
      overflow: 'hidden',
    },

    exportingButton: {
      background: theme.glassStrong,
      cursor: 'not-allowed',
      color: theme.textPrimary,
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
      width: '100%',
      maxWidth: '400px',
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

    successButton: {
      flex: 1,
      padding: '12px 20px',
      borderRadius: theme.radiusSmall,
      fontSize: theme.fontBase,
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },

    successButtonPrimary: {
      background: theme.accentGradient,
      border: 'none',
      color: 'white',
    },

    successButtonSecondary: {
      background: theme.glassLight,
      border: `1px solid ${theme.borderPurple}`,
      color: theme.accentPurple,
    },

    // Right Sidebar
    rightSidebar: {
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },

    summaryCard: {
      background: theme.glassLight,
      backdropFilter: theme.glassBlur,
      borderRadius: theme.radiusMedium,
      padding: '20px',
      border: `1px solid ${theme.borderSubtle}`,
    },

    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
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

    infoBox: {
      background: 'rgba(167, 139, 250, 0.1)',
      borderRadius: theme.radiusSmall,
      padding: '12px',
      marginTop: '12px',
      border: `1px solid ${theme.borderPurple}`,
    },

    infoText: {
      fontSize: theme.fontSm,
      color: theme.textSecondary,
      lineHeight: '1.5',
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

      {/* Main Content - 3 Columns */}
      <div style={styles.mainContent}>
        
        {/* Left Sidebar */}
        <div style={styles.leftSidebar}>
          <div style={styles.sidebarCard}>
            <div style={styles.sidebarTitle}>
              <FolderOpen size={18} />
              Save Location
            </div>
            <div style={styles.saveLocationContainer}>
              <div style={styles.saveLocationPath}>
                {saveLocation}
              </div>
              <button style={styles.changeLocationButton}>
                <Folder size={16} />
                Change Location
              </button>
            </div>
          </div>

          <div style={styles.sidebarCard}>
            <div style={styles.sidebarTitle}>
              <Info size={18} />
              Quick Tips
            </div>
            <div style={styles.infoBox}>
              <div style={styles.infoText}>
                Your timelapse will be rendered with professional color grading and optimized for the selected preset. 
                The app automatically handles all technical details for the best quality.
              </div>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div style={styles.centerContent}>
          {/* Preview Card */}
          <div style={styles.previewCard}>
            <div style={styles.previewImage}>
              <div style={styles.previewOverlay}>
                <div style={styles.previewPlayButton}>
                  <Play size={32} color={theme.accentPurple} fill={theme.accentPurple} />
                </div>
              </div>
            </div>
          </div>

          {/* Export Presets */}
          {!exportComplete && (
            <>
              <div style={styles.presetsContainer}>
                {exportPresets.map(preset => (
                  <div 
                    key={preset.id}
                    style={{
                      ...styles.presetCard,
                      ...(selectedPreset === preset.id ? styles.presetCardActive : {})
                    }}
                    onClick={() => setSelectedPreset(preset.id)}
                  >
                    {preset.badge && (
                      <div style={styles.presetBadge}>{preset.badge}</div>
                    )}
                    <div style={{
                      ...styles.presetIconContainer,
                      background: preset.gradient
                    }}>
                      <preset.icon size={24} />
                    </div>
                    <div style={styles.presetName}>{preset.name}</div>
                    <div style={styles.presetDescription}>{preset.description}</div>
                    <div style={styles.presetSpecs}>{preset.specs}</div>
                  </div>
                ))}
              </div>

              {/* Summary Line */}
              <div style={styles.summaryLine}>
                896 photos • 30fps • Full HD • 0:29 • no audio
              </div>

              {/* Export Button */}
              <div style={styles.exportButtonContainer}>
                {!isExporting ? (
                  <button style={styles.exportButton} onClick={handleExport}>
                    <Download size={20} />
                    Export My Timelapse
                  </button>
                ) : (
                  <button style={{...styles.exportButton, ...styles.exportingButton}} disabled>
                    <div style={{...styles.progressBar, width: `${exportProgress}%`}} />
                    <span style={styles.progressText}>
                      Rendering {exportProgress}% • {timeRemaining}
                    </span>
                  </button>
                )}
              </div>
            </>
          )}

          {/* Success Screen */}
          {exportComplete && (
            <div style={styles.successContainer}>
              <div style={styles.successIcon}>
                <CheckCircle size={32} />
              </div>
              <div style={styles.successTitle}>
                ✨ Your timelapse is ready!
              </div>
              <div style={styles.successActions}>
                <button 
                  style={{...styles.successButton, ...styles.successButtonPrimary}}
                  onClick={handlePlayVideo}
                >
                  <Play size={18} />
                  Play Video
                </button>
                <button 
                  style={{...styles.successButton, ...styles.successButtonSecondary}}
                  onClick={handleOpenFolder}
                >
                  <Folder size={18} />
                  Open Folder
                </button>
              </div>
              <button 
                style={{
                  ...styles.successButton, 
                  ...styles.successButtonSecondary,
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

        {/* Right Sidebar */}
        <div style={styles.rightSidebar}>
          <div style={styles.summaryCard}>
            <div style={styles.sidebarTitle}>
              Export Summary
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Preset</span>
              <span style={styles.summaryValue}>{selectedPresetData?.name}</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Resolution</span>
              <span style={styles.summaryValue}>1920 x 1080</span>
            </div>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>Frame Rate</span>
              <span style={styles.summaryValue}>30 fps</span>
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
              <span style={styles.summaryValue}>~124 MB</span>
            </div>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.sidebarTitle}>
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
            <div style={{...styles.summaryItem, ...styles.summaryItemLast}}>
              <span style={styles.summaryLabel}>Framing</span>
              <span style={styles.summaryValue}>Cinematic 2.00:1</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}