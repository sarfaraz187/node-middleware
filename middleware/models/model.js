const { MongoClient } = require("mongodb");

const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const createTicket = async payload => {
  try { 
    console.log("///////////////// Inside Data base creation /////////////////");
    await client.connect();
    const collection = client.db('Freshservice').collection("Tickets");
    // console.log({ collection });
    const result = await collection.insertOne(payload.freshdesk_webhook);
    console.log({ result });
    console.log("--------------- Document Inserted successfully --------------");
    // return result
    // console.dir("Inserted Count :", result.insertedCount);
  } catch {
    await client.close();
  }
}

const updateTicket = async payload => {
  try { 
    console.log("///////////////// Inside Database Updation /////////////////");
    await client.connect();
    const collection = client.db('Freshservice').collection("Tickets");
    const query = { "ticket_id" : payload.freshdesk_webhook.ticket_id };
    const foundTicket = await collection.findOne(query);
    console.log({ foundTicket });
    console.log({ query });
    const update = {
      "$set": payload.freshdesk_webhook
    };
    console.log(update);
    const options = { returnNewDocument: true };
    collection.findOneAndUpdate(query, update, options).then(updatedDocument => {
      console.log({ updatedDocument });
    }).catch(err => console.log(`Failed to find and update document: ${err}`));
    console.log("--------------- Document updated successfully --------------");
    // console.dir("Inserted Count :", result.insertedCount);
  } catch (e) {
    console.log(e)
    await client.close();
  }
}

module.exports = {
  createTicket : createTicket,
  updateTicket : updateTicket
}

