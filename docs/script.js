// Lexer
let label_regex = new RegExp(/^\S*(?=:)/g);
let operation_regex = new RegExp(/(?<!;.*)((?<=:\s*|^\s+)\S+)/g);
let operand_regex = new RegExp(/(?<!;.*)((?<=(:*\s+\S+\s+))[^\s,;]+)/g);
let comment_regex = new RegExp(/(?<=;).*/g);

function parser(line) {
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

function appendCode(parsed) {
    const label = parsed.label + ": ";
    const operation = parsed.operation + " ";
    const operands = parsed.operands?.join(", ");
    const comment = " ; " + parsed.comment;
    const newLine = "\n";

    const label_span = document.createElement("span");
    const operation_span = document.createElement("span");
    const operands_span = document.createElement("span");
    const comment_span = document.createElement("span");
    const newLine_span = document.createElement("span");

    label_span.innerText = label;
    operation_span.innerText = operation;
    operands_span.innerText = operands;
    comment_span.innerText = comment;
    newLine_span.innerText = newLine;

    label_span.style.color = "#0000b5";
    operation_span.style.color = "#b50000";
    operands_span.style.color = "#005500";
    comment_span.style.color = "#808080";

    if (parsed.label)
        document.getElementById("output").appendChild(label_span);
    if (parsed.operation)
        document.getElementById("output").appendChild(operation_span);
    if (parsed.operands)
        document.getElementById("output").appendChild(operands_span);
    if (parsed.comment)
        document.getElementById("output").appendChild(comment_span);
    document.getElementById("output").appendChild(newLine_span);
}

document.getElementById("source").onkeyup = e => {
    if (e.key === "Enter") {
        const span = document.createElement("span");
        const line = e.target.value;
        const parsed = parser(line);
        appendCode(parsed);
        e.target.value = "";
    }
}
