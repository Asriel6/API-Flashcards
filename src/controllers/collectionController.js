import {collectionTable} from "../db/schema.js"
import {db} from "../db/database.js"
import {eq} from 'drizzle-orm'

export const getAllQuestions = async (req, res) => {
    try{
        const collection = await db.select().from(collectionTable).orderBy('createdAt', 'desc')
        res.status(200).json(collection)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Failed to fetch collections'})
    }
}
export const createQuestion = async(req, res ) => {
    const { collection } = req.body

    try {
        const [newCollection] = await db
        .insert(collection)
        .values({ title, description, visibility}).returning()
        res.status(201).send({message: 'Collection created'})
    } catch (error) {
        res.status(500).json({error: 'Failed to create Collection'})
    }
}

export const deleteCollection = async (req, res) => {
    const { id } = req.params
    const userId = req.user.userId

    try {
        const [collection] = await db
            .select()
            .from(collectionTable)
            .where(eq(collectionTable.id, id))
            .limit(1)

        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' })
        }

        if (collection.ownerId !== userId) {
            return res.status(403).json({
                error: "You are not allowed to delete this Collection"
            })
        }

        await db
            .delete(collectionTable)
            .where(eq(collectionTable.id, id))

        res.status(200).json({
            message: `Collection ${id} deleted successfully`
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete Collection' })
    }
}
