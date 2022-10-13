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

      const shouldAnimateOut = $(this).attr("animate") !== undefined;
      if (shouldAnimateOut) {
        setTimeout(() => {
          $(this).attr("rich-text-layout-animation", "true");
        }, 250);
      }

      setTimeout(
        () => {
          $(this).removeAttr("rich-text-layout-animation");
          $(this).removeAttr("rich-text-layout");
          $(this).removeAttr("animate");
        },
        shouldAnimateOut ? 500 : 100
      );
    });

    // remove empty p tags
    $(".w-richtext p:empty").remove();
  }
})();
