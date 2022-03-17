// Lexer
let label_regex = new RegExp(/^.*(?=:)/g);
let operation_regex = new RegExp(/(?<!;.*)((?<=:\s*|^\s+)\S+)/g);
let operand_regex = new RegExp(/(?<!;.*)((?<=(:*\s+\S+\s+))[^\s,;]+)/g);
let comment_regex = new RegExp(/(?<=;).*/g);

const parser = line => {
    const label = line.match(label_regex)?.at(0);
    const operation = line.match(operation_regex)?.at(0);
    const operands = line.match(operand_regex);
    const comment = line.match(comment_regex)?.at(0);

    return {
        label,
        operation,
        operands,
        comment,
    }
}

document.getElementById("source").onkeyup = e => {
    if (e.key === "Enter") {
        const span = document.createElement("span");
        const line = e.target.value;
        const parsed = parser(line);
        console.info(parsed);
        span.innerText = line + "\n";
        document.getElementById("output").appendChild(span);
        e.target.value = "";
    }
}
