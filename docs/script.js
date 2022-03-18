// Global variables
const source = document.getElementById("source");
const run_btn = document.getElementById("run");
let state = {};

// Lexer
let label_regex = new RegExp(/^\w*(?=:)/g);
let operation_regex = new RegExp(/(?<!;.*)((?<=:\s*|^\s+)\w+)/g);
let operand_regex = new RegExp(/(?<!;.*)((?<=([^\s:]+\s+|,))\w+)/g);
let comment_regex = new RegExp(/(?<=;).*/g);

// Parser
function parser(line) {
    run_btn.innerText = "Parse";

    const label = line.match(label_regex)?.at(0);
    const operation = line.match(operation_regex)?.at(0);
    const operands = line.match(operand_regex);
    const comment = line.match(comment_regex)?.at(0).trim();

    return {
        label,
        operation,
        operands,
        comment,
    }
}

// Interpreter
function interpreter(parsed) {
    run_btn.innerText = "Interpret";
}

function appendCode(parsed) {
    const label = parsed.label + ": ";
    const operation = parsed.operation + " ";
    const operands = parsed.operands?.join(", ");
    const comment = " ; " + parsed.comment;

    const line = document.createElement("div");
    const label_span = document.createElement("span");
    const operation_span = document.createElement("span");
    const operands_span = document.createElement("span");
    const comment_span = document.createElement("span");

    label_span.innerText = label;
    operation_span.innerText = operation;
    operands_span.innerText = operands;
    comment_span.innerText = comment;

    label_span.style.color = "#5f5fff";
    operation_span.style.color = "#ec0000";
    operands_span.style.color = "#008900";
    comment_span.style.color = "#757575";

    if (parsed.label)
        line.appendChild(label_span);
    if (parsed.operation)
        line.appendChild(operation_span);
    if (parsed.operands)
        line.appendChild(operands_span);
    if (parsed.comment)
        line.appendChild(comment_span);
    if (line.hasChildNodes())
        document.getElementById("output").appendChild(line);
}

function reset() {
    // Reset textarea when code is run
    source.value = "";
    source.rows = 1;

    // Rest button after code is run
    run_btn.innerText = "Run";
    run_btn.disabled = false; // Enable button
}

function insertTab() {
    const start = source.selectionStart;
    const end = source.selectionEnd;

    // Set textarea value to before+tab+after
    source.value = source.value.substring(0, start) +
        "\t" + source.value.substring(end);

    // Move to correct position
    source.selectionStart = source.selectionEnd = start + 1;
}

function run(lines) {
    run_btn.disabled = true; // Disable button
    return new Promise((resolve, reject) => {
        try {
            const parsed_lines = [];
            for (const line of lines.split("\n")) {
                // Parse lines
                parsed_lines.push(parser(line));
                // Display lines in output
                appendCode(parsed_lines?.at(parsed_lines.length - 1));
            }
            for (const parsed of parsed_lines) {
                // Interpret lines
                interpreter(parsed);
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

source.onkeydown = e => {
    if (e.shiftKey && e.key === "Enter") {
        // Prevent new line from being added
        e.preventDefault();
        run(e.target.value).then(reset);
    }
    if (e.key === "Tab") {
        // Prevent focus from moving to next element
        e.preventDefault();
        insertTab();
    }
    if (e.key === "Enter")
        // Expand textarea on enter
        e.target.rows++;
    if (e.key === "Backspace")
        // Shrink textarea on backspace
        if (e.target.rows > 1)
            e.target.rows--;
}

run_btn.onclick = _ => {
    run(source.value).then(reset);
}
