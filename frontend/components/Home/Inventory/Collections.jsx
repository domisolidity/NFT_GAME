import React, { useEffect, useState } from "react";
import { Flex, Box, Text, SimpleGrid, Grid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import MyNftsCard from "./MyNftsCard";
import Link from "next/link";
import wrapper from "../../../redux/store";
import NotFound from "../../utils/NotFound";
const _ = require("lodash");

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       console.log(store);
//       console.log("서버");

//       // store.dispatch(myInfoRequestAction());
//     }
// );

const Collections = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;

  const [myNfts, setMyNfts] = useState([]);

  const baseUri = "http://127.0.0.1:8080/ipfs";

  const getMyNfts = async () => {
    try {
      await nftContract.methods
        .getMyToken(account)
        .call({ from: account })
        .then(async (result) => {
          console.log("getMyToken", result);
          let mynfts = [];
          if (!result) return true;
          for (const info of result) {
            if (info.uri == "") continue;
            const response = await axios.get(
              `${baseUri}${info.uri.slice(6)}/${info.id}.json`
            );
            mynfts.push({
              id: info.id,
              grade: response.data.grade,
              attributes: response.data.attributes,
              name: response.data.name,
              image: `${baseUri}${response.data.image.slice(6)}`,
              description: response.data.description,
            });
          }
          setMyNfts(mynfts);
          console.log("myNft", mynfts);
        });
    } catch (error) {
      console.error();
    }
  };

  useEffect(async () => {
    if (!account) return false;
    await getMyNfts();
  }, [account]);
  useEffect(async () => {
    const end = Number(limit);
    setDataShow(myNfts.slice(0, end));
  }, [myNfts]);

  let limit = 5;
  let pages = 1;
  let range = [];

  const [dataShow, setDataShow] = useState(myNfts);

  if (limit !== undefined) {
    let page = Math.floor(myNfts.length / Number(limit)) || 0;
    pages = myNfts.length % Number(limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);

    setDataShow(myNfts.slice(start, end));
    setCurrPage(page);
  };

  return (
    <>
      <Flex flexDir={"row"} justify="center" align="center">
        {pages >= 1 ? (
          <div className="table__pagination">
            {range.map((item, index) => (
              <div
                key={index}
                className={`table__pagination-item ${
                  currPage === index ? "active" : ""
                }`}
                onClick={() => selectPage(index)}
              >
                {item + 1}
              </div>
            ))}
          </div>
        ) : null}
      </Flex>
      <Box w="100%">
        <SimpleGrid
          justifyContent="center"
          gridTemplateColumns="repeat(auto-fill, minmax(270px, auto))"
        >
          {dataShow[0] ? (
            <>
              {dataShow.map((mynft, index) => {
                return (
                  <Box key={index} w="100%">
                    <Link
                      href={{
                        pathname: `home/${mynft.id}`,
                        query: {
                          id: mynft.id,
                          grade: mynft.grade,
                          attributes: JSON.stringify(mynft.attributes),
                          name: mynft.name,
                          image: mynft.image,
                          description: mynft.description,
                        },
                      }}
                      as={`home/${mynft.id}`}
                    >
                      <a>
                        <MyNftsCard
                          img={mynft.image}
                          name={mynft.name}
                          grade={mynft.grade}
                        />
                      </a>
                    </Link>
                  </Box>
                );
              })}
            </>
          ) : (
            <NotFound items={"NFT"} />
          )}
        </SimpleGrid>
      </Box>
      <style jsx>{`
        .table__pagination {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          margin: 1rem;
          color: var(--chakra-colors-white);
        }

        .table__pagination-item {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin: 0.5rem;
        }

        .table__pagination-item.active,
        .table__pagination-item.active:hover {
          background-color: var(--chakra-colors-teal-300);
          font-weight: 600;
        }

        .table__pagination-item:hover {
          background-color: var(--chakra-colors-teal-300);
        }
      `}</style>
    </>
  );
};

export default Collections;
