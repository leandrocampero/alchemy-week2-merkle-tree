const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const randomIndex = Math.floor(Math.random() * niceList.length);
  const name = niceList[randomIndex];

  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(randomIndex); // You can test a failure case by modifying the index (e.g. by adding 5)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log(
    `Let see what gift will ${name} (No. ${randomIndex + 1}) receive...`
  );
  console.log({ gift });
}

main();
