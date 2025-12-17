import {sqliteTable, text, integer} from 'drizzle-orm/sqlite-core'
import {randomUUID} from 'crypto'
import { timeStamp } from 'console'
import { boolean, date } from 'zod'

export const personnalFlashCardsTable = sqliteTable('PersonnalFlashCards',{

    id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

    userId: text()
    .references(() => usersTable.id, {onDelete: 'cascade'}),

    level: integer().notNull().default(1),

    lastStudyDate: integer('lastStudyDate',{mode: 'timestamp'})
    .$defaultFn(() => new Date()),

    nextStudyDate: integer('nextStudyDate',{mode: 'timestamp'})
    .$defaultFn(() => new Date()),

    flashCardId: text()
    .notNull()
    .references(() => flashCardTable.id, {onDelete: 'cascade'})

})

export const flashCardTable = sqliteTable('FlashCards',{

    id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

    rectoText: text('rectoText',{length:255})
    .notNull(),

    rectoUrl: text('rectoUrl',{length:255}),

    versoText: text('versoText',{length:255})
    .notNull(),

    versoUrl: text('versoUrl',{length:255}),

    collectionId: text()
    .notNull()
    .references(() => collectionTable.id, {onDelete: 'cascade'}),
    
    ownerId: text()
    .notNull()
    .references(() => usersTable.id, {onDelete: 'cascade'})

})

export const usersTable = sqliteTable('Users',{

    id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

    email: text('email',{length : 255})
    .notNull(),

    password: text('password',{length : 255})
    .notNull(),

    name: text('name',{length : 255})
    .notNull(),

    surname: text('surname',{length : 255})
    .notNull(),

    /*isAdmin: integer('isAdmin',{mode: 'boolean'})
    .notNull()*/

})

export const collectionTable = sqliteTable('Collection',{

    id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

    ownerId: text()
    .notNull()
    .references(() => usersTable.id, {onDelete: 'cascade'}),

    title: text('Title', {length : 255})
    .notNull(),

    description: text('description', {length : 255})
    .notNull(),

    visibility: text({enum:['public', 'private']})
    .notNull()
})