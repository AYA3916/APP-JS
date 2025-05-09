window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    preloader.classList.add("hidden");
  });

  AOS.init();

  document.getElementById("btn-about").addEventListener("click", function () {
      document.getElementById("about-Testopia").scrollIntoView({ behavior: "smooth" });
  });
  
  document.getElementById("btn-explore").addEventListener("click", function () {
      document.getElementById("features").scrollIntoView({ behavior: "smooth" });
  });
  
  
          document.getElementById("btn-about").addEventListener("click", function () {
  const aboutSection = document.getElementById("about-TesTopia");
  aboutSection.scrollIntoView({ behavior: "smooth" });
  });
  
  
          document.getElementById("btn-explore").addEventListener("click", function () {
  const featureSection = document.getElementById("features");
  featureSection.scrollIntoView({ behavior: "smooth" });
  });