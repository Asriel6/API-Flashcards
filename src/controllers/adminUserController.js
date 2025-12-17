import { db } from "../db/database.js"
import { usersTable } from "../db/schema.js"
import { eq } from "drizzle-orm"

export const getAllUsers = async (req, res) => {
    try {
        const users = await db.select().from(usersTable)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id))

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await db
            .delete(usersTable)
            .where(eq(usersTable.id, id))
            .returning()

        if (!deleted.length) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({ message: `User ${id} deleted successfully` })

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' })
    }
}
