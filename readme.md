# Indorse test - proof of github repo ownership

## Description

Users can prove the ownership by creating a gist from their github account - it
should contain a random challenge string sent by the server in an email.

Example gist: https://gist.github.com/ivooz/36a1c547300f9a12b62633dff89ecaa9

After creating the gist the user must send the gist id to the server.

## Running

### Requiremends

- Node.js 8.5

### Building

`npm install`

### Running tests

`npm test`

The code coverage report can be found in coverage/index.html

### Starting the server

Before running you must set your mailgun settings in config/config.js, otherwise
the server cannot send emails.

`npm start`

## Decentralisation proposal

A decentralised approach requires two components: a static website
signed by the indorse.io organisation and an indorse.io backend server used only
for indexing.

Users need to have an Ethereum key pair (one or multiple) assigned to their
indorse.io profile. This can be done by using a simple smart contract:

`//singles address
mapping (uint => address) public userIdToAddress;

//multiple addrsses
mapping(uint => address[]) public userIdToAddresses;`

The register addresses will be used to validate proof of ownership of repos.
The reason to have multiple keys is to generate disposable keys that could be
used by metamask or a mobile app.

The github repo ownership is very simple - one just needs to create a gist containing
a ecdsa signature of a string (for example the repo name) generated using a
private key pair associated with one of theaddresses registered in the smart contract.

These proofs can be published on ipfs:

`{
    type : "github",
    indorseIoUsername : "exampleUser",
    repoName : "user/repo",
    signature : "af6a86f9a69f90af79a879f6a9f89070a665af"
}`

The id of the ipfs file must be sent an indorse.io server, which is indexing id
of the proofs published on ipfs.

These proofs can be later signed by indorse.io (using the automatic verification)
and improved, so that their authenticity is higher, and published on ipfs:

`{
    type : "github",
    indorseIoUsername : "exampleUser",
    repoName : "user/repo",
    signature : "af6a86f9a69f90af79a879f6a9f89070a665af",
    validations : [
      {
        validator : indorse.io,
        signature : "144324353cdf1c149810908d980aaaaaaa"
      }
    ]
}`

More validations can be added by the other indorse.io by attaching their signatures.

Anyone using the static website can download the proofs from ipfs via an infura
ipfs gateway, verify the proofs with metamask (checking validator addresses
on the blockchain, verifying the signatures). They can also verify the proof by
themselves by checking out the gist.

The indorse.io server is just used to index the proofs, since it would be expensive to
keep them on the blockchain.  
