import { NFTStorage } from "nft.storage";

const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZmMWMyODlDRWM5NTA4RUU4OTlDNWVCZDc4Qjg0YjIxNDcxOGY2MjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTIxNjU0MDc3NiwibmFtZSI6ImNvbm5lY3QtYm9hcmRzIn0.0XTdpYfvuhFJmEjAgWppWGsT9ULxzLlQqvE9P80yK_4";
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export async function uploadContent(content: any) {

  const imageFile = new File([content], content.fileName, {
    type: content.type,
  });
  const cid = await client.storeBlob(imageFile);
  return cid;
}


