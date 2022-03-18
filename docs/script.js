// Global variables
const source = document.getElementById("source");
const run_btn = document.getElementById("run");
let state = {};
const tab = 4;
const instructions = {
    "add": "+",
    "sub": "-",
    "mul": "*",
    "div": "/",
    "and": "&",
    "or": "|",
    "xor": "^",
    "beq": "==",
    "bne": "!=",
    "bgt": ">",
    "blt": "<",
    "brk": "break",
    "jmp": "jump",
    "lb": "=",
    "lw": "=",
    "sb": "=",
    "sw": "=",
    "sll": "<<",
    "srl": ">>",
    "sla": "<<",
    "sra": ">>",
};

// Lexer
let label_regex = new RegExp(/^\w+(?=:)/g);
let operation_regex = new RegExp(/(?<!;.*)(?<=:\s*|^\s+)\w+/g);
let operand_regex = new RegExp(/(?<!;.*)(?<=([^\s:]+\s+|,))\w+/g);
let comment_regex = new RegExp(/;.*/g);

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

    let line = "";
    switch (parsed.operation) {
        case "add":
            line = parsed.operands?.at(0) + "+" + parsed.operands?.at(1);
        case "sub":
            line = parsed.operands?.at(0) + "-" + parsed.operands?.at(1);
        case "mul":
            line = parsed.operands?.at(0) + "*" + parsed.operands?.at(1);
        case "div":
            line = parsed.operands?.at(0) + "/" + parsed.operands?.at(1);
        case "and":
            line = parsed.operands?.at(0) + "&" + parsed.operands?.at(1);
        case "or":
            line = parsed.operands?.at(0) + "|" + parsed.operands?.at(1);
        case "xor":
            line = parsed.operands?.at(0) + "^" + parsed.operands?.at(1);
        case "beq":
            line = parsed.operands?.at(0) + "==" + parsed.operands?.at(1);
        case "bne":
            line = parsed.operands?.at(0) + "!=" + parsed.operands?.at(1);
        case "bgt":
            line = parsed.operands?.at(0) + ">" + parsed.operands?.at(1);
        case "blt":
            line = parsed.operands?.at(0) + "<" + parsed.operands?.at(1);
        case "brk":
            line = "break";
        case "jmp":
            line = "jump " + parsed.operands?.at(0);
        case "lb":
            line = parsed.operands?.at(0) + "=" + parsed.operands?.at(1);
        case "lw":
            line = parsed.operands?.at(0) + "=" + parsed.operands?.at(1);
        case "sb":
            line = parsed.operands?.at(0) + "=" + parsed.operands?.at(1);
        case "sw":
            line = parsed.operands?.at(0) + "=" + parsed.operands?.at(1);
        case "sll":
            line = parsed.operands?.at(0) + "<<" + parsed.operands?.at(1);
        case "srl":
            line = parsed.operands?.at(0) + ">>" + parsed.operands?.at(1);
        case "sla":
            line = parsed.operands?.at(0) + "<<" + parsed.operands?.at(1);
        case "sra":
            line = parsed.operands?.at(0) + ">>" + parsed.operands?.at(1);
    }

    try {
        const result = eval(line);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}

function appendCode(parsed, line) {
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
        div.appendChild(label_span);
    if (parsed.operation)
        div.appendChild(operation_span);
    if (parsed.operands)
        div.appendChild(operands_span);
    if (parsed.comment)
        div.appendChild(comment_span);
    if (div.hasChildNodes())
        document.getElementById("output").appendChild(div);
    else if (line !== "")
        // If parsing fails, display error as comment
        appendCode({
            label: "",
            operation: "",
            operand: "",
            comment: "; Error parsing: " + line
        }, "");
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
        try {
            const parsed_lines = [];
            for (const line of lines.split("\n")) {
                // Parse lines
                parsed_lines.push(parser(line));
                // Display lines in output
                appendCode(parsed_lines?.at(parsed_lines.length - 1), line);
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
