migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib")

  // remove
  collection.schema.removeField("bo9fn87x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ifephvzc",
    "name": "image",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdx1vy7mbiz65ib")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bo9fn87x",
    "name": "images",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("ifephvzc")

  return dao.saveCollection(collection)
})
