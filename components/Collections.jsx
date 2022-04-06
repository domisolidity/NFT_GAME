import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import MyNftsCard from "../components/MyNftsCard";
import Link from "next/link";

const Collections = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;

  const [myNfts, setMyNfts] = useState([
    {
      id: null || "",
      name: null || "",
      image: null || "",
      description: null || "",
      grade: null || "",
      attributes: null || "",
    },
  ]);

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
            console.log(response.data);
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

  let limit = 5;
  let pages = 1;
  let range = [];

  const initDataShow =
    limit && myNfts ? myNfts.slice(0, Number(limit)) : myNfts;

  const [dataShow, setDataShow] = useState(initDataShow);

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
      {/* <Box fontSize={"1.5rem"} fontWeight="bold">
        My Nfts
      </Box> */}
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
      <Flex flexDir={"row"}>
        {
          dataShow[0] && (
            <>
              {dataShow.map((mynft, index) => {
                return (
                  <Box key={index}>
                    <Link
                      href={{
                        pathname: `mypage/${mynft.id}`,
                        query: {
                          id: mynft.id,
                          grade: mynft.grade,
                          attributes: mynft.attributes,
                          name: mynft.name,
                          image: mynft.image,
                          description: mynft.description,
                        },
                      }}
                      as={`mypage/${mynft.id}`}
                    >
                      {/* id, grade, attributes, name, image, description */}
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
          )
          // : (
          //   <Text>보유 nft가 없습니다.</Text>
          // )
        }
      </Flex>
      <style jsx>{`
        .table__pagination {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          margin: 1rem;
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
          background-color: var(--chakra-colors-purple-700);
          font-weight: 600;
        }

        .table__pagination-item:hover {
          /* color: var(--chakra-colors-white-700); */
          background-color: var(--chakra-colors-purple-700);
        }
      `}</style>
    </>
  );
};

export default Collections;
