module.exports = {
  expectException : async (callback) => {
    try {
      await callback();
      assert.fail("Expected termination due to exception");
    } catch (error) {
    }
  }
}
