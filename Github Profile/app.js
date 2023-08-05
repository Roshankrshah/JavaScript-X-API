const container = document.querySelector(".container");
const form = document.querySelector(".input-form");
const search = document.querySelector(".input-value");

const API_URL = "https://api.github.com/users/";

async function getUser(username) {
    try {
        const resp = await fetch(API_URL + username);
        const data = await resp.json();

        if (data.message) {
            container.innerHTML = '<div class="error">Your search not matched any github user</div>';
            return;
        }
        createUserCard(data);
        getRepos(username);
    } catch (error) {
        container.innerText = '<div class="error">Not Found, Please Try again later</div>';
    }
}

async function getRepos(username) {
    try {
        const resp = await fetch(API_URL + username + "/repos");
        const data = await resp.json();
        addReposToCard(data);
    } catch (error) {
        container.innerText = '<div class="error">Not Found, Please Try again later</div>';
    }
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 15)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}<span> <a href="https://github.com/${user.login}" target="_blank"><i class="fa-solid fa-up-right-from-square"></i></a></span></h2>                
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

    container.innerHTML = cardHTML;
}

getUser("Roshankrshah");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;

    if (user) {
        getUser(user);
        search.value = "";
    }
});