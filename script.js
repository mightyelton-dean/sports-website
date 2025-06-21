document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle with Animation
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navUl = document.querySelector("nav ul");

  mobileMenuBtn.addEventListener("click", function () {
    // Toggle menu with animation
    if (navUl.classList.contains("show")) {
      navUl.style.animation = "slideUp 0.3s forwards";
      setTimeout(() => {
        navUl.classList.remove("show");
        navUl.style.animation = "";
      }, 300);
    } else {
      navUl.classList.add("show");
      navUl.style.animation = "slideDown 0.3s forwards";
    }

    // Animate hamburger icon
    this.classList.toggle("active");
  });

  // Smooth close when clicking links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navUl.style.animation = "slideUp 0.3s forwards";
      setTimeout(() => {
        navUl.classList.remove("show");
        navUl.style.animation = "";
        mobileMenuBtn.classList.remove("active");
      }, 300);
    });
  });

  // Load live scores with loading animation
  loadLiveScores();

  // Load expert tips with loading animation
  loadExpertTips();

  // Add scroll animations
  initScrollAnimations();
});

function initScrollAnimations() {
  const animateOnScroll = (elements, animation) => {
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.animation = `${animation} 0.6s forwards`;
      }
    });
  };

  window.addEventListener("scroll", () => {
    // Animate feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    animateOnScroll(featureCards, "fadeInUp");

    // Animate score items
    const scoreItems = document.querySelectorAll(".live-score-item");
    animateOnScroll(scoreItems, "fadeInRight");

    // Animate tip items
    const tipItems = document.querySelectorAll(".tip-item");
    animateOnScroll(tipItems, "fadeInLeft");
  });
}

function loadLiveScores() {
  const scoresContainer = document.querySelector(".scores-container");

  // Add loading animation
  scoresContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-ball loading-ball-1"></div>
            <div class="loading-ball loading-ball-2"></div>
            <div class="loading-ball loading-ball-3"></div>
        </div>
    `;

  // Simulate API loading delay
  setTimeout(() => {
    const matches = [
      {
        league: "Premier League",
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        score: "2 - 1",
        time: "75'",
        status: "Live",
      },
      {
        league: "La Liga",
        homeTeam: "Barcelona",
        awayTeam: "Real Madrid",
        score: "0 - 0",
        time: "HT",
        status: "Half Time",
      },
      {
        league: "Serie A",
        homeTeam: "Juventus",
        awayTeam: "AC Milan",
        score: "1 - 0",
        time: "23'",
        status: "Live",
      },
      {
        league: "Bundesliga",
        homeTeam: "Bayern Munich",
        awayTeam: "Dortmund",
        score: "3 - 2",
        time: "89'",
        status: "Live",
      },
    ];

    let html = '<div class="live-scores-header slide-in">';
    html += '<div class="league">League</div>';
    html += '<div class="match">Match</div>';
    html += '<div class="score">Score</div>';
    html += '<div class="time">Time</div>';
    html += '<div class="status">Status</div>';
    html += "</div>";

    matches.forEach((match, index) => {
      html += `
                <div class="live-score-item" style="animation-delay: ${
                  index * 0.1
                }s">
                    <div class="league">${match.league}</div>
                    <div class="match">
                        <span class="home-team">${match.homeTeam}</span>
                        <span class="vs">vs</span>
                        <span class="away-team">${match.awayTeam}</span>
                    </div>
                    <div class="score">${match.score}</div>
                    <div class="time">${match.time}</div>
                    <div class="status ${
                      match.status === "Live" ? "live pulse" : ""
                    }">${match.status}</div>
                </div>
            `;
    });

    scoresContainer.innerHTML = html;

    // Add live match animation
    setInterval(() => {
      const liveMatches = document.querySelectorAll(".status.live");
      liveMatches.forEach((match) => {
        match.classList.toggle("pulse");
      });
    }, 1500);
  }, 1000);
}

function loadExpertTips() {
  const tipsContainer = document.querySelector(".tips-container");

  // Add loading animation
  tipsContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-bar"></div>
        </div>
    `;

  // Simulate API loading delay
  setTimeout(() => {
    const tips = [
      {
        match: "Arsenal vs Chelsea",
        prediction: "Arsenal to win",
        odds: "2.10",
        confidence: "80%",
        sport: "Football",
      },
      {
        match: "Lakers vs Warriors",
        prediction: "Over 215.5 points",
        odds: "1.90",
        confidence: "75%",
        sport: "Basketball",
      },
      {
        match: "Nadal vs Djokovic",
        prediction: "Djokovic to win",
        odds: "1.75",
        confidence: "85%",
        sport: "Tennis",
      },
    ];

    let html = '<div class="tips-header slide-in">';
    html += '<div class="match">Match</div>';
    html += '<div class="prediction">Prediction</div>';
    html += '<div class="odds">Odds</div>';
    html += '<div class="confidence">Confidence</div>';
    html += '<div class="sport">Sport</div>';
    html += "</div>";

    tips.forEach((tip, index) => {
      html += `
                <div class="tip-item" style="animation-delay: ${index * 0.1}s">
                    <div class="match">${tip.match}</div>
                    <div class="prediction">${tip.prediction}</div>
                    <div class="odds">${tip.odds}</div>
                    <div class="confidence">
                        <div class="confidence-bar" style="width: ${
                          tip.confidence
                        }"></div>
                        <span>${tip.confidence}</span>
                    </div>
                    <div class="sport">${tip.sport}</div>
                </div>
            `;
    });

    tipsContainer.innerHTML = html;

    // Animate confidence bars
    const confidenceBars = document.querySelectorAll(".confidence-bar");
    confidenceBars.forEach((bar) => {
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.transition = "width 1s ease-out";
        bar.style.width = bar.getAttribute("style").match(/width: (.+?);/)[1];
      }, 100);
    });
  }, 1500);
}
