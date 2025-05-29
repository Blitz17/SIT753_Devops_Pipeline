const expect = require("chai").expect;
const axios = require("axios");

describe("Song Management API Test", function () {
    const baseUrl = "http://localhost:3000";

    it("Should return an array of songs", async function () {
        this.timeout(5000);
        try {
            const response = await axios.get(`${baseUrl}/api/songs/`);
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
        } catch (error) {
            console.error('API request failed:', error.message);
            return Promise.reject(error);
        }
    });

    it("Should save new songs by name", async function () {
        this.timeout(5000);

        const songName = 'Road';
        const response = await axios.get(`${baseUrl}/api/songs/search/${songName}`);

        expect(response.status).to.equal(201);
        expect(response.data.message).to.include(songName);
        expect(response.data.songs).to.be.an('array');
        expect(response.data.songs.length).to.be.greaterThan(0);

        createdSongId = response.data.songs[0].songId;
    });

    it("Should return a single song by songId", async function () {
        this.timeout(5000);

        if (!createdSongId) throw new Error("No songId available from previous test");

        const response = await axios.get(`${baseUrl}/api/songs/${createdSongId}`);

        expect(response.status).to.equal(200);
        expect(response.data.songId).to.equal(createdSongId);
    });

    it("Should delete the specified song", async function () {
        this.timeout(5000);

        if (!createdSongId) throw new Error("No songId available from previous test");

        const response = await axios.delete(`${baseUrl}/api/songs/${createdSongId}`);

        expect(response.status).to.equal(200);
        expect(response.data.message).to.equal('Song deleted successfully.');
        expect(response.data.deletedSong.songId).to.equal(createdSongId);
    });

});