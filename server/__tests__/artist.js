const request = require("supertest");
const app = require("../app");
const { Artist } = require("../models");

describe("api artists", () => {
  let header = "x-custom-header";

  let mockArtist = {
    id: 1,
    name: "Ocean Alley",
    coverImage:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/OA_LD_-_Primary_Press_Shot.jpg",
    created_at: null,
    updated_at: null,
  };

  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
    await request(app).post("/artist").send(mockArtist);
  });

  it('Creates a new artist', async ()=>{
      let {body}=await request(app).get(`/artist/${mockArtist.id}`).set(header,1)
      expect(body.name).toBe(mockArtist.name)
  })

  let newName="Coldplay"
  it('Updates the artist name without changing any other propertys', async ()=>{
      await request(app).put(`/artist/${mockArtist.id}`).send({name:newName})
      let {body}=await request(app).get(`/artist/${mockArtist.id}`).set(header,1)
      expect(body.name).toBe(newName);
      expect(body.coverImage).toBe(mockArtist.coverImage)
  })

  it("Delete the artist", async () => {
    await request(app).delete(`/artist/${mockArtist.id}`);
    let { body } = await request(app)
      .get(`/artist/${mockArtist.id}`)
      .set(header, 1);
    expect(body).toEqual({});
  });
});
