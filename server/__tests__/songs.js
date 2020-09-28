const request = require("supertest");
const app = require("../app");
const { Song } = require("../models");

describe("api songs", () => {
  let header = "x-custom-header";

  let mockSong = {
    id: 1,
    title: "Happy Sad",
    artist_id: 1,
    album_id: 1,
    track_number: 1,
    lyrics: null,
    length: "00:05:30",
    created_at: null,
    updated_at: null,
    youtube_link: null,
  };

  beforeEach(async () => {
    await Song.destroy({ truncate: true, force: true });
    await request(app).post("/song").send(mockSong);
  });

  it("Creates a new song", async () => {
    let { body } = await request(app)
      .get(`/song/${mockSong.id}`)
      .set(header, 1);
    expect(body.title).toBe(mockSong.title);
  });

  let newName = "Violet hill";
  it("Updates the song name without changing other properties", async () => {
    await request(app).put(`/song/${mockSong.id}`).send({ title: newName });
    let { body } = await request(app)
      .get(`/song/${mockSong.id}`)
      .set(header, 1);
    expect(body.title).toBe(newName);
    expect(body.length).toBe(mockSong.length);
  });

  it("Delete the song", async () => {
    await request(app).delete(`/song/${mockSong.id}`);
    let { body } = await request(app)
      .get(`/song/${mockSong.id}`)
      .set(header, 1);
    expect(body).toEqual({});
  });
});
