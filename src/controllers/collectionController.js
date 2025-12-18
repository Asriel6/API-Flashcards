import {collectionTable} from "../db/schema.js"
import {db} from "../db/database.js"
import {eq, or} from 'drizzle-orm'

export const getAllCollection = async (req, res) => {
    try{
        var collection = await db.select({ title: collectionTable.title, description: collectionTable.description }).from(collectionTable)
                .where(
                    or(
                        eq(collectionTable.visibility, 'public'),
                        eq(collectionTable.ownerId, req.user.userId)
                    ))
                    
        if(req.user.role == 'ADMIN'){
                    collection = await db.select({ title: collectionTable.title, description: collectionTable.description}).from(collectionTable)
                }
        res.status(200).json(collection)
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Failed to fetch collections'})
    }
}


export const createCollection = async(req, res ) => {
    try {
        const { title, description, visibility , ownerId} = req.body

        const userId = req.user.userId

        await db.insert(collectionTable).values({ title: title, description: description, visibility: visibility, ownerId: userId }).returning()
        
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
