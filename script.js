let titles = [];
let notices = [];

let titlestrash = [];
let noticestrash = [];

function closeNewNote() {
    document.getElementById('newNote').classList.add('d-none');
}

function openNewNote() {
    document.getElementById('newNote').classList.remove('d-none');

    document.getElementById('title').value = '';
    document.getElementById('notice').value = '';
}

function addNotice() {
    let title = document.getElementById('title').value;
    let notice = document.getElementById('notice').value;
    titles.push(title);
    notices.push(notice);

    localStorage.setItem('titles', JSON.stringify(titles));
    localStorage.setItem('notices', JSON.stringify(notices));

    document.getElementById('title').value = '';
    document.getElementById('notice').value = '';

    render();
}

function deleteNotice(i) {
    titlestrash.push(titles[i]);
    noticestrash.push(notices[i])

    titles.splice(i, 1);
    notices.splice(i, 1);

    localStorage.setItem('titles', JSON.stringify(titles));
    localStorage.setItem('notices', JSON.stringify(notices));

    localStorage.setItem('titlestrash', JSON.stringify(titlestrash));
    localStorage.setItem('noticestrash', JSON.stringify(noticestrash));

    render();
}

function render() {
    document.getElementById('notices').innerHTML = '';
    document.getElementById('delete').classList.add('d-none');

    titles = JSON.parse(localStorage.getItem('titles'));
    notices = JSON.parse(localStorage.getItem('notices'));


    for (let i = 0; i < titles.length; i++) {
        document.getElementById('notices').innerHTML += `
    <div class="notice">
        <b><p>${titles[i]}</p></b> 
        <pre>${notices[i]}</pre> 
        <img src="img/trash.png" onclick="deleteNotice(${i})">
    </div>
    `;
    }

    if (titles.length < 1, notices.length < 1)  {
        document.getElementById('notices').innerHTML += `
        <h1 style="text-align: center; padding-top: 200px">Hier werden deine Notizen angezeigt</h1>
        `; 
    }

}

function renderTrash() {
    document.getElementById('notices').innerHTML = '';

    titlestrash = JSON.parse(localStorage.getItem('titlestrash'));
    noticestrash = JSON.parse(localStorage.getItem('noticestrash'));

    for (let i = 0; i < titlestrash.length; i++) {
        document.getElementById('notices').innerHTML += `
    <div class="notice">
       <b><p>${titlestrash[i]}</p></b> 
       <pre>${noticestrash[i]}</pre> 
    </div>
    `;
    }

    closeNewNote();
    document.getElementById('delete').classList.remove('d-none');

    if (titlestrash.length < 1, noticestrash.length < 1)  {
        document.getElementById('notices').innerHTML += `
        <h1 style="text-align: center; padding-top: 200px; padding-bottom: 200px">Hier werden deine gelöschten Notizen angezeigt</h1>
        `; 
    }
}

function deleteTrash() {
    titlestrash = [];
    noticestrash = [];

    localStorage.setItem('titlestrash', JSON.stringify(titlestrash));
    localStorage.setItem('noticestrash', JSON.stringify(noticestrash));

    document.getElementById('notices').innerHTML = '';

    renderTrash();
}