
  // Import Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAuth, onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
  import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

  // Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBoq6J4z48v48p177NNDNfM10Z0pp2_Hh4",
        authDomain: "animora-77260.firebaseapp.com",
        projectId: "animora-77260",
        storageBucket: "animora-77260.appspot.com",
        messagingSenderId: "325483607948",
        appId: "1:325483607948:web:c65b7846d7d4e946ba08a9",
        measurementId: "G-8WS25C0WWT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  const userBtn = document.getElementById("user-btn");

  function updateUserButton(user) {
  if (user) {
    // Show loading while fetching
    userBtn.textContent = "Loading...";
    userBtn.onclick = null;
    userBtn.style.pointerEvents = "none";
    userBtn.style.cursor = "default";

    const uid = user.uid;
    const usernameRef = ref(database, `users/${uid}/Name`);

    get(usernameRef).then((snapshot) => {
      if (snapshot.exists()) {
        const username = snapshot.val();
        userBtn.textContent = username;

        // Disable click after name is loaded
        userBtn.onclick = null;
        userBtn.style.pointerEvents = "none";
        userBtn.style.cursor = "default";
      } else {
        userBtn.textContent = "User";
        userBtn.onclick = null;
        userBtn.style.pointerEvents = "none";
        userBtn.style.cursor = "default";
      }
    }).catch((error) => {
      console.error("Error fetching username:", error);
      userBtn.textContent = "User";
      userBtn.onclick = null;
      userBtn.style.pointerEvents = "none";
      userBtn.style.cursor = "default";
    });

  } else {
    // No user logged in - show Sign In button clickable
    userBtn.textContent = "Sign In";
    userBtn.onclick = () => {
      window.location.href = "signin.html";
    };
    userBtn.style.pointerEvents = "auto";
    userBtn.style.cursor = "pointer";
  }
}


userBtn.textContent = "Loading...";
userBtn.onclick = null;
userBtn.style.pointerEvents = "none";
userBtn.style.cursor = "default";
  // Check auth state
  onAuthStateChanged(auth, (user) => {
    updateUserButton(user);
  });
  const toggleSidebarBtn = document.getElementById("toggleSidebar");
  const closeSidebarBtn = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("sidebar");
  const sidebarIcon = document.getElementById("sidebarIcon");

  const userNameElem = document.getElementById("userName");
  const userEmailElem = document.getElementById("userEmail");
  const userMobileElem = document.getElementById("userMobile");

  // Firebase user info (change auth and database to your Firebase instances)

  function updateSidebarUserInfo(user) {
  // Show "Loading..." right away
  userNameElem.textContent = "Loading...";
  userEmailElem.textContent = "Loading...";
  userMobileElem.textContent = "Loading...";

  if (user) {
    const uid = user.uid;
    const userRef = ref(database, `users/${uid}`);

    get(userRef).then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        userNameElem.textContent = data.Name || "N/A";
        userEmailElem.textContent = data.Email || user.email || "N/A";
        userMobileElem.textContent = data.Mobile || "N/A";
      } else {
        userNameElem.textContent = "N/A";
        userEmailElem.textContent = user.email || "N/A";
        userMobileElem.textContent = "N/A";
      }
    }).catch(error => {
      console.error("Error fetching user data for sidebar:", error);
      userNameElem.textContent = "N/A";
      userEmailElem.textContent = "N/A";
      userMobileElem.textContent = "N/A";
    });

  } else {
    userNameElem.textContent = "No user signed in";
    userEmailElem.textContent = "";
    userMobileElem.textContent = "";
  }
}


  toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    sidebarIcon.classList.add("rotating");
    setTimeout(() => {
      sidebarIcon.classList.remove("rotating");
      sidebarIcon.style.transform = "rotate(90deg)";
    }, 300);
    // Fetch current user and update info
    const user = auth.currentUser;
    updateSidebarUserInfo(user);
  });

  closeSidebarBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
    sidebarIcon.style.transform = "rotate(0deg)";

  });

  // Optional: click outside to close
  window.addEventListener("click", (event) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !toggleSidebarBtn.contains(event.target)
    ) {
      sidebar.classList.remove("open");
      sidebarIcon.style.transform = "rotate(0deg)";

    }
  });
  const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      popup.style.display = "block";
          setTimeout(() => {
            popup.style.opacity = "1";
          }, 10);
    
          const timer = setTimeout(() => {
            popup.style.opacity = "0";
            setTimeout(() => {
              popup.style.display = "none";
            }, 500);
          }, 3000);
    
          popup.onclick = () => {
            clearTimeout(timer);
            popup.style.opacity = "0";
            setTimeout(() => {
              popup.style.display = "none";
            }, 500);
          };
          localStorage.removeItem("cart");

    })
    .catch((error) => {
      console.error("Error during logout:", error);
      alert("Logout failed. Try again.");
    });
});
// Update user info on auth state change
onAuthStateChanged(auth, (user) => {
  updateUserButton(user); // existing function to update button text
  updateSidebarUserInfo(user);
});
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const rotation = (scrollY / 4) % 360; // divide by 10 to slow it down
    const symbol = document.getElementById('rotatingSymbol');
    symbol.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  });
    // Initial time in seconds
    const initialTime = (6 * 24 * 60 * 60) + (18 * 60 * 60) + (48 * 60); 
  let remaining = initialTime;

  // Get elements
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Helper to update the DOM
  function updateDisplay() {
    const days = Math.floor(remaining / (24 * 60 * 60));
    const hours = Math.floor((remaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remaining % (60 * 60)) / 60);
    const seconds = remaining % 60;

    daysEl.innerText = `${days} days`;
    hoursEl.innerText = `${hours} hours`;
    minutesEl.innerText = `${minutes} min`;
    secondsEl.innerText = `${seconds} sec`;
  }

  // Run the timer
  updateDisplay();
  setInterval(() => {
    remaining--;
    if (remaining < 0) {
      remaining = initialTime; // reset timer
    }
    updateDisplay();
  }, 1000); // every second
  window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('animoraModal');
    const logo = document.getElementById('animoraLogo');
    const container = document.getElementById('animoraLetters');
    const skipButton = document.getElementById('skipIntro');

    const chars = ['A', 'N', 'I', 'M', 'O', 'R', 'A'];
    const spacing = [-280, -180, -90, -20, 80, 170, 270];

    // Prevent flash on reload
    modal.classList.remove('hidden', 'fade-out', 'visible');

    // ✅ If already shown this session, skip animation
    if (sessionStorage.getItem('modalShown')) {
      modal.classList.add('fade-out');
      return;
    }

    // ✅ Mark modal as shown
    sessionStorage.setItem('modalShown', 'true');

    // ✅ Start modal
    modal.classList.add('visible');
    logo.classList.add('logo-fade-in');

    // ✅ Logo spin setup
    let rotation = 0;
    let spinning = true;
    const spinSpeed = 6;

    function animateSpin() {
      if (!spinning) return;
      rotation = (rotation + spinSpeed) % 360;
      logo.style.transform = `rotate(${rotation}deg)`;
      requestAnimationFrame(animateSpin);
    }
    animateSpin();

    // ✅ Animate letters
    const isMobile = window.innerWidth <= 600;
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'anim-letter';
      if (!isMobile) {
        span.style.setProperty('--x', `${spacing[i]}px`);
      }
      span.style.animationDelay = `${1 + i * 0.3}s`;
      container.appendChild(span);
    });

    const totalLetterTime = 1 + chars.length * 0.3 + 0.6;

    setTimeout(() => {
      spinning = false;
      const remaining = (360 - (rotation % 360)) % 360;
      const finalRotation = rotation + remaining;
      logo.style.transition = 'transform 0.4s ease-out';
      logo.style.transform = `rotate(${finalRotation}deg)`;

      setTimeout(() => {
        logo.classList.add('stop-logo');
      }, 400);
    }, totalLetterTime * 1000);

    // ✅ Auto fade out modal after 5s
    setTimeout(() => {
      modal.classList.remove('visible');
      modal.classList.add('fade-out');
    }, 5000);

    // ✅ Skip button
    skipButton.addEventListener('click', () => {
      spinning = false;
      modal.classList.remove('visible');
      modal.classList.add('fade-out');
    });
  });
