import re

with open('Animora.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix CSS: remove flex-wrap and flex 100% from media query
css_to_replace = """@media (max-width: 768px) {
  .navbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
  }"""
css_replacement = """@media (max-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }"""

content = content.replace(css_to_replace, css_replacement)

# Fix HTML layout:
# 1. Remove user-btn from right-menu
# 2. Put user-btn in mobileMenuDrawer
# 3. Ensure right-menu has toggleSidebar and mobileMenuToggle

html_nav = """      <div class="right-menu" style="display: flex; align-items: center; gap: 20px;">
        <div class="nav-links">
          <a href="Animora.html" class="active">
            <span class="nav-text">Home</span>
            <i class="fas fa-home nav-icon"></i>
          </a>
          <a href="Shop.html">
            <span class="nav-text">Shop</span>
            <i class="fas fa-store nav-icon"></i>
          </a>
          <a href="About.html">
            <span class="nav-text">About</span>
            <i class="fas fa-info-circle nav-icon"></i>
          </a>
          <a href="Contact.html">
            <span class="nav-text">Contact</span>
            <i class="fas fa-envelope nav-icon"></i>
          </a>
        </div>
      
        <button class="signin-button" id="user-btn" style="margin-right: 0;">Sign In</button>

        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Open Menu">
          <i class="fas fa-bars"></i>
        </button>
      
        <button id="toggleSidebar" style="cursor: pointer; background: none; border: none;">
          <img src="images/slide.png" alt="Menu" style="width: 30px; height: 30px;" id="sidebarIcon" />
        </button>
      </div>"""

html_nav_new = """      <div class="right-menu" style="display: flex; align-items: center; gap: 20px;">
        <div class="nav-links">
          <a href="Animora.html" class="active">
            <span class="nav-text">Home</span>
            <i class="fas fa-home nav-icon"></i>
          </a>
          <a href="Shop.html">
            <span class="nav-text">Shop</span>
            <i class="fas fa-store nav-icon"></i>
          </a>
          <a href="About.html">
            <span class="nav-text">About</span>
            <i class="fas fa-info-circle nav-icon"></i>
          </a>
          <a href="Contact.html">
            <span class="nav-text">Contact</span>
            <i class="fas fa-envelope nav-icon"></i>
          </a>
        </div>
      
        <button id="toggleSidebar" style="cursor: pointer; background: none; border: none; display: flex; align-items: center;">
          <img src="images/slide.png" alt="Menu" style="width: 30px; height: 30px;" id="sidebarIcon" />
        </button>

        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Open Menu">
          <i class="fas fa-bars"></i>
        </button>
      </div>"""

content = content.replace(html_nav, html_nav_new)

# Move signin button to mobile drawer
html_drawer = """      <div class="drawer-links">
        <a href="Animora.html" class="drawer-link active"><i class="fas fa-home"></i> Home</a>
        <a href="Shop.html" class="drawer-link"><i class="fas fa-store"></i> Shop</a>
        <a href="About.html" class="drawer-link"><i class="fas fa-info-circle"></i> About</a>
        <a href="Contact.html" class="drawer-link"><i class="fas fa-envelope"></i> Contact</a>
        <a href="Cart.html" class="drawer-link"><i class="fas fa-shopping-cart"></i> Cart</a>
        <a href="signin.html" class="drawer-link drawer-btn"><i class="fas fa-user"></i> Sign In</a>
      </div>"""

html_drawer_new = """      <div class="drawer-links">
        <a href="Animora.html" class="drawer-link active"><i class="fas fa-home"></i> Home</a>
        <a href="Shop.html" class="drawer-link"><i class="fas fa-store"></i> Shop</a>
        <a href="About.html" class="drawer-link"><i class="fas fa-info-circle"></i> About</a>
        <a href="Contact.html" class="drawer-link"><i class="fas fa-envelope"></i> Contact</a>
        <a href="Cart.html" class="drawer-link"><i class="fas fa-shopping-cart"></i> Cart</a>
        <button class="signin-button" id="user-btn" style="width: 100%; margin-top: 20px; margin-right: 0;">Sign In</button>
      </div>"""

content = content.replace(html_drawer, html_drawer_new)

with open('Animora.html', 'w', encoding='utf-8') as f:
    f.write(content)

