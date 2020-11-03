function displayResults(responseJson, githubUser) {
    console.log(responseJson)
    $('.js-repo-list').empty();

    for(i = 0; i < responseJson.length; i ++) {
        let projectURL = `https://github.com/${githubUser}/${responseJson[i].name}`
        $('.js-repo-list').append(
            `<li>
                <h3>${responseJson[i].name}</h3>
                <p><a href="${projectURL}">Visit the ${responseJson[i].name} repository here</a></p>
            </li>`
        )
    }
    $('.js-repo-list').removeClass('hidden');
}

function getUserRepos(githubUser) {
    const acceptHeader = "application/vnd.github.v3+json"
    const searchURL = `https://api.github.com/users/${githubUser}/repos`
    const options = {
        headers: new Headers({
            "accept": acceptHeader})
    };
    $('.js-error-message').empty();

    fetch(searchURL, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, githubUser))
        .catch(err => {
            $('.js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function handleUserSearch() {
    $('form').submit(event => {
        event.preventDefault();
        const githubUser = $('#searchSubject').val();

        getUserRepos(githubUser);
    })
}

$(handleUserSearch)
