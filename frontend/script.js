// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }, 1000); // delay for preloader effect
  }

  // Section switching
  window.showSection = function (id) {
    document.querySelectorAll(".section").forEach(section => {
      section.classList.remove("active");
    });
    const targetSection = document.getElementById(id);
    if (targetSection) {
      targetSection.classList.add("active");
    }
  };

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  const formResponse = document.getElementById("formResponse");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formResponse.textContent = "❗ Please fill in all fields.";
        formResponse.style.color = "red";
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/contact", {  // ✅ Updated here
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        const data = await res.json();

        if (res.ok) {
          formResponse.textContent = "✅ Message sent successfully!";
          formResponse.style.color = "green";
          contactForm.reset();
        } else {
          formResponse.textContent = `❌ ${data.error || "Failed to send message."}`;
          formResponse.style.color = "red";
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        formResponse.textContent = "❌ Server error. Please try again later.";
        formResponse.style.color = "red";
      }
    });
  }
});
