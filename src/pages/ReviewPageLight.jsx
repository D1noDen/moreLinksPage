import React, { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Settings, 
  HelpCircle, 
  User,
  ZoomIn,
  ZoomOut,
  Trash2,
  Upload,
  RotateCcw,
  X
} from 'lucide-react';

// Design Tokens - LIGHT GLASSMORPHIC (Reference)
// Palette: gradient bg #FDE8F4â†’#E0E7FFâ†’#DBEAFEâ†’#E0F2FEâ†’#F0FDFA; purple #A78BFA/#C4B5FD; text #4C1D95/#6B7280; glass rgba(255,255,255,0.3-0.5) blur(20px)
const theme = {
  surfaceSolid: '#FFFFFF',
  surfaceSolidAlt: '#F9FAFB',
  glassLight: 'rgba(255, 255, 255, 0.4)',
  glassMedium: 'rgba(255, 255, 255, 0.5)',
  glassStrong: 'rgba(255, 255, 255, 0.6)',
  glassBlur: 'blur(20px)',
  borderPrimary: 'rgba(167, 139, 250, 0.4)',
  borderSubtle: 'rgba(156, 163, 175, 0.15)',
  accentGradient: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
  accentPurple: '#A78BFA',
  accentPurpleLight: '#C4B5FD',
  textPrimary: '#4C1D95',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textDim: '#9CA3AF',
  errorText: '#DC2626',
  errorBg: 'rgba(220, 38, 38, 0.1)',
  errorBorder: 'rgba(220, 38, 38, 0.3)',
  shadowPurple: '0 4px 16px rgba(167, 139, 250, 0.25)',
  radiusSmall: '10px',
  radiusMedium: '14px',
  radiusLarge: '20px',
  fontXs: '11px',
  fontSm: '13px',
  fontBase: '14px',
  fontLg: '16px',
  fontXl: '20px',
};

export default function ReviewPageLight() {
  const [currentFrame, setCurrentFrame] = useState(123);
  const [rejectedFrames, setRejectedFrames] = useState(new Set([45, 89, 156, 234, 345, 456, 567, 678, 723, 756, 789, 790]));
  const [zoomLevel, setZoomLevel] = useState(1);
  const totalFrames = 800;
  const projectName = "Sunset Construction"; // Can be null if no project loaded

  const isRejected = rejectedFrames.has(currentFrame);

  const toggleReject = () => {
    const newRejected = new Set(rejectedFrames);
    if (isRejected) {
      newRejected.delete(currentFrame);
    } else {
      newRejected.add(currentFrame);
    }
    setRejectedFrames(newRejected);
  };

  const goToPrevFrame = () => {
    if (currentFrame > 1) setCurrentFrame(currentFrame - 1);
  };

  const goToNextFrame = () => {
    if (currentFrame < totalFrames) setCurrentFrame(currentFrame + 1);
  };

  const handleRemoveRejected = () => {
    if (window.confirm(`Remove ${rejectedFrames.size} rejected frames from the project?`)) {
      setRejectedFrames(new Set());
      console.log('Rejected frames removed');
    }
  };

  const handleResetRejected = () => {
    if (window.confirm('Reset all rejections?')) {
      setRejectedFrames(new Set());
    }
  };

  // Generate thumbnail frames for timeline
  const generateThumbnails = () => {
    const thumbnails = [];
    const step = Math.ceil(totalFrames / 60); // Show ~60 thumbnails
    for (let i = 1; i <= totalFrames; i += step) {
      thumbnails.push(i);
    }
    return thumbnails;
  };

  const thumbnails = generateThumbnails();
  const thumbnailWidth = 80 * zoomLevel;

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          * {
            box-sizing: border-box;
          }
        `}
      </style>

      {/* Top Navigation */}
      <div style={styles.topNav}>
        <div style={styles.navLeft}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>EZ</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={styles.logoText}>Ez Timelapse</span>
              <span style={styles.logoSubtitle}>AI-Powered Creator</span>
            </div>
          </div>
        </div>

        <div style={styles.navCenter}>
          <div style={{...styles.tab, ...styles.tabActive}}>Review</div>
          <div style={styles.tab}>Adjustments</div>
          <div style={styles.tab}>Export</div>
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

      {/* Main Content Area - Three Columns */}
      <div style={styles.mainContent}>
        {/* Left Sidebar - Project Actions */}
        <div style={styles.leftSidebar}>
          {/* Project Info Section */}
          <div>
            <div style={styles.sectionHeader}>Project Info</div>
            {projectName && (
              <div style={styles.infoCard}>
                <div style={styles.projectName}>{projectName}</div>
                <div style={styles.projectMeta}>{totalFrames} frames â€¢ {(totalFrames / 30).toFixed(1)}s @ 30fps</div>
                {rejectedFrames.size > 0 && (
                  <div style={styles.projectRejected}>{rejectedFrames.size} rejected</div>
                )}
              </div>
            )}
          </div>

          {/* Actions Section */}
          <div style={styles.actionsSeparator}>
            <div style={styles.sectionHeader}>Actions</div>
            <div style={styles.sidebarActions}>
              <button style={styles.sidebarButton} onClick={() => console.log('Import more')}>
                <Upload size={16} />
                Import More Images
              </button>
              
              {rejectedFrames.size > 0 && (
                <>
                  <button style={styles.sidebarButtonDanger} onClick={handleRemoveRejected}>
                    <Trash2 size={16} />
                    Remove Rejected
                  </button>
                  <button style={styles.sidebarButtonSecondary} onClick={handleResetRejected}>
                    <RotateCcw size={14} />
                    Reset Rejections
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Middle Column - Preview & Timeline */}
        <div style={styles.middleColumn}>
          {/* Preview Area */}
          <div style={styles.previewSection}>
            <div style={styles.previewContainer}>
              {/* Placeholder image with 16:9 aspect ratio */}
              <div style={{
                ...styles.previewImage,
                background: `linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDE68A 100%)`,
                position: 'relative'
              }}>
                {/* Nav arrows */}
                <button 
                  style={{...styles.navArrow, left: '20px'}}
                  onClick={goToPrevFrame}
                  disabled={currentFrame === 1}
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  style={{...styles.navArrow, right: '20px'}}
                  onClick={goToNextFrame}
                  disabled={currentFrame === totalFrames}
                >
                  <ChevronRight size={32} />
                </button>

                {/* Rejected overlay */}
                {isRejected && (
                  <div style={styles.rejectedOverlay}>
                    <div style={styles.rejectedBanner}>
                      <X size={24} />
                      <span>REJECTED â€” will not export</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Controls */}
            <div style={styles.previewControls}>
              <div style={styles.frameCounter}>
                {currentFrame} / {totalFrames}
              </div>
              <button 
                style={isRejected ? styles.rejectedButton : styles.rejectButton}
                onClick={toggleReject}
              >
                {isRejected ? (
                  <>
                    <X size={16} />
                    Rejected âœ“
                  </>
                ) : (
                  <>
                    <X size={16} />
                    Reject Frame
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Timeline Section - Full Width Filmstrip */}
          <div style={styles.timelineSection}>
            <div style={styles.timelineHeader}>
              <span style={styles.timelineLabel}>Timeline</span>
              <div style={styles.zoomControls}>
                <button 
                  style={styles.zoomButton}
                  onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                >
                  <ZoomOut size={14} />
                </button>
                <span style={styles.zoomLabel}>{Math.round(zoomLevel * 100)}%</span>
                <button 
                  style={styles.zoomButton}
                  onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Progress Bar with Playhead */}
            <div style={styles.progressBarContainer}>
              <div style={{
                ...styles.progressBar,
                width: `${(currentFrame / totalFrames) * 100}%`
              }} />
              <div style={{
                ...styles.playhead,
                left: `${(currentFrame / totalFrames) * 100}%`
              }} />
            </div>

            {/* Timeline Filmstrip */}
            <div style={styles.timelineScroll}>
              <div style={styles.filmstrip}>
                {thumbnails.map((frameNum) => (
                  <div
                    key={frameNum}
                    style={{
                      ...styles.thumbnail,
                      width: `${thumbnailWidth}px`,
                      ...(currentFrame === frameNum ? styles.thumbnailActive : {}),
                    }}
                    onClick={() => setCurrentFrame(frameNum)}
                  >
                    <div style={{
                      ...styles.thumbnailImage,
                      background: `linear-gradient(135deg, ${
                        rejectedFrames.has(frameNum) ? '#DC2626' : '#F97316'
                      } 0%, ${
                        rejectedFrames.has(frameNum) ? '#B91C1C' : '#FB923C'
                      } 100%)`
                    }} />
                    {rejectedFrames.has(frameNum) && (
                      <div style={styles.rejectedPill}>X</div>
                    )}
                    <span style={styles.thumbnailLabel}>{frameNum}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Info */}
        <div style={styles.rightPanel}>
          {/* Frame Info */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Frame Info</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Frame Number</span>
                <span style={styles.infoValue}>{currentFrame} / {totalFrames}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Timestamp</span>
                <span style={styles.infoValue}>12:34:56 PM</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Status</span>
                <span style={{
                  ...styles.statusPill,
                  backgroundColor: isRejected ? theme.errorBg : 'rgba(167, 139, 250, 0.15)',
                  color: isRejected ? theme.errorText : theme.accentPurple,
                  border: `1px solid ${isRejected ? theme.errorBorder : theme.borderPrimary}`,
                }}>
                  {isRejected ? 'Rejected' : 'Included'}
                </span>
              </div>
            </div>
          </div>

          {/* Capture Data */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Capture Data</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Shutter</span>
                <span style={styles.infoValue}>1/250s</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>ISO</span>
                <span style={styles.infoValue}>400</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Aperture</span>
                <span style={styles.infoValue}>f/5.6</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>White Balance</span>
                <span style={styles.infoValue}>5600K</span>
              </div>
            </div>
          </div>

          {/* Project Summary */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Project</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Total Frames</span>
                <span style={styles.infoValue}>{totalFrames}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Rejected</span>
                <span style={{
                  ...styles.infoValue,
                  color: rejectedFrames.size > 0 ? theme.errorText : theme.textMuted
                }}>
                  {rejectedFrames.size}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div style={styles.statusBar}>
        <div style={styles.statusLeft}>
          Trial: 14 days left â€¢ Exports up to 8K, no watermark
        </div>
        <div style={styles.statusRight}>
          NVIDIA RTX 4080 â€¢ v1.0.0
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    backgroundImage: 'linear-gradient(135deg, #FDE8F4 0%, #E0E7FF 25%, #DBEAFE 50%, #E0F2FE 75%, #F0FDFA 100%)',
    color: theme.textPrimary,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },

  // Top Navigation
  topNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: theme.glassLight,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    borderBottom: `1px solid ${theme.borderSubtle}`,
    height: '64px',
    flexShrink: 0,
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flex: 1,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    background: theme.accentGradient,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    color: '#FFFFFF',
    boxShadow: theme.shadowPurple,
  },
  logoText: {
    fontSize: theme.fontLg,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  logoSubtitle: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    fontWeight: '500',
  },
  navCenter: {
    display: 'flex',
    gap: '8px',
    flex: 1,
    justifyContent: 'center',
  },
  tab: {
    padding: '8px 20px',
    fontSize: theme.fontSm,
    fontWeight: '500',
    color: theme.textMuted,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: theme.radiusSmall,
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  tabActive: {
    backgroundColor: theme.glassStrong,
    color: theme.accentPurple,
    border: `1px solid ${theme.borderPrimary}`,
    boxShadow: theme.shadowPurple,
  },
  navRight: {
    display: 'flex',
    gap: '8px',
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: '36px',
    height: '36px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: theme.radiusSmall,
    color: theme.textSecondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
  },

  // Main Content - Three Columns
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },

  // Left Sidebar
  leftSidebar: {
    width: '240px',
    flexShrink: 0,
    backgroundColor: theme.glassLight,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    borderRight: `1px solid ${theme.borderSubtle}`,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
  },
  projectName: {
    fontSize: theme.fontLg,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: '4px',
  },
  projectMeta: {
    fontSize: theme.fontSm,
    color: theme.textSecondary,
    fontWeight: '500',
    marginBottom: '4px',
  },
  projectRejected: {
    fontSize: theme.fontSm,
    color: theme.errorText,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.textDim,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  infoCard: {
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: theme.radiusSmall,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxShadow: theme.shadowPurple,
  },
  actionsSeparator: {
    borderTop: `1px solid ${theme.borderSubtle}`,
    paddingTop: '16px',
    marginTop: '8px',
  },
  sidebarActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sidebarButton: {
    width: '100%',
    padding: '12px 16px',
    background: theme.accentGradient,
    border: 'none',
    borderRadius: theme.radiusSmall,
    color: '#FFFFFF',
    fontSize: theme.fontSm,
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 150ms ease-out',
    boxShadow: theme.shadowPurple,
  },
  sidebarButtonDanger: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: theme.errorBg,
    border: `1px solid ${theme.errorBorder}`,
    borderRadius: theme.radiusSmall,
    color: theme.errorText,
    fontSize: theme.fontSm,
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 150ms ease-out',
  },
  sidebarButtonSecondary: {
    width: '100%',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: theme.radiusSmall,
    color: theme.textMuted,
    fontSize: theme.fontXs,
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 150ms ease-out',
  },

  // Middle Column
  middleColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    gap: '24px',
    overflow: 'hidden',
  },
  previewSection: {
    flex: '0 0 auto',
  },
  previewContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    backgroundColor: theme.surfaceSolidAlt,
    borderRadius: theme.radiusMedium,
    overflow: 'hidden',
    border: `1px solid ${theme.borderSubtle}`,
    boxShadow: theme.shadowPurple,
  },
  previewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: '50%',
    color: theme.textPrimary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
    boxShadow: theme.shadowPurple,
  },
  rejectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectedBanner: {
    padding: '16px 32px',
    backgroundColor: theme.errorBg,
    border: `2px solid ${theme.errorBorder}`,
    borderRadius: theme.radiusMedium,
    color: theme.errorText,
    fontSize: theme.fontXl,
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  previewControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  frameCounter: {
    fontSize: theme.fontBase,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  rejectButton: {
    padding: '10px 20px',
    backgroundColor: theme.errorBg,
    border: `1px solid ${theme.errorBorder}`,
    borderRadius: theme.radiusSmall,
    color: theme.errorText,
    fontSize: theme.fontSm,
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 150ms ease-out',
  },
  rejectedButton: {
    padding: '10px 20px',
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    border: `2px solid ${theme.errorBorder}`,
    borderRadius: theme.radiusSmall,
    color: theme.errorText,
    fontSize: theme.fontSm,
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 150ms ease-out',
  },

  // Timeline - Full Width Filmstrip
  timelineSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderTop: `1px solid ${theme.borderSubtle}`,
    paddingTop: '16px',
  },
  timelineHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '8px',
  },
  timelineLabel: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.textDim,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  progressBarContainer: {
    position: 'relative',
    height: '4px',
    backgroundColor: theme.glassStrong,
    borderRadius: '2px',
    marginBottom: '12px',
    overflow: 'visible',
  },
  progressBar: {
    height: '100%',
    background: theme.accentGradient,
    borderRadius: '2px',
    transition: 'width 200ms ease-out',
  },
  playhead: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '12px',
    height: '12px',
    backgroundColor: theme.accentPurple,
    borderRadius: '50%',
    border: `2px solid #FFFFFF`,
    boxShadow: theme.shadowPurple,
    transition: 'left 200ms ease-out',
  },
  zoomControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  zoomButton: {
    width: '28px',
    height: '28px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: theme.radiusSmall,
    color: theme.textSecondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
  },
  zoomLabel: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    fontWeight: '600',
    minWidth: '45px',
    textAlign: 'center',
  },
  timelineScroll: {
    flex: 1,
    overflowX: 'auto',
    overflowY: 'hidden',
    paddingTop: '16px',
  },
  filmstrip: {
    display: 'flex',
    gap: '8px',
    height: '100%',
    alignItems: 'center',
  },
  thumbnail: {
    position: 'relative',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  thumbnailActive: {
    transform: 'scale(1.1)',
  },
  thumbnailImage: {
    width: '100%',
    height: '60px',
    borderRadius: theme.radiusSmall,
    border: `2px solid ${theme.borderSubtle}`,
    transition: 'all 150ms ease-out',
  },
  rejectedPill: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '20px',
    height: '20px',
    backgroundColor: theme.errorText,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  thumbnailLabel: {
    display: 'block',
    marginTop: '4px',
    fontSize: theme.fontXs,
    color: theme.textMuted,
    textAlign: 'center',
  },

  // Right Panel
  rightPanel: {
    width: '320px',
    flexShrink: 0,
    backgroundColor: theme.glassLight,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    borderLeft: `1px solid ${theme.borderSubtle}`,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoTitle: {
    fontSize: theme.fontSm,
    fontWeight: '600',
    color: theme.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: 0,
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: theme.fontSm,
    color: theme.textMuted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: theme.fontSm,
    color: theme.textPrimary,
    fontWeight: '600',
  },
  statusPill: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: theme.fontXs,
    fontWeight: '600',
  },

  // Status Bar
  statusBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    backgroundColor: theme.glassLight,
    borderTop: `1px solid ${theme.borderSubtle}`,
    fontSize: theme.fontXs,
    color: theme.textMuted,
    height: '40px',
    flexShrink: 0,
  },
  statusLeft: {
    fontWeight: '500',
  },
  statusRight: {
    fontWeight: '500',
  },
};
