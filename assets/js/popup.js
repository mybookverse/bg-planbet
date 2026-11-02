document.addEventListener("DOMContentLoaded", () => {
  const path = (location.pathname || "").toLowerCase();

  const isIndex =
    path === "/" ||
    path.endsWith("/") ||
    path.endsWith("index.html");

  const isLander = path.endsWith("lander.html");

  // Only show on index or lander
  if (!isIndex && !isLander) return;

  // Prevent double rendering
  if (document.querySelector(".modal-backdrop")) return;

  setTimeout(() => {
  // Create popup
  const bd = document.createElement("div");
  bd.className = "modal-backdrop";
  bd.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Age Verification" style="text-align:center">
      <h3>AGE VERIFICATION</h3>
      <p>Please verify your age to access this website. You must be at least 18 years old to enter.</p>
      <div class="actions">
        <button class="btn" id="gn-yes">Yes, I am 18 or older</button>
        <button class="btn ghost" id="gn-close">No, I am under 18</button>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display = "flex";

  const close = () => {
    bd.style.display = "none";
    bd.remove();
  };

  /**
   * LANDER LOGIC (Redirect on both buttons)
   */
  const landerRedirect = "https://dailycentral.online/";

  document.getElementById("gn-yes").addEventListener("click", () => {
    if (isLander) {
      window.location.href = landerRedirect;
    } else {
      // Index = just close
      close();
    }
  });

  document.getElementById("gn-close").addEventListener("click", () => {
    if (isLander) {
      window.location.href = landerRedirect;
    } else {
      // INDEX CLOSE BEHAVIOR
      const target =
        (document.querySelector('a[href*="terms.html"]') && "terms.html") ||
        (document.querySelector('a[href*="privacy.html"]') && "privacy.html");

      if (target) {
        window.location.href = target;
      } else {
        close(); // fallback
      }
    }
  });
  },   200);//Delay to avoid flash of content
});
