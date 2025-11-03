import React, { useState } from 'react';
import { 
  Upload, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Settings, 
  HelpCircle, 
  User, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp,
  Play,
  Zap,
  Save,
  FileText,
  LogOut,
  CheckCircle,
  Sliders
} from 'lucide-react';

export default function EzTimelapseEntryPointDark() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedMode, setSelectedMode] = useState('Easy');
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showRecentSubmenu, setShowRecentSubmenu] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showRenderDetails, setShowRenderDetails] = useState(false);
  const [statusState, setStatusState] = useState('idle');
  const [renderProgress, setRenderProgress] = useState(0);
  
  const [expandedSections, setExpandedSections] = useState({
    recent: true
  });

  const [expandedSettings, setExpandedSettings] = useState({
    general: true,
    rendering: true,
    appearance: false,
    storage: false
  });

  const recentProjects = [
    { 
      id: 1, 
      name: 'Sunset Construction', 
      frames: 487, 
      duration: '16s', 
      date: '2 days ago',
      mode: 'Easy',
      status: 'rendered',
      thumbnailGradient: 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDE68A 100%)',
      thumbnailPattern: null
    },
    { 
      id: 2, 
      name: 'Downtown Traffic', 
      frames: 1203, 
      duration: '40s', 
      date: '5 days ago',
      mode: 'Pro',
      status: 'draft',
      thumbnailGradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      thumbnailPattern: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 8px)'
    },
    { 
      id: 3, 
      name: 'Night Sky', 
      frames: 892, 
      duration: '30s', 
      date: '1 week ago',
      mode: 'Easy',
      status: 'rendered',
      thumbnailGradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
      thumbnailPattern: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle at 40% 70%, rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 15% 80%, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle at 90% 40%, rgba(255,255,255,0.7) 1px, transparent 1px)'
    },
    { 
      id: 4, 
      name: 'City Sunrise', 
      frames: 654, 
      duration: '22s', 
      date: '2 weeks ago',
      mode: 'Pro',
      status: 'in-progress',
      thumbnailGradient: 'linear-gradient(135deg, #D4A574 0%, #E5C9A8 50%, #F5E6D3 100%)',
      thumbnailPattern: 'repeating-linear-gradient(0deg, rgba(139, 92, 46, 0.08) 0px, rgba(139, 92, 46, 0.08) 1px, transparent 1px, transparent 4px)'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSettingsSection = (section) => {
    setExpandedSettings(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusChipStyle = (status) => {
    const baseStyle = {
      padding: '3px 8px',
      borderRadius: '6px',
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    };

    switch(status) {
      case 'rendered':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          color: '#4ADE80',
          border: '1px solid rgba(34, 197, 94, 0.4)',
        };
      case 'draft':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(251, 191, 36, 0.2)',
          color: '#FCD34D',
          border: '1px solid rgba(251, 191, 36, 0.4)',
        };
      case 'in-progress':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          color: '#818CF8',
          border: '1px solid rgba(99, 102, 241, 0.4)',
        };
      default:
        return baseStyle;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'rendered':
        return 'Rendered';
      case 'draft':
        return 'Draft';
      case 'in-progress':
        return 'In Progress';
      default:
        return status;
    }
  };

  const getStatusBarContent = () => {
    switch(statusState) {
      case 'idle':
        return 'Trial: 14 days left â€¢ Exports up to 8K, no watermark';
      case 'dragging':
        return 'Drop files to start';
      case 'rendering':
        return `Rendering ${renderProgress}% â€¢ GPU active`;
      case 'complete':
        return 'Render complete â€¢ Saved to Documents/Ez Timelapse';
      default:
        return 'Trial: 14 days left â€¢ Exports up to 8K, no watermark';
    }
  };

  const getGPUInfo = () => {
    return 'NVIDIA RTX 4080';
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Files selected:', files.length);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStatusState('dragging');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setStatusState('idle');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setStatusState('idle');
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log('Files dropped:', files.length);
    }
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
          
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
          
          @keyframes scaleIn {
            from {
              transform: translate(-50%, -50%) scale(0.9);
              opacity: 0;
            }
            to {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }

          @keyframes glowPulse {
            0%, 100% {
              box-shadow: 0 12px 48px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.4);
            }
            50% {
              box-shadow: 0 12px 48px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.6);
            }
          }

          input[type="checkbox"] {
            opacity: 0;
            width: 0;
            height: 0;
          }

          input[type="checkbox"]:checked + span {
            background-color: #7C3AED;
          }

          input[type="checkbox"]:checked + span:before {
            transform: translateX(22px);
          }

          .toggleSlider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.2s;
            border-radius: 50%;
          }

          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #7C3AED;
            cursor: pointer;
            box-shadow: 0 0 8px rgba(124, 58, 237, 0.5);
          }

          input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #7C3AED;
            cursor: pointer;
            border: none;
            box-shadow: 0 0 8px rgba(124, 58, 237, 0.5);
          }

          .project-item:hover {
            background-color: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(124, 58, 237, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
          }

          .project-item:hover .play-icon-overlay {
            opacity: 1;
            transform: scale(1);
          }

          .resume-button:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 24px rgba(124, 58, 237, 0.4), 0 0 20px rgba(124, 58, 237, 0.3);
          }

          .view-all-button:hover {
            background-color: rgba(124, 58, 237, 0.15);
            border: 1px solid rgba(124, 58, 237, 0.5);
            transform: translateY(-1px);
          }

          .status-clickable {
            position: relative;
            cursor: pointer;
            background: transparent;
            border: none;
            padding: 0;
            font: inherit;
            color: inherit;
            transition: all 150ms ease-out;
          }

          .status-clickable:hover {
            color: #A78BFA;
            text-decoration: underline;
            text-underline-offset: 3px;
            text-decoration-color: rgba(124, 58, 237, 0.4);
          }

          button:focus-visible,
          input:focus-visible,
          select:focus-visible {
            outline: 2px solid #7C3AED;
            outline-offset: 2px;
          }
        `}
      </style>
      
      <div style={styles.backgroundGradient} />
      
      <div style={styles.topNav}>
        <div style={styles.topNavLeft}>
          <div style={styles.logo}>
            <div style={styles.logoSquare}>
              <Sparkles size={20} color="#A78BFA" />
            </div>
            <div style={styles.logoText}>
              <div style={styles.appName}>Ez Timelapse</div>
              <div style={styles.tagline}>AI-Powered Creator</div>
            </div>
          </div>
        </div>

        <div style={styles.topNavCenter}>
          <div style={styles.menuContainer}>
            <button 
              style={styles.navButton}
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
                  style={styles.menuItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <FolderOpen size={16} />
                  <span>Open Project...</span>
                  <span style={styles.shortcut}>Ctrl+O</span>
                </button>
                
                <div 
                  style={styles.menuItemSubmenu}
                  onMouseEnter={(e) => {
                    setShowRecentSubmenu(true);
                    e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    setShowRecentSubmenu(false);
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
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
                          style={styles.submenuItem}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div style={styles.submenuItemName}>{project.name}</div>
                          <div style={styles.submenuItemMeta}>{project.date}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={styles.menuSeparator} />
                
                <button style={styles.menuItemDisabled} disabled>
                  <Save size={16} />
                  <span>Save Project</span>
                  <span style={styles.shortcut}>Ctrl+S</span>
                </button>
                
                <button style={styles.menuItemDisabled} disabled>
                  <Save size={16} />
                  <span>Save As...</span>
                  <span style={styles.shortcut}>Ctrl+Shift+S</span>
                </button>
                
                <button style={styles.menuItemDisabled} disabled>
                  <Upload size={16} />
                  <span>Export...</span>
                  <span style={styles.shortcut}>Ctrl+E</span>
                </button>

                <div style={styles.menuSeparator} />
                
                <button 
                  style={styles.menuItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                  style={styles.menuItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => {
                    setShowFileMenu(false);
                    setShowAboutModal(true);
                  }}
                >
                  <HelpCircle size={16} />
                  <span>About...</span>
                </button>
                
                <button 
                  style={styles.menuItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={16} />
                  <span>Exit</span>
                  <span style={styles.shortcut}>Alt+F4</span>
                </button>
              </div>
            )}
          </div>

          <button 
            style={styles.navButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.2)';
            }}
          >
            <FolderOpen size={18} />
            <span>Open</span>
          </button>
          <button 
            style={styles.navButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.2)';
            }}
          >
            <Upload size={18} />
            <span>Import</span>
          </button>
        </div>

        <div style={styles.utilityIcons}>
          <button 
            style={styles.iconButton} 
            title="Help & Documentation"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.2)';
            }}
          >
            <HelpCircle size={20} />
          </button>
          <button 
            style={styles.iconButton} 
            title="Settings"
            onClick={() => setShowSettingsDrawer(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.2)';
            }}
          >
            <Settings size={20} />
          </button>
          <div style={styles.accountIconWrapper}>
            <button 
              style={styles.iconButton} 
              title="Account"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.2)';
              }}
            >
              <User size={20} />
            </button>
            <span style={styles.trialBadgeSmall}>14d</span>
          </div>
        </div>
      </div>

      <div style={styles.mainArea}>
        <div style={styles.sidePanel}>
          <div style={styles.panelSection}>
            <div style={styles.sectionHeaderStatic}>
              <div style={styles.sectionHeaderLeft}>
                <Zap size={18} color="#A78BFA" />
                <span style={styles.sectionTitle}>Start</span>
              </div>
            </div>
            
            <div style={styles.sectionContent}>
              <div style={styles.modeSelector}>
                <span style={styles.modeLabel}>Choose your workflow</span>
                <div style={styles.modePills}>
                  <button
                    style={{
                      ...styles.modePill,
                      ...(selectedMode === 'Easy' ? styles.modePillActive : styles.modePillInactive)
                    }}
                    onClick={() => setSelectedMode('Easy')}
                  >
                    <Sparkles size={16} color={selectedMode === 'Easy' ? '#FFFFFF' : '#A78BFA'} />
                    <span>Easy</span>
                  </button>
                  <button
                    style={{
                      ...styles.modePill,
                      ...(selectedMode === 'Pro' ? styles.modePillActive : styles.modePillInactive)
                    }}
                    onClick={() => setSelectedMode('Pro')}
                  >
                    <Sliders size={16} color={selectedMode === 'Pro' ? '#FFFFFF' : '#A78BFA'} />
                    <span>Pro</span>
                  </button>
                </div>
              </div>
              <div style={styles.modeDescription}>
                {selectedMode === 'Easy' 
                  ? (
                    <>
                      <div style={styles.modeDescriptionTitle}>Great for first import.</div>
                      <div style={styles.modeDescriptionText}>We'll handle flicker, exposure ramps, and grading automatically.</div>
                    </>
                  )
                  : (
                    <>
                      <div style={styles.modeDescriptionTitle}>Manual control of everything.</div>
                      <div style={styles.modeDescriptionText}>Fine-tune exposure curves, WB ramps, and motion cadence frame-by-frame.</div>
                    </>
                  )}
              </div>
            </div>
          </div>

          <div style={styles.dividerSection}>
            <span style={styles.dividerTitle}>Your Projects</span>
          </div>

          <div style={styles.resumeSection}>
            <button 
              style={styles.resumeButton}
              className="resume-button"
            >
              <Play size={16} fill="#FFFFFF" color="#FFFFFF" />
              <div style={styles.resumeButtonContent}>
                <div style={styles.resumeButtonTitle}>Resume Last Project</div>
                <div style={styles.resumeButtonSubtitle}>Sunset Construction â€¢ 2 days ago</div>
              </div>
              <ChevronRight size={16} color="#FFFFFF" />
            </button>
          </div>

          <div style={styles.panelSection}>
            <button 
              style={styles.sectionHeader}
              onClick={() => toggleSection('recent')}
            >
              <div style={styles.sectionHeaderLeft}>
                <Clock size={18} color="#A78BFA" />
                <span style={styles.sectionTitle}>Recent</span>
              </div>
              {expandedSections.recent ? <ChevronUp size={18} color="#A78BFA" /> : <ChevronDown size={18} color="#A78BFA" />}
            </button>
            
            {expandedSections.recent && (
              <div style={styles.sectionContent}>
                {recentProjects.map((project) => (
                  <button
                    key={project.id}
                    style={styles.projectItem}
                    className="project-item"
                  >
                    <div style={styles.projectItemLeft}>
                      <div 
                        style={{
                          ...styles.projectThumbnail,
                          background: project.thumbnailGradient,
                          backgroundImage: project.thumbnailPattern ? `${project.thumbnailPattern}, ${project.thumbnailGradient}` : project.thumbnailGradient,
                          backgroundSize: project.thumbnailPattern ? 'auto, 100%' : '100%'
                        }}
                      >
                        <div style={styles.playIconOverlay} className="play-icon-overlay">
                          <Play size={12} fill="#FFFFFF" color="#FFFFFF" />
                        </div>
                      </div>
                      <div style={styles.projectItemInfo}>
                        <div style={styles.projectItemTop}>
                          <div style={styles.projectItemName}>{project.name}</div>
                          <span style={getStatusChipStyle(project.status)}>
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                        <div style={styles.projectItemMeta}>
                          {project.frames} frames â€¢ {project.duration}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} color="#6B7280" />
                  </button>
                ))}
                <button 
                  style={styles.viewAllButton}
                  className="view-all-button"
                >
                  <span>View all projects...</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          <div style={styles.tipsPanel}>
            <Sparkles size={16} color="#FBBF24" />
            <div style={styles.tipsContent}>
              <div style={styles.tipsTitle}>Your work is auto-saved</div>
              <div style={styles.tipsText}>
                Projects save automatically. Resume anytime from the sidebar.
              </div>
            </div>
          </div>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.heroContainer}>
            <div 
              style={{
                ...styles.dropZone,
                ...(isDragging ? styles.dropZoneDragging : {})
              }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*,.cr2,.nef,.arw,.dng"
                style={styles.hiddenFileInput}
                onChange={handleFileSelect}
              />
              <div style={styles.dropZoneIcon}>
                <Upload size={64} color="#A78BFA" strokeWidth={1.5} />
              </div>
              <h1 style={styles.dropZoneTitle}>Create New Timelapse</h1>
              <p style={styles.dropZoneSubtitle}>
                Drag and drop your photos here or click to browse
              </p>
              <button 
                style={styles.buttonPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(124, 58, 237, 0.4), 0 0 20px rgba(124, 58, 237, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.3)';
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById('fileInput')?.click();
                }}
              >
                <Upload size={18} />
                <span>Select Photos</span>
              </button>
              <div style={styles.formatInfo}>
                <div style={styles.formatLabel}>Supported Formats</div>
                <div style={styles.formatList}>JPG â€¢ PNG â€¢ RAW (CR2, NEF, ARW, DNG)</div>
                <div style={styles.formatHint}>You can also drop a folder or video clip</div>
                <div style={styles.exportQualityBadge}>
                  <CheckCircle size={12} color="#4ADE80" />
                  <span>Full-quality export enabled on this machine</span>
                </div>
              </div>
            </div>

            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <Sparkles size={20} color="#A78BFA" />
                </div>
                <div style={styles.featureContent}>
                  <div style={styles.featureName}>AI Processing</div>
                  <div style={styles.featureDesc}>Automatic deflicker & exposure</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <Zap size={20} color="#FBBF24" />
                </div>
                <div style={styles.featureContent}>
                  <div style={styles.featureName}>Fast Render</div>
                  <div style={styles.featureDesc}>GPU-accelerated processing</div>
                </div>
              </div>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <Sparkles size={20} color="#4ADE80" />
                </div>
                <div style={styles.featureContent}>
                  <div style={styles.featureName}>Smart Grading</div>
                  <div style={styles.featureDesc}>Scene-aware color profiles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.statusBar}>
        <button 
          style={styles.statusLeft}
          onClick={() => setShowRenderDetails(!showRenderDetails)}
          className="status-clickable"
        >
          {getStatusBarContent()}
        </button>
        <div style={styles.statusRight}>
          v1.0.0 â€¢ GPU: {getGPUInfo()}
          <button 
            style={styles.statusDemoButton}
            onClick={() => {
              const states = ['idle', 'dragging', 'rendering', 'complete'];
              const currentIndex = states.indexOf(statusState);
              const nextIndex = (currentIndex + 1) % states.length;
              setStatusState(states[nextIndex]);
              if (states[nextIndex] === 'rendering') {
                setRenderProgress(42);
              }
            }}
            title="Demo: Click to cycle status states"
          >
            ðŸ”„
          </button>
        </div>
      </div>

      {showRenderDetails && (statusState === 'rendering' || statusState === 'complete') && (
        <div style={styles.renderDetailsSheet}>
          <div style={styles.renderDetailsHeader}>
            <div style={styles.renderDetailsTitle}>
              {statusState === 'rendering' ? 'Rendering in Progress' : 'Render Complete'}
            </div>
            <button 
              style={styles.renderDetailsClose}
              onClick={() => setShowRenderDetails(false)}
            >
              Ã—
            </button>
          </div>
          <div style={styles.renderDetailsContent}>
            <div style={styles.renderDetailRow}>
              <span style={styles.renderDetailLabel}>Project:</span>
              <span style={styles.renderDetailValue}>Sunset Construction</span>
            </div>
            {statusState === 'rendering' && (
              <>
                <div style={styles.renderDetailRow}>
                  <span style={styles.renderDetailLabel}>Progress:</span>
                  <span style={styles.renderDetailValue}>{renderProgress}%</span>
                </div>
                <div style={styles.renderProgressBar}>
                  <div style={{...styles.renderProgressFill, width: `${renderProgress}%`}} />
                </div>
              </>
            )}
            {statusState === 'complete' && (
              <>
                <div style={styles.renderDetailRow}>
                  <span style={styles.renderDetailLabel}>Output:</span>
                  <span style={styles.renderDetailValue}>Sunset_Construction_4K.mp4</span>
                </div>
                <button style={styles.revealOutputButton}>
                  <FolderOpen size={16} />
                  <span>Reveal in Folder</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showSettingsDrawer && (
        <>
          <div 
            style={styles.drawerOverlay} 
            onClick={() => setShowSettingsDrawer(false)}
          />
          <div style={styles.settingsDrawer}>
            <div style={styles.drawerHeader}>
              <div style={styles.drawerHeaderLeft}>
                <Settings size={20} color="#A78BFA" />
                <span style={styles.drawerTitle}>Settings</span>
              </div>
              <button 
                style={styles.drawerCloseButton}
                onClick={() => setShowSettingsDrawer(false)}
              >
                Ã—
              </button>
            </div>

            <div style={styles.drawerContent}>
              <div style={styles.settingsSection}>
                <button 
                  style={styles.settingsSectionHeader}
                  onClick={() => toggleSettingsSection('general')}
                >
                  <span style={styles.settingsSectionTitle}>General</span>
                  {expandedSettings.general ? <ChevronUp size={18} color="#A78BFA" /> : <ChevronDown size={18} color="#A78BFA" />}
                </button>
                {expandedSettings.general && (
                  <div style={styles.settingsSectionContent}>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>Default Mode</label>
                      <select style={styles.settingSelect}>
                        <option>Easy Mode</option>
                        <option>Pro Mode</option>
                      </select>
                    </div>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>Default Save Path</label>
                      <div style={styles.settingPathRow}>
                        <input 
                          type="text" 
                          style={styles.settingInput} 
                          defaultValue="C:\Users\Documents\Ez Timelapse"
                          readOnly
                        />
                        <button style={styles.settingButton}>Browse</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.settingsSection}>
                <button 
                  style={styles.settingsSectionHeader}
                  onClick={() => toggleSettingsSection('rendering')}
                >
                  <span style={styles.settingsSectionTitle}>Rendering</span>
                  {expandedSettings.rendering ? <ChevronUp size={18} color="#A78BFA" /> : <ChevronDown size={18} color="#A78BFA" />}
                </button>
                {expandedSettings.rendering && (
                  <div style={styles.settingsSectionContent}>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>GPU Acceleration</label>
                      <label style={styles.toggleSwitch}>
                        <input type="checkbox" defaultChecked />
                        <span style={styles.toggleSlider} className="toggleSlider"></span>
                      </label>
                    </div>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>Quality Preset</label>
                      <select style={styles.settingSelect}>
                        <option>High (Slower)</option>
                        <option>Balanced</option>
                        <option>Fast (Lower Quality)</option>
                      </select>
                    </div>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>Deflicker Engine</label>
                      <select style={styles.settingSelect}>
                        <option>AI-Powered v2.0</option>
                        <option>Classic Algorithm</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.settingsSection}>
                <button 
                  style={styles.settingsSectionHeader}
                  onClick={() => toggleSettingsSection('appearance')}
                >
                  <span style={styles.settingsSectionTitle}>Appearance</span>
                  {expandedSettings.appearance ? <ChevronUp size={18} color="#A78BFA" /> : <ChevronDown size={18} color="#A78BFA" />}
                </button>
                {expandedSettings.appearance && (
                  <div style={styles.settingsSectionContent}>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>Theme</label>
                      <select style={styles.settingSelect}>
                        <option>Light</option>
                        <option selected>Dark</option>
                        <option>Auto (System)</option>
                      </select>
                    </div>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>Glass Transparency</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        defaultValue="60" 
                        style={styles.settingSlider}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.settingsSection}>
                <button 
                  style={styles.settingsSectionHeader}
                  onClick={() => toggleSettingsSection('storage')}
                >
                  <span style={styles.settingsSectionTitle}>Storage</span>
                  {expandedSettings.storage ? <ChevronUp size={18} color="#A78BFA" /> : <ChevronDown size={18} color="#A78BFA" />}
                </button>
                {expandedSettings.storage && (
                  <div style={styles.settingsSectionContent}>
                    <div style={styles.settingItem}>
                      <label style={styles.settingLabel}>Cache Size</label>
                      <div style={styles.settingInfo}>2.4 GB of 10 GB used</div>
                    </div>
                    <div style={styles.settingItem}>
                      <button style={styles.settingButtonOutline}>Clear Cache</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.drawerFooter}>
              <div style={styles.accountSection}>
                <div style={styles.accountHeader}>
                  <span style={styles.accountTitle}>Account & License</span>
                  <span style={styles.trialBadge}>Trial â€¢ 14 days left</span>
                </div>
                <div style={styles.accountInfo}>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Plan:</span>
                    <span style={styles.accountValue}>Trial (14 days left)</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Max export:</span>
                    <span style={styles.accountValue}>Unlimited (8K)</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Watermark:</span>
                    <span style={styles.accountValue}>None</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Commercial use:</span>
                    <span style={styles.accountValue}>Allowed during trial</span>
                  </div>
                </div>
                <div style={styles.afterTrialMessage}>
                  <strong>After trial:</strong> Free Mode lets you keep exporting up to 720p for personal use. Upgrade to keep full quality forever.
                </div>
                <button 
                  style={styles.upgradeButton}
                  onClick={() => setShowUpgradeModal(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(124, 58, 237, 0.4), 0 0 20px rgba(124, 58, 237, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.3)';
                  }}
                >
                  <Sparkles size={16} />
                  <span>Upgrade to Pro â€“ Keep all features after trial</span>
                </button>
                <button style={styles.optionalSignIn}>
                  Optional: Sign in to sync across devices (coming soon)
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {showUpgradeModal && (
        <>
          <div 
            style={styles.modalOverlay} 
            onClick={() => setShowUpgradeModal(false)}
          />
          <div style={styles.upgradeModal}>
            <button 
              style={styles.modalCloseButton}
              onClick={() => setShowUpgradeModal(false)}
            >
              Ã—
            </button>
            <div style={styles.modalHeader}>
              <Sparkles size={32} color="#A78BFA" />
              <h2 style={styles.modalTitle}>Keep Ez Timelapse Forever</h2>
              <p style={styles.modalSubtitle}>Own the full tool with one payment</p>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.featureList}>
                <div style={styles.featureListItem}>
                  <span style={styles.featureCheckmark}>âœ“</span>
                  <span>No watermark on exports</span>
                </div>
                <div style={styles.featureListItem}>
                  <span style={styles.featureCheckmark}>âœ“</span>
                  <span>Commercial use license</span>
                </div>
                <div style={styles.featureListItem}>
                  <span style={styles.featureCheckmark}>âœ“</span>
                  <span>Priority rendering with GPU boost</span>
                </div>
                <div style={styles.featureListItem}>
                  <span style={styles.featureCheckmark}>âœ“</span>
                  <span>Advanced color grading tools</span>
                </div>
                <div style={styles.featureListItem}>
                  <span style={styles.featureCheckmark}>âœ“</span>
                  <span>Unlimited project storage</span>
                </div>
                <div style={styles.featureListItem}>
                  <span style={styles.featureCheckmark}>âœ“</span>
                  <span>Priority email support</span>
                </div>
              </div>
              <div style={styles.pricingCard}>
                <div style={styles.priceRow}>
                  <span style={styles.priceAmount}>$79</span>
                  <span style={styles.pricePeriod}>/ one-time</span>
                </div>
                <div style={styles.priceNote}>Lifetime license â€¢ No subscription</div>
              </div>
              <button 
                style={styles.modalUpgradeButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 10px 32px rgba(124, 58, 237, 0.5), 0 0 30px rgba(124, 58, 237, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.4)';
                }}
              >
                Get Pro License â€“ $79
              </button>
              <div style={styles.moneyBackGuarantee}>
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </>
      )}

      {showAboutModal && (
        <>
          <div 
            style={styles.modalOverlay} 
            onClick={() => setShowAboutModal(false)}
          />
          <div style={styles.aboutModal}>
            <button 
              style={styles.modalCloseButton}
              onClick={() => setShowAboutModal(false)}
            >
              Ã—
            </button>
            <div style={styles.modalHeader}>
              <div style={styles.logoSquare}>
                <Sparkles size={24} color="#A78BFA" />
              </div>
              <h2 style={styles.modalTitle}>Ez Timelapse Creator</h2>
              <p style={styles.aboutVersion}>Version 1.0.0</p>
            </div>
            <div style={styles.modalContent}>
              <div style={styles.aboutSection}>
                <h3 style={styles.aboutSectionTitle}>What's New in 1.0.0</h3>
                <ul style={styles.aboutList}>
                  <li style={styles.aboutListItem}>ðŸŽ¨ Brand new glassmorphic UI design</li>
                  <li style={styles.aboutListItem}>âš¡ AI-powered deflicker engine 2.0</li>
                  <li style={styles.aboutListItem}>ðŸš€ GPU-accelerated rendering pipeline</li>
                  <li style={styles.aboutListItem}>ðŸ“ Project management system</li>
                  <li style={styles.aboutListItem}>ðŸŽ¯ Easy Mode and Pro Mode workflows</li>
                </ul>
              </div>
              <div style={styles.aboutSection}>
                <h3 style={styles.aboutSectionTitle}>System Information</h3>
                <div style={styles.aboutInfo}>
                  <div style={styles.aboutRow}>
                    <span style={styles.aboutLabel}>GPU:</span>
                    <span style={styles.aboutValue}>NVIDIA RTX 4080</span>
                  </div>
                  <div style={styles.aboutRow}>
                    <span style={styles.aboutLabel}>Memory:</span>
                    <span style={styles.aboutValue}>16 GB Available</span>
                  </div>
                  <div style={styles.aboutRow}>
                    <span style={styles.aboutLabel}>Cache:</span>
                    <span style={styles.aboutValue}>2.4 GB / 10 GB</span>
                  </div>
                </div>
              </div>
              <div style={styles.aboutFooter}>
                <button 
                  style={styles.aboutLink}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Visit Website
                </button>
                <span style={styles.aboutSeparator}>â€¢</span>
                <button 
                  style={styles.aboutLink}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Documentation
                </button>
                <span style={styles.aboutSeparator}>â€¢</span>
                <button 
                  style={styles.aboutLink}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Support
                </button>
              </div>
              <div style={styles.aboutCopyright}>
                Â© 2025 Ez Timelapse. All rights reserved.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#0A0118',
    display: 'flex',
    flexDirection: 'column',
    color: '#E5E7EB',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #0A0118 0%, #081420 50%, #0A0820 100%)',
    zIndex: 0,
  },
  topNav: {
    height: '64px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    justifyContent: 'space-between',
    flexShrink: 0,
    position: 'relative',
    zIndex: 10,
    boxShadow: '0 2px 12px rgba(124, 58, 237, 0.1)',
  },
  topNavLeft: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '240px',
  },
  topNavCenter: {
    display: 'flex',
    gap: '8px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoSquare: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(167, 139, 250, 0.2) 100%)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3), 0 0 20px rgba(124, 58, 237, 0.2)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
  },
  appName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#E0E7FF',
    lineHeight: '1.3',
  },
  tagline: {
    fontSize: '11px',
    color: '#9CA3AF',
    lineHeight: '1.3',
  },
  menuContainer: {
    position: 'relative',
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    padding: '8px 16px',
    color: '#D1D5DB',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 150ms ease-out',
    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.2)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '8px',
    minWidth: '220px',
    backgroundColor: 'rgba(10, 1, 24, 0.95)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
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
    borderRadius: '8px',
    color: '#D1D5DB',
    fontSize: '14px',
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
    borderRadius: '8px',
    color: '#6B7280',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'not-allowed',
    textAlign: 'left',
    opacity: 0.5,
  },
  shortcut: {
    marginLeft: 'auto',
    fontSize: '12px',
    color: '#9CA3AF',
    fontWeight: '400',
  },
  menuItemSubmenu: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    color: '#D1D5DB',
    fontSize: '14px',
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
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    margin: '8px 0',
  },
  submenu: {
    position: 'absolute',
    top: 0,
    left: '100%',
    marginLeft: '4px',
    minWidth: '260px',
    backgroundColor: 'rgba(10, 1, 24, 0.95)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
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
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 150ms ease-out',
    textAlign: 'left',
  },
  submenuItemName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#E0E7FF',
  },
  submenuItemMeta: {
    fontSize: '11px',
    color: '#9CA3AF',
  },
  utilityIcons: {
    display: 'flex',
    gap: '8px',
  },
  accountIconWrapper: {
    position: 'relative',
  },
  trialBadgeSmall: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    padding: '2px 5px',
    backgroundColor: '#FBBF24',
    borderRadius: '8px',
    fontSize: '9px',
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: '1',
    boxShadow: '0 2px 6px rgba(251, 191, 36, 0.4)',
    pointerEvents: 'none',
  },
  iconButton: {
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '8px',
    color: '#D1D5DB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.2)',
  },
  mainArea: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },
  sidePanel: {
    width: '320px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    borderRight: '1px solid rgba(124, 58, 237, 0.2)',
    overflowY: 'auto',
    flexShrink: 0,
    boxShadow: '4px 0 16px rgba(124, 58, 237, 0.1)',
  },
  panelSection: {
    borderBottom: '1px solid rgba(124, 58, 237, 0.15)',
  },
  dividerSection: {
    padding: '12px 20px 8px 20px',
    borderBottom: '1px solid rgba(124, 58, 237, 0.15)',
  },
  dividerTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  resumeSection: {
    padding: '12px',
    borderBottom: '1px solid rgba(124, 58, 237, 0.15)',
  },
  resumeButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3), 0 0 20px rgba(124, 58, 237, 0.2)',
  },
  resumeButtonContent: {
    flex: 1,
    textAlign: 'left',
  },
  resumeButtonTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '2px',
  },
  resumeButtonSubtitle: {
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sectionHeaderStatic: {
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    width: '100%',
    padding: '16px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#E0E7FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  sectionHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#E0E7FF',
  },
  sectionContent: {
    padding: '0 12px 16px 12px',
  },
  modeSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '16px',
  },
  modeLabel: {
    fontSize: '13px',
    color: '#E0E7FF',
    fontWeight: '600',
  },
  modePills: {
    display: 'flex',
    gap: '8px',
  },
  modePill: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  modePillActive: {
    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3), 0 0 15px rgba(124, 58, 237, 0.2)',
  },
  modePillInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    color: '#E0E7FF',
  },
  modeDescription: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  modeDescriptionTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#E0E7FF',
  },
  modeDescriptionText: {
    fontSize: '12px',
    color: '#9CA3AF',
    lineHeight: '1.5',
  },
  projectItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    marginBottom: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    textAlign: 'left',
    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.15)',
  },
  projectItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  projectThumbnail: {
    width: '48px',
    height: '36px',
    borderRadius: '6px',
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
  },
  playIconOverlay: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.4)',
    opacity: 0,
    transform: 'scale(0.8)',
    transition: 'all 150ms ease-out',
  },
  projectItemInfo: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  projectItemTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  projectItemName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#E0E7FF',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  projectItemMeta: {
    fontSize: '11px',
    color: '#9CA3AF',
  },
  viewAllButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '10px 12px',
    marginTop: '8px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '10px',
    color: '#A78BFA',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  tipsPanel: {
    margin: '16px 12px',
    padding: '14px',
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    boxShadow: '0 2px 12px rgba(251, 191, 36, 0.2)',
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#FCD34D',
    marginBottom: '2px',
  },
  tipsText: {
    fontSize: '11px',
    color: '#D1D5DB',
  },
  mainContent: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
  },
  heroContainer: {
    maxWidth: '800px',
    width: '100%',
  },
  dropZone: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '3px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '20px',
    padding: '80px 48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    transition: 'all 0.3s ease-out',
    cursor: 'pointer',
    marginBottom: '32px',
    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
  },
  dropZoneDragging: {
    border: '3px solid rgba(124, 58, 237, 0.6)',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    transform: 'scale(1.01)',
    boxShadow: '0 12px 48px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.4)',
    animation: 'glowPulse 1.5s ease-in-out infinite',
  },
  dropZoneIcon: {
    marginBottom: '8px',
  },
  dropZoneTitle: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#E0E7FF',
    margin: 0,
    textAlign: 'center',
  },
  dropZoneSubtitle: {
    fontSize: '16px',
    color: '#D1D5DB',
    margin: 0,
    textAlign: 'center',
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    border: 'none',
    borderRadius: '10px',
    padding: '14px 36px',
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-out',
    marginTop: '12px',
    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
  },
  formatInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    marginTop: '8px',
  },
  formatLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#818CF8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  formatList: {
    fontSize: '13px',
    color: '#D1D5DB',
  },
  formatHint: {
    fontSize: '11px',
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: '4px',
  },
  exportQualityBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '12px',
    padding: '6px 12px',
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    border: '1px solid rgba(74, 222, 128, 0.3)',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '500',
    color: '#4ADE80',
  },
  hiddenFileInput: {
    display: 'none',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '12px',
    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.15)',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(167, 139, 250, 0.1) 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 1px 3px rgba(124, 58, 237, 0.3)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
  },
  featureContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  featureName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#E0E7FF',
  },
  featureDesc: {
    fontSize: '12px',
    color: '#9CA3AF',
    lineHeight: '1.4',
  },
  statusBar: {
    height: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    borderTop: '1px solid rgba(124, 58, 237, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    fontSize: '11px',
    flexShrink: 0,
    position: 'relative',
    zIndex: 10,
    boxShadow: '0 -2px 8px rgba(124, 58, 237, 0.1)',
  },
  statusLeft: {
    color: '#D1D5DB',
  },
  statusRight: {
    color: '#D1D5DB',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDemoButton: {
    padding: '4px 8px',
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  renderDetailsSheet: {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '600px',
    backgroundColor: 'rgba(10, 1, 24, 0.95)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 12px 48px rgba(124, 58, 237, 0.3)',
    zIndex: 50,
    animation: 'fadeSlideIn 250ms ease-out',
  },
  renderDetailsHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  renderDetailsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#E0E7FF',
  },
  renderDetailsClose: {
    width: '28px',
    height: '28px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: '#D1D5DB',
    fontSize: '24px',
    fontWeight: '300',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
    lineHeight: '1',
  },
  renderDetailsContent: {
    padding: '20px 24px',
  },
  renderDetailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px',
  },
  renderDetailLabel: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  renderDetailValue: {
    color: '#E0E7FF',
    fontWeight: '600',
  },
  renderProgressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  renderProgressFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    borderRadius: '4px',
    transition: 'width 300ms ease-out',
    boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
  },
  revealOutputButton: {
    marginTop: '16px',
    padding: '10px 20px',
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '8px',
    color: '#E0E7FF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
  },
  drawerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 100,
    animation: 'fadeIn 200ms ease-out',
  },
  settingsDrawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '420px',
    backgroundColor: 'rgba(10, 1, 24, 0.95)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    borderLeft: '1px solid rgba(124, 58, 237, 0.3)',
    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.5)',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInRight 250ms ease-out',
  },
  drawerHeader: {
    padding: '24px',
    borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  drawerHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  drawerTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#E0E7FF',
  },
  drawerCloseButton: {
    width: '32px',
    height: '32px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: '#D1D5DB',
    fontSize: '28px',
    fontWeight: '300',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
    lineHeight: '1',
  },
  drawerContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 24px',
  },
  settingsSection: {
    marginBottom: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.2)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  settingsSectionHeader: {
    width: '100%',
    padding: '16px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'background-color 150ms ease-out',
  },
  settingsSectionTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#E0E7FF',
  },
  settingsSectionContent: {
    padding: '8px 20px 20px 20px',
  },
  settingItem: {
    marginBottom: '20px',
  },
  settingLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#D1D5DB',
    marginBottom: '8px',
  },
  settingSelect: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '8px',
    color: '#E0E7FF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  settingInput: {
    flex: 1,
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '8px',
    color: '#E0E7FF',
    fontSize: '14px',
    fontWeight: '500',
  },
  settingPathRow: {
    display: 'flex',
    gap: '8px',
  },
  settingButton: {
    padding: '10px 20px',
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '8px',
    color: '#E0E7FF',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  settingButtonOutline: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    borderRadius: '8px',
    color: '#F87171',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  toggleSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '26px',
  },
  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4B5563',
    borderRadius: '26px',
    transition: '0.2s',
  },
  settingSlider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'linear-gradient(to right, rgba(124, 58, 237, 0.3), rgba(124, 58, 237, 0.8))',
    outline: 'none',
    cursor: 'pointer',
  },
  settingInfo: {
    fontSize: '13px',
    color: '#9CA3AF',
  },
  drawerFooter: {
    padding: '24px',
    borderTop: '1px solid rgba(124, 58, 237, 0.2)',
    flexShrink: 0,
  },
  accountSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  accountHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#E0E7FF',
  },
  trialBadge: {
    padding: '4px 10px',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#FCD34D',
  },
  accountInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  accountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
  },
  accountLabel: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  accountValue: {
    color: '#E0E7FF',
    fontWeight: '500',
  },
  afterTrialMessage: {
    padding: '12px 16px',
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#D1D5DB',
    lineHeight: '1.5',
  },
  upgradeButton: {
    width: '100%',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
  },
  optionalSignIn: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9CA3AF',
    fontSize: '12px',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '8px',
    transition: 'color 150ms ease-out',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeIn 200ms ease-out',
  },
  upgradeModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '520px',
    backgroundColor: 'rgba(10, 1, 24, 0.98)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(124, 58, 237, 0.4)',
    zIndex: 201,
    animation: 'scaleIn 250ms ease-out',
    overflow: 'hidden',
  },
  modalCloseButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '8px',
    color: '#D1D5DB',
    fontSize: '28px',
    fontWeight: '300',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-out',
    lineHeight: '1',
    zIndex: 1,
  },
  modalHeader: {
    padding: '48px 48px 32px 48px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(167, 139, 250, 0.1) 100%)',
  },
  modalTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#E0E7FF',
    margin: '16px 0 8px 0',
  },
  modalSubtitle: {
    fontSize: '15px',
    color: '#D1D5DB',
    margin: 0,
  },
  modalContent: {
    padding: '32px 48px 48px 48px',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
  },
  featureListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#D1D5DB',
  },
  featureCheckmark: {
    width: '24px',
    height: '24px',
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A78BFA',
    fontSize: '14px',
    fontWeight: '700',
    flexShrink: 0,
    border: '1px solid rgba(124, 58, 237, 0.3)',
  },
  pricingCard: {
    padding: '24px',
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '24px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  priceAmount: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#E0E7FF',
  },
  pricePeriod: {
    fontSize: '18px',
    color: '#D1D5DB',
  },
  priceNote: {
    fontSize: '13px',
    color: '#9CA3AF',
  },
  modalUpgradeButton: {
    width: '100%',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    border: 'none',
    borderRadius: '12px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
    marginBottom: '16px',
  },
  moneyBackGuarantee: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9CA3AF',
  },
  aboutModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    backgroundColor: 'rgba(10, 1, 24, 0.98)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(124, 58, 237, 0.4)',
    zIndex: 201,
    animation: 'scaleIn 250ms ease-out',
    overflow: 'hidden',
  },
  aboutVersion: {
    fontSize: '14px',
    color: '#D1D5DB',
    margin: 0,
  },
  aboutSection: {
    marginBottom: '24px',
  },
  aboutSectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#E0E7FF',
    marginBottom: '12px',
  },
  aboutList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  aboutListItem: {
    fontSize: '14px',
    color: '#D1D5DB',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  aboutInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  aboutRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  aboutLabel: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  aboutValue: {
    color: '#E0E7FF',
    fontWeight: '500',
  },
  aboutFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(124, 58, 237, 0.2)',
    marginTop: '8px',
  },
  aboutLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#A78BFA',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
  },
  aboutSeparator: {
    color: '#6B7280',
    fontSize: '13px',
  },
  aboutCopyright: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#9CA3AF',
    marginTop: '16px',
  },
};
