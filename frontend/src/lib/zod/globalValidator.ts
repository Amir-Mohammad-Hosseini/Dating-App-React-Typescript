const globalValidator = (schema : any ,data : any) => {
    const result = schema.safeParse(data)
    console.log(result)

    return result
}

export default globalValidator