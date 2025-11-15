const API = "https://app-ff1c6e6n8-montrees-projects-d9ec7da7.vercel.app";

// Popup Follow Mouse
document.addEventListener("mousemove", (e) => {
    const popup = document.getElementById("popup");
    popup.style.top = e.clientY + 10 + "px";
    popup.style.left = e.clientX + 10 + "px";
    popup.style.opacity = 1;

    clearTimeout(popup.timer);
    popup.timer = setTimeout(() => popup.style.opacity = 0, 300);
});

function showResult(data) {
    document.getElementById("result-box").textContent =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

// ---------- GET ALL ----------
async function getAllUsers() {
    try {
        const res = await fetch(`${API}/api/users`);
        showResult(await res.json());
    } catch (e) {
        showResult("ERROR: " + e);
    }
}

// ---------- GET ONE ----------
async function getUser() {
    const id = document.getElementById("search-id").value;
    if (!id) return showResult("Please enter User ID");

    try {
        const res = await fetch(`${API}/api/users/${id}`);
        showResult(await res.json());
    } catch (e) {
        showResult("ERROR: " + e);
    }
}

// ---------- POST ----------
async function createUser() {
    const payload = {
        id: document.getElementById("input-id").value || undefined,
        name: document.getElementById("input-name").value,
        email: document.getElementById("input-email").value,
        role: document.getElementById("input-role").value
    };

    try {
        const res = await fetch(`${API}/api/users`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        showResult(await res.json());
    } catch (e) {
        showResult("ERROR: " + e);
    }
}

// ---------- PUT ----------
async function updateUser() {
    const id = document.getElementById("input-id").value;
    if (!id) return showResult("PUT requires user ID");

    const payload = {
        name: document.getElementById("input-name").value,
        email: document.getElementById("input-email").value,
        role: document.getElementById("input-role").value
    };

    try {
        const res = await fetch(`${API}/api/users/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        showResult(await res.json());
    } catch (e) {
        showResult("ERROR: " + e);
    }
}

// ---------- DELETE ----------
async function deleteUser() {
    const id = document.getElementById("search-id").value;
    if (!id) return showResult("Please enter User ID");

    try {
        const res = await fetch(`${API}/api/users/${id}`, {
            method: "DELETE"
        });

        showResult(await res.json());
    } catch (e) {
        showResult("ERROR: " + e);
    }
}
