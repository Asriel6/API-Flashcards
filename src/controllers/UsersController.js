export const getAllUsers = (req, res ) => {
    res.status(200).send(
        [{MESSAGE: " GET ALL users"}]
    )
}