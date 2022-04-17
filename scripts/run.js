const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");

  const gameContract = await gameContractFactory.deploy(
    ['ZORO', 'NAMI', 'USOPP'],
    [
      'QmPNEmaiWSaQhWYkjKBWctX5jwZ4t9WEPgssDNFwUT1RBx',
      'QmNSa7MR5hcbJS1sHzx5AJ3HhHubChMYJhGGve7kJupii3',
      'QmQ59urX6G91McKCha59vL7j9JsACCx9ofZKWJ5CT5cEYd',
    ],
    [100, 200, 300],
    [100, 50, 25],
    'CROCODILE', // Bossの名前
    'https://i.imgur.com/BehawOh.png', // Bossの画像
    10000, // Bossのhp
    50 // Bossの攻撃力
  );

  const nftGame = await gameContract.deployed();
  console.log('Contract deployed to:', nftGame.address);

  let txn;

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // 1回目の攻撃: attackBoss 関数を追加
  txn = await gameContract.attackBoss();
  await txn.wait();

  // 2回目の攻撃: attackBoss 関数を追加
  txn = await gameContract.attackBoss();
  await txn.wait();

  const returnedTokenUri = await gameContract.tokenURI(1);
  console.log('Token URI:', returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
