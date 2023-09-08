migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib")

  collection.createRule = null

  return dao.saveCollection(collection)
})
