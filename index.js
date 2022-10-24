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

    inputClass = "#rsg-editor-input";

    // only run this if the test input div is present
    if ($(inputClass).length > 0) {
      incoming = $(inputClass).html();
      // look for teleports
      incoming = parseTeleports(incoming);
      incoming = incoming.replaceAll("{{", "<");
      incoming = incoming.replaceAll("}}", ">");
    }
    $(formatId).each(function () {
      if ($(this).attr("rsg-rich-layout") !== undefined) {
        if ($(inputClass).length === 0) {
          incoming = $(this).html();

          // look for teleports
          incoming = parseTeleports(incoming);
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

  function parseTeleports(src) {
    const teleportTagPattern = new RegExp("{{s*teleport[^}}]*}}", "gm");
    const teleportSources = [];
    const matches = src.match(teleportTagPattern);
    matches.forEach((tp) => {
      const tags = tp.match(/\b(\w+)\s*=\s*"(.*?)"/g);
      tags.forEach((tag) => {
        const splitTag = tag.split("=");

        if (splitTag[0].toLowerCase() === "src") {
          let teleportId = splitTag[1].replaceAll('"', "");

          const tps = $("*").find(`[data-teleport="${teleportId}"]`);
          teleportSources.push(tps[0]);
        }
      });
    });

    let index = 0;
    teleportSources.forEach((output) => {
      if (output) {
        src = src.replace(matches[index], output.outerHTML);
      } else {
        src = src.replace(matches[index], "");
      }
      index++;
    });

    return src;
  }
})();
