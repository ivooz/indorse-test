module.exports = () => {
    return {
        messages : () => {
            return {
              send : (data,callback) => {
                console.log("mock email sent!");
                callback();
              }
            }
        }
    }
};
