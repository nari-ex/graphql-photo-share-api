const serialize = value => new Date(value).toISOString()

const parseValue = value => new Date(value)

const parseLiteral = ast => ast.value
