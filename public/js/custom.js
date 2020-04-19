// GLOBAL VARIABLES
let currentPage = window.currentPage || 1;
let nextQuestion;
$(document).ready(function () {
    renderElement();

    /*THIS SCRIPT IS FOR TAB FEATURE PRESENT BELOW VIDEO LINK*/
    $('[data-feature="tab"] [data-target]').on('click', function () {
        targetedContent = $(this).attr('data-target');
        $('[data-feature="tab"] [data-target]').removeClass("tab__list-link--active");
        $(this).addClass("tab__list-link--active")
        $('[data-feature="tab"] [data-content]').each(function () {
            if ($(this).attr("data-content") === targetedContent) {
                $(this).addClass("tab__content--open");
            } else {
                $(this).removeClass("tab__content--open");
            }
        });

    });

    $("[data-dialogID], #noAnswer").dialog({
        autoOpen: false,
        classes: {
            "ui-dialog": "custom-dialog"
        },
        minWidth: 500
    });

    $('[data-form="submit"]').on('click', function (event) {
        event.preventDefault();

        const formRef = $(this).closest("form");
        nextQuestion = formRef.attr("data-next-question");
        dialogID = formRef.attr("data-dialogRef");
        const isMultipleChoice = formRef.attr("data-question-type") === 'multiple'
        const answer = formRef.attr("data-answer").split(',');
        const value = [];

        if (isMultipleChoice) {
            $.each(formRef.find("input[type='checkbox']:checked"), function () {
                const selectedAnswer = $(this).val()
                if (!!selectedAnswer) {
                    value.push(selectedAnswer);
                }

            });
        } else {
            const selectedAnswer = formRef.find("input[type='radio']:checked").val()
            if (!!selectedAnswer) {
                value.push(selectedAnswer);;
            }

        }

        if (value.length <= 0) {
            noAnswer();
            return;
        }

        if (!nextQuestion) {
            $.each($('document').find("[data-button]"), function () {
                if ($(this).attr('data-button') === 'next') {
                    $(this).style.display = 'none';
                } else if ($(item).attr('data-button') === 'showResult') {
                    $(this).style.display = 'block';
                }

            });
        }

        JSON.stringify(answer) == JSON.stringify(value) ? correctAnswer(dialogID) : incorrectAnswer(dialogID);
    });

    $('[data-event="accordian-click"]').on('click', function () {
        var sourceID = $(this).data("toggle");
        elementRef = document.getElementById(sourceID) || document.querySelector('[data-toggleId="' + sourceID + '"]');
        elementRef.classList.toggle("open");
    });

    $('[data-event="panel-click"]').on('click', function () {


        // find closest parent containing data-feature="accordian"
        const targetParent = $(this).closest("[data-feature='accordian']");

        const sourceID = $(this).data("toggle");

        targetParent.children('[data-toggleId]').each(function (element) {
            element.classList.remove("open");
        });
        elementRef = document.getElementById(sourceID) || document.querySelector('[data-toggleId="' + sourceID + '"]');
        elementRef.classList.add("open");
    });


});



/* THIS SCRIPT IS NEEDED FOR PAGINATION  CLASS */
function renderElement() {
    const targetedPage = 'page' + currentPage;
    $('[data-page]').each(function () {
        if ($(this).data("page") === targetedPage) {
            $(this).css({
                'display': 'block'
            });
        } else {
            $(this).css({
                'display': 'none'
            });
        }
    });
    $(window).scrollTop(0);
}

function moveToNextPage(totalCount) {
    currentPage = totalCount;
    if (currentPage > totalCount) {
        urrentPage = 1;
    }
    renderElement();
}

/*THIS SCRIPT IS QUESTION ANSWER SECTION*/
function submitAnswer(buttonRef) {
    selectedAnswer = buttonRef.getAttribute('data-selectedOption');
    let element = document.getElementById('page' + currentPage);
    element.classList.add("question-answered");
    currentAnswer = element.getAttribute('data-answer');

    optionRef = document.querySelector('[data-toggleId="option' + selectedAnswer + '"]');
    if (selectedAnswer === currentAnswer) {
        optionRef.classList.add('success');
    } else {
        optionRef.classList.add('error');
    }
}


/* THIS SCRIPT FOR ACCORDIAN WITH SINGLE PANEL OPEN AT ANY POINT OF TIME */
function togglePanel(targetElement) {

}



function correctAnswer(dialogID) {
    dialogID = dialogID + '_correct';
    $('[data-dialogID="' + dialogID + '"]').dialog("open");
}

function noAnswer() {
    $("#noAnswer").dialog("open");
}

function incorrectAnswer(dialogID) {
    dialogID = dialogID + '_incorrect';
    $('[data-dialogID="' + dialogID + '"]').dialog("open");
}

function closeDialog() {
    $("[data-dialogID], #noAnswer").dialog("close");
}

function moveNext() {
    closeDialog();
    if (!!nextQuestion) {
        window.moveToNextPage(nextQuestion);
    }
}