import React, { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  Settings2,
  X,
  ZoomIn,
  ZoomOut,
  FileText,
  Clock,
  Save,
  Upload,
  LogOut
} from 'lucide-react';

// Design Tokens - Light Glassmorphic (exact match to adjustments panel)
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
  errorText: '#DC2626',
  errorBg: 'rgba(220, 38, 38, 0.1)',
  errorBorder: 'rgba(220, 38, 38, 0.3)',
  
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

export default function ExportPageFinal() {
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
  const [waveformPosition, setWaveformPosition] = useState(20); // percentage
  const [isDraggingWaveform, setIsDraggingWaveform] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showRecentSubmenu, setShowRecentSubmenu] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  
  // Recent projects for submenu
  const recentProjects = [
    { id: 1, name: 'Sunset Construction', date: '2 days ago' },
    { id: 2, name: 'Downtown Traffic', date: '5 days ago' },
    { id: 3, name: 'Night Sky', date: '1 week ago' },
    { id: 4, name: 'City Sunrise', date: '2 weeks ago' }
  ];
  
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
    setHasMusic(true);
    setMusicFile('sunset-vibes.mp3');
  };

  const handleRemoveMusic = () => {
    setHasMusic(false);
    setMusicFile('');
  };

  const handleWaveformDrag = (e) => {
    if (isDraggingWaveform) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setWaveformPosition(percentage);
    }
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

  // Get file size estimate
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
    for (let i = 0; i < 100; i++) {
      bars.push(Math.random() * 60 + 20);
    }
    return bars;
  };

  const waveformBars = generateWaveform();

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FAFBFD',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflow: 'hidden',
      position: 'relative',
    },
    
    backgroundGradient: {
      position: 'absolute',
      inset: 0,
      background: theme.bgGradient,
      opacity: 0.5,
      pointerEvents: 'none',
    },

    // Top Navigation - Exact match to adjustments
    topNav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      padding: '0 24px',
      backgroundColor: theme.glassLight,
      backdropFilter: theme.glassBlur,
      WebkitBackdropFilter: theme.glassBlur,
      borderBottom: `1px solid ${theme.borderSubtle}`,
      zIndex: 100,
    },

    navLeft: {
      width: '320px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },

    // File Menu Styles
    menuContainer: {
      position: 'relative',
    },

    fileMenuButton: {
      backgroundColor: theme.glassLight,
      backdropFilter: theme.glassBlur,
      WebkitBackdropFilter: theme.glassBlur,
      border: `1px solid ${theme.borderSubtle}`,
      padding: '8px 16px',
      color: theme.textSecondary,
      fontSize: theme.fontBase,
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      borderRadius: theme.radiusSmall,
      transition: 'all 150ms ease-out',
      boxShadow: theme.shadowLight,
    },

    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: '8px',
      minWidth: '220px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${theme.borderSubtle}`,
      borderRadius: theme.radiusMedium,
      boxShadow: '0 8px 32px rgba(167, 139, 250, 0.2)',
      padding: '8px',
      zIndex: 1000,
      animation: 'fadeSlideIn 150ms ease-out',
    },

    menuItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: theme.radiusSmall,
      color: theme.textSecondary,
      fontSize: theme.fontBase,
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 150ms ease-out',
      textAlign: 'left',
    },

    menuItemDisabled: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: theme.radiusSmall,
      color: theme.textMuted,
      fontSize: theme.fontBase,
      fontWeight: '500',
      cursor: 'not-allowed',
      textAlign: 'left',
      opacity: 0.5,
    },

    menuItemSubmenu: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      backgroundColor: 'transparent',
      borderRadius: theme.radiusSmall,
      color: theme.textSecondary,
      fontSize: theme.fontBase,
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 150ms ease-out',
      position: 'relative',
    },

    menuItemContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },

    menuSeparator: {
      height: '1px',
      backgroundColor: theme.borderSubtle,
      margin: '8px 0',
    },

    shortcut: {
      marginLeft: 'auto',
      fontSize: theme.fontXs,
      color: theme.textMuted,
      fontWeight: '400',
    },

    submenu: {
      position: 'absolute',
      top: 0,
      left: '100%',
      marginLeft: '4px',
      minWidth: '260px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${theme.borderSubtle}`,
      borderRadius: theme.radiusMedium,
      boxShadow: '0 8px 32px rgba(167, 139, 250, 0.2)',
      padding: '8px',
      zIndex: 1001,
      animation: 'fadeSlideIn 150ms ease-out',
    },

    submenuItem: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2px',
      padding: '10px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: theme.radiusSmall,
      cursor: 'pointer',
      transition: 'background-color 150ms ease-out',
      textAlign: 'left',
    },

    submenuItemName: {
      fontSize: theme.fontBase,
      fontWeight: '500',
      color: theme.textPrimary,
    },

    submenuItemMeta: {
      fontSize: theme.fontXs,
      color: theme.textMuted,
    },

    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
    },

    logoIcon: {
      width: '40px',
      height: '40px',
      background: theme.accentGradient,
      borderRadius: theme.radiusSmall,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.fontLg,
      fontWeight: '700',
      color: '#FFFFFF',
      boxShadow: theme.shadowPurple,
    },

    logoTextContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    logoText: {
      fontSize: theme.fontLg,
      fontWeight: '700',
      color: theme.textPrimary,
    },

    logoSubtitle: {
      fontSize: theme.fontXs,
      color: theme.textMuted,
    },

    navCenter: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
    },

    tab: {
      padding: '8px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: theme.radiusSmall,
      color: theme.textMuted,
      fontSize: theme.fontBase,
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 150ms ease-out',
    },

    tabActive: {
      backgroundColor: theme.glassStrong,
      color: theme.textPrimary,
      border: `1px solid ${theme.borderPurple}`,
      boxShadow: theme.shadowLight,
    },

    navRight: {
      width: '320px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '8px',
    },

    iconButton: {
      width: '36px',
      height: '36px',
      backgroundColor: theme.glassLight,
      border: `1px solid ${theme.borderSubtle}`,
      borderRadius: theme.radiusSmall,
      color: theme.textSecondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 150ms ease-out',
    },

    // Main Content - Exact match to adjustments
    mainContent: {
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
    },

    // Left Sidebar - Exact match
    leftSidebar: {
      width: '280px',
      backgroundColor: theme.glassLight,
      backdropFilter: theme.glassBlur,
      WebkitBackdropFilter: theme.glassBlur,
      borderRight: `1px solid ${theme.borderSubtle}`,
      padding: '24px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },

    // Section styles matching adjustments
    sidebarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    sectionHeader: {
      fontSize: theme.fontSm,
      fontWeight: '600',
      color: theme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      margin: 0,
    },

    sectionCaption: {
      fontSize: theme.fontXs,
      color: theme.textMuted,
      marginTop: '-8px',
    },

    infoCard: {
      backgroundColor: theme.glassMedium,
      borderRadius: theme.radiusMedium,
      padding: '12px',
      border: `1px solid ${theme.borderSubtle}`,
    },

    // Center Content
    centerContent: {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      overflowY: 'auto',
    },

    // Preview Section - Scaled to match adjustments
    previewSection: {
      backgroundColor: theme.glassMedium,
      backdropFilter: theme.glassBlur,
      WebkitBackdropFilter: theme.glassBlur,
      border: `1px solid ${theme.borderSubtle}`,
      borderRadius: theme.radiusMedium,
      padding: '16px',
      boxShadow: theme.shadowLight,
    },

    previewContainer: {
      width: '100%',
      aspectRatio: '16 / 9',
      borderRadius: theme.radiusMedium,
      overflow: 'hidden',
      boxShadow: theme.shadowPurple,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDE68A 100%)',
    },

    previewPlaceholder: {
      fontSize: '48px',
      fontWeight: '700',
      color: 'rgba(255, 255, 255, 0.8)',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },

    // Music/Waveform Section - Directly under preview
    waveformSection: {
      backgroundColor: theme.glassMedium,
      backdropFilter: theme.glassBlur,
      WebkitBackdropFilter: theme.glassBlur,
      border: `1px solid ${theme.borderSubtle}`,
      borderRadius: theme.radiusMedium,
      padding: '12px 16px',
      boxShadow: theme.shadowLight,
    },

    waveformHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
    },

    waveformControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },

    waveformContainer: {
      position: 'relative',
      height: '80px',
      backgroundColor: theme.glassLight,
      borderRadius: theme.radiusSmall,
      overflow: 'hidden',
      cursor: 'move',
      marginBottom: '8px',
    },

    waveformVisualizer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'flex-end',
      gap: '1px',
      padding: '4px',
    },

    waveformBar: {
      flex: 1,
      background: theme.accentGradient,
      borderRadius: '1px',
      opacity: 0.7,
      minHeight: '4px',
    },

    waveformPlayhead: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '2px',
      background: theme.goldAccent,
      boxShadow: `0 0 8px ${theme.goldAccent}`,
      pointerEvents: 'none',
      left: `${waveformPosition}%`,
    },

    waveformTime: {
      position: 'absolute',
      top: '4px',
      left: `${waveformPosition}%`,
      transform: 'translateX(-50%)',
      padding: '2px 6px',
      background: 'rgba(245, 158, 11, 0.9)',
      borderRadius: '4px',
      fontSize: theme.fontXs,
      color: 'white',
      fontWeight: '600',
      pointerEvents: 'none',
    },

    musicToolbar: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },

    musicButton: {
      padding: '6px 12px',
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
      gap: '6px',
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

    // Selector Cards for left panel
    selectorGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },

    selectorCard: {
      padding: '12px',
      background: theme.glassMedium,
      border: `2px solid ${theme.borderSubtle}`,
      borderRadius: theme.radiusMedium,
      cursor: 'pointer',
      transition: 'all 0.2s',
      position: 'relative',
    },

    selectorCardActive: {
      border: `2px solid ${theme.accentPurple}`,
      background: theme.glassStrong,
      boxShadow: theme.shadowLight,
    },

    selectorCardContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },

    selectorIcon: {
      fontSize: '20px',
      minWidth: '24px',
    },

    selectorInfo: {
      flex: 1,
    },

    selectorValue: {
      fontSize: theme.fontSm,
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
      top: '6px',
      right: '6px',
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
      padding: '16px 32px',
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
      padding: '16px 32px',
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

    // Right Sidebar - Exact match
    rightSidebar: {
      width: '320px',
      backgroundColor: theme.glassLight,
      backdropFilter: theme.glassBlur,
      WebkitBackdropFilter: theme.glassBlur,
      borderLeft: `1px solid ${theme.borderSubtle}`,
      padding: '24px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },

    infoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },

    infoTitle: {
      fontSize: theme.fontSm,
      fontWeight: '600',
      color: theme.textMuted,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      margin: 0,
    },

    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: `1px solid ${theme.borderSubtle}`,
      fontSize: theme.fontSm,
    },

    infoRowLast: {
      borderBottom: 'none',
    },

    infoLabel: {
      color: theme.textSecondary,
    },

    infoValue: {
      color: theme.textPrimary,
      fontWeight: '500',
    },

    infoValueRed: {
      color: theme.errorText,
      fontWeight: '500',
    },

    // Status Bar
    statusBar: {
      height: '32px',
      backgroundColor: theme.glassLight,
      borderTop: `1px solid ${theme.borderSubtle}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      fontSize: theme.fontXs,
      color: theme.textMuted,
    },

    statusLeft: {
      display: 'flex',
      gap: '4px',
    },

    statusRight: {
      display: 'flex',
      gap: '4px',
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
      margin: 'auto',
      maxWidth: '400px',
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
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          .menu-item:hover {
            background-color: rgba(167, 139, 250, 0.1) !important;
          }
          
          .submenu-item:hover {
            background-color: rgba(167, 139, 250, 0.1) !important;
          }
        `}
      </style>
      
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
          
          {/* File Menu */}
          <div style={styles.menuContainer}>
            <button 
              style={styles.fileMenuButton}
              onClick={() => setShowFileMenu(!showFileMenu)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setTimeout(() => setShowFileMenu(false), 150);
                }
              }}
            >
              <FileText size={18} />
              <span>File</span>
              <ChevronDown size={14} />
            </button>
            
            {showFileMenu && (
              <div style={styles.dropdownMenu}>
                <button 
                  className="menu-item"
                  style={styles.menuItem}
                >
                  <FolderOpen size={16} />
                  <span>Open Project...</span>
                  <span style={styles.shortcut}>Ctrl+O</span>
                </button>
                
                <div 
                  className="menu-item"
                  style={styles.menuItemSubmenu}
                  onMouseEnter={() => setShowRecentSubmenu(true)}
                  onMouseLeave={() => setShowRecentSubmenu(false)}
                >
                  <div style={styles.menuItemContent}>
                    <Clock size={16} />
                    <span>Open Recent</span>
                  </div>
                  <ChevronRight size={14} />
                  
                  {showRecentSubmenu && (
                    <div style={styles.submenu}>
                      {recentProjects.map((project) => (
                        <button 
                          key={project.id} 
                          className="submenu-item"
                          style={styles.submenuItem}
                        >
                          <div style={styles.submenuItemName}>{project.name}</div>
                          <div style={styles.submenuItemMeta}>{project.date}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={styles.menuSeparator} />
                
                <button 
                  className="menu-item"
                  style={styles.menuItem}
                >
                  <Save size={16} />
                  <span>Save Project</span>
                  <span style={styles.shortcut}>Ctrl+S</span>
                </button>
                
                <button 
                  className="menu-item"
                  style={styles.menuItem}
                >
                  <Save size={16} />
                  <span>Save As...</span>
                  <span style={styles.shortcut}>Ctrl+Shift+S</span>
                </button>
                
                <button 
                  className="menu-item"
                  style={styles.menuItem}
                  onClick={() => {
                    setShowFileMenu(false);
                    // Export is already on this page
                  }}
                >
                  <Upload size={16} />
                  <span>Export...</span>
                  <span style={styles.shortcut}>Ctrl+E</span>
                </button>

                <div style={styles.menuSeparator} />
                
                <button 
                  className="menu-item"
                  style={styles.menuItem}
                  onClick={() => {
                    setShowFileMenu(false);
                    setShowSettingsDrawer(true);
                  }}
                >
                  <Settings size={16} />
                  <span>Preferences...</span>
                  <span style={styles.shortcut}>Ctrl+,</span>
                </button>

                <div style={styles.menuSeparator} />
                
                <button 
                  className="menu-item"
                  style={styles.menuItem}
                  onClick={() => {
                    setShowFileMenu(false);
                    setShowAboutModal(true);
                  }}
                >
                  <HelpCircle size={16} />
                  <span>About...</span>
                </button>
                
                <button 
                  className="menu-item"
                  style={styles.menuItem}
                >
                  <LogOut size={16} />
                  <span>Exit</span>
                  <span style={styles.shortcut}>Alt+F4</span>
                </button>
              </div>
            )}
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
        
        {/* LEFT SIDEBAR */}
        <div style={styles.leftSidebar}>
          {/* Save Location Section */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sectionHeader}>SAVE LOCATION</h3>
            <div style={styles.infoCard}>
              <div style={{
                padding: '8px',
                background: theme.glassLight,
                borderRadius: theme.radiusSmall,
                fontSize: theme.fontXs,
                fontFamily: 'monospace',
                color: theme.textSecondary,
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}>
                {saveLocation}
              </div>
              <button style={{
                ...styles.musicButton,
                width: '100%',
                marginTop: '8px',
              }}>
                <Folder size={14} />
                Change Location
              </button>
            </div>
          </div>

          {/* Playback Feel Section */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sectionHeader}>PLAYBACK FEEL</h3>
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
                  <div style={styles.selectorCardContent}>
                    <span style={styles.selectorIcon}>{rate.icon}</span>
                    <div style={styles.selectorInfo}>
                      <div style={styles.selectorValue}>{rate.label} • {rate.value}</div>
                      <div style={styles.selectorDesc}>{rate.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Output Size Section */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sectionHeader}>OUTPUT SIZE</h3>
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
                  <div style={styles.selectorCardContent}>
                    <div style={styles.selectorInfo}>
                      <div style={styles.selectorValue}>{res.label}</div>
                      <div style={styles.selectorDesc}>{res.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div style={styles.centerContent}>
          {!exportComplete ? (
            <>
              {/* Preview Section */}
              <div style={styles.previewSection}>
                <div style={styles.previewContainer}>
                  <div style={styles.previewPlaceholder}>Frame 123</div>
                </div>
              </div>

              {/* Music/Waveform Section */}
              {hasMusic && (
                <div style={styles.waveformSection}>
                  <div style={styles.waveformHeader}>
                    <div style={styles.waveformControls}>
                      <Music size={16} color={theme.accentPurple} />
                      <span style={{fontSize: theme.fontSm, fontWeight: '600', color: theme.textPrimary}}>
                        {musicFile}
                      </span>
                      <span style={{fontSize: theme.fontXs, color: theme.textMuted}}>
                        3:24
                      </span>
                    </div>
                    <button 
                      style={{...styles.musicButton, padding: '4px 8px'}}
                      onClick={handleRemoveMusic}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div 
                    style={styles.waveformContainer}
                    onMouseDown={() => setIsDraggingWaveform(true)}
                    onMouseUp={() => setIsDraggingWaveform(false)}
                    onMouseLeave={() => setIsDraggingWaveform(false)}
                    onMouseMove={handleWaveformDrag}
                  >
                    <div style={styles.waveformTime}>
                      00:{Math.floor(waveformPosition * 3.24 / 100).toString().padStart(2, '0')}s
                    </div>
                    <div style={styles.waveformVisualizer}>
                      {waveformBars.map((height, i) => (
                        <div 
                          key={i} 
                          style={{...styles.waveformBar, height: `${height}%`}}
                        />
                      ))}
                      <div style={styles.waveformPlayhead} />
                    </div>
                  </div>

                  <div style={styles.musicToolbar}>
                    <label style={styles.musicToggle}>
                      <input 
                        type="checkbox" 
                        checked={autoSync} 
                        onChange={(e) => setAutoSync(e.target.checked)}
                        style={{accentColor: theme.accentPurple}}
                      />
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
                </div>
              )}

              {/* Add Music Button if no music */}
              {!hasMusic && (
                <div style={styles.waveformSection}>
                  <button 
                    style={{
                      ...styles.musicButton,
                      width: '100%',
                      padding: '12px',
                      justifyContent: 'center',
                    }}
                    onClick={handleAddMusic}
                  >
                    <Music size={16} />
                    Add Background Music (Optional)
                  </button>
                </div>
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
                <button style={styles.primaryButton}>
                  <Play size={18} />
                  Play Video
                </button>
                <button style={styles.secondaryButton}>
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

        {/* RIGHT SIDEBAR */}
        <div style={styles.rightSidebar}>
          {/* Export Summary */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>EXPORT SUMMARY</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Resolution</span>
                <span style={styles.infoValue}>
                  {resolutions.find(r => r.id === selectedResolution)?.value}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Frame Rate</span>
                <span style={styles.infoValue}>
                  {framerates.find(f => f.id === selectedFramerate)?.value}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Duration</span>
                <span style={styles.infoValue}>29 seconds</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Format</span>
                <span style={styles.infoValue}>MP4 (H.264)</span>
              </div>
              <div style={{...styles.infoRow, ...styles.infoRowLast}}>
                <span style={styles.infoLabel}>Est. File Size</span>
                <span style={styles.infoValue}>~{getFileSize()} MB</span>
              </div>
            </div>
          </div>

          {/* Applied Effects */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>APPLIED EFFECTS</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>AI Deflicker</span>
                <span style={styles.infoValue}>✓ Applied</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Exposure Balance</span>
                <span style={styles.infoValue}>✓ Applied</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Color LUT</span>
                <span style={styles.infoValue}>Warm Sunset</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Framing</span>
                <span style={styles.infoValue}>Cinematic 2.00:1</span>
              </div>
              {hasMusic && (
                <div style={{...styles.infoRow, ...styles.infoRowLast}}>
                  <span style={styles.infoLabel}>Music</span>
                  <span style={styles.infoValue}>{musicFile}</span>
                </div>
              )}
            </div>
          </div>

          {/* Project Info */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>PROJECT</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Total frames</span>
                <span style={styles.infoValue}>800</span>
              </div>
              <div style={{...styles.infoRow, ...styles.infoRowLast}}>
                <span style={styles.infoLabel}>Rejected</span>
                <span style={styles.infoValueRed}>4</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div style={styles.statusBar}>
        <div style={styles.statusLeft}>
          <span style={{ color: theme.accentPurple, fontWeight: '600' }}>Trial: 14 days left</span>
          <span> • Exports up to 8K, no watermark</span>
        </div>
        <div style={styles.statusRight}>
          <span>NVIDIA RTX 4090</span>
          <span> • </span>
          <span>v2.0</span>
        </div>
      </div>
    </div>
  );
}