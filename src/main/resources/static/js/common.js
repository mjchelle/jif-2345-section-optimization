// common functions used across all pages
function goToSchedulePage() {
    window.location.href="schedule.html";
}

function goToMainPage() {
    window.location.href="mainpage.html";
}

function exit() {
    // whatever exit means
    localStorage.clear();
    location.reload();
}