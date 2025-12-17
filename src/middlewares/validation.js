import { ZodError } from "zod"

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({
                    error: 'Validation failed',
                    details: error.issues.map((issue) => issue.message)
                })
            }

            return res.status(500).send({
                error: 'Validation failed',
                details: [error.message]
            })
        }
    }
}

export const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.params)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({
                    error: 'Invalid Params',
                    details: error.issues.map((issue) => issue.message)
                })
            }

            return res.status(500).send({
                error: 'Params failed',
                details: [error.message]
            })
        }
    }
}
