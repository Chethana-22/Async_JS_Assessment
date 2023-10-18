function createAndDeleteUsingCallbacks(createRandomJSONFile, deleteFile){
    for (let index = 1; index <= 3; index++) {
        const filename = `callBackFile_${index}.json`;
      
        createRandomJSONFile(filename, (createErr, createdFile) => {
          if (createErr) {
            console.error(`Error creating ${createdFile}: ${createErr}`);
          } else {
            console.log(`${createdFile} created successfully.`);
            deleteFile(createdFile, (deleteErr, deletedFile) => {
              if (deleteErr) {
                console.error(`Error deleting ${deletedFile}: ${deleteErr}`);
              } else {
                console.log(`${deletedFile} deleted successfully.`);
              }
            });
          }
        });
      }
}

module.exports = createAndDeleteUsingCallbacks;
