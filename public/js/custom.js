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

    /*THIS SCRIPT IS FOR TAB FEATURE PRESENT BELOW VIDEO LINK*/

    [...document.querySelectorAll('[data-feature="tab"] [data-target]')]
    .map((element) => {
        element.addEventListener('click', function (event) {
            // activate link
            targetedContent = event.target.getAttribute('data-target');

            [...document.querySelectorAll('[data-feature="tab"] [data-target]')]
            .map((element) => {
                if (element.getAttribute("data-target") === targetedContent) {
                    element.classList.add("tab__list-link--active");
                } else {
                    element.classList.remove("tab__list-link--active");
                }
            });
            [...document.querySelectorAll('[data-feature="tab"] [data-content]')]
            .map((element) => {
                if (element.getAttribute("data-content") === targetedContent) {
                    element.classList.add("tab__content--open");
                } else {
                    element.classList.remove("tab__content--open");
                }
            });
        });
    });





})(window);