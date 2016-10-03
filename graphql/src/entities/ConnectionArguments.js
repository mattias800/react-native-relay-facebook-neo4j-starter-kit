export type ConnectionArguments = {
    first:?number;
    last:?number;
    before:?any;
    after:?any;
};

export type ForwardConnectionArguments = {
    first:?number;
    after:?any;
};

export type BackwardConnectionArguments = {
    last:?number;
    before:?any;
};

export type AnyConnectionArguments = ConnectionArguments|ForwardConnectionArguments|BackwardConnectionArguments;