// Inspired by Michael Wang's clever implementation - mkwng.com 
var bait = $('.bait');
// Javascript has no native assoc. array, so let's use an Object instead to hold my answers. Naming this way, rather than via numbers, allows for easier re-arranging of the copy.
var answers = new Object;
answers.arch = "in architecture, which taught me to balance design with construction";
answers.swiss = "from coding prototypes to running a UX School";
answers.dunce = "as long as they help lead to the right answer";
answers.huge = "as an Experience Lead at Huge, after 3.5 years";
answers.silly = "best explained over a drink"
answers.hero = "saving lives, but a designer trying to make them easier";

// Michael's function for wrapping the original element in a span and removing its contents
function replaceContent(bait, key) {
    // Append answer to the bait
    var new_text = bait.html() + " " + answers[key];
    var answer_id = "#" + key;
    // Wrap bait in a span, then remove the inside
    bait.wrap('<span class="answer current" id="'+key+'" />').remove();
    // Add new text and hover effect when user rolls off
    $(answer_id).html(new_text).on('mouseleave', function(e) {
        $(this).addClass('active-hover-fix');
        // Only run this once
        $(this).off(e);
    });
}

// Modified solution from here: http://www.electriceasel.com/tips-tricks/using-jquery-to-hide-email
function replaceEmail(target) {
    var e = "iwonderhow";
    var a = "@";
    var d = "kunal";
    var c = ".is";
    var h = 'mailto:' + e + a + d + c;
    $(target).attr('href', h);
};

function updateImg(target) {
    // Hide current image
    $('object.active').removeClass('active');
    // Show new image
    $("#" + target + "-svg").addClass('active');
}

$(document).ready(function() {
    replaceEmail('#email');
    // Replace bait with the answer
    $('a.bait').on('click touchend', function(e) {
        // Find the key of the link that was clicked
        var key = $(this).attr('id');

        // Remove the selected style from whatever the answer was
        $('span.current').removeClass('current active-hover-fix');
        
        // Change the element from a.bait to span.answer
        replaceContent($(this), key);
        // Update image
        updateImg(key);

        // Cancel the default action (jumping to top of page)
        e.preventDefault();
    });

    // Listen to the parent element for any updates to span.answer's
    $('.container').on('click touchend', 'span.answer', function() {
        var key = $(this).attr('id');
        // Whatever answer is currently selected, remove the styles
        $('span.answer.current').removeClass('current active-hover-fix');
        // If we're on the currently selected answer
        if ((key + "-svg") == $('object.active').attr('id')) {
            // Replace image with default
            updateImg('hi');
        }
        // Otherwise, if this is a different answer
        else 
        {
            // Apply selected style to this span.answer
            $(this).addClass('current').on('mouseleave', function(e) {
                // Reapply the active-hover-fix to the active answer
                $(this).addClass('active-hover-fix');
                // Only run once
                $(this).off(e);
            });
            // Update the image to match
            updateImg(key);
        }
    });

});