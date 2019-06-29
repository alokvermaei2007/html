;
((window) => {
    /* THIS SCRIPT IS NEEDED TO TOGGLE  CLASS */
    window.toggleClass = (targetElement) => {
        var sourceID = targetElement.getAttribute("data-toggle");
        document.getElementById(sourceID).classList.toggle("open");
    }


    /* THIS SCRIPT IS NEEDED FOR PAGINATION  CLASS */


    window.currentPage = window.currentPage || 1;

    window.addEventListener("load", () => {
        renderElement();
    });
    window.moveToNextPage = (totalCount) => {
        window.currentPage += 1;
        if (window.currentPage > totalCount) {
            window.currentPage = 1;
        }
        renderElement();
    }

    function renderElement() {
        const targetedPage = 'page' + window.currentPage;
        [...document.querySelectorAll("[data-page]")]
        .map((element) => {
            if (element.getAttribute("data-page") === targetedPage ||
                element.getAttribute('id') === targetedPage) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });

        document.getElementById(targetedPage).scrollIntoView();
    }

})(window);