# Bee Assembly 🐝

## An education-driven REPL assembly language

```
  ,-.        eval
  \ /  read .' `. print
>(8||} .    .   .     .
  / \   `- - ` ' - - '
  `-'
```

The goal of Bee Assembly is to ease the transition from using higher-level languages to learning assembly. Bee Assembly is interpreted with JavaScript, but shares the most common features (syntax, directives, instructions, etc.) of the most common languages.

The language and its interpreter are designed to be as readable as possible. Not only should the language be easy to use, but it should be a good reference for basic interpreter design.

## Example

Bee Assembly follows the conventional syntax of assembly language, but takes a strong inspiration from the design of RISC-V and accessibility of 6502.

Here is a `hello, world` example in Bee Assembly:

```asm
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;                                                                             ;
;         _            _  _                                  _      _         ;
;        | |          | || |                                | |    | |        ;
;        | |__    ___ | || |  ___     __      __ ___   _ __ | |  __| |        ;
;        | '_ \  / _ \| || | / _ \    \ \ /\ / // _ \ | '__|| | / _` |        ;
;        | | | ||  __/| || || (_) |_   \ V  V /| (_) || |   | || (_| |        ;
;        |_| |_| \___||_||_| \___/( )   \_/\_/  \___/ |_|   |_| \__,_|        ;
;                                 |/                                          ;
;                                                                             ;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;    data section     ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

.section .data                    ; the section directive is used to define a
                                  ; data section

hello:                            ; the CPU can jump to this label in memory
	.string "hello, world\n",     ; the message is a string with a new line

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;    code section     ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

.section .text                    ; the section directive is used to declare a
                                  ; section of code

.global start                     ; the global directive is used to declare a
                                  ; global label

start:                            ; the label for the start of the program
	mov rax, 1                ; system call for write
	mov rdi, 1                ; file handle 1 is stdout
	mov rsi, hello            ; address of string to output
	mov rdx, 13               ; number of bytes of string
	syscall                   ; invoke operating system to do the write
	mov rax, 60               ; system call for exit
	xor rdi, rdi              ; exit code 0
	syscall                   ; invoke operating system to exit
```

## Syntax

Each line of Bee Assembly will take the following form:

```
	label: operation operand ; comment
```

- A label is a string of characters that starts a line and ends at a colon. (optional)

- An operation is a string of characters that either begins after a tab or label. (required)

- An operand is a string of characters that follow an operation or comma. (optional)

- A comment is everything after a hashtag. (optional)

## Directives

| directive | description     | usage                  |
| --------- | --------------- | ---------------------- |
| .section  | specify block   | `.section .data`       |
| .data     | data            | read and write         |
| .text     | assembly code   | read and execute       |
|           |                 |                        |
| .global   | global label    | `.global label`        |
|           |                 |                        |
| .string   | character array | `.string "characters"` |
| .bits     | bit array       | `.bits 1010`           |

## Instructions

This table uses some keys for conciseness. `d` is `d`estination, `s` is `s`ource, `pc` is `p`rogram `c`ounter, and `n` is a`n`y address or value. Addresses can be relative or absolute.

| function   | opcode      | action              |
| ---------- | ----------- | ------------------- |
| arithmetic | mov d, s    | d = s               |
|            | add d, s    | d = d + s           |
|            | sub d, s    | d = d - s           |
|            | mul d, s    | d = d \* s          |
|            | div d, s    | d = d / s           |
| logic      | and d, s    | d = d & s           |
|            | or d, s     | d = d \| s          |
|            | xor d, s    | d = d ^ s           |
| branch     | beq d, s, n | if (d == s) pc += n |
|            | bne d, s, n | if (d != s) pc += n |
|            | bgt d, s, n | if (d > s) pc += n  |
|            | blt d, s, n | if (d < s) pc += n  |
|            | jmp n       | pc = n              |
|            | brk         | pc = 60             |
|            | nop         |                     |
| shift      | sll d, n    | d = d << n          |
|            | srl d, n    | d = d >> n          |
|            | sla d, n    | d = d << n          |
|            | sra d, n    | d = d >> n          |
