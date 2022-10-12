$ = jQuery;

$(document).ready(function () {
  formatText();

  $("#editor_input").on("input", function () {
    formatText();
  });
});

function formatText() {
  // replace placeholder wrappers with actual tags
  let incoming = $("#editor_input").html();

  //

  incoming = incoming.replaceAll("{{", "<");

  // do something here to auto-close self-closing tags, like br and img?
  incoming = incoming.replaceAll("}}", ">");

  $("#editor_output").html(incoming);

  // remove empty p tags to facilitate div extraction
  $("#editor_output p:empty").remove();

  // remove p tags that are just line breaks
  let output = $("#editor_output").html();
  $("#editor_output").html(output.replaceAll("<p><br></p>", ""));
  $("#editor_output").html(output.replaceAll("&nbsp;</p><p>", ""));
  $("#editor_output").html(output.replaceAll("</p><p>", ""));
}
