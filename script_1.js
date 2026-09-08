
      (function() {
        const toggleBtn = document.getElementById('mobileMenuToggle');
        const closeBtn = document.getElementById('drawerClose');
        const drawer = document.getElementById('mobileMenuDrawer');
        const overlay = document.getElementById('mobileMenuOverlay');

        function openDrawer() {
          drawer.classList.add('active');
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
          drawer.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }

        if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (overlay) overlay.addEventListener('click', closeDrawer);
      })();
    