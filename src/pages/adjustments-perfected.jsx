import React, { useState } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  HelpCircle,
  User,
  Sparkles,
  Cloud,
  Volume2,
  Aperture,
  Palette,
  Maximize2,
  X,
  Info,
  ZoomIn,
  ZoomOut,
  AlertCircle,
  Zap,
  Sliders
} from 'lucide-react';

// Design Tokens - Light Glassmorphic
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
  errorText: '#DC2626',
  errorBg: 'rgba(220, 38, 38, 0.1)',
  errorBorder: 'rgba(220, 38, 38, 0.3)',
  successText: '#15803D',
  successBg: 'rgba(34, 197, 94, 0.1)',
  successBorder: 'rgba(34, 197, 94, 0.3)',
  infoText: '#1E40AF',
  infoBg: 'rgba(59, 130, 246, 0.1)',
  infoBorder: 'rgba(59, 130, 246, 0.2)',
  
  // Borders
  borderSubtle: 'rgba(156, 163, 175, 0.15)',
  borderPurple: 'rgba(167, 139, 250, 0.4)',
  borderGold: 'rgba(245, 158, 11, 0.6)',
  
  // Shadows
  shadowPurple: '0 4px 16px rgba(167, 139, 250, 0.25)',
  shadowGold: '0 4px 16px rgba(245, 158, 11, 0.25)',
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

export default function AdjustmentsPage() {
  const [adjustmentMode, setAdjustmentMode] = useState('easy'); // 'easy' or 'advanced'
  const [activeLUT, setActiveLUT] = useState('warm-sunset');
  const [framingMode, setFramingMode] = useState('cinematic');
  const [colorTone, setColorTone] = useState('auto');
  const [currentFrame, setCurrentFrame] = useState(123);
  const [rejectedFrames, setRejectedFrames] = useState(new Set([45, 89, 156, 234]));
  const [keyFrames] = useState(new Set([1, 50, 100, 123, 200, 300, 400, 500, 600, 700, 800]));
  const [transitionMode, setTransitionMode] = useState('crossfade');
  const [crossfadeDuration, setCrossfadeDuration] = useState('0.5');
  const [viewMode, setViewMode] = useState('keyframes'); // 'keyframes' or 'all'
  const [zoomLevel, setZoomLevel] = useState(75);
  const [makeColorsPop, setMakeColorsPop] = useState(false);
  const totalFrames = 800;
  
  // Collapsible states for sidebar sections
  const [expandedSections, setExpandedSections] = useState({
    colorLook: true,
    cinematicFraming: true,
    transitions: true
  });
  
  const [aiEnhancements, setAiEnhancements] = useState({
    deflicker: true,
    stabilizeExposure: true,
    skyRecovery: false,
    lowLightClean: false,
    dehaze: false
  });

  const luts = [
    { id: 'none', name: 'None', gradient: 'linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 100%)' },
    { id: 'warm-sunset', name: 'Warm Sunset', gradient: 'linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)' },
    { id: 'blue-hour', name: 'Blue Hour', gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' },
    { id: 'vintage-film', name: 'Vintage Film', gradient: 'linear-gradient(135deg, #92400E 0%, #FDE68A 100%)' },
    { id: 'cool-neutral', name: 'Cool Neutral', gradient: 'linear-gradient(135deg, #6B7280 0%, #93C5FD 100%)' }
  ];

  const framingOptions = [
    { id: 'original', label: 'Original (no bars)' },
    { id: 'cinematic', label: 'Cinematic 2.00:1' },
    { id: 'anamorphic', label: 'Anamorphic 2.39:1' }
  ];

  const crossfadeDurations = [
    { value: '0.3', label: '0.3s', sublabel: 'Quick' },
    { value: '0.5', label: '0.5s', sublabel: 'Standard' },
    { value: '1.0', label: '1.0s', sublabel: 'Slow' },
    { value: '2.0', label: '2.0s', sublabel: 'Very Slow' }
  ];

  // Generate thumbnails for timeline
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

  const goToPrevFrame = () => {
    if (currentFrame > 1) setCurrentFrame(currentFrame - 1);
  };

  const goToNextFrame = () => {
    if (currentFrame < totalFrames) setCurrentFrame(currentFrame + 1);
  };

  const toggleAI = (feature) => {
    setAiEnhancements(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const toggleReject = () => {
    const newRejected = new Set(rejectedFrames);
    if (rejectedFrames.has(currentFrame)) {
      newRejected.delete(currentFrame);
    } else {
      newRejected.add(currentFrame);
    }
    setRejectedFrames(newRejected);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isFrameRejected = rejectedFrames.has(currentFrame);

  // Get active badges for preview
  const getActiveBadges = () => {
    const badges = [];
    if (aiEnhancements.deflicker) badges.push('Deflicker ON');
    if (aiEnhancements.stabilizeExposure) badges.push('Stabilize ON');
    if (aiEnhancements.skyRecovery) badges.push('Sky Recovery ON');
    if (aiEnhancements.lowLightClean) badges.push('Low-Light Clean ON');
    if (aiEnhancements.dehaze) badges.push('Dehaze ON');
    return badges;
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(200, zoomLevel + 25));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(50, zoomLevel - 25));
  };

  const handleFit = () => {
    setZoomLevel(100);
  };

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
          
          input[type="checkbox"] {
            accent-color: ${theme.accentPurple};
          }
          
          input[type="radio"] {
            accent-color: ${theme.accentPurple};
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
          <button style={{...styles.tab, ...styles.tabActive}}>Adjustments</button>
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

      {/* Main Content - 3 Columns */}
      <div style={styles.mainContent}>
        
        {/* Left Sidebar */}
        <div style={styles.leftSidebar}>
          
          {/* Mode Toggle */}
          <div style={styles.modeToggleContainer}>
            <button
              style={{
                ...styles.modeToggleButton,
                ...(adjustmentMode === 'easy' ? styles.modeToggleButtonActive : {})
              }}
              onClick={() => setAdjustmentMode('easy')}
            >
              <Zap size={16} />
              <span>Easy Mode</span>
            </button>
            <button
              style={{
                ...styles.modeToggleButton,
                ...(adjustmentMode === 'advanced' ? styles.modeToggleButtonActive : {})
              }}
              onClick={() => setAdjustmentMode('advanced')}
            >
              <Sliders size={16} />
              <span>Advanced</span>
            </button>
          </div>
          
          {/* AI Enhancements Section - NOT COLLAPSIBLE */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sectionHeader}>AI ENHANCEMENTS</h3>
            <p style={styles.sectionCaption}>Applied to the whole timelapse</p>
            <div style={styles.infoCard}>
              
              {/* Deflicker */}
              <div style={styles.toggleRow}>
                <div style={styles.toggleContent}>
                  <div style={styles.toggleLabel}>Deflicker</div>
                  <div style={styles.toggleHelper}>Removes flicker and brightness jumps between frames.</div>
                </div>
                <button
                  style={{
                    ...styles.toggleSwitch,
                    ...(aiEnhancements.deflicker ? styles.toggleSwitchActive : {})
                  }}
                  onClick={() => toggleAI('deflicker')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: aiEnhancements.deflicker ? 'translateX(24px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
              
              {/* Stabilize Exposure */}
              <div style={styles.toggleRow}>
                <div style={styles.toggleContent}>
                  <div style={styles.toggleLabel}>Stabilize Exposure</div>
                  <div style={styles.toggleHelper}>Smooths slow exposure drift when light changes.</div>
                </div>
                <button
                  style={{
                    ...styles.toggleSwitch,
                    ...(aiEnhancements.stabilizeExposure ? styles.toggleSwitchActive : {})
                  }}
                  onClick={() => toggleAI('stabilizeExposure')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: aiEnhancements.stabilizeExposure ? 'translateX(24px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
              
              {/* Sky Recovery */}
              <div style={styles.toggleRow}>
                <div style={styles.toggleContent}>
                  <div style={styles.toggleLabel}>Sky Recovery</div>
                  <div style={styles.toggleHelper}>Brings back detail in bright skies.</div>
                </div>
                <button
                  style={{
                    ...styles.toggleSwitch,
                    ...(aiEnhancements.skyRecovery ? styles.toggleSwitchActive : {})
                  }}
                  onClick={() => toggleAI('skyRecovery')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: aiEnhancements.skyRecovery ? 'translateX(24px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
              
              {/* Low-Light Clean */}
              <div style={styles.toggleRow}>
                <div style={styles.toggleContent}>
                  <div style={styles.toggleLabel}>Low-Light Clean</div>
                  <div style={styles.toggleHelper}>Reduces night noise and grain.</div>
                </div>
                <button
                  style={{
                    ...styles.toggleSwitch,
                    ...(aiEnhancements.lowLightClean ? styles.toggleSwitchActive : {})
                  }}
                  onClick={() => toggleAI('lowLightClean')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: aiEnhancements.lowLightClean ? 'translateX(24px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
              
              {/* Dehaze / Fog Cut */}
              <div style={styles.toggleRow}>
                <div style={styles.toggleContent}>
                  <div style={styles.toggleLabel}>Dehaze / Fog Cut</div>
                  <div style={styles.toggleHelper}>Adds clarity in haze and fog.</div>
                </div>
                <button
                  style={{
                    ...styles.toggleSwitch,
                    ...(aiEnhancements.dehaze ? styles.toggleSwitchActive : {})
                  }}
                  onClick={() => toggleAI('dehaze')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: aiEnhancements.dehaze ? 'translateX(24px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
            </div>
          </div>

          {/* Color & Look Section - COLLAPSIBLE */}
          <div style={styles.sidebarSection}>
            <button 
              style={styles.sectionHeaderButton}
              onClick={() => toggleSection('colorLook')}
            >
              <span>COLOR & LOOK</span>
              {expandedSections.colorLook ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {expandedSections.colorLook && (
              <>
                {/* LUT Picker */}
                <div style={styles.lutList}>
                  {luts.map(lut => (
                    <button
                      key={lut.id}
                      style={{
                        ...styles.lutRow,
                        ...(activeLUT === lut.id ? styles.lutRowActive : {})
                      }}
                      onClick={() => setActiveLUT(lut.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = theme.shadowPurple;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{...styles.lutThumbnail, background: lut.gradient}} />
                      <span style={styles.lutName}>{lut.name}</span>
                      {activeLUT === lut.id && (
                        <span style={styles.appliedBadge}>Applied</span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Color Tone Dropdown */}
                <div style={styles.dropdownContainer}>
                  <label style={styles.dropdownLabel}>Color Tone</label>
                  <select 
                    style={styles.dropdown}
                    value={colorTone}
                    onChange={(e) => setColorTone(e.target.value)}
                  >
                    <option value="auto">Auto</option>
                    <option value="daylight">Daylight</option>
                    <option value="tungsten">Tungsten</option>
                    <option value="sunset">Sunset Skin Fix</option>
                  </select>
                </div>
                
                {/* Make colors pop checkbox */}
                <label style={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    style={styles.checkbox}
                    checked={makeColorsPop}
                    onChange={(e) => setMakeColorsPop(e.target.checked)}
                  />
                  <div>
                    <span>Make colors pop more</span>
                    <div style={styles.checkboxHelper}>Adds gentle contrast and color.</div>
                  </div>
                </label>
              </>
            )}
          </div>

          {/* Cinematic Framing Section - COLLAPSIBLE */}
          <div style={styles.sidebarSection}>
            <button 
              style={styles.sectionHeaderButton}
              onClick={() => toggleSection('cinematicFraming')}
            >
              <span>CINEMATIC FRAMING</span>
              {expandedSections.cinematicFraming ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {expandedSections.cinematicFraming && (
              <>
                <div style={styles.pillGroup}>
                  {framingOptions.map(option => (
                    <button
                      key={option.id}
                      style={{
                        ...styles.pill,
                        ...(framingMode === option.id ? styles.pillActive : {})
                      }}
                      onClick={() => setFramingMode(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p style={styles.helperNote}>
                  Black bars shown here. Final export will match.
                </p>
              </>
            )}
          </div>

          {/* Transitions Between Photos Section - COLLAPSIBLE */}
          <div style={styles.sidebarSection}>
            <button 
              style={styles.sectionHeaderButton}
              onClick={() => toggleSection('transitions')}
            >
              <span>TRANSITIONS</span>
              {expandedSections.transitions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {expandedSections.transitions && (
              <>
                <p style={styles.sectionCaption}>Between photos</p>
                <div style={styles.infoCard}>
                  <div style={styles.radioGroup}>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="transition"
                        value="none"
                        checked={transitionMode === 'none'}
                        onChange={(e) => setTransitionMode(e.target.value)}
                        style={styles.radioInput}
                      />
                      <div style={styles.radioContent}>
                        <div style={styles.radioLabel}>None</div>
                        <div style={styles.radioSubtext}>Instant cuts between photos.</div>
                      </div>
                    </label>
                    
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="transition"
                        value="crossfade"
                        checked={transitionMode === 'crossfade'}
                        onChange={(e) => setTransitionMode(e.target.value)}
                        style={styles.radioInput}
                      />
                      <div style={styles.radioContent}>
                        <div style={styles.radioLabel}>Crossfade</div>
                        <div style={styles.radioSubtext}>Smooth blend between photos.</div>
                      </div>
                    </label>
                  </div>

                  {transitionMode === 'crossfade' && (
                    <>
                      <div style={styles.durationRowSidebar}>
                        <span style={styles.durationLabel}>Duration:</span>
                        <div style={styles.durationChipsSidebar}>
                          {crossfadeDurations.map(duration => (
                            <button
                              key={duration.value}
                              style={{
                                ...styles.durationChipSmall,
                                ...(crossfadeDuration === duration.value ? styles.durationChipActive : {})
                              }}
                              onClick={() => setCrossfadeDuration(duration.value)}
                            >
                              <div style={styles.durationValueSmall}>{duration.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={styles.infoBarSmall}>
                        <Info size={14} color={theme.infoText} />
                        <span style={styles.infoTextSmall}>
                          Blends the end of one photo into the next.
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Middle Column */}
        <div style={styles.middleColumn}>
          
          {/* Large Preview Area */}
          <div style={styles.previewContainer}>
            <div style={styles.previewImage}>
              {/* Top-left AI feature chips */}
              <div style={styles.overlayChipsTopLeft}>
                {getActiveBadges().map((badge, index) => (
                  <div key={index} style={styles.featureChip}>{badge}</div>
                ))}
              </div>

              {/* Top-right preview controls */}
              <div style={styles.overlayControlsTopRight}>
                <button style={styles.previewControlButton} onClick={handleZoomOut}>
                  <ZoomOut size={16} />
                </button>
                <button style={styles.previewControlButton} onClick={handleZoomIn}>
                  <ZoomIn size={16} />
                </button>
                <button style={styles.previewControlButton} onClick={handleFit}>
                  <Maximize2 size={16} />
                </button>
              </div>
              
              {/* Navigation arrows */}
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
              
              {/* Preview placeholder */}
              <div style={styles.previewPlaceholder}>
                Frame {currentFrame}
              </div>

              {/* Frame counter - bottom right overlay chip */}
              <div style={styles.frameCounterChip}>
                Frame {currentFrame} / {totalFrames}
              </div>
              
              {/* Reject Frame button - bottom center */}
              <button 
                style={{
                  ...styles.rejectFrameButton,
                  ...(isFrameRejected ? styles.rejectFrameButtonActive : {})
                }}
                onClick={toggleReject}
              >
                <X size={16} />
                <span>{isFrameRejected ? 'Rejected' : 'Reject Frame'}</span>
              </button>
            </div>
          </div>

          {/* Timeline Strip - Enhanced */}
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
                        <div style={styles.thumbnailImage}>
                          {frameNum}
                        </div>
                        {rejectedFrames.has(frameNum) && (
                          <div style={styles.rejectedTag}>
                            <X size={12} />
                          </div>
                        )}
                        {isKeyFrame && (
                          <div style={styles.keyFrameDot} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={styles.rightSidebar}>
          
          {/* Frame Info */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>FRAME INFO</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Frame number</span>
                <span style={styles.infoValue}>{currentFrame}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Timestamp</span>
                <span style={styles.infoValue}>00:04:06 PM</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Status</span>
                {isFrameRejected ? (
                  <span style={styles.statusPillRejected}>Rejected</span>
                ) : (
                  <span style={styles.statusPillIncluded}>Included</span>
                )}
              </div>
            </div>
          </div>

          {/* Adjustments Applied Section */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>ADJUSTMENTS APPLIED</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Deflicker</span>
                <span style={{...styles.infoValue, color: aiEnhancements.deflicker ? theme.successText : theme.textMuted}}>
                  {aiEnhancements.deflicker ? 'ON' : 'OFF'}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Stabilize</span>
                <span style={{...styles.infoValue, color: aiEnhancements.stabilizeExposure ? theme.successText : theme.textMuted}}>
                  {aiEnhancements.stabilizeExposure ? 'ON' : 'OFF'}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Sky Recovery</span>
                <span style={{...styles.infoValue, color: aiEnhancements.skyRecovery ? theme.successText : theme.textMuted}}>
                  {aiEnhancements.skyRecovery ? 'ON' : 'OFF'}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Color Look</span>
                <span style={styles.infoValue}>
                  {luts.find(l => l.id === activeLUT)?.name || 'None'}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Aspect</span>
                <span style={styles.infoValue}>
                  {framingMode === 'original' ? 'Original' :
                   framingMode === 'cinematic' ? '2.00:1' :
                   'Anamorphic'}
                </span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Transition</span>
                <span style={styles.infoValue}>
                  {transitionMode === 'none' ? 'None' : `Crossfade ${crossfadeDuration}s`}
                </span>
              </div>
            </div>
          </div>

          {/* Capture Data */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>CAPTURE DATA</h3>
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

          {/* Project */}
          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>PROJECT</h3>
            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Total frames</span>
                <span style={styles.infoValue}>{totalFrames}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Rejected</span>
                <span style={styles.infoValueRed}>{rejectedFrames.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div style={styles.statusBar}>
        <div style={styles.statusLeft}>
          <span style={{ color: theme.accentPurple, fontWeight: '600' }}>Trial: 14 days left</span>
          <span> â€¢ Exports up to 8K, no watermark</span>
        </div>
        <div style={styles.statusRight}>
          <span>NVIDIA RTX 4090</span>
          <span> â€¢ </span>
          <span>v2.0</span>
        </div>
      </div>
    </div>
  );
}

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

  // Top Navigation
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

  // Main Content
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },

  // Left Sidebar
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
  
  // Mode Toggle
  modeToggleContainer: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    backgroundColor: theme.glassMedium,
    borderRadius: theme.radiusSmall,
    border: `1px solid ${theme.borderSubtle}`,
  },
  modeToggleButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: theme.textMuted,
    fontSize: theme.fontSm,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  modeToggleButtonActive: {
    backgroundColor: theme.glassStrong,
    color: theme.textPrimary,
    boxShadow: theme.shadowLight,
    border: `1px solid ${theme.borderPurple}`,
  },
  
  sidebarSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionHeader: {
    fontSize: theme.fontXs,
    fontWeight: '500',
    color: theme.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: 0,
  },
  sectionHeaderButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.fontXs,
    fontWeight: '500',
    color: theme.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  sectionCaption: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    fontStyle: 'italic',
    margin: '-8px 0 4px 0',
  },
  infoCard: {
    backgroundColor: theme.glassMedium,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: theme.radiusSmall,
    padding: '12px',
    boxShadow: theme.shadowLight,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },
  toggleContent: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: theme.fontSm,
    fontWeight: '500',
    color: theme.textPrimary,
    marginBottom: '2px',
  },
  toggleHelper: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    lineHeight: '1.3',
  },
  toggleSwitch: {
    width: '48px',
    height: '24px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: '12px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    flexShrink: 0,
  },
  toggleSwitchActive: {
    backgroundColor: theme.accentPurple,
    borderColor: theme.accentPurple,
  },
  toggleThumb: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    top: '2px',
    transition: 'transform 150ms ease-out',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  lutList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  lutRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    position: 'relative',
  },
  lutRowActive: {
    border: `1px solid ${theme.borderPurple}`,
    boxShadow: theme.shadowLight,
  },
  lutThumbnail: {
    width: '48px',
    height: '36px',
    borderRadius: '6px',
    flexShrink: 0,
  },
  lutName: {
    fontSize: theme.fontSm,
    fontWeight: '500',
    color: theme.textPrimary,
    flex: 1,
  },
  appliedBadge: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.accentPurple,
    padding: '2px 8px',
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: '4px',
  },
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '12px',
  },
  dropdownLabel: {
    fontSize: theme.fontXs,
    fontWeight: '500',
    color: theme.textMuted,
  },
  dropdown: {
    padding: '8px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: theme.radiusSmall,
    fontSize: theme.fontSm,
    color: theme.textPrimary,
    cursor: 'pointer',
    outline: 'none',
  },
  checkboxLabel: {
    display: 'flex',
    gap: '8px',
    fontSize: theme.fontSm,
    color: theme.textPrimary,
    marginTop: '8px',
    cursor: 'pointer',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    marginTop: '2px',
    flexShrink: 0,
  },
  checkboxHelper: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    marginTop: '2px',
  },
  pillGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  pill: {
    padding: '8px 12px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderPurple}`,
    borderRadius: '20px',
    fontSize: theme.fontSm,
    fontWeight: '500',
    color: theme.accentPurple,
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  pillActive: {
    background: theme.accentGradient,
    color: '#FFFFFF',
    border: 'none',
  },
  helperNote: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    fontStyle: 'italic',
    margin: '8px 0 0 0',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  radioOption: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    cursor: 'pointer',
  },
  radioInput: {
    marginTop: '2px',
    flexShrink: 0,
  },
  radioContent: {
    flex: 1,
  },
  radioLabel: {
    fontSize: theme.fontSm,
    fontWeight: '500',
    color: theme.textPrimary,
  },
  radioSubtext: {
    fontSize: theme.fontXs,
    color: theme.textMuted,
    marginTop: '2px',
  },
  durationRowSidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  durationLabel: {
    fontSize: theme.fontXs,
    fontWeight: '500',
    color: theme.textMuted,
  },
  durationChipsSidebar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '6px',
  },
  durationChipSmall: {
    padding: '6px 8px',
    backgroundColor: theme.glassLight,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationChipActive: {
    backgroundColor: theme.accentPurple,
    borderColor: theme.accentPurple,
    color: '#FFFFFF',
  },
  durationValueSmall: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: 'inherit',
  },
  infoBarSmall: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    padding: '8px',
    backgroundColor: theme.infoBg,
    border: `1px solid ${theme.infoBorder}`,
    borderRadius: theme.radiusSmall,
  },
  infoTextSmall: {
    fontSize: '10px',
    color: theme.infoText,
    lineHeight: '1.3',
  },

  // Middle Column - Larger
  middleColumn: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflow: 'hidden',
  },
  previewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1F2937',
    borderRadius: theme.radiusMedium,
    border: `1px solid ${theme.borderSubtle}`,
    boxShadow: theme.shadowPurple,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDE68A 100%)',
  },
  overlayChipsTopLeft: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxWidth: '200px',
  },
  featureChip: {
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.textPrimary,
    padding: '4px 8px',
    backgroundColor: theme.glassStrong,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    border: `1px solid ${theme.borderPurple}`,
    borderRadius: '8px',
  },
  overlayControlsTopRight: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    display: 'flex',
    gap: '6px',
  },
  previewControlButton: {
    width: '32px',
    height: '32px',
    backgroundColor: theme.glassStrong,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    border: `1px solid ${theme.borderSubtle}`,
    borderRadius: '8px',
    color: theme.textSecondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
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
  previewPlaceholder: {
    fontSize: '48px',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  frameCounterChip: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    fontSize: theme.fontSm,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '4px 8px',
    borderRadius: '6px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  rejectFrameButton: {
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: `1px solid ${theme.errorBorder}`,
    borderRadius: '20px',
    color: '#FFFFFF',
    fontSize: theme.fontSm,
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  rejectFrameButtonActive: {
    backgroundColor: 'rgba(220, 38, 38, 0.4)',
    borderColor: theme.errorText,
  },

  // Timeline Section - Enhanced
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
    color: theme.textMuted,
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
    border: `1px solid ${theme.borderPurple}`,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSm,
    fontWeight: '600',
    color: theme.textMuted,
    borderRadius: '8px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
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

  // Right Sidebar
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
    alignItems: 'center',
    marginBottom: '8px',
  },
  infoLabel: {
    fontSize: theme.fontSm,
    color: theme.textMuted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: theme.fontBase,
    color: theme.textPrimary,
    fontWeight: '600',
  },
  infoValueRed: {
    fontSize: theme.fontBase,
    color: theme.errorText,
    fontWeight: '600',
  },
  statusPillIncluded: {
    padding: '4px 10px',
    backgroundColor: theme.successBg,
    border: `1px solid ${theme.successBorder}`,
    borderRadius: '12px',
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.successText,
  },
  statusPillRejected: {
    padding: '4px 10px',
    backgroundColor: theme.errorBg,
    border: `1px solid ${theme.errorBorder}`,
    borderRadius: '12px',
    fontSize: theme.fontXs,
    fontWeight: '600',
    color: theme.errorText,
  },

  // Status Bar
  statusBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    backgroundColor: theme.glassLight,
    backdropFilter: theme.glassBlur,
    WebkitBackdropFilter: theme.glassBlur,
    borderTop: `1px solid ${theme.borderSubtle}`,
    fontSize: theme.fontXs,
    color: theme.textMuted,
    height: '40px',
  },
  statusLeft: {
    fontWeight: '500',
  },
  statusRight: {
    fontWeight: '500',
  },
};