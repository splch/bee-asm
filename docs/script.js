// Global variables
let state = {};
const instructions = {
    "add": "+",
    "sub": "-",
    "mul": "*",
    "div": "/",
    "and": "&",
    "or": "|",
    "xor": "^",
    "sll": "<<",
    "srl": ">>",
    "sla": "<<",
    "sra": ">>",
    "beq": "==",
    "bne": "!=",
    "bgt": ">",
    "blt": "<",
    "brk": "break",
    "jmp": "jump",
    "sb": "=",
    "sw": "=",
    "lb": "=",
    "lw": "=",
};
const tab = 4;
const source = document.getElementById("source");
const run_btn = document.getElementById("run");

// Lexer
const label_regex = new RegExp(/^[^\s,;:]+(?=:)/g);
const operation_regex = new RegExp(/(?<!;.*)(?<=:\s*|^\s+)[^\s,;:]+/g);
const operand_regex = new RegExp(/(?<!;.*)(?<=([^\s:]+\s+|,))[^\s,;:]+/g);
const comment_regex = new RegExp(/;.*/g);

// Parser
function parser(line) {
    run_btn.innerText = "Parse";

    // lex and parse with regex
    const label = line.match(label_regex)?.at(0);
    const operation = line.match(operation_regex)?.at(0).toLowerCase();
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
    let result;

    try {
        switch (parsed.operation) {
            case "add":
            case "sub":
            case "mul":
            case "div":
            case "and":
            case "or":
            case "xor":
            case "sll":
            case "srl":
            case "sla":
            case "sra":
                state[parsed.operands?.at(0)] = eval(state[parsed.operands?.at(0)] + instructions[parsed.operation] + state[parsed.operands?.at(1)]);
                result = state[parsed.operands?.at(0)];
                break;
            case "sb":
            case "sw":
                state[parsed.operands?.at(0)] = parsed.operands?.at(1);
                result = state[parsed.operands?.at(0)];
                break;
            case "lb":
            case "lw":
                state[parsed.operands?.at(1)] = state[parsed.operands?.at(0)];
                result = state[parsed.operands?.at(1)];
                break;
        }
    } catch (e) {
        result = e.message;
    } finally {
        if (result !== undefined)
            parsed.comment = (parsed.comment ? parsed.comment : "; ")
                + " ".repeat(tab) + "= " + result;
        return parsed;
    }
}

function appendCode(parsed) {
    const label = parsed.label + ":";
    const operation = " ".repeat(tab) + parsed.operation;
    const operands = " " + parsed.operands?.join(", ");
    const comment = " ".repeat(tab) + parsed.comment;

    const div = document.createElement("div");
    const label_span = document.createElement("span");
    const operation_span = document.createElement("span");
    const operands_span = document.createElement("span");
    const comment_span = document.createElement("span");

    label_span.innerText = label;
    operation_span.innerText = operation;
    operands_span.innerText = operands;
    comment_span.innerText = comment;

    // Good on light (#f5f7ff) and dark (#2b2b2b)
    label_span.style.color = "var(--label)";
    operation_span.style.color = "var(--operation)";
    operands_span.style.color = "var(--operand)";
    comment_span.style.color = "var(--comment)";

    if (parsed.label)
        // Add label to output
        div.appendChild(label_span);
    if (parsed.operation) {
        // Add operation to output
        div.appendChild(operation_span);
        if (parsed.operands)
            // Add operands after operation
            div.appendChild(operands_span);
    }
    if (parsed.comment)
        // Add comment to output
        div.appendChild(comment_span);
    document.getElementById("output").appendChild(div);
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
        " ".repeat(tab) + source.value.substring(end);

    // Move to correct position
    source.selectionStart = source.selectionEnd = start + tab;
}

function run(lines) {
    run_btn.disabled = true; // Disable button
    return new Promise((resolve, reject) => {
        // Parse lines
        let parsed_lines = lines.split("\n").map(parser);
        // Interpret lines
        let interpreted_lines = parsed_lines.map(interpreter);
        // Display lines in output
        interpreted_lines.map(appendCode);
        resolve();
    });
}

source.onkeydown = e => {
    if (e.shiftKey && e.key === "Enter") {
        // Prevent new line from being added
        e.preventDefault();
        run(e.target.value).then(reset);
    }
    else if (e.key === "Tab") {
        // Prevent focus from moving to next element
        e.preventDefault();
        insertTab();
    }
}

source.onkeyup = e => {
    // Update textarea height
    e.target.rows = e.target.value.split("\n").length;
}

run_btn.onclick = _ => {
    run(source.value).then(reset);
}
