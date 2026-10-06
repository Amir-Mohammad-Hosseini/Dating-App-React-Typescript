const globalValidator = (schema : any ,data : any) => {
    const result = schema.safeParse(data)
    return result
}

export default globalValidator