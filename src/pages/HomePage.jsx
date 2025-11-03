import { Link } from 'react-router';
import './HomePage.css';

const pages = [
  { path: '/adjustments-perfected', name: 'Adjustments Perfected' },
  { path: '/export-enhanced', name: 'Export Page Enhanced' },
  { path: '/export-final-version', name: 'Export Page Final Version' },
  { path: '/export-final', name: 'Export Page Final' },
  { path: '/export-mockup', name: 'Export Page Mockup' },
  { path: '/export-with-file-menu', name: 'Export Page With File Menu' },
  { path: '/export-reference', name: 'Export Page Reference' },
  { path: '/ez-timelapse', name: 'EZ Timelapse Entry Point' },
  { path: '/ez-timelapse-dark', name: 'EZ Timelapse Entry Point Dark' },
  { path: '/review-enhanced-timeline', name: 'Review Page Enhanced Timeline' },
  { path: '/review-dark', name: 'Review Page Dark' },
  { path: '/review-light', name: 'Review Page Light' },
];

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Page Navigator</h1>
        <p className="subtitle">Select a page to view:</p>
        <nav className="links-grid">
          {pages.map((page) => (
            <Link key={page.path} to={page.path} className="page-link">
              {page.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
