// Lever
const lexer = str => str.split(' ').map(s => s.trim()).filter(s => s.length);

// Parser
const Op = Symbol('op');
const Num = Symbol('num');
const parser = tokens => {
    let c = 0;

    const peek = _ => tokens[c];
    const consume = _ => tokens[c++];

    const parseNum = _ => ({
        val: parseInt(consume()),
        type: Num
    });

    const parseOp = _ => {
        const node = {
            val: consume(),
            type: Op,
            expr: []
        };
        while (peek()) node.expr.push(parseExpr());
        return node;
    };

    const parseExpr = _ => /\d/.test(peek()) ? parseNum() : parseOp();

    return parseExpr();
};

// Transpiler
const transpiler = ast => {
    const opMap = {
        mov: '=',
        add: '+',
        sub: '-',
        div: '/',

        inc: '++',
        dec: '--',

        and: '&',
        or: '|',
        xor: '^',
        not: '~',
    };
    const transpileNode = ast => ast.type === Num ? transpileNum(ast) : transpileOp(ast);
    const transpileNum = ast => ast.val;
    const transpileOp = ast => `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
    return transpileNode(ast);
};

const run = code => {
    let output;
    try {
        output = eval(code);
    } catch (e) {
        output = e.message;
    }
    return output;
}

document.getElementById("build").onclick = _ => {
    const source = document.getElementById("source").value;
    const tokens = lexer(source);
    const parsed = parser(tokens);
    const transpiled = transpiler(parsed);
    const output = run(transpiled);

    document.getElementById("lexerOutput").innerText = tokens;
    document.getElementById("parserOutput").innerText = JSON.stringify(parsed);
    document.getElementById("transpilerOutput").innerText = transpiled;
    document.getElementById("output").innerText = output;
}
