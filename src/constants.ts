

export enum Associativity {
    LEFT_RIGHT,
    RIGHT_LEFT
}
export const UNARY_SIGN = "_-_";

export const PRECEDENCE_ASSOCIATIVE = new Map<string, { precedence: number, associativity: Associativity }>(
    [
        ["-", { precedence: 1, associativity: Associativity.LEFT_RIGHT }],
        ["+", { precedence: 1, associativity: Associativity.LEFT_RIGHT }],
        ["/", { precedence: 2, associativity: Associativity.LEFT_RIGHT }],
        ["*", { precedence: 2, associativity: Associativity.LEFT_RIGHT }],
        ["^", { precedence: 3, associativity: Associativity.RIGHT_LEFT }],
        [UNARY_SIGN, { precedence: 4, associativity: Associativity.RIGHT_LEFT }],
    ]
)