//@ts-ignore
import { Address, require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Block, Event } from "@hyperoracle/zkgraph-lib";

let addr = Bytes.fromHexString("0x7169D38820dfd117C3FA1f22a697dBA58d90BA06");
let esig_blacklist = Bytes.fromHexString(
  "0x42e160154868087d6bfdc0ca23d96a1c1cfa32f1b72ba9ba27b69b98a0d819dc"
);

export function handleBlocks(blocks: Block[]): Bytes {
  // init output state
  let state: Bytes;

  // #3 also can access (matched) events of a given account address & a given esig  (should present in yaml first).
  // a subset of 'eventsByAcct'
  let eventsByAcctEsig: Event[] = blocks[0]
    .account(addr)
    .eventsByEsig(esig_blacklist);

  // require match event count > 0
  require(eventsByAcctEsig.length > 0);

  let bytes_blacklisted_address: Bytes = eventsByAcctEsig[0].data;
  let blacklisted_address: Address = Address.fromBytes(
    bytes_blacklisted_address
  );
  console.log(blacklisted_address.toString());

  // set state to the address of the 1st (matched) event, demo purpose only.
  state = bytes_blacklisted_address;

  return state;
}
