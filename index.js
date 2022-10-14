(function () {
  $ = jQuery;

  $(document).ready(function () {
    formatAllRichText();
    const inputClass = "#rsg-editor-input";

    // this is used for testing;
    if ($(inputClass).length > 0) {
      $(inputClass).on("input", function () {
        formatAllRichText();
      });
    }
  });

  function formatAllRichText() {
    let incoming, inputClass;

    formatId = ".w-richtext";
    console.log;
    inputClass = "#rsg-editor-input";

    // only run this if the test input div is present
    if ($(inputClass).length > 0) {
      incoming = $(inputClass).html();
      incoming = incoming.replaceAll("{{", "<");
      incoming = incoming.replaceAll("}}", ">");
    }
    $(formatId).each(function () {
      if ($(this).attr("rsg-rich-layout") !== undefined) {
        if ($(inputClass).length === 0) {
          incoming = $(this).html();
          incoming = incoming.replaceAll("{{", "<");
          incoming = incoming.replaceAll("}}", ">");
        }
        $(this).html(incoming);

        // remove p tags that are just line breaks
        let output = $(this).html();

        $(this).html(output.replaceAll("<p><br></p>", ""));
        $(this).html(output.replaceAll("&nbsp;</p><p>", ""));
        $(this).html(output.replaceAll("</p><p>", ""));

        const shouldAnimateOut = $(this).attr("rsg-animate") !== undefined;
        if (shouldAnimateOut) {
          setTimeout(() => {
            $(this).attr("rsg-rich-layout-animation", "true");
          }, 500);
        }

        setTimeout(
          () => {
            $(this).removeAttr("rsg-rich-layout-animation");
            $(this).removeAttr("rsg-rich-layout");
            $(this).removeAttr("rsg-animate");
          },
          shouldAnimateOut ? 1000 : 100
        );
      }
    });

    // remove empty p tags
    $(".w-richtext p:empty").remove();
  }
})();
