/* private scripts */
/* import './ostrale023-umfrage_json';*/
import {json} from '/js/ostrale023-umfrage_json.js';

import '/js/survey.core.min.js';
import '/js/survey.i18n.min.js';
import '/js/survey.jquery.min.js';
/*import surveyLocalisation from '/js/survey.i18n.min.js';*/
import '/js/bootstrap-integration.min.js';

window.ostrale_survey_locale = "de";
var o23survey = new Survey.Model(json);
var css = new surveyCss();
var o23locale = surveyLocalisation.locales();

function call_startSurvey(locale) {
    window.ostrale_survey_locale = locale;
    $("#surveyElement").survey({model: o23survey, locale: locale});
    console.log('document.locale: ' + window.ostrale_survey_locale);
    console.log('survey.locale: ' + window.o23survey.locale);
};
/* scripts called after dom content loaded */
document.addEventListener("DOMContentLoaded", function () {

    var btnDE = document.getElementById("BtnDE");
    var btnEN = document.getElementById("BtnEN");
    var SurveyModal = document.getElementById("my-modal");

    function call_startSurvey(locale) {
        window.ostrale_survey_locale = locale;
        $("#surveyElement").survey({model: o23survey, locale: locale});
        console.log('document.locale: ' + window.ostrale_survey_locale);
        console.log('survey.locale: ' + window.o23survey.locale);
    };
    console.log('DOMContentLoaded! ')
    window.o23survey.supportedLocales = ["en", "de"];
    window.o23survey.defaultLocale = "en";
    window.o23survey.onComplete.add((sender, options) => {
        console.log("DATA: " + JSON.stringify(sender.data, null, 3));
    });

    window.o23survey.onStarted.add(() => {
        window.o23survey.showNavigationButtons = false;
        window.o23survey.locale = window.ostrale_survey_locale;
    });

    SurveyModal.addEventListener("modal.fade.show", function (event) {
        console.log('event getriggert');
        // Get the button that triggered the modal
        var button = event.relatedTarget;
        // Extract value from the custom data-* attribute
        document.ostrale_survey_locale = button.getAttribute("data-bs-locale");
        console.log('data-bs-locale: ' + button.getAttribute("data-bs-locale"));
        // Change survey language
        call_startSurvey(button.getAttribute("data-bs-locale"));
        //myModal.querySelector(".modal-title").innerText = titleData;
        document.o23survey.locale = document.ostrale_survey_locale;
        console.log('ostrale_survey_locale: ' + document.ostrale_survey_locale);
        console.log('o23survey.locale: ' + document.o23survey.locale);
    });


    btnDE.addEventListener("click", function () {
        SurveyModal.show();

    });
    btnEN.addEventListener("click", function () {
        SurveyModal.show();
    });


});

