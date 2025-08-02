const accessKey = "QBLzNzDxyKyIhauQPsW1yBjgdBmSpUKEqGEvHkvAWGc";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const loader = document.getElementById("loader");
const darkModeToggle = document.getElementById("darkModeToggle");

let keyword = "";
let page = 1;

darkModeToggle.addEventListener("change", () => {
    const html = document.documentElement;
    html.setAttribute("data-bs-theme", darkModeToggle.checked ? "dark" : "light");
});


async function searchImages() {
    loader.style.display = "block";
    const query = searchBox.value.trim();
    if (!query) return;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.forEach(result => {
            const col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

            const card = document.createElement("div");
            card.className = "card position-relative";

            const img = document.createElement("img");
            img.src = result.urls.small;
            img.alt = result.alt_description || "Image";
            img.className = "card-img-top";

            const downloadBtn = document.createElement("a");
            downloadBtn.href = result.links.download;
            downloadBtn.target = "_blank";
            downloadBtn.innerText = "⬇";
            downloadBtn.className = "download-btn position-absolute";

            card.appendChild(img);
            card.appendChild(downloadBtn);
            col.appendChild(card);
            searchResult.appendChild(col);
        });

        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error:", error);
    } finally {
        loader.style.display = "none";
    }
}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
