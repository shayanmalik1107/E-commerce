
        document.body.classList.remove('no-js');

      function updateTimer() {
        const timerElements = document.querySelectorAll(".timer div");
        let days = parseInt(timerElements[0].textContent.split(" ")[0]);
        let hours = parseInt(timerElements[1].textContent.split(" ")[0]);
        let minutes = parseInt(timerElements[2].textContent.split(" ")[0]);

        minutes--;

        if (minutes < 0) {
          minutes = 59;
          hours--;

          if (hours < 0) {
            hours = 23;
            days--;

            if (days < 0) {
              days = 0;
              hours = 0;
              minutes = 0;
            }
          }
        }

        timerElements[0].textContent = `${days
          .toString()
          .padStart(2, "0")} days`;
        timerElements[1].textContent = `${hours
          .toString()
          .padStart(2, "0")} hours`;
        timerElements[2].textContent = `${minutes
          .toString()
          .padStart(2, "0")} min`;
      }

      setInterval(updateTimer, 60000);
      function navigate() {
      window.location.href = "Shop.html"; // Replace with your destination URL
    }
    