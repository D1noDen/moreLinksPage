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
  shadowLight: '0 2px 8px rgba(167, 139, 250, 0.08)',
  radiusSmall: '10px',
  radiusMedium: '14px',
  radiusLarge: '20px',
  fontXs: '11px',
  fontSm: '13px',
  fontBase: '14px',
  fontLg: '16px',
  fontXl: '20px',
  // Added for enhanced timeline
  goldAccent: '#F59E0B',
  borderGold: 'rgba(245, 158, 11, 0.6)',
  shadowGold: '0 4px 16px rgba(245, 158, 11, 0.25)',
};

export default function ReviewPageLight() {
  const [currentFrame, setCurrentFrame] = useState(123);
  const [rejectedFrames, setRejectedFrames] = useState(new Set([45, 89, 156, 234, 345, 456, 567, 678, 723, 756, 789, 790]));
  const [keyFrames] = useState(new Set([1, 50, 100, 123, 200, 300, 400, 500, 600, 700, 800]));
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('all'); // 'keyframes' or 'all'
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
    if (viewMode === 'keyframes') {
      // Show only key frames
      keyFrames.forEach(frame => thumbnails.push(frame));
    } else {
      // Show all frames (limited for demo)
      const step = Math.ceil(totalFrames / 25);
      for (let i = 1; i <= totalFrames; i += step) {
        thumbnails.push(i);
      }
    }
    return thumbnails;
  };

  const thumbnails = generateThumbnails();

  const handleTimelineZoomIn = () => {
    setZoomLevel(Math.min(150, zoomLevel + 25));
  };

  const handleTimelineZoomOut = () => {
    setZoomLevel(Math.max(50, zoomLevel - 25));
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          
          /* Custom Scrollbar Styles */
          .timeline-scroll::-webkit-scrollbar {
            height: 8px;
          }
          
          .timeline-scroll::-webkit-scrollbar-track {
            background: rgba(167, 139, 250, 0.1);
            border-radius: 4px;
          }
          
          .timeline-scroll::-webkit-scrollbar-thumb {
            background: ${theme.accentPurple};
            border-radius: 4px;
            position: relative;
          }
          
          .timeline-scroll::-webkit-scrollbar-thumb::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 6px;
            height: 6px;
            background: ${theme.accentPurple};
            border: 2px solid white;
          }
        `}
      </style>

      {/* Top Navigation */}
      <div style={styles.topNav}>
        <div style={styles.navLeft}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>EZ</div>
            <div>
              <div style={styles.logoText}>Ez Timelapse</div>
              <div style={styles.logoSubtitle}>AI Powered Creator</div>
            </div>
          </div>
        </div>
        <div style={styles.navCenter}>
          <button style={{...styles.tab, ...styles.tabActive}}>Review</button>
          <button style={styles.tab}>Adjustments</button>
          <button style={styles.tab}>Export</button>
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

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          {/* Project Info Card */}
          {projectName && (
            <div style={styles.projectCard}>
              <div style={styles.projectCardHeader}>
                <h4 style={styles.projectCardTitle}>PROJECT INFO</h4>
              </div>
              <div style={styles.projectCardBody}>
                <h3 style={styles.projectTitle}>{projectName}</h3>
                <div style={styles.projectStats}>
                  <span>{totalFrames} frames â€¢ 26.7s @ 30fps</span>
                  <span style={styles.rejectedCount}>{rejectedFrames.size} rejected</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions Section */}
          <div style={styles.actionSection}>
            <h4 style={styles.actionSectionTitle}>ACTIONS</h4>
            <button style={styles.actionButton}>
              <Upload size={16} />
              Import More Images
            </button>
            {rejectedFrames.size > 0 && (
              <>
                <button style={styles.removeButton} onClick={handleRemoveRejected}>
                  <Trash2 size={16} />
                  Remove Rejected
                </button>
                <button style={styles.resetButton} onClick={handleResetRejected}>
                  <RotateCcw size={16} />
                  Reset Rejections
                </button>
              </>
            )}
          </div>
        </div>

        {/* Center - Preview and Timeline */}
        <div style={styles.centerArea}>
          {/* Preview */}
          <div style={styles.previewSection}>
            <div style={styles.previewWrapper}>
              <div style={styles.preview}>
                <button style={{...styles.navArrow, left: '20px'}} onClick={goToPrevFrame}>
                  <ChevronLeft size={24} />
                </button>
                <div style={styles.previewPlaceholder}>
                  {isRejected && <div style={styles.rejectedOverlay}>REJECTED</div>}
                  <span>Frame {currentFrame}</span>
                </div>
                <button style={{...styles.navArrow, right: '20px'}} onClick={goToNextFrame}>
                  <ChevronRight size={24} />
                </button>
              </div>
              <div style={styles.previewControls}>
                <span style={styles.frameCounter}>
                  Frame {currentFrame} / {totalFrames}
                </span>
                {isRejected ? (
                  <button style={styles.rejectedButton} onClick={toggleReject}>
                    <X size={18} />
                    Rejected (Click to Include)
                  </button>
                ) : (
                  <button style={styles.rejectButton} onClick={toggleReject}>
                    <X size={18} />
                    Remove Rejected
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Timeline Section - Enhanced Version */}
          <div style={styles.timelineSection}>
            {/* Timeline Header with Controls */}
            <div style={styles.timelineHeader}>
              <div style={styles.timelineLeftControls}>
                <span style={styles.timelineLabel}>TIMELINE</span>
                
                {/* Zoom Controls */}
                <div style={styles.timelineZoomControls}>
                  <button 
                    style={styles.timelineZoomButton}
                    onClick={handleTimelineZoomOut}
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span style={styles.zoomPercent}>{zoomLevel}%</span>
                  <button 
                    style={styles.timelineZoomButton}
                    onClick={handleTimelineZoomIn}
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>

              <div style={styles.timelineRightControls}>
                {/* View Mode Toggle */}
                <button
                  style={{
                    ...styles.viewModeButton,
                    ...(viewMode === 'keyframes' ? styles.viewModeButtonActive : {})
                  }}
                  onClick={() => setViewMode('keyframes')}
                >
                  Key Frames Only
                </button>
                <button
                  style={{
                    ...styles.viewModeButton,
                    ...(viewMode === 'all' ? styles.viewModeButtonActive : {})
                  }}
                  onClick={() => setViewMode('all')}
                >
                  All Frames
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={styles.progressBarContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${(currentFrame / totalFrames) * 100}%`
                  }}
                />
                <div 
                  style={{
                    ...styles.progressDiamond,
                    left: `${(currentFrame / totalFrames) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Timeline with navigation arrows */}
            <div style={styles.thumbnailsWrapper}>
              {/* Left Timeline Arrow */}
              <button 
                style={styles.timelineArrowLeft}
                onClick={goToPrevFrame}
                disabled={currentFrame === 1}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Timeline Arrow */}
              <button 
                style={styles.timelineArrowRight}
                onClick={goToNextFrame}
                disabled={currentFrame === totalFrames}
              >
                <ChevronRight size={20} />
              </button>

              {/* Thumbnails */}
              <div className="timeline-scroll" style={styles.thumbnailsContainer}>
                <div style={{
                  ...styles.thumbnailsRow,
                  gap: `${6 * (100 / zoomLevel)}px`
                }}>
                  {thumbnails.map(frameNum => {
                    const isKeyFrame = keyFrames.has(frameNum);
                    const isCurrent = frameNum === currentFrame;
                    
                    return (
                      <button
                        key={frameNum}
                        style={{
                          ...styles.thumbnail,
                          ...(isKeyFrame ? styles.thumbnailKeyFrame : {}),
                          ...(isCurrent ? styles.thumbnailCurrent : {}),
                          width: `${90 * (zoomLevel / 100)}px`
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
                          <div style={styles.rejectedTag}>
                            <X size={12} />
                          </div>
                        )}
                        {isKeyFrame && (
                          <div style={styles.keyFrameDot} />
                        )}
                        <span style={styles.thumbnailLabel}>{frameNum}</span>
                      </button>
                    );
                  })}
                </div>
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

  // Main Content
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },

  // Left Panel
  leftPanel: {
    width: '280px',
    flexShrink: 0,
    backgroundColor: theme.glassLight,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    borderRight: `1px solid ${theme.borderSubtle}`,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
  },
  projectCard: {
    backgroundColor: theme.glassMedium,
    borderRadius: theme.radiusMedium,
    overflow: 'hidden',
    border: `1px solid ${theme.borderSubtle}`,
  },
  projectCardHeader: {
    padding: '12px 16px',
    borderBottom: `1px solid ${theme.borderSubtle}`,
  },
  projectCardTitle: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.textDim,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: 0,
  },
  projectCardBody: {
    padding: '16px',
  },
  projectTitle: {
    fontSize: theme.fontLg,
    fontWeight: '600',
    color: theme.textPrimary,
    margin: '0 0 8px 0',
  },
  projectStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: theme.fontSm,
    color: theme.textSecondary,
  },
  rejectedCount: {
    color: theme.errorText,
    fontWeight: '600',
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  actionSectionTitle: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.textDim,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '0 0 8px 0',
  },
  actionButton: {
    padding: '10px',
    backgroundColor: theme.glassMedium,
    border: `1px solid ${theme.borderPrimary}`,
    borderRadius: theme.radiusSmall,
    color: theme.accentPurple,
    fontSize: theme.fontSm,
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 150ms ease-out',
  },
  removeButton: {
    padding: '10px',
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
  resetButton: {
    padding: '10px',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: theme.radiusSmall,
    color: theme.textSecondary,
    fontSize: theme.fontSm,
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 150ms ease-out',
  },

  // Center Area
  centerArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '16px',
    overflow: 'hidden',
  },
  previewSection: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  previewWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  preview: {
    flex: 1,
    backgroundColor: theme.glassMedium,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    borderRadius: theme.radiusMedium,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: `1px solid ${theme.borderSubtle}`,
    boxShadow: theme.shadowPurple,
  },
  previewPlaceholder: {
    fontSize: '32px',
    color: theme.textMuted,
    fontWeight: '600',
    textAlign: 'center',
  },
  rejectedOverlay: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '8px 16px',
    backgroundColor: theme.errorText,
    color: '#FFFFFF',
    borderRadius: theme.radiusSmall,
    fontSize: theme.fontSm,
    fontWeight: '700',
    letterSpacing: '1px',
  },
  navArrow: {
    position: 'absolute',
    width: '48px',
    height: '48px',
    backgroundColor: theme.glassStrong,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.textSecondary,
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    top: '50%',
    transform: 'translateY(-50%)',
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

  // Timeline - Enhanced Version
  timelineSection: {
    backgroundColor: theme.glassMedium,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: theme.radiusMedium,
    padding: '12px 16px',
    boxShadow: theme.shadowLight,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    height: '180px',
  },
  timelineHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '8px',
  },
  timelineLeftControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  timelineLabel: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.textDim,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  timelineZoomControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  timelineZoomButton: {
    width: '24px',
    height: '24px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: '6px',
    color: theme.textSecondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
  },
  zoomPercent: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    fontWeight: '600',
    minWidth: '35px',
    textAlign: 'center',
  },
  timelineRightControls: {
    display: 'flex',
    gap: '4px',
  },
  viewModeButton: {
    padding: '4px 12px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderPrimary}`,
    borderRadius: '16px',
    fontSize: theme.fontXs,
    fontWeight: '500',
    color: theme.accentPurple,
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  viewModeButtonActive: {
    background: theme.accentGradient,
    color: '#FFFFFF',
    border: 'none',
  },
  progressBarContainer: {
    paddingBottom: '8px',
  },
  progressBar: {
    position: 'relative',
    height: '4px',
    backgroundColor: theme.glassStrong,
    borderRadius: '2px',
    overflow: 'visible',
  },
  progressFill: {
    height: '100%',
    background: theme.accentGradient,
    borderRadius: '2px',
    transition: 'width 200ms ease-out',
  },
  progressDiamond: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    width: '10px',
    height: '10px',
    backgroundColor: theme.accentPurple,
    border: `2px solid #FFFFFF`,
    cursor: 'grab',
  },
  thumbnailsWrapper: {
    position: 'relative',
    flex: 1,
  },
  timelineArrowLeft: {
    position: 'absolute',
    left: '-10px',
    top: '35%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
    backgroundColor: theme.glassStrong,
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
    zIndex: 10,
    boxShadow: theme.shadowLight,
  },
  timelineArrowRight: {
    position: 'absolute',
    right: '-10px',
    top: '35%',
    transform: 'translateY(-50%)',
    width: '36px',
    height: '36px',
    backgroundColor: theme.glassStrong,
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
    zIndex: 10,
    boxShadow: theme.shadowLight,
  },
  thumbnailsContainer: {
    overflowX: 'auto',
    overflowY: 'hidden',
    height: '90px',
  },
  thumbnailsRow: {
    display: 'flex',
    height: '100%',
  },
  thumbnail: {
    flexShrink: 0,
    height: '70px',
    borderRadius: theme.radiusSmall,
    border: `2px solid ${theme.borderSubtle}`,
    backgroundColor: theme.glassLight,
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    position: 'relative',
  },
  thumbnailKeyFrame: {
    borderColor: theme.goldAccent,
    boxShadow: `0 0 8px ${theme.goldAccent}40`,
  },
  thumbnailCurrent: {
    borderColor: theme.accentPurple,
    transform: 'scale(1.08)',
    boxShadow: `0 0 12px ${theme.accentPurple}60`,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
  },
  rejectedTag: {
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
    color: '#FFFFFF',
  },
  keyFrameDot: {
    position: 'absolute',
    bottom: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '8px',
    height: '8px',
    backgroundColor: theme.goldAccent,
    borderRadius: '50%',
    border: '2px solid #FFFFFF',
  },
  thumbnailLabel: {
    position: 'absolute',
    bottom: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '10px',
    color: theme.textMuted,
    fontWeight: '600',
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
  infoCard: {
    backgroundColor: theme.glassMedium,
    borderRadius: theme.radiusMedium,
    padding: '16px',
    border: `1px solid ${theme.borderSubtle}`,
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
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