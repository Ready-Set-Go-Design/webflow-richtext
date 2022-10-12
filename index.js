$ = jQuery;

$(document).ready(function () {
  formatText(".w-richtext");

  // formatText("#editor_input", "#editor_output");
  // $("#editor_input").on("input", function () {
  //   formatText();
  // });
});

function formatText() {
  // replace placeholder wrappers with actual tags
  outputClass = "#editor_output";
  inputClass = "#editor_output";

  let incoming = $(inputClass).html();
  incoming = incoming.replaceAll("{{", "<");

  // do something here to auto-close self-closing tags, like br and img?
  incoming = incoming.replaceAll("}}", ">");

  $(outputClass).html(incoming);

  // remove empty p tags to facilitate div extraction
  $(outputClass + " p:empty").remove();

  // remove p tags that are just line breaks
  let output = $(outputClass).html();

  $(outputClass).html(output.replaceAll("<p><br></p>", ""));
  $(outputClass).html(output.replaceAll("&nbsp;</p><p>", ""));
  $(outputClass).html(output.replaceAll("</p><p>", ""));
}
