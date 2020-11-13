const elasticSearch=require("@elastic/elasticsearch")

const client=new elasticSearch.Client({
    node:"http://localhost:9200"
})

const updateElasticData = async(index, dataArray)=>{
    await client.indices.create(
        {
          index
        }
      );
      const body = dataArray.flatMap((doc) => [
        { index: { _index: index } },
        doc,
      ]);
      const { body: bulkResponse } = await client.bulk({ refresh: true, body });
      if (bulkResponse.errors) {
        console.log("ERROR");
        return bulkResponse.errors;
      } else {
          const { body: count } = await client.count({ index: index });
          console.log(count);
        return bulkResponse;
      }
}

const getElasticIndex = async (index,size)=>{
    return await client.search({index, size:size||1000})
}

module.exports={updateElasticData, getElasticIndex}