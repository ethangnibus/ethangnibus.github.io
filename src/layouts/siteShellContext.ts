export interface SiteShellOutletContext {
  mainContentWidth: number;
  /** True when the blog outline sidebar is open (desktop strip or mobile overlay). */
  blogSidebarOpen: boolean;
  /** Opens the blog sidebar if closed, closes it if open (hero “Browse / Close Blog Posts” control). */
  toggleBlogSidebar: () => void;
}
